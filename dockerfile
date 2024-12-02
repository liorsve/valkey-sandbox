FROM node:20

# Set up the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies (this will happen when the container runs)
RUN set -x && echo "Installing dependencies..." && npm install

# Copy the rest of the project files
COPY . .

# Make sure the project files are copied successfully
RUN echo "Project files copied successfully."

# Ensure the npm package @valkey/valkey-glide is installed when the container runs
RUN npm install @valkey/valkey-glide ws

# Install Redis server
RUN apt-get update && apt-get install -y redis-server

# Expose the Redis port
EXPOSE 6379

# Start Redis server in the background and then run the node app
CMD redis-server --daemonize yes && node