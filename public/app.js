document.addEventListener('DOMContentLoaded', (event) => {
  const ws = new WebSocket('ws://' + window.location.host);
  let editor;

  // Set up Monaco Editor
  require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs' } });
  require(['vs/editor/editor.main'], function() {
      editor = monaco.editor.create(document.getElementById('editor'), {
          value: '// Write your code here\nconsole.log("Hello, World!");',
          language: 'javascript',
          automaticLayout: true
      });
  });

  // Set up xterm.js
  const term = new Terminal();
  term.open(document.getElementById('terminal'));
  term.writeln('Terminal initialized. Connecting to server...');

  ws.onopen = () => {
      term.writeln('Connected to server. Click "Run" to execute your code.');
  };

  ws.onmessage = (event) => {
    const { type, data } = JSON.parse(event.data);
    if (type === 'terminal') {
        // Split the data by newlines and write each line separately
        data.split('\n').forEach(line => {
            term.writeln(line.trim());  // trim() removes any leading/trailing whitespace
        });
    }
    else if (type === 'leaderboard') {
        handleLeaderboardMessage(data);
    }
};

  term.onData((data) => {
      ws.send(JSON.stringify({ type: 'terminal', data }));
  });

  // Function to resize the terminal
  function resizeTerminal() {
      const terminalElement = document.getElementById('terminal');
      const { width, height } = terminalElement.getBoundingClientRect();
      const cols = Math.max(2, Math.floor(width / 9));
      const rows = Math.max(1, Math.floor(height / 17));
      term.resize(cols, rows);
  }

  // Resize terminal on window resize
  window.addEventListener('resize', resizeTerminal);

  // Initial resize
  resizeTerminal();

  // Run button functionality
  document.getElementById('runButton').addEventListener('click', () => {
      const code = editor.getValue();
      ws.send(JSON.stringify({ type: 'run', data: code }));
      term.clear();
      term.writeln('Running code...');
  });
    // Add leaderboard functionality
    document.getElementById('fetchLeaderboard').addEventListener('click', () => {
        ws.send(JSON.stringify({ type: 'leaderboard', data: { action: 'getTopPlayers' } }));
    });

    document.getElementById('addPlayer').addEventListener('submit', (event) => {
        event.preventDefault();
        const playerId = document.getElementById('playerId').value;
        const screenName = document.getElementById('screenName').value;
        ws.send(
            JSON.stringify({
                type: 'leaderboard',
                data: { action: 'addPlayer', playerId, screenName }
            })
        );
    });

    document.getElementById('updateScore').addEventListener('submit', (event) => {
        event.preventDefault();
        const playerId = document.getElementById('scorePlayerId').value;
        const score = parseInt(document.getElementById('playerScore').value, 10);
        ws.send(
            JSON.stringify({
                type: 'leaderboard',
                data: { action: 'updateScore', playerId, score }
            })
        );
    });

    // Handle leaderboard data
    function handleLeaderboardMessage(data) {
        const leaderboardTable = document.getElementById('leaderboardTableBody');
        leaderboardTable.innerHTML = ''; // Clear the table
        if (Array.isArray(data)) {
            data.forEach((player) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${player.rank}</td>
                    <td>${player.screenName}</td>
                    <td>${player.score}</td>
                `;
                leaderboardTable.appendChild(row);
            });
        } else {
            term.writeln(`Leaderboard message: ${data}`);
        }
    }
});