export const taskManager = {
  name: "Task Manager",
  description: "Task queue management with distributed locking",
  code: `# Task Manager with Queue and Lock using Valkey Glide in Python
import asyncio
from glide import NodeAddress, GlideClusterClient, GlideClusterClientConfiguration, ConditionalChange, ExpirySet, ExpiryType
import os

async def main():
    host = os.getenv('VALKEY_CLUSTER_HOST', 'valkey-cluster')
    port = int(os.getenv('VALKEY_CLUSTER_PORT', '7000'))
    config = GlideClusterClientConfiguration([NodeAddress(host, port)])
    client = await GlideClusterClient.create(config)

    await client.flushall()  # Clear existing data from previous runs
    
    lock_key = 'task-lock'
    queue_key = 'task-queue'
    
    # Initialize tasks
    tasks = ['Flip Right', 'Grow', 'Change Random Color']
    for task in tasks:
        await client.rpush(queue_key, [task])
        print(f"Added task: {task}")

    # Process tasks with lock
    while True:
        # Try to acquire lock
        lock_acquired = await client.set(
            lock_key, 
            'locked', 
            conditional_set=ConditionalChange.ONLY_IF_DOES_NOT_EXIST, 
            expiry=ExpirySet(ExpiryType.SEC, 10)
        )
        if lock_acquired:
            try:
                task = await client.lpop(queue_key)
                if task:
                    print(f"Processing task: {task.decode()}")
                    await asyncio.sleep(1)  # Simulate task execution
                    print(f"Task completed: {task.decode()}")
                else:
                    print("All tasks completed")
                    break
            finally:
                # Release lock
                await client.delete([lock_key])
        else:
            print("Lock is held by another worker")
            await asyncio.sleep(0.5)
    
    await client.close()

asyncio.run(main())`,
};

export default taskManager;
