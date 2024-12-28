export const queueManager = {
  name: "Queue Manager",
  description: "Distributed queue implementation with Valkey Glide",
  code: `// Queue Example using Valkey Glide in Node.js
import { GlideClusterClient } from '@valkey/valkey-glide';

async function queueExample(client, queueKey) {
    // Add items to queue
    const tasks = ['task1', 'task2', 'task3'];
    for (const task of tasks) {
        await client.rpush(queueKey, [task]);
        console.log('Added to queue:', task);
    }
    
    // Process queue
    while (true) {
        const task = await client.lpop(queueKey);
        if (!task) break;
        console.log('Processing:', task);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate work
    }
}

async function main() {
    const client = await GlideClusterClient.createClient({
        addresses: [{ host: 'valkey-cluster', port: 7000 }],
    });
    
    await queueExample(client, 'myqueue');
    
    await client.close();
}

await main();`,
};

export default queueManager;
