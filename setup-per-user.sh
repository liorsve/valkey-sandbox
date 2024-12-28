#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

USER_ID="$1"
if [ -z "$USER_ID" ]; then
  echo -e "${RED}Usage: $0 <USER_ID>${NC}"
  exit 1
fi

# Function to check if container already exists
check_existing_container() {
    if docker ps -a --format '{{.Names}}' | grep -Eq "^valkey-runner-${USER_ID}$"; then
        echo -e "${YELLOW}Container valkey-runner-${USER_ID} already exists.${NC}"
        exit 1
    fi
}

# Function to spawn a new user container
spawn_user_container() {
    echo -e "${GREEN}📦 Spawning container for user ${USER_ID}...${NC}"
    
    docker run -d --name "valkey-runner-${USER_ID}" \
        --network valkey-net \
        -e USER_ID="${USER_ID}" \
        valkey-node:latest bash -c "while true; do sleep 3600; done"
    
    echo -e "${GREEN}✅ Container valkey-runner-${USER_ID} is up.${NC}"
    echo -e "🔍 Inspect with: docker exec -it valkey-runner-${USER_ID} bash"
}

# Main execution
check_existing_container
spawn_user_container
