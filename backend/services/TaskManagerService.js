import { GlideClusterClient } from "@valkey/valkey-glide";
import { KEYS, TIMEOUTS } from "../constants.js";
import { cleanupCluster } from "../utils/cleanUpServer.js";
import { sendToWebSocket } from "../utils/websocketUtils.js";

export class TaskManagerService {
  constructor() {
    this.client = null;
    this.initializing = false;
    this.initialized = false;
    this.lockTimeout = null;
  }

  async initialize(mode = "cluster") {
    if (this.initialized) return;
    if (this.initializing) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return await this.initialize();
    }

    try {
      this.initializing = true;
      const host =
        process.env[
          mode === "cluster" ? "VALKEY_CLUSTER_HOST" : "VALKEY_STANDALONE_HOST"
        ];
      const port =
        process.env[
          mode === "cluster" ? "VALKEY_CLUSTER_PORT" : "VALKEY_STANDALONE_PORT"
        ];

      this.client = await GlideClusterClient.createClient({
        addresses: [{ host, port: parseInt(port) }],
        clientName: `task-manager-${Date.now()}`,
        clusterMode: mode === "cluster",
      });

      this.initialized = true;
    } catch (error) {
      console.error("[TaskManagerService] Initialization error:", error);
      throw error;
    } finally {
      this.initializing = false;
    }
  }

  async checkLock(ws, sessionId) {
    if (!this.client) {
      console.error("[TaskManager] Client not initialized in checkLock");
      await this.emergencyCleanup(ws, sessionId);
      return;
    }

    try {
      const lockKey = KEYS.TASK.LOCK(sessionId);
      const lockExists = (await this.client.get(lockKey)) === "locked";

      // If lock is released, process next task
      if (!lockExists) {
        await this.processNextTask(ws, sessionId);
      }
    } catch (error) {
      console.error("[TaskManager] Error in checkLock:", error);
      await this.emergencyCleanup(ws, sessionId);
    }
  }

  async processNextTask(ws, sessionId) {
    try {
      const queueKey = KEYS.TASK.QUEUE(sessionId);
      const taskJson = await this.client.lpop(queueKey);

      if (!taskJson) {
        await this.completeAllTasks(ws, sessionId);
        return false;
      }

      const task = JSON.parse(taskJson);
      const lockKey = KEYS.TASK.LOCK(sessionId);
      const lockSet = await this.client.set(lockKey, "locked", {
        conditionalSet: "onlyIfDoesNotExist",
        expiry: { type: "EX", count: TIMEOUTS.LOCK / 1000 },
      });
      if (!lockSet) {
        return false;
      }
      const operations = [
        `LPOP ${queueKey} "Processing next task"`,
        `GET ${KEYS.TASK.LOCK(sessionId)} "Checking lock status"`,
        `SET ${lockKey} "locked" NX EX ${TIMEOUTS.LOCK / 1000}`,
      ];
      sendToWebSocket(ws, "gameCommand", {
        type: "performTask",
        task: task.action,
        step: `${task.index + 1}/${task.total}`,
        operations,
      });
      return true;
    } catch (error) {
      console.error("[TaskManager] Process task error:", error);
      sendToWebSocket(ws, "error", { message: error.message });
      throw error;
    }
  }

  async releaseLock(ws, sessionId) {
    try {
      const lockKey = KEYS.TASK.LOCK(sessionId);
      await this.client.del([lockKey]);

      sendToWebSocket(ws, "gameCommand", {
        type: "lockReleased",
        operations: [`DEL ${lockKey} "Released task lock"`],
      });

      return true;
    } catch (error) {
      console.error("[TaskManager] Release lock error:", error);
      throw error;
    }
  }

  async completeAllTasks(ws) {
    if (ws.lockTimeout) {
      clearTimeout(ws.lockTimeout);
      ws.lockTimeout = null;
    }

    sendToWebSocket(ws, "gameCommand", {
      type: "complete",
      message: "All tasks completed",
    });

    clearInterval(ws.taskManagerInterval);
    this.cleanup();
  }

  async startTasks(ws, sessionId) {
    try {
      console.log(`[TaskManager] Starting tasks for session ${sessionId}`);
      await this.initialize();

      // Initialize session
      const sessionKey = `${KEYS.SESSION.PREFIX}${sessionId}`;
      await this.client.set(sessionKey, "active", {
        expiry: { type: "EX", count: TIMEOUTS.SESSION / 1000 },
      });

      // Try to acquire lock and process first task
      const lockKey = KEYS.TASK.LOCK(sessionId);
      const lockSet = await this.client.set(lockKey, "locked", {
        conditionalSet: "onlyIfDoesNotExist",
        expiry: { type: "EX", count: TIMEOUTS.LOCK / 1000 },
      });

      if (!lockSet) {
        throw new Error("Could not acquire task lock");
      }

      // Pop and process first task
      const queueKey = KEYS.TASK.QUEUE(sessionId);
      const firstTaskJson = await this.client.lpop(queueKey);
      const queueLength = await this.client.llen(queueKey);
      console.log(
        `[TaskManager] Setting up check interval: ${TIMEOUTS.CHECK_INTERVAL}ms`
      );
      ws.taskManagerInterval = setInterval(
        () => this.checkLock(ws, sessionId),
        TIMEOUTS.CHECK_INTERVAL
      );
      if (firstTaskJson) {
        const firstTask = JSON.parse(firstTaskJson);
        sendToWebSocket(ws, "gameCommand", {
          type: "performTask",
          task: firstTask.action,
          operations: [
            `SET ${lockKey} "locked" NX EX ${TIMEOUTS.LOCK / 1000}`,
            `LPOP ${queueKey} "Starting first task"`,
            `LLEN ${queueKey} "Remaining tasks in queue: ${queueLength}"`,
          ],
        });
      }
      return { status: "success", queueLength };
    } catch (error) {
      console.error("[TaskManager] Start tasks error:", error);
      await this.emergencyCleanup(ws, sessionId);
      throw error;
    }
  }

  async cancelProcess(ws) {
    console.log("[TaskManager] Canceling process, cleaning up resources");
    clearInterval(ws.taskManagerInterval);
    if (ws.lockTimeout) {
      clearTimeout(ws.lockTimeout);
      ws.lockTimeout = null;
    }
    if (this.client) {
      try {
        await this.cleanup();
        console.log("[TaskManager] Resources cleaned up successfully");
      } catch (error) {
        console.error("[TaskManager] Error during cleanup:", error);
      } finally {
        if (this.client && !this.client.closed) {
          this.client.close();
        }
        this.client = null;
      }
    }
  }

  async cleanup() {
    try {
      if (this.client) {
        await cleanupCluster();
        this.client.close();
        this.client = null;
        this.initialized = false;
      }
    } catch (error) {
      console.error("[TaskManager] Cleanup error:", error);
      throw error;
    }
  }

  async emergencyCleanup(ws, sessionId) {
    console.log(`[TaskManager] Emergency cleanup for session ${sessionId}`);
    try {
      if (ws.taskManagerInterval) {
        clearInterval(ws.taskManagerInterval);
        ws.taskManagerInterval = null;
      }
      this.cleanup();
      sendToWebSocket(ws, "error", {
        type: "error",
        message: "Task manager reset due to error",
      });
    } catch (error) {
      console.error("[TaskManager] Emergency cleanup error:", error);
    }
  }

  async initializeTaskQueue(ws, { sessionId, tasks }) {
    try {
      console.log(
        `[TaskManager] Setting up task queue for session ${sessionId}`
      );
      await this.initialize();
      await cleanupCluster();

      // Set session with expiry
      const sessionKey = `${KEYS.SESSION.PREFIX}${sessionId}`;
      await this.client.set(sessionKey, "active", {
        expiry: { type: "EX", count: TIMEOUTS.SESSION / 1000 },
      });

      // Queue all tasks in one operation
      const queueKey = KEYS.TASK.QUEUE(sessionId);
      const taskDataArray = tasks.map((task, index) =>
        JSON.stringify({
          ...task,
          index,
          total: tasks.length,
          sessionId,
          timestamp: Date.now(),
        })
      );

      let queueLength = 0;
      if (taskDataArray.length > 0) {
        await this.client.rpush(queueKey, taskDataArray);
        queueLength = await this.client.llen(queueKey);
      }

      // Notify frontend
      sendToWebSocket(ws, "taskUpdate", {
        data: {
          status: "ready",
          message: `Task queue prepared with ${queueLength} tasks`,
          sessionId,
          operations: [
            `SET ${sessionKey} "active" EX ${TIMEOUTS.SESSION / 1000}`,
            `RPUSH ${queueKey} "${queueLength} tasks queued"`,
          ],
        },
      });

      return { status: "success", queueLength };
    } catch (error) {
      console.error("[TaskManager] Set tasks error:", error);
      await this.emergencyCleanup(ws, sessionId);
      throw error;
    }
  }
}
