import { WebSocketServer } from 'ws';
import executeCode from './utils/dockerExecutor.js';
import { GlideClusterClient } from '@valkey/valkey-glide';

let client;
// Initialize Valkey client
(async () => {
    client = await GlideClusterClient.createClient({
        addresses: [{ host: process.env.VALKEY_CLUSTER_HOST || 'localhost', port: process.env.VALKEY_CLUSTER_PORT || 7000 }],
    });
})();

const lockKey = 'task-lock';
const queueKey = 'task-queue';

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ 
    server,
    path: '/appws',
    perMessageDeflate: false,
    clientTracking: true,
    handleProtocols: () => true,
    setKeepAlive: true,
  });

  // Handle server-level errors
  wss.on('error', (error) => {
    console.error('[WSS] Server error:', error);
  });

  wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log(`Client connected from ${clientIp}`);

    // Set socket options
    ws._socket.setKeepAlive(true, 30000);
    ws._socket.setTimeout(30000);

    // Handle socket errors
    ws.on('error', (error) => {
      if (error.code !== 'EPIPE') {
        console.error(`[WS] Client error (${clientIp}):`, error.message);
      }
    });

    // Handle incoming messages
    ws.on('message', async (message) => {
      try {
        const { action, data } = JSON.parse(message);
        
        switch (action) {
          case 'runCode':
            // Execute code in docker container
            executeCode(data.language, data.code, data.mode || 'standalone', (output) => {
              if (ws.readyState === ws.OPEN) {
                ws.send(JSON.stringify({
                  action: 'output',
                  data: output
                }));
              }
            });
            break;
          case 'setTasks':
            // Set tasks in Valkey queue
            await client.del(queueKey);
            await client.rpush(queueKey, data);
            ws.send(JSON.stringify({ action: 'queueStatus', data: data.join(', ') }));
            break;
          case 'startTasks':
            checkLock(ws);
            break;
        }
      } catch (error) {
        console.error('[WS] Message handling error:', error);
        if (ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({
            action: 'error',
            data: error.message
          }));
        }
      }
    });

    ws.on('close', () => {
      console.log(`[WS] Client disconnected (${clientIp})`);
    });

    ws.on('error', (error) => {
      console.error(`Client ${clientIp} error:`, error);
    });

    // Handle socket errors
    ws.on('error', (error) => {
      console.error(`WebSocket error: ${error.message}`);
    });
  });

  return wss;
}

async function checkLock(ws) {
  try {
    const lockExists = await client.exists(lockKey);
    if (!lockExists) {
      const task = await client.lpop(queueKey);
      if (task) {
        await client.set(lockKey, 'locked', { NX: true, EX: 10 });
        ws.send(JSON.stringify({ action: 'taskUpdate', data: { status: 'started', action: task } }));
      } else {
        ws.send(JSON.stringify({ action: 'queueStatus', data: 'All tasks completed.' }));
        return;
      }
    }
  } catch (error) {
    console.error('Error in checkLock:', error);
  } finally {
    setTimeout(() => checkLock(ws), 500);
  }
}

export function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}
