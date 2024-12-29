import { GlideClusterClient } from "@valkey/valkey-glide";
import { KEYS, TIMEOUTS } from "../constants.js";
import { cleanupCluster } from "../utils/cleanUpServer.js";

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
      // First check if session is still valid
      const sessionKey = `${KEYS.SESSION.PREFIX}${sessionId}`;
      const sessionExists = await this.client.exists([sessionKey]);

      if (!sessionExists) {
        console.log(`[TaskManager] Session ${sessionId} expired or invalid`);
        await this.emergencyCleanup(ws, sessionId);
        return;
      }

      // Check lock and process task if available
      const lockKey = KEYS.TASK.LOCK(sessionId);
      const lockExists = (await this.client.get(lockKey)) === "locked";

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
      const operations = [
        `LPOP ${queueKey} "Processing next task"`,
        `GET ${KEYS.TASK.LOCK(sessionId)} "Checking lock status"`,
      ];

      await this.executeTask(ws, sessionId, task, operations);
      return true;
    } catch (error) {
      console.error("[TaskManager] Process task error:", error);
      throw error;
    }
  }

  async executeTask(ws, sessionId, task, operations = []) {
    try {
      const lockKey = KEYS.TASK.LOCK(sessionId);
      const lockSet = await this.client.set(lockKey, "locked", {
        conditionalSet: "onlyIfDoesNotExist",
        expiry: { type: "EX", count: TIMEOUTS.LOCK / 1000 },
      });

      if (!lockSet) {
        return false;
      }

      operations.push(`SET ${lockKey} "locked" NX EX ${TIMEOUTS.LOCK / 1000}`);

      ws.send(
        JSON.stringify({
          action: "gameCommand",
          data: {
            type: "performTask",
            task: task.action,
            step: `${task.index + 1}/${task.total}`,
            operations,
          },
        })
      );

      return true;
    } catch (error) {
      console.error("[TaskManager] Execute task error:", error);
      throw error;
    }
  }

  async completeTask(ws, sessionId) {
    try {
      const lockKey = KEYS.TASK.LOCK(sessionId);
      await this.client.del([lockKey]);
      return this.processNextTask(ws, sessionId);
    } catch (error) {
      console.error("[TaskManager] Complete task error:", error);
      throw error;
    }
  }

  async completeAllTasks(ws, sessionId) {
    if (ws.lockTimeout) {
      clearTimeout(ws.lockTimeout);
      ws.lockTimeout = null;
    }

    this.sendGameCommand(ws, "complete", "All tasks completed");
    clearInterval(ws.taskManagerInterval);
    await this.client.del([KEYS.TASK.LOCK(sessionId)]);

    if (this.client) {
      this.client.close();
      this.client = null;
    }
  }

  async startTasks(ws, { sessionId, tasks }) {
    try {
      console.log(`[TaskManager] Starting tasks for session ${sessionId}`);
      await this.initialize();

      const operations = [];
      const sessionKey = `${KEYS.SESSION.PREFIX}${sessionId}`;
      const queueKey = KEYS.TASK.QUEUE(sessionId);
      const lockKey = KEYS.TASK.LOCK(sessionId);

      // Clean existing session data
      await this.client.del([sessionKey, queueKey, lockKey]);
      operations.push(`DEL ${queueKey} ${lockKey} "Cleaning session data"`);

      // Set session with expiry
      await this.client.set(sessionKey, "active", {
        expiry: { type: "EX", count: TIMEOUTS.SESSION / 1000 },
      });
      operations.push(
        `SET ${sessionKey} "active" EX ${TIMEOUTS.SESSION / 1000}`
      );

      // Prepare all tasks in one array
      const taskDataArray = tasks.map((task, index) =>
        JSON.stringify({
          id: `task_${index}`,
          action: task.action,
          index,
          total: tasks.length,
          timestamp: Date.now(),
        })
      );

      // Queue all tasks in one operation
      if (taskDataArray.length > 0) {
        await this.client.rpush(queueKey, taskDataArray);
        operations.push(
          `RPUSH ${queueKey} "Queued ${taskDataArray.length} tasks in bulk"`
        );
      }

      const queueLength = await this.client.llen(queueKey);
      operations.push(`LLEN ${queueKey} "Queue contains ${queueLength} tasks"`);

      // Send initialization success to client
      ws.send(
        JSON.stringify({
          action: "taskUpdate",
          data: {
            status: `Task queue initialized with ${queueLength} tasks`,
            operations,
            sessionId,
          },
        })
      );

      return { status: "success", operations, queueLength };
    } catch (error) {
      console.error("[TaskManager] Start tasks error:", error);
      await this.emergencyCleanup(ws, sessionId);
      throw error;
    }
  }

  async clearExistingTasks(operations) {
    try {
      await this.client.del([KEYS.QUEUE]);
      operations.push('DEL task-queue "Cleaning up previous tasks"');

      await this.client.del([KEYS.LOCK]);
      operations.push('DEL task-lock "Releasing any existing locks"');

      return true;
    } catch (error) {
      console.error("[TaskManager] Clear tasks error:", error);
      throw error;
    }
  }

  async queueTasks(sessionId, tasks, operations) {
    try {
      for (const [index, task] of tasks.entries()) {
        const taskData = {
          ...task,
          index,
          total: tasks.length,
        };
        const taskStr = JSON.stringify(taskData);
        await this.client.rpush(KEYS.QUEUE, taskStr);
        operations.push(
          `RPUSH ${KEYS.QUEUE} "Task ${index + 1}/${tasks.length}: ${
            task.action
          }"`
        );
      }
      return true;
    } catch (error) {
      console.error("[TaskManager] Queue tasks error:", error);
      throw error;
    }
  }

  sendGameCommand(ws, type, message) {
    ws.send(
      JSON.stringify({
        action: "gameCommand",
        data: { type, message },
      })
    );
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
        const [lockDeleted, queueDeleted] = await Promise.all([
          this.client.exists([KEYS.LOCK]) && this.client.del([KEYS.LOCK]),
          this.client.exists([KEYS.QUEUE]) && this.client.del([KEYS.QUEUE]),
        ]);

        console.log(
          `[TaskManager] Resources cleaned up: lockDeleted=${lockDeleted}, queueDeleted=${queueDeleted}`
        );

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

  async cleanup(mode = "cluster") {
    try {
      if (this.client) {
        await cleanupCluster(mode);
        this.client.close();
        this.client = null;
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

      if (this.client) {
        // Clean up all session-related keys
        const sessionKey = `${KEYS.SESSION.PREFIX}${sessionId}`;
        const queueKey = KEYS.TASK.QUEUE(sessionId);
        const lockKey = KEYS.TASK.LOCK(sessionId);

        const delResult = await this.client.del([
          sessionKey,
          queueKey,
          lockKey,
        ]);
        console.log(
          `[TaskManager] Executed: DEL ${sessionKey}, DEL ${queueKey}, DEL ${lockKey}, Result:`,
          delResult
        );

        ws.send(
          JSON.stringify({
            action: "gameCommand",
            data: {
              type: "error",
              message: "Task manager reset due to error",
              operations: [
                `DEL ${sessionKey} ${queueKey} ${lockKey} "Emergency cleanup"`,
                "Session invalidated",
              ],
            },
          })
        );
      }
    } catch (error) {
      console.error("[TaskManager] Emergency cleanup error:", error);
    }
  }

  async cleanupSession(sessionId) {
    try {
      const sessionKey = `${KEYS.SESSION_PREFIX}${sessionId}`;
      await this.client.del([sessionKey]);
      return true;
    } catch (error) {
      console.error(
        `[TaskManager] Error cleaning up session ${sessionId}:`,
        error
      );
      return false;
    }
  }
}
