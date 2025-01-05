import { EventTypes } from "@/composables/useEventBus";
import { inject } from "vue";

class WebSocketManager {
  constructor(eventBus) {
    this.ws = null;
    this.listeners = new Set();
    this.retryCount = 0;
    this.maxRetries = 5;
    this.retryDelay = 5000;
    this.lastUrl = null;
    this.eventBus = eventBus;
    this._healthCheckInterval = null;
    this._cleanupInProgress = false;
  }

  buildWebSocketUrl() {
    if (process.env.NODE_ENV === "development") {
      return "ws://localhost:3000/appws";
    }

    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${wsProtocol}//${window.location.host}/appws`;
  }

  handleMessage(event) {
    console.log("handleMessage", event);
    try {
      if (!event?.data) return;

      // Handle special system messages
      if (event.data === "connected") {
        this.notifyListeners({
          action: "connected",
          payload: { id: Date.now() + Math.random() },
          timestamp: Date.now(),
        });
        return;
      }

      // Parse and normalize message
      let parsedData;
      try {
        parsedData =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch (e) {
        console.debug("[WS] Non-JSON message:", event.data);
        return;
      }

      // Create normalized message structure
      const message = {
        action: parsedData.action || parsedData.type || "unknown",
        payload: null,
        timestamp: Date.now(),
      };

      // Handle nested data structures
      if (parsedData.data) {
        message.payload =
          typeof parsedData.data === "object"
            ? { ...parsedData.data }
            : { value: parsedData.data };
      } else if (parsedData.payload) {
        message.payload = parsedData.payload;
      }

      // Handle output in data or root
      if (parsedData.data?.output || parsedData.output) {
        message.payload = {
          ...(message.payload || {}),
          output: parsedData.data?.output || parsedData.output,
        };
      }

      // Only notify if we have a valid action
      if (message.action && message.action !== "unknown") {
        this.notifyListeners(message);
      }
    } catch (error) {
      console.error("[WS] Message handling error:", error, event);
    }
  }

  notifyListeners(message) {
    if (!message?.action) {
      console.warn("[WS] Invalid message format:", message);
      return;
    }

    // Route all terminal/output related actions to sidebar
    const componentRoutes = {
      taskUpdate: "taskManager",
      gameCommand: "taskManager",
      leaderboardUpdate: "leaderboard",
      output: "sidebar", // Route to sidebar instead of playground
      terminalOutput: "sidebar", // Route to sidebar instead of playground
      executionResult: "sidebar", // Route to sidebar instead of playground
      connected: "global",
    };

    const targetComponent = componentRoutes[message.action] || "global";
    console.debug(`[WS] Routing ${message.action} to ${targetComponent}`);

    this.listeners.forEach((listener) => {
      if (
        listener.component === "global" ||
        listener.component === targetComponent
      ) {
        try {
          listener.callback(message);
        } catch (error) {
          console.error(
            `[WS] Listener error for ${listener.component}:`,
            error
          );
        }
      }
    });
  }

  connect() {
    if (
      this.isConnectionValid() ||
      this.ws?.readyState === WebSocket.CONNECTING
    ) {
      return Promise.resolve(this.ws);
    }

    return new Promise((resolve, reject) => {
      try {
        const wsUrl = this.buildWebSocketUrl();
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          this.retryCount = 0;
          this.eventBus.emit(EventTypes.WS_OPEN);
          resolve(this.ws);
        };

        this.ws.onerror = (error) => {
          this.eventBus.emit(EventTypes.WS_ERROR, error);
          reject(error);
        };

        this.ws.onmessage = (event) => this.handleMessage(event);
        this.ws.onclose = (event) => {
          this.eventBus.emit(EventTypes.WS_CLOSE, event);
          if (!event.wasClean) this.handleReconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  handleReconnect() {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      const delay = this.retryDelay * Math.pow(2, this.retryCount - 1);
      console.log(
        `[WS] Reconnecting (${this.retryCount}/${this.maxRetries}) in ${delay}ms...`
      );
      setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      console.error("[WS] Max reconnection attempts reached");
      this.eventBus.emit(EventTypes.WS_MAX_RETRIES);
    }
  }

  addMessageListener(listener, component = "global") {
    if (typeof listener !== "function") return;

    // Remove existing listener for the component if it exists
    this.removeMessageListener(component);

    const listenerObj = {
      callback: listener,
      component,
      id: Date.now() + Math.random(),
    };

    this.listeners.add(listenerObj);
    return listenerObj.id;
  }

  removeMessageListener(listenerIdOrComponent) {
    if (!this.listeners) return;

    const before = this.listeners.size;

    if (typeof listenerIdOrComponent === "string") {
      // Remove by component name
      this.listeners = new Set(
        Array.from(this.listeners).filter(
          (l) => l.component !== listenerIdOrComponent
        )
      );
    } else {
      // Remove by listener ID
      this.listeners = new Set(
        Array.from(this.listeners).filter((l) => l.id !== listenerIdOrComponent)
      );
    }

    const removed = before - this.listeners.size;
    if (removed > 0) {
      console.debug(
        `[WS] Removed ${removed} listener(s) for: ${listenerIdOrComponent}`
      );
    }
  }

  async send(data) {
    if (!this.isConnectionValid()) {
      console.warn("[WS] Cannot send message - connection not ready");
      return Promise.reject(new Error("WebSocket connection not ready"));
    }

    // Prevent duplicate cleanup messages
    if (data.action === "cleanup" && this._cleanupInProgress) {
      console.debug("[WS] Cleanup already in progress, skipping");
      return Promise.resolve();
    }

    try {
      if (data.action === "cleanup") {
        this._cleanupInProgress = true;
        setTimeout(() => {
          this._cleanupInProgress = false;
        }, 1000);
      }

      const formattedMessage =
        typeof data === "string" ? data : JSON.stringify(data);
      this.ws.send(formattedMessage);
      return Promise.resolve();
    } catch (error) {
      console.error("[WS] Send error:", error);
      return Promise.reject(error);
    }
  }

  isConnectionValid() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }

  gracefulClose() {
    if (this.ws) {
      this.ws.close(1000, "Client shutting down");
      console.log("[WS] WebSocket closed gracefully");
    }
  }

  // Add health check method
  startHealthCheck(interval = 30000) {
    if (this._healthCheckInterval) return;

    this._healthCheckInterval = setInterval(() => {
      if (!this.isConnectionValid()) {
        this.connect().catch((err) => {
          console.warn("[WS] Reconnection attempt failed:", err);
        });
      }
    }, interval);
  }

  stopHealthCheck() {
    if (this._healthCheckInterval) {
      clearInterval(this._healthCheckInterval);
      this._healthCheckInterval = null;
    }
  }
}

let wsInstance = null;

export function createWebSocketManager(eventBus) {
  if (!wsInstance) {
    wsInstance = new WebSocketManager(eventBus);
  }
  return wsInstance;
}

export function useWebSocket() {
  const wsManager = inject("wsManager");
  if (!wsManager && !wsInstance) {
    throw new Error("WebSocket manager not provided");
  }
  return wsManager || wsInstance;
}

export function ensureConnection(wsManager = wsInstance) {
  if (!wsManager) {
    throw new Error("No WebSocket manager available");
  }

  if (!wsManager.isConnectionValid()) {
    wsManager.connect();
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("WebSocket connection timeout"));
      }, 5000);

      wsManager.eventBus.on("ws:open", () => {
        clearTimeout(timeout);
        resolve(wsManager.ws);
      });

      wsManager.eventBus.on("ws:error", (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });
  }
  return Promise.resolve(wsManager.ws);
}

// Export the singleton instance for backward compatibility
export const wsInstanceSingleton = {
  get ws() {
    return wsInstance?.ws;
  },
  isConnectionValid() {
    return wsInstance?.isConnectionValid();
  },
  send(data) {
    return wsInstance?.send(data);
  },
  addMessageListener(listener) {
    return wsInstance?.addMessageListener(listener);
  },
  removeMessageListener(listener) {
    return wsInstance?.removeMessageListener(listener);
  },
};
