export const WS_READY_STATES = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

export const TIMEOUTS = {
  CACHE: 5000,
  LOCK: 30000,
  AUTO_RELEASE: 50000,
  RETRY_INTERVAL: 500,
};

export const KEYS = {
  LOCK: "task-lock",
  QUEUE: "task-queue",
  LEADERBOARD: "leaderboard",
  PLAYER_PREFIX: "player:",
};

export const EXECUTOR_ENDPOINTS = {
  python: (host, port) => `http://${host}:${port}`,
  javascript: (host, port) => `http://${host}:${port}`,
};

export const DEFAULT_PLAYERS = [
  { id: 1, name: "Superman", score: 0, photo: "/images/superman.jpg" },
  { id: 2, name: "Batman", score: 0, photo: "/images/batman.jpg" },
  { id: 3, name: "Wonder Woman", score: 0, photo: "/images/wonder_woman.jpg" },
  { id: 4, name: "Flash", score: 0, photo: "/images/flash.jpg" },
  {
    id: 5,
    name: "Green Lantern",
    score: 0,
    photo: "/images/green_lantern.jpg",
  },
  { id: 6, name: "Aquaman", score: 0, photo: "/images/aquaman.jpg" },
];

export const CLUSTER_CONFIG = {
  retryAttempts: 30,
  retryDelay: 1000,
  connectionTimeout: 5000
};

export const CLUSTER_ENDPOINTS = {
  development: {
    host: process.env.VALKEY_CLUSTER_HOST || 'valkey-cluster',
    port: parseInt(process.env.VALKEY_CLUSTER_PORT || '7000')
  }
};
