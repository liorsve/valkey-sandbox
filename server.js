const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { exec } = require('child_process');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const { type, data } = JSON.parse(message);
        if (type === 'run') {
            const containerName = `playground_container_${Date.now()}`;
            const scriptFile = `lior.js`;

            // Write the submitted code to a temporary file
            require('fs').writeFileSync(scriptFile, data);

            // Run the code inside a Docker container
            const command = `
                sudo docker run --rm -v ${scriptFile}:/app/script.js valkey-try node /app/script.js
            `;
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    ws.send(JSON.stringify({ type: 'terminal', data: `Error: ${stderr}\n` }));
                    return;
                }
                ws.send(JSON.stringify({ type: 'terminal', data: stdout }));
            });
        }
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});