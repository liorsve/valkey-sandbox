import { WS_READY_STATES, TIMEOUTS } from "../constants.js";
import { cleanupCluster } from "../utils/cleanUpServer.js";
import { ExecutorService } from "../services/ExecutorService.js";

export class MessageHandlers {
  constructor(state, leaderboardService, taskManager) {
    if (!leaderboardService) {
      throw new Error("LeaderboardService is required");
    }
    if (!taskManager) {
      throw new Error("TaskManager is required");
    }

    this.state = state;
    this.leaderboardService = leaderboardService;
    this.taskManager = taskManager;
    this.executorService = new ExecutorService();

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

  async handleStartGame(ws) {
    try {
      await this.leaderboardService.initialize();
      const players = await this.leaderboardService.initializeLeaderboard();
      this.sendToClient(ws, "leaderboardUpdate", players);
    } catch (error) {
      console.error("[LeaderboardService] Start game error:", error);
      this.handleError(ws, error);
    }
  }

  async handleUpdateScore(ws, data) {
    try {
      await this.leaderboardService.initialize();
      const { players, operations } = await this.leaderboardService.updateScore(
        data.data.playerId,
        data.data.change
      );
      this.sendToClient(ws, "leaderboardUpdate", players, operations);
    } catch (error) {
      console.error("[LeaderboardService] Update score error:", error);
      this.handleError(ws, error);
    }
  }

  async handleStartTasks(ws) {
    await this.taskManager.startTasks(ws);
  }

  async handleTaskCompleted(ws) {
    await this.taskManager.checkLock(ws);
  }

  async handleCancelTaskManager(ws) {
    try {
      if (this.taskManager) {
        await this.taskManager.cancelProcess(ws);
      } else {
        // Graceful handling when taskManager is not available
        this.sendToClient(ws, "taskCancelled", { status: "success" });
      }
    } catch (error) {
      console.error("[TaskManager] Cancel error:", error);
      this.handleError(ws, error);
    }
  }

  async handleCleanup(ws) {
    try {
      if (this.taskManager) {
        await this.taskManager.cancelProcess(ws);
      }

      await cleanupCluster("cluster");
      this.sendToClient(ws, "cleanup", { status: "success" });
    } catch (error) {
      console.error("[Cleanup] Error:", error);
      this.handleError(ws, error);
    }
  }

  sendToClient(ws, action, data, operations = []) {
    if (ws.readyState === WS_READY_STATES.OPEN) {
      ws.send(JSON.stringify({ action, data, operations }));
    }
  }

  sendOutput(ws, output, cacheKey) {
    this.wsManager.sendOutput(ws, output, cacheKey);
  }

  async handleInit(ws, data) {
    this.sendToClient(ws, "initialized", { id: ws.id });
  }

  async handleSetTasks(ws, data) {
    await this.taskManager.startTasks(ws, data.data.tasks);
  }

  handleError(ws, error) {
    console.error("[WSS] Error:", error);
    this.sendToClient(ws, "error", { message: error.message });
  }
}
