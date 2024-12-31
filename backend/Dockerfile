FROM node:lts-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y \
    netcat-openbsd \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir -p /app/temp \
    && chmod 777 /app/temp

# Copy package files first
COPY package*.json ./
RUN npm install --production

# Then copy rest of the code
COPY . .

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["sh", "-c", "npm run $START_SCRIPT"]
