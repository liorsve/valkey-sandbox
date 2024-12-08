import { WebSocketServer } from 'ws';
import executeCode from './utils/dockerExecutor.js';

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ 
    server,
    path: '/appws', // Changed from '/ws' to '/appws'
    perMessageDeflate: false, // Disable compression for simpler debugging
    clientTracking: true,     // Track connected clients
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
