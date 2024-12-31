#!/bin/sh
set -e

# Add host entries if provided via environment
if [ ! -z "$VALKEY_STANDALONE_HOST" ]; then
    echo "$VALKEY_STANDALONE_HOST valkey-standalone" >> /etc/hosts
fi

if [ ! -z "$VALKEY_CLUSTER_HOST" ]; then
    echo "$VALKEY_CLUSTER_HOST valkey-cluster" >> /etc/hosts
fi

exec "$@"
