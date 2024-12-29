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

  async checkLock(ws) {
    if (!this.client) {
      console.error("[WSS] Client not initialized in checkLock");
      return;
    }

    const lockValue = await this.client.get(KEYS.LOCK);
    const lockExists = lockValue === "locked";

    if (!lockExists) {
      await this.processNextTask(ws);
    }
  }

  async processNextTask(ws) {
    const tasks = await this.client.lrange(KEYS.QUEUE, 0, -1);
    if (tasks.length > 0) {
      const taskJson = await this.client.lpop(KEYS.QUEUE);
      if (!taskJson) return;

      const task = JSON.parse(taskJson);
      await this.executeTask(ws, task);
    } else {
      await this.completeAllTasks(ws);
    }
  }

  async executeTask(ws, task) {
    const lockSet = await this.client.set(KEYS.LOCK, "locked", {
      conditionalSet: "onlyIfDoesNotExist",
      expiry: { type: "EX", count: TIMEOUTS.LOCK / 1000 },
    });

    if (lockSet) {
      if (ws.lockTimeout) {
        clearTimeout(ws.lockTimeout);
      }

      this.sendGameCommand(
        ws,
        "lockAcquired",
        "Lock acquired for task processing"
      );
      this.sendGameCommand(ws, "performTask", {
        task: task.action,
        step: `${task.index + 1}/${task.total}`,
      });

      ws.lockTimeout = setTimeout(async () => {
        if (this.client) {
          const currentLock = await this.client.get(KEYS.LOCK);
          if (currentLock === "locked") {
            await this.client.del([KEYS.LOCK]);
            console.log("[WSS] Auto-released lock due to no response");
          }
        }
      }, TIMEOUTS.AUTO_RELEASE);
    } else {
      await this.client.rpush(KEYS.QUEUE, JSON.stringify(task));
    }
  }

  async completeAllTasks(ws) {
    if (ws.lockTimeout) {
      clearTimeout(ws.lockTimeout);
      ws.lockTimeout = null;
    }

    this.sendGameCommand(ws, "complete", "All tasks completed");
    clearInterval(ws.taskManagerInterval);
    await this.client.del([KEYS.LOCK]);

    if (this.client) {
      this.client.close();
      this.client = null;
    }
  }

  async startTasks(ws, tasks) {
    const clusterOperations = [];
    await this.clearExistingTasks(clusterOperations);
    await this.queueTasks(tasks, clusterOperations);
    await this.startTaskProcessing(ws, clusterOperations);
  }

  async clearExistingTasks(operations) {
    await this.client.del([KEYS.QUEUE]);
    operations.push('DEL task-queue "Clearing existing tasks"');

    await this.client.del([KEYS.LOCK]);
    operations.push('DEL task-lock "Clearing existing locks"');
  }

  async queueTasks(tasks, operations) {
    for (const [index, task] of tasks.entries()) {
      const taskData = {
        ...task,
        index,
        total: tasks.length,
      };
      const taskStr = JSON.stringify(taskData);
      operations.push(
        `RPUSH ${KEYS.QUEUE} "${taskStr}" "Adding task to queue"`
      );
      await this.client.rpush(KEYS.QUEUE, taskStr);
    }
  }

  async startTaskProcessing(ws, operations) {
    const queueLength = await this.client.llen(KEYS.QUEUE);
    operations.push(
      `LLEN ${KEYS.QUEUE} "Verifying queue length: ${queueLength}"`
    );

    ws.send(
      JSON.stringify({
        action: "taskUpdate",
        data: {
          status: `Task Manager initialized with ${queueLength} tasks`,
          clusterOperations: operations,
        },
      })
    );

    ws.taskManagerInterval = setInterval(
      () => this.checkLock(ws),
      TIMEOUTS.RETRY_INTERVAL
    );
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
        await Promise.all([
          this.client.exists(KEYS.LOCK) && this.client.del([KEYS.LOCK]),
          this.client.exists(KEYS.QUEUE) && this.client.del([KEYS.QUEUE]),
        ]);

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

  // ... other task management methods ...
}
