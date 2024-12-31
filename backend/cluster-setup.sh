#!/usr/bin/env bash
set -e

echo "Setting up cluster environment..."

# Skip system modifications as they're handled by Docker
if [ -z "$SKIP_SYSCTL" ]; then
    echo "Attempting system settings (warnings can be ignored)..."
    sysctl vm.overcommit_memory=1 2>/dev/null || true
else
    echo "Skipping system settings (handled by Docker)"
fi

echo "Cleaning up data directories..."
rm -rf /data/*

# Initialize nodes
init_nodes() {
    for port in $(seq 7000 7005); do
        mkdir -p /data/${port}
        cat > /data/${port}/valkey.conf <<EOF
port ${port}
cluster-enabled yes
cluster-config-file /data/${port}/nodes.conf
cluster-node-timeout 15000
appendonly yes
dir /data/${port}
bind 0.0.0.0
protected-mode no
cluster-announce-ip valkey-cluster
daemonize yes
EOF
        valkey-server /data/${port}/valkey.conf
        
        until valkey-cli -p ${port} ping 2>/dev/null; do
            echo "Waiting for node ${port} to start..."
            sleep 1
        done
    done
}

echo "Initializing nodes..."
init_nodes

echo "Waiting for nodes to stabilize..."
sleep 5

echo "Initializing cluster..."
yes "yes" | valkey-cli --cluster create \
    valkey-cluster:7000 valkey-cluster:7001 valkey-cluster:7002 \
    valkey-cluster:7003 valkey-cluster:7004 valkey-cluster:7005 \
    --cluster-replicas 1

echo "Cluster initialization complete"

# Monitor cluster status
while true; do
    echo "Cluster Status at $(date):"
    valkey-cli -p 7000 cluster info || echo "Failed to get cluster info"
    sleep 60
done
