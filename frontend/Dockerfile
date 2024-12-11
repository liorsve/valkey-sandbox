# frontend/Dockerfile
FROM node:20.10.0-alpine3.19 AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache wget python3 make g++

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:20.10.0-alpine3.19

WORKDIR /app

# Install serve
RUN npm install -g serve@latest

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Add healthcheck
HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080 || exit 1

EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
