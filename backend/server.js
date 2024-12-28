import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { GlideClusterClient } from "@valkey/valkey-glide";
import { MessageHandlers } from "./handlers/MessageHandlers.js";

// Prevent memory leaks
process.setMaxListeners(5);

const app = express();
const port = process.env.PORT || 3000;

// WebSocket state
const wsConnections = new Map();
const outputCache = new Map();
let glideClient = null;

app.use(
  cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["*"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Add Glide client initialization
const initializeGlideClient = async () => {
  if (!glideClient) {
    const host = process.env.VALKEY_CLUSTER_HOST || "valkey-cluster";
    const port = parseInt(process.env.VALKEY_CLUSTER_PORT || "7000");

    console.log(
      `[Server] Attempting to connect to Valkey cluster at ${host}:${port}`
    );

    const retryStrategy = (times) => {
      const delay = Math.min(times * 1000, 5000);
      console.log(`[Server] Retry attempt ${times}, waiting ${delay}ms`);
      return delay;
    };

    glideClient = await GlideClusterClient.createClient({
      addresses: [{ host, port }],
      clientName: `ws-client-${Date.now()}`,
      clusterMode: true,
      connectionTimeout: 10000,
      retryStrategy,
      maxRetries: 20,
    });
  }
  return glideClient;
};

const startServer = async () => {
  const server = createServer(app);

  // Create WebSocket server
  const wss = new WebSocketServer({ noServer: true });

  // Initialize Glide client
  try {
    await initializeGlideClient();
    console.log("[Server] Glide client initialized");
  } catch (error) {
    console.error("[Server] Failed to initialize Glide client:", error);
  }

  // Create message handlers instance
  const messageHandlers = new MessageHandlers(
    {
      connections: wsConnections,
      outputCache,
    },
    null, // leaderboardService - pass if needed
    null // taskManager - pass if needed
  );

  // Handle WebSocket connection
  wss.on("connection", (ws) => {
    const id = Date.now() + Math.random();
    ws.id = id;
    wsConnections.set(id, ws);

    console.log(`[WSS] Client connected (ID: ${id})`);
    ws.send(JSON.stringify({ action: "connected", data: { id } }));

    ws.on("message", (msg) => messageHandlers.handleMessage(ws, msg));
    ws.on("close", () => {
      wsConnections.delete(id);
      console.log(`[WSS] Client disconnected (ID: ${id})`);
    });
  });

  // Handle upgrade requests
  server.on("upgrade", (request, socket, head) => {
    if (request.url === "/appws") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  // Start HTTP server
  await new Promise((resolve) => {
    server.listen(port, "0.0.0.0", () => {
      console.log(`[Server] HTTP Server running on port ${port}`);
      resolve();
    });
  });

  return { server, wss };
};

// Handle uncaught errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Start the server
const { server, wss } = await startServer();

// Export for use in other modules if needed
export { server, wss, wsConnections, outputCache, glideClient };
