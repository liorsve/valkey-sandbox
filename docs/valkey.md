# Valkey Integration Guide

## Modes of Operation

### Standalone Mode
Single Valkey instance for simple operations.

```javascript
const client = await GlideClient.createClient({
  addresses: [{ host: 'localhost', port: 6379 }],
  clientName: 'example-client'
});
```

### Cluster Mode
Distributed Valkey cluster for scalability.

```javascript
const client = await GlideClusterClient.createClient({
  addresses: [{ host: 'localhost', port: 7000 }],
  clientName: 'example-cluster-client'
});
```

## Common Use Cases

### 1. Distributed Locking
```javascript
// Acquire lock
const locked = await client.set('mylock', 'locked', {
  conditionalSet: 'onlyIfDoesNotExist',
  expiry: { type: 'EX', count: 10 }
});

if (locked) {
  try {
    // Critical section
    await performTask();
  } finally {
    // Release lock
    await client.del('mylock');
  }
}
```

### 2. Task Queue Management
```javascript
// Add task to queue
await client.rpush('taskQueue', JSON.stringify({
  id: 'task1',
  action: 'processData'
}));

// Process tasks
while (true) {
  const task = await client.lpop('taskQueue');
  if (!task) break;
  await processTask(JSON.parse(task));
}
```

### 3. Real-time Leaderboard
```javascript
// Update score
await client.zincrby('leaderboard', 10, 'player1');

// Get top players
const topPlayers = await client.zrange('leaderboard', 0, 9, {
  withScores: true,
  reverse: true
});
```

## Best Practices

1. **Connection Management**
   - Use connection pools
   - Handle reconnection
   - Clean up resources

2. **Error Handling**
   ```javascript
   try {
     await client.set('key', 'value');
   } catch (error) {
     if (error instanceof ValkeyCommunicationError) {
       // Handle network issues
     } else if (error instanceof ValkeyServerError) {
       // Handle server errors
     }
   }
   ```

3. **Resource Limits**
   ```javascript
   const config = {
     maxConnections: 10,
     commandTimeout: 5000,
     retryStrategy: (times) => Math.min(times * 100, 3000)
   };
   ```

## Monitoring

### Health Checks
```bash
# Standalone
valkey-cli ping

# Cluster
valkey-cli -h localhost -p 7000 cluster info
```

### Performance Metrics
```javascript
const info = await client.info();
console.log('Connected clients:', info.connected_clients);
console.log('Operations/sec:', info.instantaneous_ops_per_sec);
```

## Security

1. **Authentication**
   ```javascript
   const client = await GlideClient.createClient({
     password: process.env.VALKEY_PASSWORD
   });
   ```

2. **TLS/SSL**
   ```javascript
   const client = await GlideClient.createClient({
     tls: {
       cert: fs.readFileSync('client-cert.pem'),
       key: fs.readFileSync('client-key.pem')
     }
   });
   ```

3. **Network Security**
   - Use Docker networks
   - Implement firewall rules
   - Regular security updates
