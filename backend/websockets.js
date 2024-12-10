import { WebSocketServer } from 'ws';
import executeCode from './utils/dockerExecutor.js';
import { GlideClusterClient } from '@valkey/valkey-glide';

let client;

async function initializeClient() {
    if (!client) {
    const host = process.env.VALKEY_CLUSTER_HOST || 'localhost';
    const port = process.env.VALKEY_CLUSTER_PORT || 7000;
    client = await GlideClusterClient.createClient({
        addresses: [{ host, port: parseInt(port) }],
        clientName: 'in-action-client'
    });
    }
}

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

    ws.isAlive = true;
    ws.on('pong', () => (ws.isAlive = true));

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
            await initializeClient();
            await client.del(queueKey);
            await client.rpush(queueKey, data);
            ws.send(JSON.stringify({ action: 'queueStatus', data: data.join(', ') }));
            ws.send(JSON.stringify({ action: 'tasksSet', data: 'Tasks have been set in ValKey cluster.' }));
            break;
          case 'startTasks':
            checkLock(ws);
            break;
          case 'invokeTaskManager':
            ws.taskManagerInterval = setInterval(() => checkLock(ws), 500);
            break;
          case 'cancelTaskManager':
            await cancelProcess(ws);
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

    ws.on('close', async () => {
      console.log(`[WS] Client disconnected (${clientIp})`);
      clearInterval(ws.taskManagerInterval);
      await cancelProcess(ws);
    });

    ws.on('error', (error) => {
      console.error(`Client ${clientIp} error:`, error);
    });

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
      const tasks = await client.lrange(queueKey, 0, -1);
      if (tasks.length > 0) {
        ws.send(JSON.stringify({ action: 'queueStatus', data: tasks }));
        const task = await client.lpop(queueKey);
        await client.set(lockKey, 'locked', { EX: 10 });
        ws.send(JSON.stringify({ action: 'lockStatus', data: { locked: true } }));
        ws.send(JSON.stringify({ action: 'taskUpdate', data: { status: `Processing task: ${task}`, action: task } }));
      } else {
        ws.send(JSON.stringify({ action: 'processCompleted', data: 'All tasks completed.' }));
        clearInterval(ws.taskManagerInterval);
        await client.del(lockKey);
        await client.quit();
        client = null;
      }
    } else {
      ws.send(JSON.stringify({ action: 'lockStatus', data: { locked: false } }));
    }
  } catch (error) {
    console.error('Error in checkLock:', error);
  }
}

async function cancelProcess(ws) {
  clearInterval(ws.taskManagerInterval);
  if (client) {
    await client.del(lockKey);
    await client.del(queueKey);
    await client.close();
    client = null;
  }
  ws.send(JSON.stringify({ action: 'taskManagerCancelled', data: 'Task Manager has been cancelled.' }));
}

export function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}
