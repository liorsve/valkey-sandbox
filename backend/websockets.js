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

// Player data structure in Valkey
const PLAYER_PREFIX = 'player:';
const LEADERBOARD_KEY = 'leaderboard';

/**
 * Initialize the Glide client for websocket connections.
 */
async function initializeClient() {
  if (!client) {
    client = await createTaskActionClient();
  }
}

/**
 * Initialize the Glide client for the leaderboard.
 */
async function initializeGlideClient() {
  if (!glideClient) {
    const host = process.env.VALKEY_CLUSTER_HOST || 'localhost';
    const port = process.env.VALKEY_CLUSTER_PORT || 7000;
    glideClient = await GlideClusterClient.createClient({
      addresses: [{ host, port: parseInt(port) }],
      clientName: 'leaderboard-client',
    });
  }
}

/**
 * Initialize the leaderboard with player data and track cluster operations.
 */
async function initializeLeaderboard() {
  const players = [
    { id: 1, name: 'Superman', score: 0, photo: '/images/superman.jpg' },
    { id: 2, name: 'Batman', score: 0, photo: '/images/batman.jpg' },
    { id: 3, name: 'Wonder Woman', score: 0, photo: '/images/wonder_woman.jpg' },
    { id: 4, name: 'Flash', score: 0, photo: '/images/flash.jpg' },
    { id: 5, name: 'Green Lantern', score: 0, photo: '/images/green_lantern.jpg' },
    { id: 6, name: 'Aquaman', score: 0, photo: '/images/aquaman.jpg' },
  ];

  // Initialize Valkey client
  await initializeGlideClient();

  // Clear existing data
  await glideClient.flushall();

  // Initialize each player
  for (const player of players) {
    const playerKey = `${PLAYER_PREFIX}${player.id}`;
    // Store complete player data
    await glideClient.hset(playerKey, player);
    // Add to sorted set for ranking
    await glideClient.zadd(LEADERBOARD_KEY, [{ 
      element: playerKey, 
      score: player.score 
    }]);
  }

  // Return initial state
  return getLeaderboardState();
}

/**
 * Get the current leaderboard data with cluster operations.
 */
async function getLeaderboardState() {
  try {
    // Get sorted player keys and scores
    const sortedPlayers = await glideClient.zrangeWithScores(LEADERBOARD_KEY, {
      start: InfBoundary.PositiveInfinity,
      end: InfBoundary.NegativeInfinity,
      type: "byScore"
    }, { reverse: true });

    console.log('Sorted players from Valkey:', sortedPlayers);

    // Get full player data
    const players = await Promise.all(
      sortedPlayers.map(async ({ element, score }) => {
        // Extract player ID from key (player:N)
        const playerId = parseInt(element.split(':')[1]);
        const playerKey = `${PLAYER_PREFIX}${playerId}`;
        const playerData = await glideClient.hgetall(playerKey);

        if (!playerData) {
          console.error(`No data found for player key: ${playerKey}`);
          return null;
        }

        return {
          id: playerId,
          name: playerData.name,
          photo: playerData.photo,
          score: parseInt(score)
        };
      })
    );

    const validPlayers = players.filter(Boolean);
    console.log('Processed player data:', validPlayers);
    return validPlayers;
  } catch (error) {
    console.error('Error getting leaderboard state:', error);
    return [];
  }
}

/**
 * Handle updating the player's score with operation tracking.
 * @param {Object} ws - The websocket connection.
 * @param {Object} data - The data containing playerId and change.
 */
async function handleUpdateScore(ws, data) {
  const { playerId, change } = data;
  const playerKey = `${PLAYER_PREFIX}${playerId}`;

  try {
    // Get current player data
    const playerData = await glideClient.hgetall(playerKey);
    if (!playerData) {
      throw new Error(`Player not found: ${playerKey}`);
    }

    // Prepare operations log
    const operations = [];
    
    // Update score in sorted set
    operations.push(`Updating ${playerData.name}'s score by ${change > 0 ? '+' : ''}${change}`);
    const newScore = await glideClient.zincrby(LEADERBOARD_KEY, change, playerKey);
    
    // Update player hash
    operations.push(`Setting new score: ${newScore}`);
    await glideClient.hset(playerKey, { 
      ...playerData,
      score: newScore.toString()
    });

    // Get updated rankings
    operations.push('Retrieving updated leaderboard');
    const updatedPlayers = await getLeaderboardState();
    
    // Send update to client with operations log
    ws.send(JSON.stringify({
      action: 'leaderboardUpdate',
      data: updatedPlayers,
      operations: operations
    }));

  } catch (error) {
    console.error('[WSS] Score update error:', error);
    ws.send(JSON.stringify({
      action: 'error',
      message: 'Failed to update score'
    }));
  }
}

/**
 * Check for lock and manage tasks.
 * @param {Object} ws - The websocket connection.
 */
async function checkLock(ws) {
  try {
    if (!client) {
      console.error('[WSS] Client not initialized in checkLock');
      return;
    }

    // First, check if lock has expired
    const lockValue = await client.get(lockKey);
    const lockExists = lockValue === 'locked';
    console.log('[WSS] Lock check:', { exists: lockExists, value: lockValue });

    if (!lockExists) {
      const tasks = await client.lrange(queueKey, 0, -1);
      console.log('[WSS] Current tasks in queue:', tasks);

      if (tasks.length > 0) {
        const taskJson = await client.lpop(queueKey);
        if (!taskJson) return; // Guard against race conditions

        const task = JSON.parse(taskJson);
        console.log('[WSS] Processing task:', task);

        // Set lock with 30 second expiry
        const lockSet = await client.set(lockKey, 'locked', {
          conditionalSet: 'onlyIfDoesNotExist',
          expiry: { type: 'EX', count: 30 },
        });

        if (lockSet) {
          // Clear any existing timeout
          if (ws.lockTimeout) {
            clearTimeout(ws.lockTimeout);
          }

          // Send lock acquisition notification
          ws.send(JSON.stringify({
            action: 'gameCommand',
            data: {
              type: 'lockAcquired',
              message: 'Lock acquired for task processing'
            }
          }));

          // Send task to frontend
          ws.send(JSON.stringify({
            action: 'gameCommand',
            data: {
              type: 'performTask',
              task: task.action,
              step: `${task.index + 1}/${task.total}`
            }
          }));

          // Store the timeout reference in the ws object
          ws.lockTimeout = setTimeout(async () => {
            if (client) {
              const currentLock = await client.get(lockKey);
              if (currentLock === 'locked') {
                await client.del(lockKey);
                console.log('[WSS] Auto-released lock due to no response');
              }
            }
          }, 50000);

        } else {
          // If we couldn't get the lock, put the task back
          await client.rpush(queueKey, taskJson);
        }
      } else {
        console.log('[WSS] Queue empty, completing process');
        // Clear the timeout before cleanup
        if (ws.lockTimeout) {
          clearTimeout(ws.lockTimeout);
          ws.lockTimeout = null;
        }
        
        ws.send(JSON.stringify({
          action: 'gameCommand',
          data: {
            type: 'complete',
            message: 'All tasks completed'
          }
        }));

        clearInterval(ws.taskManagerInterval);
        await client.del([lockKey]);
        
        if (client) {
          client.close();
          client = null;
        }
      }
    }
  } catch (error) {
    console.error('[WSS] Lock check error:', error);
    if (ws.lockTimeout) {
      clearTimeout(ws.lockTimeout);
      ws.lockTimeout = null;
    }
  }
}

/**
 * Cancel the current process and clean up resources.
 * @param {Object} ws - The websocket connection.
 */
async function cancelProcess(ws) {
  console.log('[WSS] Canceling process, cleaning up resources');
  clearInterval(ws.taskManagerInterval);
  
  if (ws.lockTimeout) {
    clearTimeout(ws.lockTimeout);
    ws.lockTimeout = null;
  }

  if (client) {
    try {
      // Create a new cleanup client for task cancellation
      const cleanupClient = await createCleanupClient('cluster');
      
      // Attempt cleanup operations
      const cleanupOps = [];
      
      if (await cleanupClient.exists(lockKey)) {
        cleanupOps.push(cleanupClient.del(lockKey));
      }
      
      if (await cleanupClient.exists(queueKey)) {
        cleanupOps.push(cleanupClient.del(queueKey));
      }

      // Execute all cleanup operations
      await Promise.allSettled(cleanupOps);
      cleanupClient.close();
      
      console.log('[WSS] Resources cleaned up successfully');
    } catch (error) {
      console.error('[WSS] Error during cleanup:', error);
    } finally {
      if (client && !client.closed) {
        await client.close();
      }
      client = null;
    }
  }

  // Notify client of cancellation
  if (ws.readyState === ws.OPEN) {
    ws.send(
      JSON.stringify({
        action: 'taskManagerCancelled',
        data: 'Task Manager has been cancelled.',
      })
    );
  }
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

  // Track active connections by component
  const connections = new Map();

  wss.on('error', (error) => {
    console.error('[WSS] Server error:', error);
  });

  wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log(`[WSS] Client connected from ${clientIp}`);

    ws.id = Date.now() + Math.random();
    console.log(`[WSS] New WebSocket connection: ${ws.id}`);

    ws.isAlive = true;
    ws.on('pong', () => (ws.isAlive = true));

    ws.on('error', (error) => {
      if (error.code !== 'EPIPE') {
        console.error(`[WS] Client error (${clientIp}):`, error.message);
      }
    });

    ws.on('message', async (message) => {
      try {
        const messageStr = message.toString();
        console.log(`[WSS] [${ws.id}] Received message: ${messageStr}`);
        const { action, data, component } = JSON.parse(messageStr);
        
        if (action === 'init') {
          if (component === 'playground' || component === 'commonUseCases') {
            console.log(`[WSS] [${ws.id}] Skipping client initialization for ${component}`);
            return;
          }
          if (component) {
            connections.set(component, ws);
            console.log(`[WSS] [${ws.id}] Registered ${component} component`);
          } else if (data) {
            console.log(`[WSS] [${ws.id}] Received initialization data:`, data);
          }
          return;
        }

        // Log all incoming messages
        console.log(`[WSS] [${ws.id}] Received action: ${action}`, data);

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
            console.log('[WSS] Handling setTasks action');
            if (!data || !Array.isArray(data)) {
              throw new Error('Invalid task data');
            }
            console.log('[WSS] Setting tasks:', data);
            await initializeClient();
            await client.del([queueKey, lockKey]);
            
            const totalTasks = data.length;
            for (let i = 0; i < data.length; i++) {
              await client.rpush(queueKey, JSON.stringify({
                ...data[i],
                index: i,
                total: totalTasks,
              }));
            }
            
            ws.send(JSON.stringify({
              action: 'queueStatus',
              data: data.map(t => t.action),
            }));
            break;
          case 'taskCompleted':
            console.log('[WSS] Task completed, releasing lock');
            await client.del([lockKey]);
            ws.send(JSON.stringify({
              action: 'gameCommand',
              data: {
                type: 'lockReleased',
                message: 'Lock released, ready for next task'
              }
            }));
            break;
          case 'startTasks':
            await handleStartTasks(ws);
            break;
          case 'invokeTaskManager':
            console.log('[WSS] Handling invokeTaskManager action');
            await initializeClient();
            console.log('[WSS] Client initialized');
            ws.taskManagerInterval = setInterval(() => checkLock(ws), 500);
            break;
          case 'cancelTaskManager':
            console.log('[WSS] Canceling task manager');
            await cancelProcess(ws);
            break;
          case 'startGame':
            const players = await initializeLeaderboard();
            ws.send(JSON.stringify({
              action: 'updateLeaderboard',
              data: players
            }));
            break;
          case 'updateScore':
            await handleUpdateScore(ws, data);
            break;
          case 'flushServers':
            console.log('[WSS] Flushing servers for mode:', data.mode);
            try {
              const cleanupClient = await createCleanupClient(data.mode);
              await cleanupClient.flushall();
              cleanupClient.close();
            } catch (error) {
              console.error('[WSS] Flush error:', error);
              ws.send(JSON.stringify({
                action: 'error',
                data: `Failed to flush servers: ${error.message}`
              }));
            }
            break;
          case 'gameCommand':
            break;
          default:
            console.log(`[WSS] Unhandled action: ${action}`);
        }
      } catch (error) {
        console.error(`[WSS] [${ws.id}] Message handling error:`, error);
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
      for (const [component, socket] of connections.entries()) {
        if (socket === ws) {
          connections.delete(component);
          console.log(`[WSS] [${ws.id}] ${component} disconnected`);
        }
      }
      console.log(`[WSS] [${ws.id}] Client disconnected (${clientIp})`);
      
      try {
        clearInterval(ws.taskManagerInterval);
        await cancelProcess(ws);
      } catch (error) {
        console.error('[WSS] Cleanup error on disconnect:', error);
      }
    });

    // Add specific handler for abrupt disconnections
    ws.on('error', async (error) => {
      if (error.code === 'ECONNRESET' || error.code === 'EPIPE') {
        console.log('[WSS] Client connection reset, cleaning up...');
        try {
          await cancelProcess(ws);
        } catch (cleanupError) {
          console.error('[WSS] Error during connection reset cleanup:', cleanupError);
        }
      } else {
        console.error(`[WSS] WebSocket error: ${error.message}`);
      }
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

/**
 * Handle the start of tasks from TaskManager.
 * @param {Object} ws - The WebSocket connection.
 */
async function handleStartTasks(ws) {
  try {
    await initializeClient();
    const clusterOperations = [];

    // Clear any existing tasks
    clusterOperations.push('DEL task-queue "Clearing existing tasks"');
    await client.del(queueKey);

    // Clear any existing locks
    clusterOperations.push('DEL task-lock "Clearing existing locks"');
    await client.del(lockKey);

    // Example task sequence
    const tasks = [
      { action: 'Flip Right', uniqueId: 'task1' },
      { action: 'Grow', uniqueId: 'task2' },
      { action: 'Change Random Color', uniqueId: 'task3' },
      { action: 'Flip Left', uniqueId: 'task4' },
      { action: 'Shrink', uniqueId: 'task5' }
    ];

    // Add tasks to queue
    for (const task of tasks) {
      const taskStr = JSON.stringify(task);
      clusterOperations.push(`RPUSH ${queueKey} "${taskStr}" "Adding task to queue"`);
      await client.rpush(queueKey, taskStr);
    }

    // Get queue length for verification
    const queueLength = await client.llen(queueKey);
    clusterOperations.push(`LLEN ${queueKey} "Verifying queue length: ${queueLength}"`);

    // Send initial status to client
    ws.send(JSON.stringify({
      action: 'taskUpdate',
      data: {
        status: `Task Manager initialized with ${queueLength} tasks`,
        clusterOperations
      }
    }));

    // Start processing tasks
    ws.taskManagerInterval = setInterval(() => checkLock(ws), 500);

  } catch (error) {
    console.error('[WSS] handleStartTasks error:', error);
    ws.send(JSON.stringify({
      action: 'error',
      data: 'Failed to start tasks: ' + error.message
    }));

    // Cleanup on error
    if (client) {
      await client.del([lockKey, queueKey]);
      client.close();
      client = null;
    }
  }
}

/**
 * Creates a temporary cleanup client for a specific mode
 * @param {string} mode - 'standalone' or 'cluster'
 * @returns {Promise<GlideClusterClient>}
 */
async function createCleanupClient(mode) {
    const host = process.env.VALKEY_CLUSTER_HOST || 'localhost';
    const port = mode === 'standalone' ? 6379 : 7000;
    
    const client = await GlideClusterClient.createClient({
        addresses: [{ host, port }],
        clientName: `cleanup-client-${Date.now()}`,
    });
    
    return client;
}

/**
 * Creates a task-in-action client for cluster operations
 * @returns {Promise<GlideClusterClient>}
 */
async function createTaskActionClient() {
    if (!client) {
        const host = process.env.VALKEY_CLUSTER_HOST || 'localhost';
        client = await GlideClusterClient.createClient({
            addresses: [{ host, port: 7000 }],
            clientName: `task-action-client-${Date.now()}`,
            clusterMode: true
        });
    }
    return client;
}

export default setupWebSocket;
