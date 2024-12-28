import { store } from "../store";

class WebSocketManager {
  constructor() {
    this.ws = null;
    this.maxRetries = 5;
    this.retryCount = 0;
    this.retryDelay = 2000;
    this.isConnecting = false;
    this.listeners = new Set();
    this.lastUrl = null;
  }

  async connect(url) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log("[WS] Reusing existing connection");
      return this.ws;
    }

    if (this.isConnecting) {
      console.log("[WS] Connection already in progress");
      return;
    }

    this.isConnecting = true;
    this.lastUrl = url;
    const wsUrl = this.buildWebSocketUrl(url);
    console.log("[WS] Connecting to:", wsUrl);

    try {
      this.ws = new WebSocket(wsUrl);
      this.setupMessageHandler();

      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error("Connection timeout"));
          this.ws?.close();
        }, 5000);

        this.ws.onopen = () => {
          clearTimeout(timeout);
          this.isConnecting = false;
          this.retryCount = 0;
          console.log("[WS] Connected successfully");
          resolve(this.ws);
        };

        this.ws.onclose = (event) => {
          clearTimeout(timeout);
          this.isConnecting = false;
          console.log("[WS] Connection closed:", event.code);
          if (!event.wasClean) {
            this.handleReconnect();
          }
        };

        this.ws.onerror = (error) => {
          clearTimeout(timeout);
          this.isConnecting = false;
          console.error("[WS] Error:", error);
          reject(error);
        };
      });
    } catch (error) {
      this.isConnecting = false;
      throw error;
    }
  }

  isConnectionValid() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }

  setupMessageHandler() {
    if (!this.ws) return;

    this.ws.onmessage = (event) => {
      console.log("[WS] Incoming message:", event.data);
      this.listeners.forEach((listener) => {
        try {
          listener(event);
        } catch (error) {
          console.error("[WS] Listener error:", error);
        }
      });
    };
  }

  buildWebSocketUrl(_url) {
    if (process.env.NODE_ENV === "development") {
      return "ws://localhost:3000/appws";
    }

    const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    return `${wsProtocol}//${window.location.host}/appws`;
  }

  handleReconnect() {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      const delay = this.retryDelay * Math.pow(2, this.retryCount - 1);
      console.log(
        `[WS] Reconnecting (${this.retryCount}/${this.maxRetries}) in ${delay}ms...`
      );
      setTimeout(() => {
        if (this.lastUrl) {
          this.connect(this.lastUrl);
        }
      }, delay);
    } else {
      console.error("[WS] Max reconnection attempts reached");
    }
  }

  addMessageListener(listener) {
    if (typeof listener !== "function") {
      console.warn("[WS] Invalid listener type:", typeof listener);
      return;
    }
    this.listeners.add(listener);
  }

  removeMessageListener(listener) {
    if (!this.listeners) return;
    this.listeners.delete(listener);
  }

  send(data) {
    if (!this.isConnectionValid()) {
      console.warn("[WS] Cannot send message - connection not ready");
      return Promise.reject(new Error("WebSocket connection not ready"));
    }

    try {
      const formattedMessage =
        typeof data === "string" ? data : JSON.stringify(data);
      this.ws.send(formattedMessage);
      return Promise.resolve();
    } catch (error) {
      console.error("[WS] Send error:", error);
      return Promise.reject(error);
    }
  }

  gracefulClose() {
    if (this.ws) {
      this.ws.close(1000, "Client shutting down");
      console.log("[WS] WebSocket closed gracefully");
    }
  }
}

export const wsInstance = new WebSocketManager();

export const ensureConnection = async () => {
  if (!wsInstance.isConnectionValid()) {
    const wsUrl =
      process.env.NODE_ENV === "development"
        ? "ws://localhost:3000/appws"
        : "/appws";
    return wsInstance.connect(wsUrl);
  }
  return wsInstance.ws;
};

window.addEventListener("beforeunload", () => {
  wsInstance.gracefulClose();
});

const buildWebSocketUrl = (url) => {
  if (url.startsWith("ws")) return url;

  const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const backendUrl = import.meta.env.VITE_WS_URL;

  if (backendUrl) return backendUrl;

  return `${wsProtocol}//${window.location.host}/appws`;
};

const connect = () => {
  if (ws.value && ws.value.readyState === WebSocket.OPEN) return;

  try {
    const wsUrl = buildWebSocketUrl("/appws");
    console.log("[WS] Connecting to:", wsUrl);

    ws.value = new WebSocket(wsUrl);

    ws.value.onopen = () => {
      isConnected.value = true;
      hasError.value = false;
      console.log("[WS] Connection established");
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
        reconnectTimeout = null;
      }
    };

    ws.value.onclose = (event) => {
      isConnected.value = false;
      console.log("[WS] Connection closed", event.code, event.reason);
      if (!event.wasClean) {
        reconnectTimeout = setTimeout(connect, 5000);
      }
    };

    ws.value.onerror = (error) => {
      hasError.value = true;
      console.error("[WS] Connection error:", error);
    };
  } catch (error) {
    console.error("[WS] Setup error:", error);
    hasError.value = true;
    reconnectTimeout = setTimeout(connect, 5000);
  }
};
