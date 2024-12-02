const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { VM } = require('vm2');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const { type, data } = JSON.parse(message);
        if (type === 'run') {
            try {
                const vm = new VM({
                    timeout: 1000,
                    sandbox: {
                        console: {
                            log: (...args) => {
                                ws.send(JSON.stringify({ type: 'terminal', data: args.join(' ') + '\n' }));
                            }
                        }
                    }
                });
                vm.run(data);
                ws.send(JSON.stringify({ type: 'terminal', data: 'Code execution completed.\n' }));
            } catch (error) {
                ws.send(JSON.stringify({ type: 'terminal', data: 'Error: ' + error.message + '\n' }));
            }
        }
    });
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});