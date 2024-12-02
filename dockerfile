FROM node:14

# Install valkey-glide and ws
CMD ["npm", "i", "@valkey/valkey-glide"]

# Set up a directory for our application
WORKDIR /usr/src/app

# Copy your runner code

COPY runner.js .

CMD ["node", "runner.js"]