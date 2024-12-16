import express from 'express';
import expressWs from 'express-ws';
import http from 'http';
import cors from 'cors';
import executionRouter from './routes/execution.js';
import executeTasksRouter from './routes/executeTasks.js';
import executeCode from './utils/dockerExecutor.js';
import { GlideClusterClient, GlideClient } from '@valkey/valkey-glide';

const app = express();
const server = http.createServer(app);

const wsInstance = expressWs(app, server);
const wss = wsInstance.getWss();

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

// Valkey client functions
async function getStandaloneClient() {
  return await GlideClient.createClient({
    addresses: [{ host: 'localhost', port: 6379 }]
  });
}

async function getClusterClient() {
  return await GlideClusterClient.createClient({
    addresses: [{ host: 'localhost', port: 7000 }]
  });
}

// WebSocket connection handler
app.ws('/appws', function(ws, req) {
  console.log('WebSocket connection established');

  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });

  ws.on('message', async function(msg) {
    try {
      const data = JSON.parse(msg);
      
      if (data.action === 'ping') {
        ws.send(JSON.stringify({ action: 'pong' }));
        return;
      }
      
      if (data.action === 'flushServers') {
        const mode = data.data.mode;
        try {
          if (mode === 'standalone') {
            const client = await getStandaloneClient();
            await client.flushall();
            client.close();
          } else if (mode === 'cluster') {
            const client = await getClusterClient();
            await client.flushall();
            client.close();
          }
          ws.send(JSON.stringify({ 
            action: 'systemMessage', 
            data: 'Servers flushed successfully\n' 
          }));
        } catch (error) {
          ws.send(JSON.stringify({ 
            action: 'systemMessage', 
            data: `Error flushing servers: ${error.message}\n` 
          }));
        }
        return;
      }
      
      if (data.action === 'runCode') {
        const { language, code, mode } = data.data;
        try {
          executeCode(language, code, mode, (output) => {
            ws.send(JSON.stringify({ 
              action: 'output', 
              data: output 
            }));
          });
        } catch (error) {
          ws.send(JSON.stringify({ 
            action: 'output', 
            data: `Error executing code: ${error.message}\n` 
          }));
        }
      }
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
      ws.send(JSON.stringify({ 
        action: 'systemMessage', 
        data: `Error: ${error.message}\n` 
      }));
    }
  });

});

// Keep-alive mechanism
const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();
    
    ws.isAlive = false;
    ws.ping(() => {});
  });
}, 30000);

// Clean up on server close
server.on('close', function close() {
  clearInterval(interval);
});

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
