#!/bin/bash
set -e

declare -a PIDS=()

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Constants
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"
VALKEY_NETWORK="valkey-net"

LOGGING_ENABLED=false
FORCE_REINSTALL=false
FORCE_REBUILD=false

install_dependencies() {
    echo -e "${YELLOW}Installing dependencies...${NC}"
    
    # Only reinstall if node_modules is missing or package.json has changed
    install_if_needed() {
        local dir=$1
        local name=$2
        if [ "$FORCE_REINSTALL" = true ] || \
           [ ! -d "$dir/node_modules" ] || \
           [ "$(find "$dir/package.json" -mtime -1)" ]; then
            echo -e "${YELLOW}Installing $name dependencies...${NC}"
            (cd "$dir" && rm -rf node_modules package-lock.json && npm install) || {
                echo -e "${RED}Failed to install $name dependencies${NC}"
                return 1
            }
        else
            echo -e "${GREEN}$name dependencies up to date${NC}"
        fi
    }
    
    # Install dependencies only if needed
    install_if_needed "$BACKEND_DIR" "backend" || exit 1
    install_if_needed "$BACKEND_DIR/executor" "executor" || exit 1
    install_if_needed "$FRONTEND_DIR" "frontend" || exit 1
    
    echo -e "${GREEN}Dependencies check complete${NC}"
}

cleanup_processes() {
    echo -e "${YELLOW}Cleaning up processes...${NC}"
    
    # Stop all running containers first
    docker-compose down --remove-orphans 2>/dev/null || true
    
    # Kill any processes using our ports
    for port in 3000 6379 7000 7001 7002 7003 7004 7005 8080; do
        fuser -k ${port}/tcp 2>/dev/null || true
    done
    
    # Kill any remaining node processes
    pkill -f "node.*server.js" 2>/dev/null || true
    pkill -f "nodemon" 2>/dev/null || true
    pkill -f "vue-cli-service" 2>/dev/null || true
    
    echo -e "${GREEN}Cleanup complete${NC}"
    sleep 2  # Give processes time to fully terminate
}

# Parse arguments with early exit for cleanup
if [ "$1" = "--cleanup" ]; then
    cleanup_processes
    exit 0
fi

# Regular argument parsing for other flags
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --dev)
            DEV_MODE=true
            LOGGING_ENABLED=true
            ;;
        --log)
            LOGGING_ENABLED=true
            ;;
        --reinstall)
            FORCE_REINSTALL=true
            ;;
        --rebuild)
            FORCE_REBUILD=true
            ;;
        --cleanup)
            cleanup_processes
            exit 0
            ;;
        *)
            echo "Unknown parameter passed: $1"
            echo "Valid options: --dev, --log, --reinstall, --rebuild, --cleanup"
            exit 1
            ;;
    esac
    shift
done

export LOGGING_ENABLED

# Default mode and environment variables
if [ "$DEV_MODE" = true ]; then
    COMPOSE_FLAGS="-f docker-compose.yml -f docker-compose.dev.yml"
    START_SCRIPT=start:dev
else
    COMPOSE_FLAGS="-f docker-compose.yml -f docker-compose.prod.yml"
    START_SCRIPT=start:prod
fi
export START_SCRIPT

# Function to check dependencies
check_dependencies() {
    echo -e "${YELLOW}Checking dependencies...${NC}"
    command -v docker >/dev/null 2>&1 || { echo "Docker required"; exit 1; }
    command -v docker-compose >/dev/null 2>&1 || { echo "Docker Compose required"; exit 1; }
    command -v node >/dev/null 2>&1 || { echo "Node.js required"; exit 1; }
    command -v npm >/dev/null 2>&1 || { echo "npm required"; exit 1; }
    
    # Install executor dependencies
    echo -e "${YELLOW}Installing executor dependencies...${NC}"
    (cd "$BACKEND_DIR/executor" && npm install) || { echo "Failed to install executor dependencies"; exit 1; }
    
    # Install backend dependencies
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    (cd "$BACKEND_DIR" && npm install) || { echo "Failed to install backend dependencies"; exit 1; }
    
    if [ "$DEV_MODE" = true ]; then
        command -v nodemon >/dev/null 2>&1 || { echo "nodemon required for development mode"; exit 1; }
    fi
}

# Function to check service health
check_service() {
    local service=$1
    local port=$2
    local attempts=5
    local i=1

    while ! nc -z localhost $port; do
        if [ $i -gt $attempts ]; then
            echo -e "${RED}⏳ ${service} failed to start after $attempts attempts.${NC}"
            exit 1
        fi
        echo -e "${YELLOW}⏳ Waiting for ${service}... ($i/$attempts)${NC}"
        sleep 2
        i=$((i + 1))
    done
    echo -e "${GREEN}✅ ${service} is ready${NC}"
}

# Cleanup function
cleanup() {
    echo -e "\n${YELLOW}Cleaning up...${NC}"
    
    # Kill all tracked processes and their children
    for pid in "${PIDS[@]}"; do
        pkill -P $pid 2>/dev/null
        kill -TERM $pid 2>/dev/null
    done

    # Kill any remaining Vue CLI and Nodemon processes
    pkill -f "vue-cli-service" 2>/dev/null || true
    pkill -f "nodemon" 2>/dev/null || true

    # Replace lsof with fuser for faster termination
    fuser -k 8080/tcp 2>/dev/null || true
    fuser -k 3000/tcp 2>/dev/null || true

    # Stop and remove Docker containers
    docker-compose down --remove-orphans 2>/dev/null || true

    echo -e "${GREEN}Cleanup complete${NC}"
    exit 0
}

verify_service() {
    local service=$1
    local port=$2
    local max_attempts=$3
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if nc -z localhost $port; then
            echo -e "${GREEN}✅ ${service} is ready${NC}"
            return 0
        fi
        echo -e "${YELLOW}⏳ Waiting for ${service}... ($attempt/$max_attempts)${NC}"
        sleep 2
        attempt=$((attempt + 1))
    done
    echo -e "${RED}❌ ${service} failed to start${NC}"
    return 1
}

verify_cluster() {
    local max_attempts=30
    local attempt=1
    
    while [ $attempt -le $max_attempts ]; do
        if docker-compose logs valkey-cluster | grep -q "Cluster initialization complete"; then
            echo -e "${GREEN}✅ Valkey cluster initialized${NC}"
            return 0
        fi
        echo -e "${YELLOW}⏳ Waiting for cluster initialization... ($attempt/$max_attempts)${NC}"
        sleep 2
        attempt=$((attempt + 1))
    done
    echo -e "${RED}❌ Cluster initialization failed${NC}"
    return 1
}

setup_services() {
    echo -e "${GREEN}🚀 Setting up development environment...${NC}"

    # Check if rebuild is needed
    needs_rebuild() {
        [ "$FORCE_REBUILD" = true ] || \
        [ "$(docker-compose images | grep -c 'missing')" -gt 0 ] || \
        [ ! -z "$(find . -name 'Dockerfile' -mtime -1)" ]
    }

    # Install dependencies first
    install_dependencies

    # Only rebuild if necessary
    if needs_rebuild; then
        echo -e "${YELLOW}Building containers...${NC}"
        docker-compose build || {
            echo -e "${RED}Failed to build containers${NC}"
            exit 1
        }
    else
        echo -e "${GREEN}Containers up to date, skipping build${NC}"
    fi

    # Ensure clean state
    cleanup_processes

    # Start all services including frontend
    echo -e "${YELLOW}Starting all services...${NC}"
    export NODE_ENV=$([ "$DEV_MODE" = true ] && echo "development" || echo "production")
    docker-compose $COMPOSE_FLAGS up -d

    # Verify all services
    verify_service "Valkey Standalone" 6379 10 || exit 1
    verify_service "Valkey Cluster" 7000 10 || exit 1
    verify_service "Backend" 3000 15 || exit 1
    verify_service "Frontend" 8080 15 || exit 1
}

trap cleanup SIGINT SIGTERM EXIT

# Main script
echo -e "${GREEN}🚀 Setting up development environment...${NC}"
check_dependencies
setup_services

echo -e "${GREEN}✨ Environment ready!${NC}"
echo -e "
Access Points:
- Frontend: http://localhost:8080
- Backend: http://localhost:3000
- Valkey Standalone: localhost:6379
- Valkey Cluster: localhost:7000-7005
- Code Executor: running in container (direct execution)

Commands:
- View cluster status: cat /tmp/valkey-cluster.status
- View container status: docker ps
- View logs: docker-compose logs -f [service]

Script Options:
--dev        Development mode
--log        Enable detailed logging
--reinstall  Force reinstall all dependencies
--rebuild    Force rebuild all containers
--cleanup    Clean up processes and exit

Press Ctrl+C to stop all services
"

# Keep script running and show aggregated logs
docker-compose logs -f valkey-standalone valkey-cluster backend docker-executor &
wait
