export const queueManager = {
  name: "Queue Manager",
  description: "Distributed queue system with Valkey Glide",
  code: `# Queue Example using Valkey Glide in Python
import asyncio
from glide import NodeAddress, GlideClusterClient, GlideClusterClientConfiguration
import os

async def queue_example(client, queue_key):
    # Add items to queue
    tasks = ['task1', 'task2', 'task3']
    for task in tasks:
        await client.rpush(queue_key, [task])
        print(f"Added to queue: {task}")
    
    # Process queue
    while True:
        task = await client.lpop(queue_key)
        if not task:
            break
        print(f"Processing: {task.decode()}")
        await asyncio.sleep(1)  # Simulate work

async def main():
    host = os.getenv('VALKEY_CLUSTER_HOST', 'valkey-cluster')
    port = int(os.getenv('VALKEY_CLUSTER_PORT', '7000'))
    config = GlideClusterClientConfiguration([NodeAddress(host, port)])
    client = await GlideClusterClient.create(config)
    
    await queue_example(client, 'myqueue')
    
    await client.close()

asyncio.run(main())`
};

export default queueManager;
