FROM node:latest

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
    CMD nc -z localhost 3000 || exit 1

EXPOSE 3000
CMD ["sh", "-c", "npm run $START_SCRIPT"]
