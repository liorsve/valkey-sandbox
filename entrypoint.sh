#!/bin/bash

# Start Redis server in the background
redis-server --daemonize yes &

# Wait for Redis to become a

# Start the Node.js application
exec node $1
