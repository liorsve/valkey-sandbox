import { WebSocketServer } from 'ws';
import executeCode from './utils/dockerExecutor.js';
import { GlideClusterClient, InfBoundary } from '@valkey/valkey-glide';

// Global variables and constants

/**
 * A client instance for interacting with Valkey Cluster.
 * @type {GlideClusterClient}
 */
let client;
/**
 * A client instance for interacting with Valkey Cluster.
 * @type {GlideClusterClient}
 */
let glideClient;
const lockKey = 'task-lock';
const queueKey = 'task-queue';
const LOGGING_ENABLED = process.env.LOGGING_ENABLED === 'true';

/**
 * Initialize the Glide client for websocket connections.
 */
async function initializeClient() {
  if (!client) {
    const host = process.env.VALKEY_CLUSTER_HOST || 'localhost';
    const port = process.env.VALKEY_CLUSTER_PORT || 7000;
    client = await GlideClusterClient.createClient({
      addresses: [{ host, port: parseInt(port) }],
      clientName: 'in-action-client',
    });
  }
}

/**
 * Initialize the leaderboard with player data.
 */
async function initializeLeaderboard() {
  const host = process.env.VALKEY_CLUSTER_HOST || 'localhost';
  const port = process.env.VALKEY_CLUSTER_PORT || 7000;
  glideClient = await GlideClusterClient.createClient({
    addresses: [{ host, port: parseInt(port) }],
    clientName: 'leaderboard-client',
  });
  await glideClient.flushall();
  console.log('[Valkey] Cluster flushed.');

  const players = [
    { id: 1, name: 'Superman', score: 0 },
    { id: 2, name: 'Batman', score: 0 },
    { id: 3, name: 'Wonder Woman', score: 0 },
    { id: 4, name: 'Flash', score: 0 },
    { id: 5, name: 'Green Lantern', score: 0 },
    { id: 6, name: 'Aquaman', score: 0 },
  ];

  // Convert players to zadd format
  const leaderboardData = players.map(player => ({
    element: `player:${player.id}`,
    score: player.score
  }));
  
  await glideClient.zadd('leaderboard', leaderboardData);
  
  for (const player of players) {
    await glideClient.set(`player:${player.id}`, JSON.stringify(player));
    console.log(`[Valkey] Initialized player ${player.name} with score ${player.score}.`);
  }
  return players;
}

/**
 * Get the current leaderboard data.
 * @returns {Promise<Array>} The array of player data.
 */
async function getLeaderboard() {
  const response = await glideClient.zrangeWithScores('leaderboard', {
    start: InfBoundary.PositiveInfinity,
    end:  InfBoundary.NegativeInfinity,
    type: "byScore"
  }, { reverse: true });

  const players = [];
  for (const { element: playerId, score } of response) {
    const playerDataStr = await glideClient.get(playerId);
    const data = JSON.parse(playerDataStr);
    players.push({
      rank: players.length + 1,
      playerId: data.id,
      score,
      ...data,
    });
  }
  return players;
}

/**
 * Retrieve original player data by player ID.
 * @param {number} playerId - The player's ID.
 * @returns {Object|null} The original player data or null if not found.
 */
function getOriginalPlayerData(playerId) {
  const originalPlayers = [
    { id: 1, name: 'Superman', photo: 'path/to/superman.jpg' },
    { id: 2, name: 'Batman', photo: 'path/to/batman.jpg' },
    { id: 3, name: 'Wonder Woman', photo: 'path/to/wonder_woman.jpg' },
    { id: 4, name: 'Flash', photo: 'path/to/flash.jpg' },
    { id: 5, name: 'Green Lantern', photo: 'path/to/green_lantern.jpg' },
    { id: 6, name: 'Aquaman', photo: 'path/to/aquaman.jpg' },
  ];
  return originalPlayers.find(player => player.id === playerId);
}

/**
 * Handle updating the player's score and data.
 * @param {Object} ws - The websocket connection.
 * @param {Object} data - The data containing playerId and change.
 */
async function handleUpdateScore(ws, data) {
  const { playerId, change } = data;
  const updatedScore = await glideClient.zincrby('leaderboard', change, `player:${playerId}`);
  const playerDataStr = await glideClient.get(`player:${playerId}`);
  const playerData = JSON.parse(playerDataStr);
  if (playerData) {
    playerData.score = parseFloat(updatedScore);
    if (!playerData.name || !playerData.photo) {
      const originalPlayer = getOriginalPlayerData(playerId);
      if (originalPlayer) {
        playerData.name = originalPlayer.name;
        playerData.photo = originalPlayer.photo;
      } else {
        console.error(`[WSS] Original player data not found for ${playerId}`);
      }
    }
    await glideClient.set(`player:${playerId}`, JSON.stringify(playerData));
  } else {
    console.error(`[WSS] Player data not found for ${playerId}`);
  }
  const updatedPlayers = await getLeaderboard();
  ws.send(JSON.stringify({
    action: 'updateLeaderboard',
    data: { players: updatedPlayers },
  }));
}

/**
 * Check for lock and manage tasks.
 * @param {Object} ws - The websocket connection.
 */
async function checkLock(ws) {
  try {
    const lockValue = await client.get(lockKey);
    const lockExists = lockValue === 'locked';
    console.log('[WSS] Lock check:', { exists: lockExists, value: lockValue });

    if (!lockExists) {
      const tasks = await client.lrange(queueKey, 0, -1);
      console.log('[WSS] Current tasks in queue:', tasks);

      if (tasks.length > 0) {
        const taskJson = await client.lpop(queueKey);
        const task = JSON.parse(taskJson);
        console.log('[WSS] Processing task:', task);

        const lockSet = await client.set(lockKey, 'locked', {
          conditionalSet: 'onlyIfDoesNotExist',
          expiry: { type: 'EX', count: 30 },
        });

        if (lockSet) {
          ws.send(
            JSON.stringify({
              action: 'lockStatus',
              data: { locked: true },
            })
          );

          ws.send(
            JSON.stringify({
              action: 'taskUpdate',
              data: {
                status: `Processing task: ${task.action} (${task.index + 1}/${task.total})`,
                action: task.action,
              },
            })
          );
        } else {
          await client.lpush(queueKey, taskJson);
        }
      } else {
        console.log('[WSS] Queue empty, completing process');
        ws.send(
          JSON.stringify({
            action: 'processCompleted',
            data: 'All tasks completed.',
          })
        );
        clearInterval(ws.taskManagerInterval);
        await client.del([lockKey]);
        client.close();
        client = null;
      }
    }
  } catch (error) {
    console.error('[WSS] Lock check error:', {
      error: error.message,
      stack: error.stack,
    });
  }
}

/**
 * Cancel the current process and clean up resources.
 * @param {Object} ws - The websocket connection.
 */
async function cancelProcess(ws) {
  console.log('[WSS] Canceling process, cleaning up resources');
  clearInterval(ws.taskManagerInterval);
  if (client) {
    try {
      await client.del(lockKey);
      await client.del(queueKey);
      console.log('[WSS] Resources cleaned up successfully');
    } catch (error) {
      console.error('[WSS] Error during cleanup:', error);
    } finally {
      if (client) {
        client.close();
      }
      client = null;
    }
  }
  ws.send(
    JSON.stringify({
      action: 'taskManagerCancelled',
      data: 'Task Manager has been cancelled.',
    })
  );
}

/**
 * Broadcast data to all connected clients.
 * @param {Object} data - The data to broadcast.
 */
export function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

/**
 * Setup the WebSocket server.
 * @param {Object} server - The HTTP server instance.
 * @returns {WebSocketServer} The WebSocket server.
 */
export function setupWebSocket(server) {
  const wss = new WebSocketServer({
    server,
    path: '/appws',
    perMessageDeflate: false,
    clientTracking: true,
    handleProtocols: () => true,
    setKeepAlive: true,
  });

  console.log('[WSS] WebSocket server initialized');

  wss.on('error', (error) => {
    console.error('[WSS] Server error:', error);
  });

  wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log(`[WSS] Client connected from ${clientIp}`);

    ws._socket.setKeepAlive(true, 30000);
    ws._socket.setTimeout(30000);

    ws.isAlive = true;
    ws.on('pong', () => (ws.isAlive = true));

    ws.on('error', (error) => {
      if (error.code !== 'EPIPE') {
        console.error(`[WS] Client error (${clientIp}):`, error.message);
      }
    });

    ws.on('message', async (message) => {
      try {
        const { action, data } = JSON.parse(message);
        if (LOGGING_ENABLED) {
          console.log(`Received action: ${action}`);
        }
        console.log(`[WSS] Received action: ${action}`, data);

        switch (action) {
          case 'runCode':
            executeCode(data.language, data.code, data.mode || 'standalone', (output) => {
              if (ws.readyState === ws.OPEN) {
                ws.send(
                  JSON.stringify({
                    action: 'output',
                    data: output,
                  })
                );
              }
            });
            break;
          case 'setTasks':
            console.log('[WSS] Setting tasks:', data);
            await initializeClient();
            await client.del([queueKey, lockKey]);
            const totalTasks = data.length;
            for (let i = 0; i < data.length; i++) {
              await client.rpush(queueKey, JSON.stringify({
                action: data[i].action,
                index: i,
                total: totalTasks,
              }));
            }
            console.log('[WSS] Tasks and lock cleared, new tasks set successfully');
            ws.send(
              JSON.stringify({
                action: 'queueStatus',
                data: data.map(t => t.action),
              })
            );
            break;
          case 'taskCompleted':
            console.log('[WSS] Task completed, releasing lock');
            await client.del([lockKey]);
            ws.send(
              JSON.stringify({
                action: 'lockStatus',
                data: { locked: false },
              })
            );
            break;
          case 'startTasks':
            checkLock(ws);
            break;
          case 'invokeTaskManager':
            console.log('[WSS] Task manager invoked');
            ws.taskManagerInterval = setInterval(() => checkLock(ws), 500);
            break;
          case 'cancelTaskManager':
            console.log('[WSS] Canceling task manager');
            await cancelProcess(ws);
            break;
          case 'startGame':
            await initializeLeaderboard();
            const players = await getLeaderboard();
            ws.send(
              JSON.stringify({
                action: 'updateLeaderboard',
                data: { players },
              })
            );
            break;
          case 'updateScore':
            await handleUpdateScore(ws, data);
            break;
        }
      } catch (error) {
        console.error('[WSS] Message handling error:', {
          error: error.message,
          stack: error.stack,
          action: message?.action,
          data: message?.data,
        });
        if (ws.readyState === ws.OPEN) {
          ws.send(
            JSON.stringify({
              action: 'error',
              data: error.message,
            })
          );
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
