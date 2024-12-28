export const taskManager = {
  name: "Task Manager",
  description: "Task queue management with distributed locking",
  code: `// Task Manager with Queue and Lock using Valkey Glide in Node.js
import { GlideClusterClient } from '@valkey/valkey-glide';

async function main() {
    const client = await GlideClusterClient.createClient({
        addresses: [{ host: 'valkey-cluster', port: 7000 }]
    });

    await client.flushall(); // Clear existing data

    const lockKey = 'task-lock';
    const queueKey = 'task-queue';

    // Initialize tasks
    const tasks = ['Flip Right', 'Grow', 'Change Random Color'];
    for (const task of tasks) {
        await client.rpush(queueKey, [task]);
        console.log(\`Added task: \${task}\`);
    }

    // Process tasks with lock
    while (true) {
        const lockAcquired = await client.set(lockKey, "locked", {
            conditionalSet: "onlyIfDoesNotExist",
            expiry: { type: "EX", count: 10 },
        });
        
        if (lockAcquired) {
            try {
                const task = await client.lpop(queueKey);
                if (task) {
                    console.log(\`Processing task: \${task}\`);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    console.log(\`Task completed: \${task}\`);
                } else {
                    console.log('All tasks completed');
                    break;
                }
            } finally {
                await client.del([lockKey]);
            }
        } else {
            console.log('Lock is held by another worker');
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    await client.close();
}

await main();`,
};

export default taskManager;
