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

cleanup_processes() {
    echo -e "${YELLOW}Cleaning up processes...${NC}"
    pkill -f "vue-cli-service" 2>/dev/null || true
    pkill -f "nodemon" 2>/dev/null || true
    kill $(lsof -t -i:8080) 2>/dev/null || true
    kill $(lsof -t -i:3000) 2>/dev/null || true
    docker-compose down 2>/dev/null || true
    echo -e "${GREEN}Cleanup complete${NC}"
    exit 0
}

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --dev) DEV_MODE=true ;;
        --cleanup) cleanup_processes ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

# Default mode and environment variables
if [ "$DEV_MODE" = true ]; then
    START_SCRIPT=start:dev
else
    START_SCRIPT=start:prod
fi
export DEV_MODE
export START_SCRIPT

# Function to check dependencies
check_dependencies() {
    echo -e "${YELLOW}Checking dependencies...${NC}"
    command -v docker >/dev/null 2>&1 || { echo "Docker required"; exit 1; }
    command -v docker-compose >/dev/null 2>&1 || { echo "Docker Compose required"; exit 1; }
    command -v node >/dev/null 2>&1 || { echo "Node.js required"; exit 1; }
    command -v npm >/dev/null 2>&1 || { echo "npm required"; exit 1; }
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
    
    # Kill any remaining Vue CLI processes
    pkill -f "vue-cli-service" 2>/dev/null
    
    # Kill processes on specific ports
    kill $(lsof -t -i:8080) 2>/dev/null
    kill $(lsof -t -i:3000) 2>/dev/null
    
    # Wait briefly for cleanup
    sleep 2
    
    # Force kill if necessary
    for pid in "${PIDS[@]}"; do
        kill -9 $pid 2>/dev/null
    done
    
    exit 0
}

setup_services() {
    echo -e "${GREEN}🚀 Setting up development environment...${NC}"

    # Common setup steps
    # Create Docker network if doesn't exist
    docker network create ${VALKEY_NETWORK} 2>/dev/null || true

    # Build executor images
    echo -e "${YELLOW}Building executor images...${NC}"
    docker-compose build python-executor valkey-node

    # Start executor services
    echo -e "${YELLOW}Starting executor services...${NC}"
    docker-compose up -d python-executor valkey-node

    # Verify executor services
    check_service "Python Executor" 3002
    check_service "Node Executor" 3001

    # Handle valkey-standalone
    if docker ps | grep -q valkey-standalone; then
        echo -e "${YELLOW}Valkey Standalone is running. Flushing all data...${NC}"
        docker-compose exec valkey-standalone valkey-cli flushall
    else
        echo -e "${YELLOW}Starting Valkey Standalone...${NC}"
        docker-compose up -d valkey-standalone
        check_service "Valkey Standalone" 6379
    fi

    # Handle valkey-cluster
    if docker ps | grep -q valkey-cluster; then
        echo -e "${YELLOW}Valkey Cluster is running. Flushing all data...${NC}"
        docker-compose exec valkey-cluster valkey-cli -p 7000 flushall
    else
        echo -e "${YELLOW}Starting Valkey Cluster...${NC}"
        docker-compose up -d valkey-cluster
        check_service "Valkey Cluster" 7000
    fi

    # Install dependencies
    echo -e "${YELLOW}Installing dependencies...${NC}"
    (cd "$FRONTEND_DIR" && npm install)
    (cd "$BACKEND_DIR" && npm install)

    echo -e "${YELLOW}Serving frontend...${NC}"
    (cd "$FRONTEND_DIR" && npm run serve) &
    PIDS+=($!)
    check_service "Frontend" 8080

    # Setup monitoring without flooding console
    echo -e "${YELLOW}Setting up monitoring...${NC}"
    (docker-compose exec valkey-cluster valkey-cli -p 7000 cluster info > /tmp/valkey-cluster.status 2>/dev/null &) &

    # Start backend via docker-compose
    echo -e "${YELLOW}Starting backend service...${NC}"
    (cd "$BACKEND_DIR" && npm run "$START_SCRIPT") &
    check_service "Backend" 3000
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
- Python Executor: running in container
- Node Executor: running in container

Commands:
- View cluster status: cat /tmp/valkey-cluster.status
- View container status: docker ps
- View logs: docker-compose logs -f [service]

Press Ctrl+C to stop all services
"

# Keep script running and show aggregated logs
docker-compose logs -f valkey-standalone valkey-cluster &
wait
