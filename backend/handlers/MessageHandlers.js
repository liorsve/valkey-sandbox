import { WS_READY_STATES, TIMEOUTS } from "../constants.js";
import { cleanupCluster } from "../utils/cleanUpServer.js";
import { ExecutorService } from "../services/ExecutorService.js";
import { TaskManagerService } from "../services/TaskManagerService.js";
import { LeaderboardService } from "../services/LeaderboardService.js";

export class MessageHandlers {
  constructor(state) {
    this.state = state;
    this.executorService = new ExecutorService();
    this.taskManager = new TaskManagerService();
    this.leaderboardService = new LeaderboardService();
    this.handlers = new Map([
      ["init", this.handleInit.bind(this)],
      ["runCode", this.handleRunCode.bind(this)],
      ["setTasks", this.handleSetTasks.bind(this)],
      ["startGame", this.handleStartGame.bind(this)],
      ["updateScore", this.handleUpdateScore.bind(this)],
      ["startTasks", this.handleStartTasks.bind(this)],
      ["taskCompleted", this.handleTaskCompleted.bind(this)],
      ["cancelTaskManager", this.handleCancelTaskManager.bind(this)],
      ["cleanup", this.handleCleanup.bind(this)],
    ]);
  }

  async handleMessage(ws, message) {
    try {
      const msg = JSON.parse(message);

      switch (msg.action) {
        case "runCode": {
          await this.handleCodeExecution(ws, msg.data);
          break;
        }
        default: {
          const handler = this.handlers.get(msg.action);
          if (handler) {
            await handler(ws, msg);
          } else {
            console.log(`[WSS] Unhandled action: ${msg.action}`);
          }
        }
      }
    } catch (error) {
      console.error("[WSS] Message handling error:", error);
      ws.send(
        JSON.stringify({
          action: "error",
          error: error.message,
        })
      );
    }
  }

  async handleCodeExecution(ws, data) {
    try {
      const result = await this.executorService.executeCode(
        data.language,
        data.code
      );

      ws.send(
        JSON.stringify({
          action: "output",
          data: result,
        })
      );
    } catch (error) {
      ws.send(
        JSON.stringify({
          action: "error",
          error: error.message,
        })
      );
    }
  }

  async handleRunCode(ws, data) {
    const cacheKey = `${ws.id}_${Date.now()}`;
    this.wsManager.outputCache.set(cacheKey, new Set());

    executeCode(
      data.data.language,
      data.data.code,
      (output) => this.sendOutput(ws, output, cacheKey),
      (error) => this.handleError(ws, error)
    );

    setTimeout(
      () => this.wsManager.outputCache.delete(cacheKey),
      TIMEOUTS.CACHE
    );
  }

  async ensureServiceInitialized(ws, serviceName) {
    if (!ws[serviceName]) {
      ws[serviceName] =
        serviceName === "leaderboardService"
          ? new LeaderboardService()
          : new TaskManagerService();
    }
    await ws[serviceName].initialize();
  }

  async handleStartGame(ws) {
    try {
      await this.ensureServiceInitialized(ws, "leaderboardService");
      const players = await ws.leaderboardService.initializeLeaderboard();
      this.sendToClient(ws, "leaderboardUpdate", players);
      console.log("[MessageHandlers] Leaderboard initialized and updated");
    } catch (error) {
      console.error("[LeaderboardService] Start game error:", error);
      this.handleError(ws, error);
    }
  }

  async handleUpdateScore(ws, data) {
    try {
      await this.ensureServiceInitialized(ws, "leaderboardService");
      const { state, operations } = await ws.leaderboardService.updateScore(
        data.data.playerId,
        data.data.change
      );
      this.sendToClient(ws, "leaderboardUpdate", { state, operations });
      console.log(
        "[MessageHandlers] Score updated and leaderboard sent to client"
      );
    } catch (error) {
      console.error("[LeaderboardService] Update score error:", error);
      this.handleError(ws, error);
    }
  }

  async handleStartTasks(ws) {
    try {
      console.log("[MessageHandlers] Handling StartTasks action");
      await this.ensureServiceInitialized(ws, "taskManager");

      await ws.taskManager.startTasks(ws);
      console.log(
        "[MessageHandlers] taskManager.startTasks executed successfully"
      );
    } catch (error) {
      console.error("[TaskManager] Start tasks error:", error);
      this.handleError(ws, error);
    }
  }

  async handleSetTasks(ws, data) {
    try {
      await this.ensureServiceInitialized(ws, "taskManager");

      const result = await ws.taskManager.startTasks(ws, data.data);
      console.log(
        "[MessageHandlers] taskManager.startTasks executed with result:",
        result
      );

      this.sendToClient(ws, "taskUpdate", {
        status: `Task queue initialized with ${result.queueLength} tasks`,
        clusterOperations: result.operations,
      });
    } catch (error) {
      console.error("[TaskManager] Set tasks error:", error);
      this.handleError(ws, error);
    }
  }

  async handleTaskCompleted(ws) {
    try {
      await this.ensureServiceInitialized(ws, "taskManager");
      const result = await ws.taskManager.processNextTask(ws);

      if (!result) {
        this.sendToClient(ws, "gameCommand", {
          type: "complete",
          message: "All tasks completed",
        });
        console.log(
          "[MessageHandlers] All tasks completed and gameCommand sent to client"
        );
      }
    } catch (error) {
      console.error("[TaskManager] Task completion error:", error);
      this.handleError(ws, error);
    }
  }

  async handleCancelTaskManager(ws) {
    try {
      if (this.taskManager) {
        await this.taskManager.cancelProcess(ws);
        console.log(
          "[MessageHandlers] Task manager cancelled and resources cleaned up"
        );
      } else {
        this.sendToClient(ws, "taskCancelled", { status: "success" });
        console.log(
          "[MessageHandlers] Task manager was not running. Sent cancellation status to client"
        );
      }
    } catch (error) {
      console.error("[TaskManager] Cancel error:", error);
      this.handleError(ws, error);
    }
  }

  async handleCleanup(ws) {
    try {
      if (ws.taskManager) {
        await ws.taskManager.cleanup();
        ws.taskManager = null;
        console.log("[MessageHandlers] Task manager cleaned up");
      } else if (ws.leaderboardService) {
        await ws.leaderboardService.cleanup();
        ws.leaderboardService = null;
        console.log("[MessageHandlers] Leaderboard service cleaned up");
      } else {
        await cleanupCluster();
        console.log("[MessageHandlers] Cluster cleaned up");
      }
      this.sendToClient(ws, "cleanup", { status: "success" });
    } catch (error) {
      console.error("[Cleanup] Error:", error);
      this.handleError(ws, error);
    }
  }

  sendToClient(ws, action, data) {
    if (ws.readyState === WS_READY_STATES.OPEN) {
      ws.send(JSON.stringify({ action, data }));
      console.log(`[MessageHandlers] Sent action: ${action} to client`);
    }
  }

  sendOutput(ws, output, cacheKey) {
    this.wsManager.sendOutput(ws, output, cacheKey);
  }

  async handleInit(ws, data) {
    this.sendToClient(ws, "initialized", { id: ws.id });
    console.log("[MessageHandlers] Initialization message sent to client");
  }

  handleError(ws, error) {
    console.error("[WSS] Error:", error);
    this.sendToClient(ws, "error", { message: error.message });
    console.log("[MessageHandlers] Error message sent to client");
  }
}
