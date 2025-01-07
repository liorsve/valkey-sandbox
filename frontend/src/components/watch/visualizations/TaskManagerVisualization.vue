<template>
  <div class="task-manager">
    <div class="task-controls">
      <div class="task-panel">
        <div class="control-section">
          <button
            @click="addTask"
            :disabled="!isConnected"
            class="add-task-btn"
          >
            Add Task
          </button>
          <select v-model="selectedTask" class="task-select">
            <option v-for="task in tasks" :key="task.id" :value="task">
              {{ task.action }}
            </option>
          </select>
        </div>
        <div class="tasks-grid">
          <div
            v-for="(task, index) in taskQueue"
            :key="index"
            class="task-item"
          >
            {{ task.action }}
          </div>
        </div>
      </div>
      <div class="control-buttons">
        <button
          v-if="buttonState === 'set'"
          @click="setTasks"
          :disabled="!isConnected || taskQueue.length === 0"
          class="control-btn"
        >
          Set Tasks Queue
        </button>
        <button
          v-else-if="buttonState === 'invoke'"
          @click="invokeTaskManager"
          :disabled="!isConnected"
          class="control-btn"
        >
          Invoke Task Manager
        </button>
        <button
          v-else-if="buttonState === 'cancel'"
          @click="cancelTaskManager"
          class="control-btn cancel"
        >
          Cancel
        </button>
        <button
          v-else-if="buttonState === 'tryAgain'"
          @click="resetTaskManager"
          class="control-btn reset"
        >
          Try Again
        </button>
      </div>
    </div>
    <div class="visual-display">
      <div class="visualization">
        <div ref="logoContainer" class="logo-container">
          <img
            :src="logoSrc"
            alt="Valkey Logo"
            class="valkey-logo"
            ref="logo"
          />
        </div>
        <div ref="lockIcon" class="lock-icon">🔒</div>
        <div ref="unlockIcon" class="unlock-icon">🔓</div>
      </div>
      <div v-if="showEmptyQueuePopup" class="modal-overlay">
        <div class="modal-content">
          <p>Please add tasks to the queue before setting it.</p>
          <button @click="closePopup">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeUnmount, watch, inject } from "vue";
import { useWebSocket } from "@/composables/useWebSocket";
import ValkeyLogo from "@/assets/images/Valkey-logo.svg";

export default {
  name: "TaskManagerVisualization",
  props: {
    ws: {
      type: [WebSocket, Object],
      default: null,
    },
    isConnected: Boolean,
    terminal: Object,
  },
  setup(props, { emit }) {
    const terminalRef = inject("terminal");
    const wsManager = useWebSocket();
    let wsListenerId = null;

    const messageHandler = (event) => {
      try {
        const message = event?.payload
          ? event
          : {
              action: event?.action || "unknown",
              payload: event?.data || event,
            };

        console.log("[TaskManager] Processing message:", message);

        switch (message.action) {
          case "taskUpdate":
            handleTaskUpdate(message.payload);
            break;
          case "gameCommand":
            handleGameCommand(message.payload);
            break;
          case "error":
            terminalWrite(
              `❌ Error: ${message.payload?.error || "Unknown error"}`
            );
            buttonState.value = "tryAgain";
            break;
          case "output":
            if (message.payload?.output) {
              terminalWrite(message.payload.output);
            }
            break;
        }
      } catch (error) {
        console.error("[TaskManager] Message handling error:", error);
        terminalWrite(`❌ Internal error: ${error.message}`);
      }
    };

    const logoSrc = ref(ValkeyLogo);

    const tasks = ref([
      { id: 1, action: "Flip Right" },
      { id: 2, action: "Flip Left" },
      { id: 3, action: "Flip Up" },
      { id: 4, action: "Flip Down" },
      { id: 5, action: "Grow" },
      { id: 6, action: "Shrink" },
      { id: 7, action: "Change Random Color" },
    ]);

    const gameState = ref({
      isProcessing: false,
      currentTask: null,
      taskQueue: [],
      completedTasks: [],
    });

    const selectedTask = ref(tasks.value[0]);
    const taskQueue = ref([]);
    const logoContainer = ref(null);
    const lockIconRef = ref(null);
    const unlockIconRef = ref(null);
    const buttonState = ref("set");
    const showEmptyQueuePopup = ref(false);

    const terminalWrite = (message) => {
      if (props.terminal?.writeln) {
        props.terminal.writeln(message);
      } else if (terminalRef?.value?.writeln) {
        terminalRef.value.writeln(message);
      } else {
        emit("terminal-write", message.trim() + "\n");
      }
    };

    const setupWebSocket = (ws) => {
      if (!ws) return;

      if (wsListenerId) {
        wsManager.removeMessageListener(wsListenerId);
      }

      wsListenerId = wsManager.addMessageListener(
        messageHandler,
        "taskManager"
      );
    };

    watch(
      () => props.ws,
      (newWs) => {
        if (newWs) setupWebSocket(newWs);
      },
      { immediate: true }
    );

    const addTask = () => {
      if (taskQueue.value.length < 6) {
        taskQueue.value.push({
          ...selectedTask.value,
          uniqueId: Date.now() + Math.random().toString(36).substr(2, 9),
        });
      }
    };

    const setTasks = () => {
      if (
        !props.isConnected ||
        !props.ws ||
        props.ws.readyState !== WebSocket.OPEN
      ) {
        terminalWrite("⚠️ Connection not ready. Please wait...");
        return;
      }

      if (taskQueue.value.length === 0) {
        showEmptyQueuePopup.value = true;
        return;
      }

      try {
        const sessionId = `tm_${Date.now()}_${taskQueue.value.length}`;
        const taskData = taskQueue.value.map((task, index) => ({
          id: `${sessionId}_${index}`,
          action: task.action,
          uniqueId: task.uniqueId,
          order: index,
        }));

        terminalWrite(`🔧 Preparing task queue: ${sessionId}`);

        props.ws.send(
          JSON.stringify({
            action: "setTasks",
            data: { sessionId, tasks: taskData },
          })
        );

        gameState.value.sessionId = sessionId;
      } catch (error) {
        console.error("[TaskManager] Error setting tasks:", error);
        terminalWrite(`❌ Error: ${error.message}`);
      }
    };

    const invokeTaskManager = () => {
      if (!gameState.value.sessionId) {
        terminalWrite("⚠️ No active task session");
        return;
      }

      props.ws.send(
        JSON.stringify({
          action: "invokeTaskManager",
          data: { sessionId: gameState.value.sessionId },
        })
      );

      terminalWrite("🚀 Starting task execution...");
      buttonState.value = "cancel";
    };

    const cancelTaskManager = () => {
      props.ws.send(
        JSON.stringify({
          action: "cancelTaskManager",
        })
      );
      terminalWrite("⛔ Task Manager cancelled.\n");
      buttonState.value = "tryAgain";
    };

    const resetTaskManager = () => {
      taskQueue.value = [];
      buttonState.value = "set";
      terminalWrite("🔄 Reset complete. Please add tasks.\n");
    };

    const handleTaskUpdate = (data) => {
      if (data?.status) {
        terminalWrite(` ℹ️ ${data.status}`);
        if (data.status.includes("initialized")) {
          buttonState.value = "invoke";
        }
      }
      if (data?.operations?.length) {
        data.operations.forEach((op) => {
          terminalWrite(`🔷 ${op}`);
        });
      }
    };

    const handleGameCommand = (command) => {
      if (!command || typeof command !== "object") return;

      console.log("[TaskManager] Game command:", command);
      if (command.operations?.length) {
        command.operations.forEach((op) => terminalWrite(` 🔷 ${op}`));
      }

      if (command.step) {
        terminalWrite(` Step: ${command.step}`);
      }

      switch (command.type) {
        case "lockAcquired":
          gameState.value.isProcessing = true;
          terminalWrite(" 🔒 Lock acquired in Valkey Cluster");
          animateLocking(true);
          break;

        case "performTask":
          if (command.task) {
            gameState.value.currentTask = command.task;
            terminalWrite(`⚡ Executing task: ${command.task}`);
            performTask(command.task);
          }
          break;

        case "lockReleased":
          gameState.value.isProcessing = false;
          terminalWrite(" 🔓 Lock released in Valkey Cluster");
          animateLocking(false);
          break;

        case "complete":
          gameState.value.isProcessing = false;
          gameState.value.currentTask = null;
          terminalWrite(" ✅ All tasks completed successfully");
          buttonState.value = "tryAgain";
          break;
      }
    };

    const showLockAnimation = async () => {
      lockIconRef.value?.classList.add("show", "grow");
      await new Promise((r) => setTimeout(r, 1000));
      lockIconRef.value?.classList.add("fade-out");
      await new Promise((r) => setTimeout(r, 800));
      lockIconRef.value?.classList.remove("show", "grow", "fade-out");
    };

    const showUnlockAnimation = async () => {
      unlockIconRef.value?.classList.add("show", "shrink");
      await new Promise((r) => setTimeout(r, 1000));
      unlockIconRef.value?.classList.add("fade-out");
      await new Promise((r) => setTimeout(r, 800));
      unlockIconRef.value?.classList.remove("show", "shrink", "fade-out");
    };

    const executeTaskAnimation = async (el, taskAction) => {
      await new Promise((r) => setTimeout(r, 300));

      switch (taskAction) {
        case "Flip Right":
          el.style.transform = `rotateY(180deg)`;
          break;
        case "Flip Left":
          el.style.transform = `rotateY(-180deg)`;
          break;
        case "Flip Up":
          el.style.transform = `rotateX(-180deg)`;
          break;
        case "Flip Down":
          el.style.transform = `rotateX(180deg)`;
          break;
        case "Grow":
          el.style.transform = `scale(1.5)`;
          break;
        case "Shrink":
          el.style.transform = `scale(0.5)`;
          break;
        case "Change Random Color": {
          const color = getRandomColor();
          el.style.filter = `drop-shadow(0 0 15px ${color}) brightness(1.3) hue-rotate(${
            Math.random() * 360
          }deg)`;
          break;
        }
      }

      await new Promise((r) => setTimeout(r, 1000));
      if (taskAction === "Change Random Color") {
        el.style.filter =
          "drop-shadow(0 0 15px var(--accent-highlight)) brightness(1.3)";
      } else {
        el.style.transform = "none";
      }
      await new Promise((r) => setTimeout(r, 300));
    };

    const animateTask = async (taskAction) => {
      const el = logoContainer.value?.querySelector(".valkey-logo");
      if (!el) return;

      await showLockAnimation();

      await executeTaskAnimation(el, taskAction);

      await showUnlockAnimation();
    };

    const performTask = async (taskAction) => {
      try {
        await animateTask(taskAction);
        if (props.ws?.readyState === WebSocket.OPEN) {
          props.ws.send(
            JSON.stringify({
              action: "taskCompleted",
              data: {
                status: "completed",
                sessionId: gameState.value.sessionId,
              },
            })
          );
        }
      } catch (error) {
        console.error("[TaskManager] Task execution error:", error);
      }
    };

    const getRandomColor = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const animateLocking = (isLocked) => {
      const el = logoContainer.value?.querySelector(".valkey-logo");
      if (!el) return;
      if (isLocked) {
        el.classList.add("locked");
        terminalWrite(" 🔒 Lock acquired.\n");
      } else {
        el.classList.remove("locked");
      }
    };

    const closePopup = () => {
      showEmptyQueuePopup.value = false;
    };

    const cleanup = () => {
      if (wsListenerId) {
        wsManager.removeMessageListener(wsListenerId);
        wsListenerId = null;
      }
      if (props.ws?.readyState === WebSocket.OPEN) {
        try {
          props.ws.send(
            JSON.stringify({
              action: "cleanup",
              data: {
                force: true,
                component: "taskManager",
              },
            })
          );
        } catch (error) {
          console.error("[TaskManager] Cleanup error:", error);
        }
      }
      taskQueue.value = [];
      buttonState.value = "set";
      gameState.value = {
        isProcessing: false,
        currentTask: null,
        taskQueue: [],
        completedTasks: [],
      };
    };

    onBeforeUnmount(() => {
      cleanup();
    });

    watch(
      () => props.isConnected,
      (newState) => {
        if (newState) {
          terminalWrite(" 🔗 Connection established");
        } else {
          terminalWrite(" ⚠️ Connection lost");
          buttonState.value = "set";
        }
      }
    );

    return {
      tasks,
      selectedTask,
      taskQueue,
      addTask,
      setTasks,
      invokeTaskManager,
      cancelTaskManager,
      resetTaskManager,
      lockIcon: lockIconRef,
      unlockIcon: unlockIconRef,
      buttonState,
      showEmptyQueuePopup,
      closePopup,
      handleGameCommand,
      cleanup,
      logoSrc,
      logoContainer,
      gameState,
      handleTaskUpdate,
    };
  },
};
</script>

<style scoped>
.task-manager {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--surface-dark);
  padding: 20px;
  overflow: hidden;
  gap: 15px;
  justify-content: flex-start;
  min-height: auto;
}

:deep(.terminal-container) {
  flex: 1;
  min-height: 350px;
  margin-top: 20px;

  height: calc(100% - 350px) !important;

  min-height: unset !important;
}

.task-panel {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  background-color: var(--surface-lighter);

  border: 1px solid var(--accent-highlight);
  box-shadow: 0 0 10px rgba(0, 195, 255, 0.1);
  border-radius: 6px;
  padding: 15px;
  height: auto;
  min-height: 80px;
}

.control-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 150px;
}

.add-task-btn {
  background: linear-gradient(135deg, var(--accent-1), var(--accent-3));
  border: 1px solid var(--accent-highlight);
  padding: 12px;
  border-radius: 6px;
  transition: all 0.3s ease;
  border: none;
  color: var(--text-primary);
}

.add-task-btn:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
  box-shadow: var(--fun-shadow);
}

.task-select {
  background-color: var(--surface-lighter);
  border: 1px solid var(--accent-highlight);
  padding: 10px;
  border-radius: 6px;
  width: 100%;
  color: var(--text-primary);
}

.tasks-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  overflow-y: auto;
  padding-right: 5px;
  align-content: center;
}

.task-item {
  background: linear-gradient(
    145deg,
    var(--surface-light),
    var(--surface-lighter)
  );
  border: 1px solid var(--accent-cyan);
  padding: 12px;
  border-radius: 6px;
  color: var(--text-primary);
  transition: all 0.3s ease;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.task-item:hover {
  border-color: var(--accent-highlight);
  box-shadow: 0 0 10px rgba(0, 195, 255, 0.2);
  background: linear-gradient(
    145deg,
    var(--surface-lighter),
    var(--surface-light)
  );
  transform: translateY(-1px);
}

.task-creation {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.task-creation select,
.task-creation button {
  padding: 12px 20px;
  font-size: 16px;
  background-color: #1e1e1e;
  color: #fff;
  border: none;
  border-radius: 6px;
}

.task-creation select {
  flex: 1;
  min-width: 200px;
}

.task-creation button {
  background-color: #6a11cb;
  transition: background-color 0.3s;
}

.task-creation button:hover {
  background-color: #2575fc;
  transform: translateY(-1px);
}

.task-queue {
  list-style: none;
  padding: 0;
  margin-bottom: 10px;
  max-height: 300px;
  overflow-y: auto;
  flex: 5 !important;
  min-height: 400px !important;
  background-color: #1e1e1e;
  border-radius: 6px;
  padding: 15px;
  margin: 0;
}

.task-queue li {
  background-color: #2a2a2a;
  padding: 12px 20px;
  margin-bottom: 8px;
  border-radius: 6px;
  color: #fff;
  transition: background-color 0.3s ease;
}

.task-queue li:hover {
  background-color: #333;
}

button {
  background-color: #6a11cb;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: #2575fc;
  transform: translateY(-1px);
}

.visualization {
  position: relative !important;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 !important;
  width: 100%;
  border-radius: var(--radius-lg) !important;
}

.logo-container {
  position: absolute;
  left: 50%;
  top: 75%;
  transform: translateX(-50%) translateY(-50%);
  transition: all 0.6s ease-in-out;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.valkey-logo {
  width: 100%;
  height: 100%;
  transition: all 0.6s ease-in-out;
  transform-origin: center;
  filter: drop-shadow(0 0 15px var(--accent-highlight)) brightness(1.3);
}

.lock-icon,
.unlock-icon {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  font-size: 96px;
  opacity: 0;
  transition: all 0.8s ease-in-out;
  z-index: 2;
}

.show {
  opacity: 1;
}

.grow {
  transform: translate(-50%, -50%) scale(6);
}

.shrink {
  transform: translate(-50%, -50%) scale(6);
  animation: shrinkAnimation 1.2s ease-in-out forwards;
}

.fade-out {
  opacity: 0;
}

@keyframes shrinkAnimation {
  0% {
    transform: translate(-50%, -50%) scale(6);
    opacity: 1;
  }

  100% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
}

.locked .valkey-logo {
  opacity: 0.9;

  filter: drop-shadow(0 0 20px var(--primary-color)) brightness(1.3);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--surface-light);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: var(--fun-shadow);
  border: 1px solid var(--border-color);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.modal-content p {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
}

.modal-content button {
  background-color: #6a11cb;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.modal-content button:hover {
  background-color: #2575fc;
}

.tasks-grid::-webkit-scrollbar {
  width: 8px;
}

.tasks-grid::-webkit-scrollbar-track {
  background: #1e1e1e;
}

.tasks-grid::-webkit-scrollbar-thumb {
  background: #4a148c;
  border-radius: 4px;
}

.tasks-grid::-webkit-scrollbar-thumb:hover {
  background: #6a1b9a;
}

.control-buttons {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

.control-btn {
  min-width: 200px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  background: linear-gradient(135deg, var(--accent-1), var(--accent-3));
  border: 1px solid var(--accent-highlight);
  box-shadow: 0 0 10px rgba(0, 195, 255, 0.1);
  color: var(--text-primary);
  border: none;
  box-shadow: var(--fun-shadow);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-btn:hover {
  box-shadow: 0 0 15px rgba(0, 195, 255, 0.2);
  transform: translateY(-1px);
  box-shadow: var(--glow-effect);
}

.control-btn.cancel {
  background: linear-gradient(135deg, var(--error-color), var(--error-hover));
}

.control-btn.reset {
  background: linear-gradient(
    135deg,
    var(--success-color),
    var(--success-hover)
  );
}

.task-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--surface-dark);
  padding: 1rem;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  margin-bottom: 1rem;
}

.visual-display {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    145deg,
    var(--surface-light),
    var(--surface-dark)
  );
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  box-shadow: 0 0 15px rgba(0, 195, 255, 0.1);
  padding: 1rem !important;
  position: relative;
  justify-content: center;
}
</style>
