import { cleanupCluster } from "../utils/cleanUpServer.js";
import { ExecutorService } from "../services/ExecutorService.js";
import { TaskManagerService } from "../services/TaskManagerService.js";
import { LeaderboardService } from "../services/LeaderboardService.js";
import { sendToWebSocket } from "../utils/websocketUtils.js";

export class MessageHandlers {
  constructor(state) {
    this.state = state;
    this.executorService = new ExecutorService();
    this.taskManager = new TaskManagerService();
    this.leaderboardService = new LeaderboardService();
    this.handlers = new Map([
      ["init", this.handleInit.bind(this)],
      ["runCode", this.handleCodeExecution.bind(this)],
      ["setTasks", this.handleSetTasks.bind(this)],
      ["startGame", this.handleStartGame.bind(this)],
      ["updateScore", this.handleUpdateScore.bind(this)],
      ["invokeTaskManager", this.handleStartTasks.bind(this)],
      ["taskCompleted", this.handleTaskCompleted.bind(this)],
      ["cancelTaskManager", this.handleCancelTaskManager.bind(this)],
      ["cleanup", this.handleCleanup.bind(this)],
    ]);
  }

  async handleMessage(ws, message) {
    try {
      const msg = JSON.parse(message);
      const handler = this.handlers.get(msg.action);
      if (handler) {
        await handler(ws, msg);
      } else {
        console.log(`[WSS] Unhandled action: ${msg.action}`);
      }
    } catch (error) {
      console.error("[WSS] Message handling error:", error);
      sendToWebSocket(ws, "error", { error: error.message });
    }
  }

  async handleCodeExecution(ws, { data }) {
    try {
      const result = await this.executorService.executeCode(
        data.language,
        data.code
      );

      sendToWebSocket(ws, "output", result);
    } catch (error) {
      sendToWebSocket(ws, "error", { error: error.message });
    }
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
      sendToWebSocket(ws, "leaderboardUpdate", players);
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
      sendToWebSocket(ws, "leaderboardUpdate", { state, operations });
      console.log(
        "[MessageHandlers] Score updated and leaderboard sent to client"
      );
    } catch (error) {
      console.error("[LeaderboardService] Update score error:", error);
      this.handleError(ws, error);
    }
  }

  async handleStartTasks(ws, data) {
    try {
      console.log("[MessageHandlers] Handling StartTasks action");
      await this.ensureServiceInitialized(ws, "taskManager");

      await ws.taskManager.startTasks(ws, data.data.sessionId);
      console.log(
        "[MessageHandlers] taskManager.startTasks executed successfully"
      );
    } catch (error) {
      console.error("[TaskManager] Start tasks error:", error);
      this.handleError(ws, error);
    }
  }

  async handleSetTasks(ws, { data }) {
    try {
      await this.ensureServiceInitialized(ws, "taskManager");

      const result = await ws.taskManager.initializeTaskQueue(ws, data);
      console.log(
        "[MessageHandlers] Task queue initialized with tasks:",
        result
      );

      sendToWebSocket(ws, "taskUpdate", {
        status: `Task queue initialized with ${result.queueLength} tasks`,
        clusterOperations: result.operations,
      });
    } catch (error) {
      console.error("[TaskManager] Set tasks error:", error);
      sendToWebSocket(ws, "error", { message: error.message });
    }
  }

  async handleTaskCompleted(ws, { data }) {
    try {
      await this.ensureServiceInitialized(ws, "taskManager");

      // First release the lock
      await ws.taskManager.releaseLock(ws, data.sessionId);
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
        sendToWebSocket(ws, "taskCancelled", { status: "success" });
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
      sendToWebSocket(ws, "cleanup", { status: "success" });
    } catch (error) {
      console.error("[Cleanup] Error:", error);
      this.handleError(ws, error);
    }
  }

  async handleInit(ws, _) {
    sendToWebSocket(ws, "initialized", { id: ws.id });
    console.log("[MessageHandlers] Initialization message sent to client");
  }

  handleError(ws, error) {
    console.error("[WSS] Error:", error);
    sendToWebSocket(ws, "error", { message: error.message });
    console.log("[MessageHandlers] Error message sent to client");
  }
}
