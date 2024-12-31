FROM node:20-slim

WORKDIR /usr/src/app

# Install Python and essential build tools
RUN apt-get update && apt-get install -y \
    python3.11 \
    python3-pip \
    python3-venv \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create and set permissions for directories
RUN mkdir -p /environments/node /environments/python /app/temp && \
    chmod -R 777 /environments /app/temp

# Copy and setup package.json for both service and execution environment
COPY package.json ./
COPY package.json /environments/node/
RUN cd /environments/node && \
    npm install --legacy-peer-deps && \
    chmod -R 777 node_modules && \
    npm link @valkey/valkey-glide iovalkey && \
    cd /usr/src/app && \
    npm install

# Setup Python environment
WORKDIR /environments/python
COPY ./requirements.txt ./
RUN python3 -m venv venv && \
    . venv/bin/activate && \
    pip install --no-cache-dir -r requirements.txt && \
    chmod -R 777 venv

# Create symbolic links and ensure permissions
RUN mkdir -p /tmp/executions && \
    chmod -R 777 /tmp/executions && \
    ln -sf /environments/node/node_modules /tmp/executions/node_modules && \
    ln -sf /environments/node/package.json /tmp/executions/package.json && \
    ln -sf /usr/bin/python3 /usr/local/bin/python3

# Copy source code
WORKDIR /usr/src/app
COPY ./src ./src/

EXPOSE 3001

# Setup environment variables
ENV NODE_PATH=/environments/node/node_modules \
    PYTHONPATH=/environments/python/venv/lib/python3.11/site-packages \
    PATH="/environments/python/venv/bin:/usr/local/bin:/usr/bin:${PATH}" \
    PYTHONUNBUFFERED=1

HEALTHCHECK --interval=5s --timeout=3s --retries=3 \
    CMD curl -f http://localhost:3001/health || exit 1

CMD ["npm", "run", "start"]
