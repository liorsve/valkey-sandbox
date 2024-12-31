# WebSocket Protocol Documentation

## Connection

```javascript
const ws = new WebSocket('ws://localhost:8080/appws');
```

### Development
```javascript
const wsDev = new WebSocket('ws://localhost:8080/devws');
```

## Message Format

All messages follow this structure:
```typescript
interface Message {
  action: string;
  data?: any;
  error?: string;
}
```

## Actions

### Code Execution
```typescript
// Request
{
  action: 'runCode',
  data: {
    language: 'python' | 'javascript',
    code: string,
    mode: 'standalone' | 'cluster'
  }
}

// Response
{
  action: 'output',
  data: {
    output: string,
    error: string | null,
    executionTime: number,
    memoryUsed: number
  }
}
```

### Task Management
```typescript
// Start Tasks
{
  action: 'startTasks',
  data: {
    tasks: Array<{
      id: string,
      action: string,
      params?: object
    }>
  }
}

// Task Status Update
{
  action: 'taskUpdate',
  data: {
    taskId: string,
    status: 'running' | 'completed' | 'failed',
    progress?: number,
    result?: any
  }
}
```

### Leaderboard Operations
```typescript
// Start Game
{
  action: 'startGame'
}

// Update Score
{
  action: 'updateScore',
  data: {
    playerId: number,
    change: number
  }
}

// Leaderboard Update
{
  action: 'leaderboardUpdate',
  data: Array<{
    id: number,
    name: string,
    score: number
  }>
}
```

## Error Handling

```typescript
{
  action: 'error',
  error: string,
  details?: object
}
```

## Connection Lifecycle

1. **Connection:**
   ```javascript
   ws.onopen = () => {
     console.log('Connected to server');
   };
   ```

2. **Message Handling:**
   ```javascript
   ws.onmessage = (event) => {
     const message = JSON.parse(event.data);
     // Handle message based on action
   };
   ```

3. **Error Handling:**
   ```javascript
   ws.onerror = (error) => {
     console.error('WebSocket error:', error);
   };
   ```

4. **Disconnection:**
   ```javascript
   ws.onclose = () => {
     console.log('Disconnected from server');
   };
   ```
