<template>
    <div class="leaderboard" ref="leaderboardRef">
        <div v-for="(player, index) in sortedPlayers" :key="player.id" class="player-box">
            <div class="player-rank">{{ index + 1 }}</div> <!-- Display rank based on index -->
            <img :src="player.photo" alt="Player Image" class="player-image" /> <!-- Changed 'image' to 'photo' -->
            <div class="player-info">
                <div class="player-name">{{ player.name }}</div>
                <div class="player-score">Score: {{ player.score }}</div>
            </div>
            <div class="score-buttons">
                <button @click="changeScore(player.id, 1)">+1</button>
                <button @click="changeScore(player.id, 3)">+3</button>
                <button @click="changeScore(player.id, 7)">+7</button>
                <button @click="changeScore(player.id, -2)">-2</button>
                <button @click="changeScore(player.id, -4)">-4</button>
                <button @click="changeScore(player.id, -6)">-6</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import supermanImg from '@/assets/images/superman.jpg';
import batmanImg from '@/assets/images/batman.jpg';
import wonderWomanImg from '@/assets/images/wonder_woman.jpg';
import flashImg from '@/assets/images/flash.jpg';
import greenLanternImg from '@/assets/images/green_lantern.jpg';
import aquamanImg from '@/assets/images/aquaman.jpg';

export default {
    name: 'LeaderboardComponent',

    setup() {
        const players = ref([
            { id: 1, name: 'Superman', photo: supermanImg, score: 50 },
            { id: 2, name: 'Batman', photo: batmanImg, score: 40 },
            { id: 3, name: 'Wonder Woman', photo: wonderWomanImg, score: 60 },
            { id: 4, name: 'Flash', photo: flashImg, score: 30 },
            { id: 5, name: 'Green Lantern', photo: greenLanternImg, score: 20 },
            { id: 6, name: 'Aquaman', photo: aquamanImg, score: 10 },
        ]);

        const sortedPlayers = computed(() => {
            return [...players.value].sort((a, b) => b.score - a.score);
        });

        const changeScore = (playerId, change) => {
            try {
                // Emit an event or use a state management solution to update the score
                // Instead of directly calling a REST endpoint
                // This ensures reactivity within Vue components
                // Example:
                // emit('update-score', { playerId, change });

                // Placeholder for actual implementation
                console.log(`Change score for player ${playerId} by ${change}`);
            } catch (error) {
                console.error('Error changing score:', error);
            }
        };

        const connectWebSocket = () => {
            const wsUrl = getWebSocketUrl();
            const ws = new WebSocket(wsUrl);
            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.action === 'scoreUpdate') {
                    const updatedPlayer = message.data;
                    const player = players.value.find((p) => p.id === updatedPlayer.id);
                    if (player) {
                        player.score = updatedPlayer.score;
                        console.log(`Updated score for ${player.name}: ${player.score}`);
                    }
                }
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
        });

        return {
            players,
            sortedPlayers,
            changeScore,
            leaderboardRef,
        };
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
}

.player-box {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #1e1e1e;
    border-radius: 10px;
}

.player-rank {
    width: 50px;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
}

.player-image {
    width: 70px;
    height: 70px;
    border-radius: 35px;
    margin: 0 20px;
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
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.score-buttons button {
    padding: 8px 12px;
    background-color: #555;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.score-buttons button:hover {
    background-color: #666;
}
</style>
