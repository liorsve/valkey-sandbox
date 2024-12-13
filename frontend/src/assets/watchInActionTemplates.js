export const watchInActionTemplates = {
    'valkey-glide (Python)': {
        'Task Manager': `# Task Manager with Queue and Lock using Valkey Glide in Python
import asyncio
from glide import NodeAddress, GlideClusterClient, GlideClusterClientConfiguration
import os

async def main():
    host = os.getenv('VALKEY_CLUSTER_HOST', 'localhost')
    port = int(os.getenv('VALKEY_CLUSTER_PORT', '7000'))
    config = GlideClusterClientConfiguration([NodeAddress(host, port)])
    client = await GlideClusterClient.create(config)
    
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
from glide import NodeAddress, GlideClusterClient, GlideClusterClientConfiguration, RangeByScore, InfBound
import os

async def main():
    client = None
    try:
        host = os.getenv('VALKEY_CLUSTER_HOST', 'localhost')
        port = int(os.getenv('VALKEY_CLUSTER_PORT', '7000'))
        config = GlideClusterClientConfiguration([NodeAddress(host, port)])
        client = await GlideClusterClient.create(config)
        print("Connected to Valkey server")
        await client.flushall()
        print("Cluster flushed")
        
        # Initialize test data
        players = [
            {"id": "player1", "name": "Superman", "score": 1500},
            {"id": "player2", "name": "Batman", "score": 1800},
            {"id": "player3", "name": "Wonder Woman", "score": 1200},
            {"id": "player4", "name": "Flash", "score": 300},
            {"id": "player5", "name": "Green Lantern", "score": 150},
            {"id": "player6", "name": "Aquaman", "score": 75}
        ]
        
        # Store player data
        print("Initializing player data...")
        for player in players:
            await client.set(player['id'], json.dumps(player))
            await client.zadd("leaderboard", {player['id']: player['score']})
            print(f"Initialized {player['name']} with score {player['score']}")
        
        # Get player rankings
        print("Player Rankings:")
        leaderboard = await client.zrange_withscores("leaderboard", RangeByScore(InfBound.POS_INF, InfBound.NEG_INF), reverse=True)
        for rank, (player_id, score) in enumerate(leaderboard.items(), 1):
            player_id = player_id.decode()
            player_data = json.loads(await client.get(player_id))
            print(f"{rank}. {player_data['name']}: {int(score)} points")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        if (client):
            await client.close()
            print("\\nConnection closed")

asyncio.run(main())`,
    },
    
    'valkey-glide (Node)': {
        'Task Manager': `// Task Manager with Queue and Lock using Valkey Glide in Node.js
import { GlideClusterClient } from '@valkey/valkey-glide';

async function main() {
    const client = await GlideClusterClient.createClient({
        addresses: [{ host: 'localhost', port: 7000 }]
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
import { GlideClusterClient, InfBoundary } from '@valkey/valkey-glide';

async function main() {
    let glideClient = null;
    try {
        const host = process.env.VALKEY_CLUSTER_HOST || 'localhost';
        const port = process.env.VALKEY_CLUSTER_PORT || 7000;
        glideClient = await GlideClusterClient.createClient({
            addresses: [{ host, port: parseInt(port) }],
            clientName: 'leaderboard-client',
        });
        await glideClient.flushall();
        console.log('[Valkey] Cluster flushed.');

        const players = [
            { id: 'player1', name: 'Superman', score: 1500 },
            { id: 'player2', name: 'Batman', score: 1800 },
            { id: 'player3', name: 'Wonder Woman', score: 1200 },
            { id: 'player4', name: 'Flash', score: 300 },
            { id: 'player5', name: 'Green Lantern', score: 150 },
            { id: 'player6', name: 'Aquaman', score: 75 }
        ];
        // Convert players to zadd format
        const leaderboardData = players.map(player => ({
            element: \`player:\${player.id}\`,
            score: player.score
        }));
        
        await glideClient.zadd('leaderboard', leaderboardData);
        
        for (const player of players) {
            await glideClient.set(\`player:\${player.id}\`, JSON.stringify(player));
            console.log(\`[Valkey] Initialized player \${player.name} with score \${player.score}.\`);
        }
            
        // Get player rankings
        const response = await glideClient.zrangeWithScores('leaderboard', {
            start: InfBoundary.PositiveInfinity,
            end:  InfBoundary.NegativeInfinity,
            type: "byScore"
        }, { reverse: true });
        let rank = 1;
        for (const { element: playerId, score } of response) {
            const playerDataStr = await glideClient.get(playerId);
            const data = JSON.parse(playerDataStr);
            console.log(\`\${rank++}. \${data.name}: \${score} points\`);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (glideClient) {
            await glideClient.close();
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
        GlideClusterClientConfiguration config = new GlideClusterClientConfiguration(
            Arrays.asList(new NodeAddress("localhost", 7000))
        );
        try (GlideClusterClient client = GlideClusterClient.create(config)) {
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
        GlideClusterClientConfiguration config = new GlideClusterClientConfiguration(
            Arrays.asList(new NodeAddress("localhost", 7000))
        );
        ObjectMapper mapper = new ObjectMapper();
        GlideClusterClient client = null;
        
        try {
            client = GlideClusterClient.create(config);
            System.out.println("Connected to Valkey server");

            // Initialize test data
            List<Map<String, Object>> players = Arrays.asList(
                new HashMap<String, Object>() {{ 
                    put("id", "player1"); put("name", "Superman"); put("score", 1500);
                }},
                new HashMap<String, Object>() {{ 
                    put("id", "player2"); put("name", "Batman"); put("score", 1800);
                }},
                new HashMap<String, Object>() {{ 
                    put("id", "player3"); put("name", "Wonder Woman"); put("score", 1200);
                }},
                new HashMap<String, Object>() {{ 
                    put("id", "player4"); put("name", "Flash"); put("score", 300);
                }},
                new HashMap<String, Object>() {{ 
                    put("id", "player5"); put("name", "Green Lantern"); put("score", 150);
                }},
                new HashMap<String, Object>() {{ 
                    put("id", "player6"); put("name", "Aquaman"); put("score", 75);
                }}
            );

            // Store player data and scores
            System.out.println("Initializing player data...");
            for (Map<String, Object> player : players) {
                String playerId = (String) player.get("id");
                int score = (Integer) player.get("score");
                client.set("player:" + playerId, mapper.writeValueAsString(player)).get();
                client.zadd("leaderboard", score, playerId).get();
                System.out.printf("Initialized %s with score %d%n", player.get("name"), score);
            }

            // Get player rankings
            System.out.println("\\nPlayer Rankings:");
            RangeByScore query = new RangeByScore(
                InfScoreBound.NEGATIVE_INFINITY,
                InfScoreBound.POSITIVE_INFINITY
            );
            Map<GlideString, Double> leaderboard = client.zrangeWithScores(
                gs("leaderboard"),
                query,
                true  // reverse order to get highest scores first
            ).get();
            
            int rank = 1;
            for (Map.Entry<GlideString, Double> entry : leaderboard.entrySet()) {
                String playerId = entry.getKey().toString();
                double score = entry.getValue();
                Map playerData = mapper.readValue(
                    client.get("player:" + playerId).get(),
                    Map.class
                );
                System.out.printf("%d. %s: %.0f points%n",
                    rank++,
                    playerData.get("name"),
                    score
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
}
`,
    },
};
