#!/bin/bash
set -e

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

# Function to check dependencies
check_dependencies() {
    echo -e "${YELLOW}Checking dependencies...${NC}"
    command -v docker >/dev/null 2>&1 || { echo "Docker required"; exit 1; }
    command -v docker-compose >/dev/null 2>&1 || { echo "Docker Compose required"; exit 1; }
    command -v node >/dev/null 2>&1 || { echo "Node.js required"; exit 1; }
    command -v npm >/dev/null 2>&1 || { echo "npm required"; exit 1; }
}

# Function to check service health
check_service() {
    local service=$1
    local port=$2
    local attempts=30
    local i=1
    
    while ! nc -z localhost $port; do
        if [ $i -eq $attempts ]; then
            echo -e "${RED}❌ ${service} failed to start on port ${port}${NC}"
            docker-compose logs ${service}
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
    # Send SIGTERM to allow graceful shutdown
    kill -TERM $(jobs -p) 2>/dev/null || true
    # Wait briefly for cleanup
    sleep 2
    # Force kill if still running
    kill -9 $(jobs -p) 2>/dev/null || true
    exit 0
}

# Setup services
setup_services() {
    # Create Docker network if doesn't exist
    docker network create ${VALKEY_NETWORK} 2>/dev/null || true
    
    # Build executor images first
    echo -e "${YELLOW}Building executor images...${NC}"
    docker-compose build python-executor valkey-node
    
    # Start executor services
    echo -e "${YELLOW}Starting executor services...${NC}"
    docker-compose up -d python-executor valkey-node
    
    # Verify executor services
    if ! docker ps | grep -q python-executor; then
        echo -e "${RED}❌ Python executor failed to start${NC}"
        docker-compose logs python-executor
        exit 1
    fi
    check_service "Python Executor" 3002
    
    if ! docker ps | grep -q valkey-node; then
        echo -e "${RED}❌ Node executor failed to start${NC}"
        docker-compose logs valkey-node
        exit 1
    fi
    check_service "Node Executor" 3001
    
    echo -e "${GREEN}✅ Executor services are ready${NC}"
    
    # Start Valkey services if not running
    if ! docker ps | grep -q valkey-standalone; then
        echo -e "${YELLOW}Starting Valkey standalone...${NC}"
        docker-compose up -d valkey-standalone
        check_service "Valkey Standalone" 6379
    fi
    
    if ! docker ps | grep -q valkey-cluster; then
        echo -e "${YELLOW}Starting Valkey cluster...${NC}"
        docker-compose up -d valkey-cluster
        check_service "Valkey Cluster" 7000
    fi
    
    # Install dependencies
    echo -e "${YELLOW}Installing dependencies...${NC}"
    (cd "$FRONTEND_DIR" && npm install)
    (cd "$BACKEND_DIR" && npm install)
    
    # Start backend with hot reload
    echo -e "${YELLOW}Starting backend...${NC}"
    (cd "$BACKEND_DIR" && node server.js) &
    check_service "Backend" 3000
    
    # Start frontend with hot reload
    echo -e "${YELLOW}Starting frontend...${NC}"
    (cd "$FRONTEND_DIR" && npm run serve) &
    check_service "Frontend" 8080
    
    # Setup monitoring without flooding console
    echo -e "${YELLOW}Setting up monitoring...${NC}"
    (docker-compose exec valkey-cluster valkey-cli -p 7000 cluster info > /tmp/valkey-cluster.status 2>/dev/null &) &
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
