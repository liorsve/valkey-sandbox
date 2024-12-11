<template>
    <div class="leaderboard" ref="leaderboardRef">
        <transition-group name="player" tag="div">
            <div v-for="(player, index) in sortedPlayers" :key="player.id" class="player-box"
                :style="getPlayerStyle(player)">
                <div class="player-rank">{{ index + 1 }}</div>
                <img :src="player.photo" alt="Player Image" class="player-image" />
                <div class="player-info">
                    <div class="player-name">{{ player.name }}</div>
                    <div class="player-score">Score: {{ player.score }}</div>
                </div>
                <div class="score-buttons">
                    <button @click="changeScore(player.id, 7)">+7</button>
                    <button @click="changeScore(player.id, 3)">+3</button>
                    <button @click="changeScore(player.id, 1)">+1</button>
                    <button @click="changeScore(player.id, -1)">-1</button>
                    <button @click="changeScore(player.id, -3)">-3</button>
                    <button @click="changeScore(player.id, -7)">-7</button>
                </div>
            </div>
        </transition-group>
        <button class="start-game-btn" @click="startGame">Start Game</button>

        <div class="notifications">
            <transition-group name="fade" tag="div">
                <div v-for="(notification, index) in notifications" :key="index" class="notification"
                    :class="notification.type">
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
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import supermanImg from '@/assets/images/superman.jpg';
import batmanImg from '@/assets/images/batman.jpg';
import wonderWomanImg from '@/assets/images/wonder_woman.jpg';
import flashImg from '@/assets/images/flash.jpg';
import greenLanternImg from '@/assets/images/green_lantern.jpg';
import aquamanImg from '@/assets/images/aquaman.jpg';

export default {
    name: 'LeaderboardComponent',
    setup(props, { emit }) {
        const players = ref([
            { id: 1, name: 'Superman', photo: supermanImg, score: 0 },
            { id: 2, name: 'Batman', photo: batmanImg, score: 0 },
            { id: 3, name: 'Wonder Woman', photo: wonderWomanImg, score: 0 },
            { id: 4, name: 'Flash', photo: flashImg, score: 0 },
            { id: 5, name: 'Green Lantern', photo: greenLanternImg, score: 0 },
            { id: 6, name: 'Aquaman', photo: aquamanImg, score: 0 },
        ]);

        const sortedPlayers = computed(() => {
            return [...players.value].sort((a, b) => b.score - a.score);
        });

        const ws = ref(null);

        const startGame = () => {
            if (ws.value && ws.value.readyState === WebSocket.OPEN) {
                ws.value.send(JSON.stringify({ action: 'startGame' }));
                terminalWrite('Sent start game command to server.');
            }
        };

        const notifications = ref([]);
        const notificationQueue = ref([]);
        const MAX_NOTIFICATIONS = 4;
        let debounceTimeout = null;
        const DEBOUNCE_DELAY = 200;

        let pendingNotifications = [];

        let addNotification = (message, type) => {
            pendingNotifications.push({ message, type });

            if (!debounceTimeout) {
                debounceTimeout = setTimeout(() => {
                    pendingNotifications.forEach(notification => {
                        if (notifications.value.length < MAX_NOTIFICATIONS) {
                            notifications.value.push(notification);
                        } else {
                            notificationQueue.value.push(notification);
                        }
                    });
                    pendingNotifications = [];
                    debounceTimeout = null;
                }, DEBOUNCE_DELAY);
            }
        };

        const removeNotification = () => {
            notifications.value.shift();
            if (notificationQueue.value.length > 0) {
                notifications.value.push(notificationQueue.value.shift());
            }
        };

        const updatedPlayers = ref({});
        const previousRanks = ref({});
        const previousScores = ref({});

        const updatePlayerHighlight = (playerId) => {
            updatedPlayers.value[playerId] = true;
            setTimeout(() => {
                updatedPlayers.value[playerId] = false;
            }, 2000);
        };

        const changeScore = (playerId, change) => {
            try {
                const player = players.value.find(p => p.id === playerId);
                if (player && ws.value && ws.value.readyState === WebSocket.OPEN) {
                    ws.value.send(JSON.stringify({ action: 'updateScore', data: { playerId, change } }));
                    terminalWrite(`Sent score update for player ${player.name}: Change of ${change} points.`);
                    updatePlayerHighlight(playerId);
                } else {
                    const warning = `Player with ID ${playerId} not found or WebSocket not open.`;
                    console.warn(warning);
                    addNotification(warning, 'warning');
                }
            } catch (error) {
                console.error('Error sending score update:', error);
            }
        };

        const connectWebSocket = () => {
            const wsUrl = getWebSocketUrl();
            ws.value = new WebSocket(wsUrl);
            ws.value.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.action === 'updateLeaderboard') {
                    const oldRanks = { ...previousRanks.value };
                    const oldScores = { ...previousScores.value };

                    message.data.players.forEach(updatedPlayer => {
                        const player = players.value.find(p => p.id === updatedPlayer.playerId);
                        if (player) {
                            player.score = updatedPlayer.score;
                        }
                    });

                    const newSorted = [...players.value].sort((a, b) => b.score - a.score);

                    newSorted.forEach((player, index) => {
                        const newRank = index + 1;
                        const oldRank = oldRanks[player.id] || newRank;
                        const newScore = player.score;
                        const oldScore = oldScores[player.id] || newScore;

                        let scoreChanged = oldScore !== newScore;
                        let rankChanged = oldRank !== newRank;

                        if (scoreChanged || rankChanged) {
                            let notificationMessage = `${player.name} `;

                            if (scoreChanged) {
                                notificationMessage += newScore > oldScore
                                    ? `earned ${newScore - oldScore} points`
                                    : `lost ${oldScore - newScore} points`;
                            }

                            if (rankChanged) {
                                notificationMessage += scoreChanged ? ', and ' : '';
                                notificationMessage += `moved ${newRank < oldRank ? 'up' : 'down'} from position ${oldRank} to ${newRank}!`;
                            } else if (scoreChanged) {
                                notificationMessage += '.';
                            }

                            if (!rankChanged && !scoreChanged) {
                                return;
                            }

                            let type = '';
                            if (scoreChanged && newScore > oldScore) {
                                type = 'earned';
                            } else if (scoreChanged && newScore < oldScore) {
                                type = 'lost';
                            } else if (rankChanged && newRank < oldRank) {
                                type = 'rank-up';
                            } else if (rankChanged && newRank > oldRank) {
                                type = 'rank-down';
                            }

                            addNotification(notificationMessage, type);
                        }
                    });

                    newSorted.forEach((player, index) => {
                        previousRanks.value[player.id] = index + 1;
                        previousScores.value[player.id] = player.score;
                    });

                    terminalWrite('Received updated leaderboard from server.');
                }
            };
            ws.value.onopen = () => {
                terminalWrite('WebSocket connection established.');
            };
            ws.value.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        };

        const getWebSocketUrl = () => {
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            return `${protocol}//${window.location.host}/appws`;
        };

        const leaderboardRef = ref(null);

        watch(players, (newPlayers) => {
            console.log('Players updated:', newPlayers);
        }, { deep: true });

        onMounted(() => {
            connectWebSocket();
            emit('terminal-resize', 'double-height');
        });

        onBeforeUnmount(() => {
            if (ws.value) {
                ws.value.close();
            }
            emit('terminal-resize', 'normal-height');
        });

        const terminalWrite = (message) => {
            emit('terminal-write', message.trim() + '\n');
        };

        const originalAddNotification = addNotification;
        addNotification = (message, type) => {
            originalAddNotification(message, type);
            setTimeout(() => {
                removeNotification();
            }, 4000);
        };

        return {
            players,
            sortedPlayers,
            changeScore,
            leaderboardRef,
            startGame,
            notifications,
            updatedPlayers,
            addNotification,
            updatePlayerHighlight,
        };
    },
    methods: {
        getPlayerStyle(player) {
            const borderColors = {
                'Superman': '#1E90FF',
                'Batman': '#A9A9A9',
                'Wonder Woman': '#DAA520',
                'Flash': '#B22222',
                'Green Lantern': '#228B22',
                'Aquaman': '#8B008B',
            };
            return {
                borderColor: borderColors[player.name] || '#fff',
                transition: 'background-color 0.5s ease',
                backgroundColor: this.updatedPlayers[player.id] ? '#333333' : '#1e1e1e',
            };
        },
    },
};
</script>

<style scoped>
.leaderboard {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 20px;
    background-color: #121212;
    align-items: center;
}

.player-box {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #1e1e1e;
    border: 3px solid;
    border-radius: 10px;
    display: flex;
    align-items: center;
    transition: transform 0.5s ease-in-out;
    max-width: 90%;
    width: 90%;
    max-width: 900px;
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
    top: 20px;
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
    color: #856404;
}

.notification .icon {
    margin-right: 8px;
}
</style>
