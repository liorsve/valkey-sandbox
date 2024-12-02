const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { exec } = require('child_process');
const {
  setPlayerData,
  updatePlayerScore,
  getTopPlayers,
} = require('./public/leaderboard');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));
app.use(express.json()); // Middleware to parse JSON payloads

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

wss.on('connection', (ws) => {
    ws.on('message', async (message) => { // Make the handler async
        const { type, data } = JSON.parse(message);
        if (type === 'run') {
            const randomFileName = generateRandomString(16) + '.js';

            // Write the submitted code to a temporary file
            require('fs').writeFileSync(randomFileName, data);

            // Run the code inside a Docker container
            const command = `
                sudo docker run --rm -v $(pwd):/usr/src/app valkey-try ${randomFileName}
            `;
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    ws.send(JSON.stringify({ type: 'terminal', data: `Error: ${stderr}\n` }));
                    return;
                }
                // Send each line of stdout separately
                stdout.split('\n').forEach(line => {
                    ws.send(JSON.stringify({ type: 'terminal', data: line.trim() }));
                });

                require('fs').unlinkSync(randomFileName);
            });
        } else if (type === 'leaderboard') {
            // Handle leaderboard requests via WebSocket
            const { action, playerId, score, screenName } = data;

            try {
                if (action === 'addPlayer') {
                    await setPlayerData(playerId, { screenName }); // Await the async functions
                    await updatePlayerScore(playerId, 0);
                    ws.send(JSON.stringify({ type: 'leaderboard', data: 'Player added successfully' }));
                } else if (action === 'updateScore') {
                    await updatePlayerScore(playerId, score);
                    ws.send(JSON.stringify({ type: 'leaderboard', data: 'Score updated successfully' }));
                } else if (action === 'getTopPlayers') {
                    const topPlayers = await getTopPlayers(10);
                    ws.send(JSON.stringify({ type: 'leaderboard', data: topPlayers }));
                }
                
            } catch (error) {
                console.error(`Error handling leaderboard action '${action}':`, error);
                ws.send(JSON.stringify({ type: 'leaderboard', data: `Error: ${error.message}` }));
            }
        }
    });
});

// REST endpoint for the leaderboard
app.get('/leaderboard', async (req, res) => {
    try {
        const topPlayers = await getTopPlayers(10); // Fetch top 10 players
        res.json(topPlayers);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).send('Internal Server Error');
    }
});

server.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
