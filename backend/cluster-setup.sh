#!/usr/bin/env bash
set -e

# Optional system settings (ignore if permission denied)
echo never > /sys/kernel/mm/transparent_hugepage/enabled 2>/dev/null || true
echo 1 > /proc/sys/vm/overcommit_memory 2>/dev/null || true

# Clean up any existing data
echo "Cleaning up data directories..."
rm -rf /data/*

# Wait for system to be ready
echo "Waiting for system to initialize..."
sleep 5

echo "Creating Valkey nodes..."
# Create individual Valkey nodes
for port in $(seq 7000 7005); do
  mkdir -p /data/${port}
  cat > /data/${port}/valkey.conf <<EOF
port ${port}
cluster-enabled yes
cluster-config-file /data/${port}/nodes.conf
cluster-node-timeout 5000
appendonly yes
dir /data/${port}
bind 0.0.0.0
protected-mode no
EOF

  echo "Starting Valkey node on port ${port}..."
  valkey-server /data/${port}/valkey.conf &
done

echo "Waiting for nodes to start..."
sleep 10

echo "Initializing cluster..."
# Initialize cluster nodes using the local Docker image
yes "yes" | valkey-cli --cluster create \
    127.0.0.1:7000 127.0.0.1:7001 127.0.0.1:7002 \
    127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \
    --cluster-replicas 1

echo "Cluster initialization complete"

# Keep container running and log cluster info
while true; do
  echo "Cluster Status at $(date):"
  valkey-cli -p 7000 cluster info || echo "Failed to get cluster info"
  sleep 60
done
