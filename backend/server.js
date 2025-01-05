import express from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { MessageHandlers } from "./handlers/MessageHandlers.js";
import documentationRoutes from "./routes/documentationRoutes.js";

// Prevent memory leaks
process.setMaxListeners(5);

const app = express();
const port = process.env.PORT || 3000;

// WebSocket state
const wsConnections = new Map();
const outputCache = new Map();

app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Add documentation routes
app.use("/api", documentationRoutes);

const startServer = async () => {
  const server = createServer(app);
  const wss = new WebSocketServer({ noServer: true });

  const state = {
    connections: wsConnections,
    outputCache,
  };

  // Create message handlers instance without initializing services
  const messageHandlers = new MessageHandlers(state);

  wss.on("connection", async (ws) => {
    const id = Date.now() + Math.random();
    ws.id = id;
    wsConnections.set(id, ws);

    console.log(`[WSS] Client connected (ID: ${id})`);
    ws.send(JSON.stringify({ action: "connected", data: { id } }));

    ws.on("message", async (msg) => {
      try {
        await messageHandlers.handleMessage(ws, msg);
      } catch (error) {
        console.error("[WSS] Message handling error:", error);
        ws.send(
          JSON.stringify({
            action: "error",
            message: "Internal server error",
          })
        );
      }
    });

    ws.on("close", async () => {
      try {
        if (ws.leaderboardService) {
          await ws.leaderboardService.cleanup();
        }
        if (ws.taskManager) {
          await ws.taskManager.cleanup();
        }
        wsConnections.delete(id);
        console.log(`[WSS] Client disconnected and cleaned up (ID: ${id})`);
      } catch (error) {
        console.error("[WSS] Cleanup error on disconnect:", error);
      }
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

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// Start the server
const { server, wss } = await startServer();

// Export for use in other modules if needed
export { server, wss, wsConnections, outputCache };
