const WebSocket = require('ws');

const ws = new WebSocket('ws://host.docker.internal:3000/runner');

ws.on('open', function open() {
  console.log('Connected to the server');
});

ws.on('message', function incoming(message) {
  const { id, code } = JSON.parse(message);
  
  try {
    // Use eval here. In a production environment, you'd want to use a more secure evaluation method.
    const result = eval(code);
    ws.send(JSON.stringify({ id, result: String(result) }));
  } catch (error) {
    ws.send(JSON.stringify({ id, error: error.message }));
  }
});