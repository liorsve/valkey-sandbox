import express from 'express';
import http from 'http';
import cors from 'cors';
import executionRouter from './routes/execution.js';
import updateScoreRouter from './routes/updateScore.js';
import executeTasksRouter from './routes/executeTasks.js';
import { setupWebSocket } from './websockets.js';

const app = express();

// Server options
const serverOptions = {
  headersTimeout: 60000,
  keepAliveTimeout: 30000
};

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:8080', 'ws://localhost:8080', 'http://localhost:8081', 'ws://localhost:8081'],
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Content-Type-Options', 'X-Requested-With', 'X-XSRF-TOKEN']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/execute', executionRouter);
app.use('/update-score', updateScoreRouter);
app.use('/execute-tasks', executeTasksRouter);

const server = http.createServer(serverOptions, app);

const wss = setupWebSocket(server);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Ensure only one listener is active
server.listen(PORT, HOST, () => {
  console.log(`Backend server running on ${HOST}:${PORT}`);
});

// Error handling
server.on('error', (error) => {
  console.error('Server error:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
    process.exit(1);
  }
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
