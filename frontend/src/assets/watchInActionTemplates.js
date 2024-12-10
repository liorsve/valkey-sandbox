export const watchInActionTemplates = {
  'valkey-glide (Python)': {
    Leaderboard: `
# Leaderboard with Valkey Glide in Python
import asyncio
from glide import NodeAddress, GlideClient, GlideClientConfiguration
import os

async def main():
    host = os.getenv('VALKEY_HOST', 'localhost')
    port = int(os.getenv('VALKEY_PORT', '6379'))
    config = GlideClientConfiguration([NodeAddress(host, port)])
    client = await GlideClient.create(config)
    
    # Add scores to leaderboard
    await client.zadd('leaderboard', {'player1': 50})
    await client.zadd('leaderboard', {'player2': 40})
    await client.zadd('leaderboard', {'player3': 60})
    
    # Retrieve top scores
    top_scores = await client.zrevrange('leaderboard', 0, -1, withscores=True)
    print('Leaderboard:')
    for player, score in top_scores:
        print(f'{player.decode()}: {score}')
    
    await client.close()

asyncio.run(main())
`,
    'Task Manager': `
# Task Manager with Queue and Lock using Valkey Glide in Python
import asyncio
from glide import NodeAddress, GlideClient, GlideClientConfiguration
import os

async def main():
    host = os.getenv('VALKEY_HOST', 'localhost')
    port = int(os.getenv('VALKEY_PORT', '6379'))
    config = GlideClientConfiguration([NodeAddress(host, port)])
    client = await GlideClient.create(config)
    
    # Simulate adding tasks to a queue
    tasks = ['Flip Right', 'Grow', 'Change Random Color']
    for task in tasks:
        await client.rpush('task_queue', task)
    
    # Process tasks with a lock
    lock_acquired = await client.setnx('task_lock', 'locked')
    if lock_acquired:
        while True:
            task = await client.lpop('task_queue')
            if task is None:
                break
            print(f'Executing task: {task.decode()}')
            await asyncio.sleep(1)  # Simulate task execution time
        await client.delete('task_lock')
    else:
        print('Another worker is processing tasks.')
    
    await client.close()

asyncio.run(main())
`,
  },
};
