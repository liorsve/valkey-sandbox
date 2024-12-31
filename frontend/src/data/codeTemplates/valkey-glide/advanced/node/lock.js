export const lockManager = {
  name: "Lock Manager",
  description: "Distributed locking mechanism with Valkey Glide",
  code: `// Lock Example using Valkey Glide in Node.js
import { GlideClusterClient } from '@valkey/valkey-glide';

async function lockExample(client, lockKey, resourceKey) {
    // Try to acquire lock with 10 second expiry
    const lockAcquired = await client.set(lockKey, 'locked', {
          conditionalSet: 'onlyIfDoesNotExist',
          expiry: { type: 'EX', count: 3 },
        });
    if (lockAcquired) {
        try {
            // Critical section - modify resource
            await client.incr(resourceKey);
            const current = await client.get(resourceKey);
            console.log('Modified resource:', current);
        } finally {
            // Always release the lock
            await client.del(lockKey);
            console.log('Lock released');
        }
    } else {
        console.log('Lock is held by another process');
    }
}

async function main() {
    const client = await GlideClusterClient.createClient({
        addresses: [{ host: 'valkey-cluster', port: 7000 }],
    });
    
    await lockExample(client, 'mylock', 'counter');
    
    await client.close();
}

await main();`,
};

export default lockManager;
