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

        <!-- Notifications Section -->
        <div class="notifications">
            <transition-group name="fade" tag="div">
                <div v-for="(notification, index) in notifications" :key="index" class="notification"
                    :class="notification.type">
                    <!-- Add arrow icons based on notification type -->
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
        const notificationQueue = ref([]); // Queue for pending notifications
        const MAX_NOTIFICATIONS = 4; // Maximum visible notifications
        let debounceTimeout = null;
        const DEBOUNCE_DELAY = 200; // milliseconds

        let pendingNotifications = [];

        let addNotification = (message, type) => { // Changed from const to let
            // Push the new notification to the pendingNotifications array
            pendingNotifications.push({ message, type });

            // Debouncing: Delay processing notifications to prevent rapid calls
            if (!debounceTimeout) {
                debounceTimeout = setTimeout(() => {
                    // Process all pending notifications
                    pendingNotifications.forEach(notification => {
                        if (notifications.value.length < MAX_NOTIFICATIONS) {
                            notifications.value.push(notification);
                        } else {
                            notificationQueue.value.push(notification);
                        }
                    });
                    // Clear the pending notifications once processed
                    pendingNotifications = [];
                    // Reset the debounce timeout
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
        const previousScores = ref({}); // Track previous scores

        const updatePlayerHighlight = (playerId) => {
            updatedPlayers.value[playerId] = true;
            setTimeout(() => {
                updatedPlayers.value[playerId] = false;
            }, 2000); // Highlight lasts for 2 seconds
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
                    // Store copies of previous ranks and scores before updating
                    const oldRanks = { ...previousRanks.value };
                    const oldScores = { ...previousScores.value };

                    // Update player scores
                    message.data.players.forEach(updatedPlayer => {
                        const player = players.value.find(p => p.id === updatedPlayer.playerId);
                        if (player) {
                            player.score = updatedPlayer.score;
                        }
                    });

                    // Sort players to get new ranks
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
                                // Do not notify if no changes
                                return;
                            }

                            // Determine notification type
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

                            addNotification(notificationMessage, type); // Pass type
                        }
                    });

                    // Update previousRanks and previousScores after processing all players
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

        // Watch for changes in players to debug
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

        // Modify the addNotification timeout to use removeNotification
        const originalAddNotification = addNotification;
        addNotification = (message, type) => { // Reassignment is now allowed
            originalAddNotification(message, type);
            setTimeout(() => {
                removeNotification();
            }, 4000); // Notification disappears after 4 seconds
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
                'Superman': '#1E90FF',       // DodgerBlue
                'Batman': '#A9A9A9',         // DarkGray
                'Wonder Woman': '#DAA520',   // Goldenrod
                'Flash': '#B22222',          // Firebrick
                'Green Lantern': '#228B22',  // ForestGreen
                'Aquaman': '#8B008B',        // DarkMagenta
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
    /* Center the content */
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
    /* Adjust to fit within page */
    width: 90%;
    /* Further increased width */
    max-width: 900px;
    /* Further increased max-width */
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
    /* Ensure image covers the container */
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

/* Adjust score button colors to create gradient from green to red */
.score-buttons button:nth-child(1) {
    background-color: #4caf50;
}

/* +7, green */
.score-buttons button:nth-child(2) {
    background-color: #8bc34a;
}

/* +3 */
.score-buttons button:nth-child(3) {
    background-color: #cddc39;
}

/* +1 */
.score-buttons button:nth-child(4) {
    background-color: #ffeb3b;
}

/* -1 */
.score-buttons button:nth-child(5) {
    background-color: #ff9800;
}

/* -3 */
.score-buttons button:nth-child(6) {
    background-color: #f44336;
}

/* -7, red */

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

/* Add transition styles for smooth reordering */
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
    /* Changed from right to left */
    z-index: 1000;
}

.notification {
    background-color: #f0f0f0;
    /* Bright background */
    color: #333333;
    /* Dark text */
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
    /* ...existing styles... */
    background-color: #1e1e1e;
    /* Highlighted background */
}

.player-box.updated {
    background-color: #333333;
}

/* Optional: Add a subtle box-shadow when updated */
.player-box.updated {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Notification Type Styles */
.notification.earned {
    background-color: #d4edda;
    /* Light green */
    color: #155724;
    /* Dark green text */
}

.notification.lost {
    background-color: #f8d7da;
    /* Light red */
    color: #721c24;
    /* Dark red text */
}

.notification.rank-up {
    background-color: #d1ecf1;
    /* Light blue */
    color: #0c5460;
    /* Dark blue text */
}

.notification.rank-down {
    background-color: #f1d1ec;
    /* Light pink */
    color: #a71d5d;
    /* Dark pink text */
}

.notification.warning {
    /* Added for warning messages */
    background-color: #fff3cd;
    /* Light yellow */
    color: #856404;
    /* Dark yellow text */
}

.notification .icon {
    margin-right: 8px;
}
</style>
