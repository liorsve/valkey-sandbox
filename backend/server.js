import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import executionRouter from './routes/execution.js';
import { setupWebSocket } from './websockets.js';

dotenv.config();

const app = express();
const isDevelopment = process.env.NODE_ENV !== 'production';

// Server options
const serverOptions = {
  headersTimeout: 60000,
  keepAliveTimeout: 30000
};

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:8080', 'ws://localhost:8080'],
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/execute', executionRouter);

// Create server first
const server = http.createServer(serverOptions, app);

// Then setup WebSocket after server creation
const wss = setupWebSocket(server);

const PORT = process.env.PORT || 3000;
const HOST = isDevelopment ? '0.0.0.0' : '0.0.0.0';

// Error handling
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Backend server running on ${HOST}:${PORT}`);
  console.log(`Development mode: ${isDevelopment}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down...');
  wss.close(() => {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});
