const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { exec } = require('child_process');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
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
        }
    });
});

server.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});