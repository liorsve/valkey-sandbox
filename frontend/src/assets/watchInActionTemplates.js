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

async def print_leaderboard(client: GlideClusterClient):
    # Get player rankings
    print("\\nPlayer Rankings:\\n")
    leaderboard = await client.zrange_withscores("leaderboard", RangeByScore(InfBound.POS_INF, InfBound.NEG_INF), reverse=True)
    for rank, (player_id, score) in enumerate(leaderboard.items(), 1):
        print(f"{rank}. {player_id.decode()}: {int(score)} points")


async def main():
    client = None
    try:
        host = os.getenv('VALKEY_CLUSTER_HOST', 'localhost')
        port = int(os.getenv('VALKEY_CLUSTER_PORT', '7000'))
        config = GlideClusterClientConfiguration([NodeAddress(host, port)])
        client = await GlideClusterClient.create(config)
        print("Connected to Valkey server\\n")
        
        # Initialize test data
        players = [
            {"id": "Superman", "score": 1500},
            {"id": "Batman", "score": 1800},
            {"id": "Wonder Woman", "score": 1200},
            {"id": "Flash", "score": 300},
            {"id": "Green Lantern", "score": 150},
            {"id": "Aquaman", "score": 75}
        ]
        
        # Store player data
        print("Initializing player data...\\n")
        for player in players:
            await client.zadd("leaderboard", {player['id']: player['score']})
            print(f"Initialized {player['id']} with score {player['score']}")
        
        await print_leaderboard(client)

        # Update scores
        print("\\nUpdating scores...")
        await client.zincrby("leaderboard", 300, "Superman")  # Superman wins a match
        await client.zincrby("leaderboard", -100, "Batman")   # Batman loses a match
        await client.zincrby("leaderboard", 500, "Flash")     # Flash makes a comeback

        await print_leaderboard(client)


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

async function printLeaderboard(glideClient) {
    // Get player rankings
    const leaderboard = await glideClient.zrangeWithScores('leaderboard', {
        start: InfBoundary.PositiveInfinity,
        end:  InfBoundary.NegativeInfinity,
        type: "byScore"
    }, { reverse: true });
    leaderboard.forEach((item, index) => {
        console.log(\`\${index + 1}. \${item.element}: \${item.score} points\`);
    });
}

async function main() {
    let glideClient = null;
    try {
        const host = process.env.VALKEY_CLUSTER_HOST || 'localhost';
        const port = process.env.VALKEY_CLUSTER_PORT || 7000;
        glideClient = await GlideClusterClient.createClient({
            addresses: [{ host, port: parseInt(port) }],
            clientName: 'leaderboard-client',
        });

        const players = [
            { id: 'Superman', score: 1500 },
            { id: 'Batman', score: 1800 },
            { id: 'Wonder Woman', score: 1200 },
            { id: 'Flash', score: 300 },
            { id: 'Green Lantern', score: 150 },
            { id: 'Aquaman', score: 75 }
        ];
        // Convert players to zadd format
        const leaderboardData = players.map(player => ({
            element: player.id,
            score: player.score
        }));
        
        await glideClient.zadd('leaderboard', leaderboardData);
        
        // Get player rankings
        await printLeaderboard(glideClient);

        // Update scores
        console.log("\\nUpdating scores...");
        await glideClient.zadd("leaderboard", {
            "Superman": 300,  // Superman wins a match
            "Batman": -100,   // Batman loses a match
            "Flash": 500      // Flash makes a comeback
        });

        await printLeaderboard(glideClient);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        if (glideClient) {
            await glideClient.close();
            console.log("\\nConnection closed");
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
    public static void printLeaderboard(GlideClusterClient client) throws Exception {
        // Get player rankings
        System.out.println("\\nPlayer Rankings:\\n");
        List<ZRangeWithScoresResult> leaderboard = client.zrangeWithscores("leaderboard", new RangeByScore(Double.NEGATIVE_INFINITY, Double.POSITIVE_INFINITY), true).get();
        int rank = 1;
        for (ZRangeWithScoresResult entry : leaderboard) {
            String playerId = entry.getElement();
            double score = entry.getScore();
            System.out.printf("%d. %s: %.0f points%n", rank++, playerId, score);
        }
    }

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
                    put("id", "Superman"); put("score", 1500);
                }},
                new HashMap<String, Object>() {{ 
                    put("id", "Batman"); put("score", 1800);
                }},
                new HashMap<String, Object>() {{ 
                    put("id", "Wonder Woman"); put("score", 1200);
                }},
                new HashMap<String, Object>() {{ 
                    put("id", "Flash"); put("score", 300);
                }},
                new HashMap<String, Object>() {{ 
                    put("id", "Green Lantern"); put("score", 150);
                }},
                new HashMap<String, Object>() {{ 
                    put("id", "Aquaman"); put("score", 75);
                }}
            );

            // Store player scores
            System.out.println("Initializing player data...");
            List<ZAddArgs> leaderboardData = new ArrayList<>();
            for (Map<String, Object> player : players) {
                String playerId = (String) player.get("id");
                int score = (Integer) player.get("score");
                leaderboardData.add(new ZAddArgs(score, playerId));
            }
            client.zadd("leaderboard", leaderboardData).get();
            for (Map<String, Object> player : players) {
                System.out.printf("Initialized %s with score %d%n", player.get("id"), player.get("score"));
            }

            printLeaderboard(client);

            // Update scores
            System.out.println("\\nUpdating scores...");
            client.zincrby("leaderboard", 300, "Superman").get();  // Superman wins a match
            client.zincrby("leaderboard", -100, "Batman").get();   // Batman loses a match
            client.zincrby("leaderboard", 500, "Flash").get();     // Flash makes a comeback

            printLeaderboard(client);

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
    // Add more clients if necessary
};

export const getTemplateForClient = (client, action) => {
    const templates = watchInActionTemplates[client];
    if (!templates) {
        return '// No templates available for this client';
    }
    return templates[action] || '// No template available for this action';
};

export const defaultTemplate = '// Select a client and action to get started';

export const supportedClients = [
    'valkey-glide (Python)',
    'valkey-glide (Node)',
    'valkey-glide (Java)'
];

export const supportedActions = [
    'Task Manager',
    'Leaderboard'
];
