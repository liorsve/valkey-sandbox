import express from 'express';
import http from 'http';
import cors from 'cors';
import { setupWebSocket } from './websockets.js';
import executionRouter from './routes/execution.js';
import executeTasksRouter from './routes/executeTasks.js';

const app = express();
const server = http.createServer(app);

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
app.use('/execute-tasks', executeTasksRouter);

// Initialize WebSocket server with our handlers
const wss = setupWebSocket(server);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

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

process.on('SIGTERM', () => {
  clearInterval(interval);
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
