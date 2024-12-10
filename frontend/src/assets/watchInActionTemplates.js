export const watchInActionTemplates = {
    'valkey-glide (Python)': {
        'Task Manager': `# Task Manager with Queue and Lock using Valkey Glide in Python
import asyncio
from glide import NodeAddress, GlideClient, GlideClientConfiguration
import os

async def main():
    host = os.getenv('VALKEY_HOST', 'localhost')
    port = int(os.getenv('VALKEY_PORT', '6379'))
    config = GlideClientConfiguration([NodeAddress(host, port)])
    client = await GlideClient.create(config)
    
    lock_key = 'task-lock'
    queue_key = 'task-queue'
    
    # Initialize tasks
    tasks = ['Flip Right', 'Grow', 'Change Random Color']
    for task in tasks:
        await client.rpush(queue_key, task)
        print(f"Added task: {task}")

    # Process tasks with lock
    while True:
        # Try to acquire lock
        lock_acquired = await client.set(lock_key, 'locked', nx=True, ex=10)
        if lock_acquired:
            try:
                task = await client.lpop(queue_key)
                if task:
                    print(f"Processing task: {task.decode()}")
                    await asyncio.sleep(1)  # Simulate task execution
                else:
                    print("All tasks completed")
                    break
            finally:
                # Release lock
                await client.delete(lock_key)
        else:
            print("Lock is held by another worker")
            await asyncio.sleep(0.5)
    
    await client.close()

asyncio.run(main())`,
        'Leaderboard': `# Leaderboard Use Case in Python
import asyncio
import json
from glide import NodeAddress, GlideClient, GlideClientConfiguration
import os

async def main():
    client = None
    try:
        host = os.getenv('VALKEY_HOST', 'localhost')
        port = int(os.getenv('VALKEY_PORT', '6379'))
        config = GlideClientConfiguration([NodeAddress(host, port)])
        client = await GlideClient.create(config)
        print("Connected to Valkey server")
        
        # Initialize test data
        players = [
            {"id": "player1", "name": "Superman", "level": 5},
            {"id": "player2", "name": "Batman", "level": 8},
            {"id": "player3", "name": "Wonder Woman", "level": 3}
        ]
        
        # Store player data
        print("Initializing player data...")
        for player in players:
            key = f"player:{player['id']}"
            await client.set(key, json.dumps(player))
            print(f"Stored player data: {player['name']}")
        
        # Set initial scores
        print("\\nSetting initial scores...")
        scores = {"player1": 1500, "player2": 1800, "player3": 1200}
        for player_id, score in scores.items():
            await client.zadd("leaderboard", {player_id: score})
            print(f"Set score for {player_id}: {score}")
        
        # Get player rankings
        print("\\nPlayer Rankings:")
        leaderboard = await client.zrevrange("leaderboard", 0, -1, withscores=True)
        for rank, (player_id, score) in enumerate(leaderboard, 1):
            player_data = json.loads(await client.get(f"player:{player_id.decode()}"))
            print(f"{rank}. {player_data['name']}: {int(score)} points (Level {player_data['level']})")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if client:
            await client.close()
            print("\\nConnection closed")

asyncio.run(main())`,
    },
    
    'valkey-glide (Node)': {
        'Task Manager': `// Task Manager with Queue and Lock using Valkey Glide in Node.js
import { GlideClient } from '@valkey/valkey-glide';

async function main() {
    const client = await GlideClient.createClient({
        addresses: [{ host: 'localhost', port: 6379 }]
    });

    const lockKey = 'task-lock';
    const queueKey = 'task-queue';

    // Initialize tasks
    const tasks = ['Flip Right', 'Grow', 'Change Random Color'];
    for (const task of tasks) {
        await client.rpush(queueKey, task);
        console.log(\`Added task: \${task}\`);
    }

    // Process tasks with lock
    while (true) {
        // Try to acquire lock
        const lockAcquired = await client.set(lockKey, 'locked', { NX: true, EX: 10 });
        if (lockAcquired) {
            try {
                const task = await client.lpop(queueKey);
                if (task) {
                    console.log(\`Processing task: \${task}\`);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate task execution
                } else {
                    console.log('All tasks completed');
                    break;
                }
            } finally {
                // Release lock
                await client.del(lockKey);
            }
        } else {
            console.log('Lock is held by another worker');
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    await client.close();
}

await main();`,
        'Leaderboard': `// Leaderboard Use Case in Node.js
import { GlideClient } from '@valkey/valkey-glide';

async function main() {
    let client = null;
    try {
        const host = process.env.VALKEY_HOST || 'localhost';
        const port = process.env.VALKEY_PORT || 6379;
        client = await GlideClient.createClient({
            addresses: [{ host, port: parseInt(port) }],
            clientName: 'leaderboard_client'
        });
        console.log('Connected to Valkey server');

        // Initialize test data
        const players = [
            { id: 'player1', name: 'Superman', level: 5 },
            { id: 'player2', name: 'Batman', level: 8 },
            { id: 'player3', name: 'Wonder Woman', level: 3 }
        ];

        // Store player data
        console.log('Initializing player data...');
        for (const player of players) {
            const key = \`player:\${player.id}\`;
            await client.set(key, JSON.stringify(player));
            console.log(\`Stored player data: \${player.name}\`);
        }

        // Set initial scores
        console.log('\\nSetting initial scores...');
        const scores = { player1: 1500, player2: 1800, player3: 1200 };
        for (const [playerId, score] of Object.entries(scores)) {
            await client.zadd('Leaderboard', { [playerId]: score });
            console.log(\`Set score for \${playerId}: \${score}\`);
        }

        // Get player rankings
        console.log('\\nPlayer Rankings:');
        const leaderboard = await client.zrevrange('Leaderboard', 0, -1, 'WITHSCORES');
        for (let i = 0; i < leaderboard.length; i += 2) {
            const playerId = leaderboard[i];
            const score = parseInt(leaderboard[i + 1]);
            const playerData = JSON.parse(await client.get(\`player:\${playerId}\`));
            console.log(\`\${i/2 + 1}. \${playerData.name}: \${score} points (Level \${playerData.level})\`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (client) {
            await client.quit();
            console.log('\\nConnection closed');
        }
    }
}

await main();`,
    },
    'valkey-glide (Java)': {
        'Task Manager': `// Task Manager with Queue and Lock using Valkey Glide in Java
import io.valkey.glide.*;
import java.util.Arrays;
import java.util.List;

public class 'Task Manager' {
    public static void main(String[] args) throws Exception {
        GlideClientConfiguration config = new GlideClientConfiguration(
            Arrays.asList(new NodeAddress("localhost", 6379))
        );
        try (GlideClient client = GlideClient.create(config)) {
            String lockKey = "task-lock";
            String queueKey = "task-queue";

            // Initialize tasks
            List<String> tasks = Arrays.asList("Flip Right", "Grow", "Change Random Color");
            for (String task : tasks) {
                client.rpush(queueKey, task).get();
                System.out.println("Added task: " + task);
            }

            // Process tasks with lock
            while (true) {
                // Try to acquire lock
                boolean lockAcquired = client.set(lockKey, "locked", new SetArgs().nx().ex(10)).get();
                if (lockAcquired) {
                    try {
                        String task = client.lpop(queueKey).get();
                        if (task != null) {
                            System.out.println("Processing task: " + task);
                            Thread.sleep(1000); // Simulate task execution
                        } else {
                            System.out.println("All tasks completed");
                            break;
                        }
                    } finally {
                        // Release lock
                        client.del(lockKey).get();
                    }
                } else {
                    System.out.println("Lock is held by another worker");
                    Thread.sleep(500);
                }
            }
        }
    }
}`,
        'Leaderboard': `// Leaderboard Use Case in Java
import io.valkey.glide.*;
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;

public class LeaderboardExample {
    public static void main(String[] args) throws Exception {
        GlideClientConfiguration config = new GlideClientConfiguration(
            Arrays.asList(new NodeAddress("localhost", 6379))
        );
        ObjectMapper mapper = new ObjectMapper();
        GlideClient client = null;
        
        try {
            client = GlideClient.create(config);
            System.out.println("Connected to Valkey server");

            // Initialize test data
            List<Map<String, Object>> players = Arrays.asList(
                new HashMap<String, Object>() {{ 
                    put("id", "player1"); put("name", "Superman"); put("level", 5);
                }},
                new HashMap<String, Object>() {{ 
                    put("id", "player2"); put("name", "Batman"); put("level", 8);
                }},
                new HashMap<String, Object>() {{ 
                    put("id", "player3"); put("name", "Wonder Woman"); put("level", 3);
                }}
            );

            // Store player data
            System.out.println("Initializing player data...");
            for (Map<String, Object> player : players) {
                String playerId = (String) player.get("id");
                client.set("player:" + playerId, mapper.writeValueAsString(player)).get();
                System.out.println("Stored player data: " + player.get("name"));
            }

            // Set initial scores
            System.out.println("\\nSetting initial scores...");
            Map<String, Integer> scores = new HashMap<String, Integer>() {{
                put("player1", 1500);
                put("player2", 1800);
                put("player3", 1200);
            }};
            
            for (Map.Entry<String, Integer> entry : scores.entrySet()) {
                client.zadd("leaderboard", entry.getValue(), entry.getKey()).get();
                System.out.printf("Set score for %s: %d%n", entry.getKey(), entry.getValue());
            }

            // Get player rankings
            System.out.println("\\nPlayer Rankings:");
            List<String> leaderboard = client.zrevrangeWithScores("leaderboard", 0, -1).get();
            
            for (int i = 0; i < leaderboard.size(); i += 2) {
                String playerId = leaderboard.get(i);
                int score = Integer.parseInt(leaderboard.get(i + 1));
                Map playerData = mapper.readValue(
                    client.get("player:" + playerId).get(),
                    Map.class
                );
                System.out.printf("%d. %s: %d points (Level %d)%n",
                    (i/2 + 1),
                    playerData.get("name"),
                    score,
                    playerData.get("level")
                );
            }

        } catch (Exception e) {
            System.err.println("Error: " + e.getMessage());
        } finally {
            if (client != null) {
                client.close();
                System.out.println("\\nConnection closed");
            }
        }
    }
}`,
    },
};
