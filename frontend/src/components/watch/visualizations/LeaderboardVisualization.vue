<template>
  <div class="leaderboard">
    <transition name="fade" mode="out-in">
      <div v-if="!gameStarted" key="pregame" class="pregame-container">
        <div class="players-grid">
          <div
            v-for="player in initialPlayers"
            :key="`pre-${player.id}`"
            class="player-card"
          >
            <img :src="player.photo" :alt="player.name" class="player-avatar" />
            <div class="player-name">{{ player.name }}</div>
          </div>
        </div>
        <button
          class="start-game-btn"
          @click="startGame"
          :disabled="!isConnected || !ws"
        >
          {{ wsButtonText }}
        </button>
      </div>
      <div v-else key="game" class="game-container">
        <transition-group tag="div" name="list" class="player-list">
          <div
            v-for="(player, index) in sortedPlayers"
            :key="`player-${player.id}-${player.score}`"
            class="player-row"
            :class="{ 'score-changed': updatedPlayers[player.id] }"
          >
            <div class="player-info">
              <div class="player-rank">#{{ index + 1 }}</div>
              <img
                :src="player.photo"
                :alt="player.name"
                class="player-avatar"
              />
              <div class="player-details">
                <div class="player-name">{{ player.name }}</div>
                <div class="player-score">Score: {{ player.score }}</div>
              </div>
            </div>
            <div class="score-buttons">
              <button @click="updatePlayerScore(player.id, 7)">+7</button>
              <button @click="updatePlayerScore(player.id, 3)">+3</button>
              <button @click="updatePlayerScore(player.id, 1)">+1</button>
              <button @click="updatePlayerScore(player.id, -1)">-1</button>
              <button @click="updatePlayerScore(player.id, -3)">-3</button>
              <button @click="updatePlayerScore(player.id, -7)">-7</button>
            </div>
          </div>
        </transition-group>
      </div>
    </transition>
    <div class="notifications">
      <transition-group name="fade" tag="div">
        <div
          v-for="(notification, index) in notifications"
          :key="`notification-${index}`"
          class="notification"
          :class="notification.type"
        >
          <span v-if="notification.type === 'earned'">⬆️</span>
          <span v-if="notification.type === 'lost'">⬇️</span>
          <span v-if="notification.type === 'rank-up'">🔼</span>
          <span v-if="notification.type === 'rank-down'">🔽</span>
          {{ notification.message }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { ref, computed, onBeforeUnmount, inject, watch } from "vue";
import { useWebSocket } from "@/composables/useWebSocket";
import supermanImg from "@/assets/images/superman.jpg";
import batmanImg from "@/assets/images/batman.jpg";
import wonderWomanImg from "@/assets/images/wonder_woman.jpg";
import flashImg from "@/assets/images/flash.jpg";
import greenLanternImg from "@/assets/images/green_lantern.jpg";
import aquamanImg from "@/assets/images/aquaman.jpg";

export default {
  name: "LeaderboardVisualization",
  props: {
    ws: {
      type: [WebSocket, Object],
      default: null,
    },
    isConnected: {
      type: Boolean,
      default: false,
    },
    terminal: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const terminalRef = inject("terminal");
    const wsManager = useWebSocket();
    let wsListenerId = null;

    let debounceTimeout = null;
    const DEBOUNCE_DELAY = 300;
    const MAX_NOTIFICATIONS = 5;

    const gameStarted = ref(false);
    const updatedPlayers = ref({});
    const players = ref([]);
    const notifications = ref([]);
    const notificationQueue = ref([]);
    const playerScores = ref({});

    const initialPlayers = [
      { id: 1, name: "Superman", score: 0, photo: supermanImg },
      { id: 2, name: "Batman", score: 0, photo: batmanImg },
      { id: 3, name: "Wonder Woman", score: 0, photo: wonderWomanImg },
      { id: 4, name: "Flash", score: 0, photo: flashImg },
      { id: 5, name: "Green Lantern", score: 0, photo: greenLanternImg },
      { id: 6, name: "Aquaman", score: 0, photo: aquamanImg },
    ];

    players.value = [...initialPlayers];

    const sortedPlayers = computed(() => {
      return Object.entries(playerScores.value)
        .map(([id, score]) => {
          const player = initialPlayers.find((p) => p.id === parseInt(id));
          return {
            ...player,
            score,
          };
        })
        .sort((a, b) => b.score - a.score);
    });

    const wsButtonText = computed(() => {
      if (!props.isConnected) {
        return "Waiting for Connection...";
      }
      if (!gameStarted.value) {
        return "Start Game";
      }
      return "Game in Progress";
    });

    const sendWebSocketMessage = (message) => {
      if (props.ws?.readyState === WebSocket.OPEN) {
        props.ws.send(JSON.stringify(message));
        return true;
      } else {
        console.warn("[WS] Cannot send message, WebSocket not connected");
        return false;
      }
    };

    const startGame = () => {
      if (!props.ws?.readyState === WebSocket.OPEN) return;

      if (
        sendWebSocketMessage({
          action: "startGame",
          data: { initialize: true },
        })
      ) {
        terminalWrite("🎲  Starting game...");
      }
    };

    const updatePlayerScore = (playerId, change) => {
      if (!props.isConnected || !props.ws || !playerId) return;

      if (
        sendWebSocketMessage({
          action: "updateScore",
          data: {
            playerId: parseInt(playerId),
            change: parseInt(change),
          },
        })
      ) {
        updatedPlayers.value[playerId] = true;
        setTimeout(() => {
          updatedPlayers.value[playerId] = false;
        }, 1000);
      }
    };

    const handleLeaderboardUpdate = (data) => {
      if (!data) {
        console.error("[Leaderboard] No data provided");
        return;
      }

      if (gameStarted.value === false) {
        gameStarted.value = true;
        console.debug("[Leaderboard] Game started");
      }

      const playerData = Array.isArray(data)
        ? data
        : data.state
        ? data.state
        : typeof data === "object"
        ? [data]
        : null;

      if (!playerData) {
        console.error("[Leaderboard] Invalid data format:", data);
        return;
      }

      const oldScores = { ...playerScores.value };

      playerData.forEach((player) => {
        if (!player || typeof player.id !== "number") return;

        const initialPlayer = initialPlayers.find((p) => p.id === player.id);
        if (!initialPlayer) return;

        const oldScore = oldScores[player.id] || 0;
        const newScore = parseInt(player.score || 0);

        playerScores.value[player.id] = newScore;

        if (newScore !== oldScore) {
          updatedPlayers.value[player.id] = true;
          setTimeout(() => {
            updatedPlayers.value[player.id] = false;
          }, 1000);

          addNotification({
            message: `${initialPlayer.name} ${
              newScore > oldScore ? "gained" : "lost"
            } ${Math.abs(newScore - oldScore)} points`,
            type: newScore > oldScore ? "earned" : "lost",
          });
        }
      });

      if (data?.operations?.length) {
        data.operations.forEach((op) => {
          console.debug("[Leaderboard] Operation:", op);
          terminalWrite(`\x1b[2m${op}\x1b[0m`);
        });
      }
    };

    const handleWebSocketMessage = (event) => {
      try {
        console.log("[LeaderboardVisualization] WebSocket message:", event);

        const message = event?.payload
          ? event
          : {
              action: event?.action || "unknown",
              payload: event?.data || event,
            };

        if (message.action === "leaderboardUpdate") {
          if (message.payload?.state) {
            handleLeaderboardUpdate(message.payload.state);
          }
          if (message.payload?.operations) {
            handleOperations(message.payload.operations);
          }
        } else {
          console.debug(
            "[LeaderboardVisualization] Unhandled message action:",
            message.action
          );
        }
      } catch (error) {
        console.error("[LeaderboardVisualization] Error:", error);
      }
    };

    const handleOperations = (operations) => {
      if (!Array.isArray(operations)) return;

      operations.forEach((op) => {
        terminalWrite(`\x1b[2m${op}\x1b[0m`);
      });
    };

    const addNotification = (notification) => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      debounceTimeout = setTimeout(() => {
        if (notifications.value.length >= MAX_NOTIFICATIONS) {
          notificationQueue.value.push(notification);
        } else {
          notifications.value.push(notification);
        }

        setTimeout(() => removeNotification(), 4000);
        debounceTimeout = null;
      }, DEBOUNCE_DELAY);
    };

    const removeNotification = () => {
      notifications.value.shift();
      if (notificationQueue.value.length > 0) {
        notifications.value.push(notificationQueue.value.shift());
      }
    };

    const initializeWebSocketListener = (ws) => {
      if (!ws) return;

      cleanupWebSocketListener();

      wsListenerId = wsManager.addMessageListener(
        handleWebSocketMessage,
        "leaderboard"
      );
      console.log("[Leaderboard] Registered WebSocket listener");
    };

    const cleanupWebSocketListener = () => {
      if (wsListenerId) {
        wsManager.removeMessageListener(wsListenerId);
        wsListenerId = null;
        console.log("[Leaderboard] Cleaned up WebSocket listener");
      }
    };

    watch(
      () => props.ws,
      (newWs) => {
        if (newWs) initializeWebSocketListener(newWs);
      },
      { immediate: true }
    );

    onBeforeUnmount(() => {
      cleanupWebSocketListener();
    });

    const cleanup = () => {
      if (wsListenerId) {
        wsManager.removeMessageListener(wsListenerId);
        wsListenerId = null;
      }

      gameStarted.value = false;
      players.value = [...initialPlayers];
      notifications.value = [];
      notificationQueue.value = [];

      if (props.ws?.readyState === WebSocket.OPEN) {
        props.ws.send(
          JSON.stringify({
            action: "cleanup",
            data: {
              component: "leaderboard",
              force: true,
            },
          })
        );
      }
    };

    const terminalWrite = (message) => {
      if (props.terminal?.writeln) {
        props.terminal.writeln(message);
      } else if (terminalRef?.value?.writeln) {
        terminalRef.value.writeln(message);
      } else {
        console.debug("[Leaderboard] Terminal message:", message);
      }
    };

    onBeforeUnmount(() => {
      cleanup();
    });

    players.value.forEach((player) => {
      playerScores.value[player.id] = player.score;
    });

    return {
      initialPlayers,
      sortedPlayers,
      gameStarted,
      updatedPlayers,
      notifications,
      startGame,
      updatePlayerScore,
      terminalWrite,
      cleanup,
      wsButtonText,
    };
  },
};
</script>

<style scoped>
.leaderboard {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #121212;
  padding: 20px;
  overflow: hidden;
  gap: 15px;
  justify-content: space-between;
}

.pregame-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 30px;
}

.players-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
  max-width: 900px;
  width: 100%;
  padding: 40px;
}

.player-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(145deg, #1e1e1e, #2a2a2a);
  border-radius: 15px;
  transition: transform 0.3s ease;
}

.player-card:hover {
  transform: translateY(-5px);
}

.player-avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #333;
}

.game-container {
  height: 100%;
  overflow-y: auto;
}

.player-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.player-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.player-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.player-details {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.player-rank {
  font-size: 24px;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
}

.score-changed {
  animation: highlight 1s ease-in-out;
}

@keyframes highlight {
  0%,
  100% {
    background-color: #1e1e1e;
  }

  50% {
    background-color: #333;
  }
}

.button-container {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 10px;
  background: linear-gradient(to top, #121212 50%, transparent);
  z-index: 10;
}

.players-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.player-box.pre-game {
  width: 150px;
  height: 200px;
  padding: 10px;
  margin: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(145deg, #1e1e1e, #2a2a2a);
  border: 2px solid #333;
  transform: none;
  transition: all 0.3s ease;
}

.player-box.pre-game:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-color: #666;
}

.player-box.pre-game .player-image {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin: 0;
}

.player-preview-name {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}

.player-box.in-game {
  width: 100%;
  max-width: 800px;
  margin: 10px auto;
  transform: none;
  animation: slideIn 0.3s ease-out;
}

.player-rank {
  width: 50px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.player-image {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin: 0 20px;
  object-fit: cover;
}

.player-info {
  flex: 1;
  margin-right: 20px;
}

.player-info .player-name {
  font-size: 20px;
  font-weight: bold;
}

.player-info .player-score {
  font-size: 16px;
  color: #888;
}

.score-buttons {
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.score-buttons button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
}

.score-buttons button:nth-child(1) {
  background-color: #4caf50;
}

.score-buttons button:nth-child(2) {
  background-color: #8bc34a;
}

.score-buttons button:nth-child(3) {
  background-color: #cddc39;
}

.score-buttons button:nth-child(4) {
  background-color: #ffeb3b;
}

.score-buttons button:nth-child(5) {
  background-color: #ff9800;
}

.score-buttons button:nth-child(6) {
  background-color: #f44336;
}

.score-buttons button:hover {
  opacity: 0.8;
}

.start-game-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff1744;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.start-game-btn:hover {
  background-color: #f01440;
}

@media (max-width: 768px) {
  .player-box {
    flex-direction: column;
    align-items: center;
  }

  .player-info {
    margin-right: 0;
    text-align: center;
    margin-bottom: 10px;
  }

  .score-buttons {
    justify-content: center;
  }
}

.player-enter-active,
.player-leave-active {
  transition: all 0.5s ease;
}

.player-enter-from,
.player-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.notifications {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
}

.notification {
  background-color: #f0f0f0;
  color: #333333;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  opacity: 0.95;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.player-box {
  background-color: #1e1e1e;
}

.player-box.updated {
  background-color: #333333;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.notification.earned {
  background-color: #d4edda;
  color: #155724;
}

.notification.lost {
  background-color: #f8d7da;
  color: #721c24;
}

.notification.rank-up {
  background-color: #d1ecf1;
  color: #0c5460;
}

.notification.rank-down {
  background-color: #f1d1ec;
  color: #a71d5d;
}

.notification.warning {
  background-color: #fff3cd;
}

.notification .icon {
  color: #856404;
  margin-right: 8px;
}

.players-container {
  width: 100%;
  position: relative;
}

.player-box {
  transition: all 0.5s ease-in-out;
  position: relative;
  transform: translateY(calc(var(--rank) * 120px));
}

.score-changed {
  animation: highlight 2s ease-in-out;
  z-index: 1;
}

@keyframes highlight {
  0%,
  100% {
    background-color: #1e1e1e;
  }

  50% {
    background-color: #333333;
    transform: translateY(calc(var(--rank) * 90px)) scale(1.02);
  }
}

.notification {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.player-box.pre-game {
  width: 120px;
  height: 120px;
  padding: 5px;
  margin: 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: scale(0.9);
  will-change: transform, width, height;
}

.player-box.pre-game .player-image {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: width, height;
}

.player-box.in-game {
  width: 90%;
  max-width: 900px;
  border-radius: 10px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(calc(var(--rank) * 90px));
  will-change: transform, width, height;
}

.player-enter-active.in-game,
.player-leave-active.in-game {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: 90%;
  max-width: 900px;
}

.player-enter-from.in-game,
.player-leave-to.in-game {
  opacity: 0;
  transform: translateY(-20px);
}

.players-container:has(.in-game) {
  display: block;
  position: relative;
  height: 600px;
  padding-top: 10px;
}

.players-container:has(.pre-game) {
  display: flex;
  height: auto;
  min-height: 300px;
}

.player-image {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.score-changed {
  animation: highlight 2s ease-in-out;
  z-index: 1;
}

@keyframes highlight {
  0%,
  100% {
    background-color: #1e1e1e;
  }

  50% {
    background-color: #333333;
    transform: translateY(calc(var(--rank) * 90px)) scale(1.02);
  }
}

.start-game-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #666;
  min-width: 200px;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}

.player-row {
  background: linear-gradient(145deg, #1e1e1e, #2a2a2a);
  border: 1px solid #333;
  margin: 10px 0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.player-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid #333;
  object-fit: cover;
}

.player-name {
  font-size: 18px;
  font-weight: bold;
}

.player-score {
  font-size: 16px;
  color: #888;
}
</style>
