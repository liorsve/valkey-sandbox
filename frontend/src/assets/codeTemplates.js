export const codeTemplates = {
    'valkey-glide (Python)': {
        Standalone: `# Valkey Glide Standalone Python Template
# Valkey Glide Example (Python)
import asyncio
from glide import NodeAddress, GlideClient, GlideClientConfiguration
import os

async def main():
    host = os.getenv('VALKEY_HOST', 'localhost')
    port = int(os.getenv('VALKEY_PORT', '6379'))
    config = GlideClientConfiguration([NodeAddress(host, port)])
    client = await GlideClient.create(config)
    
    # Example operations
    await client.set("key", "value")
    value = await client.get("key")
    print(f"Retrieved value: {value}")
    
    await client.close()

asyncio.run(main())`,
        Cluster: `# Valkey Glide Cluster Python Template
# Valkey Glide Example (Python) - Cluster Mode
import asyncio
from glide import NodeAddress, GlideClusterClient, GlideClusterClientConfiguration
import os

async def main():
    host = os.getenv('VALKEY_CLUSTER_HOST', 'localhost')
    port = int(os.getenv('VALKEY_CLUSTER_PORT', '7000'))
    config = GlideClusterClientConfiguration([NodeAddress(host, port)])
    client = await GlideClusterClient.create(config)
    
    # Example operations
    await client.set("key", "value")
    value = await client.get("key")
    print(f"Retrieved value: {value}")
    
    await client.close()

asyncio.run(main())`,
        Leaderboard: `# Leaderboard Use Case in Python
# ...code for leaderboard use case...
import asyncio
import json
import os
from glide import (
    NodeAddress,
    GlideClient,
    GlideClientConfiguration,
)

client = None

async def initialize_client():
    global client
    if client is None:
        try:
            host = os.getenv("VALKEY_HOST", "localhost")
            port = int(os.getenv("VALKEY_PORT", 6379))
            config = GlideClientConfiguration([NodeAddress(host, port)])
            client = await GlideClient.create(config)
            print("Connected to Valkey server")
        except Exception as e:
            print(f"Error initializing Valkey client: {e}")
            raise

# Function to set player data
async def set_player_data(player_id, data):
    await initialize_client()
    try:
        key = f"player:{player_id}"
        print(f"Storing player data: key={key}, data={data}")
        await client.set(key, json.dumps(data))
    except Exception as e:
        print(f"Error setting data for player {player_id}: {e}")
        raise

# Function to get player data
async def get_player_data(player_id):
    await initialize_client()
    try:
        key = f"player:{player_id}"
        data = await client.get(key)
        print(f"Retrieved data for key={key}: {data}")
        return json.loads(data) if data else None
    except Exception as e:
        print(f"Error getting data for player {player_id}: {e}")
        return None

# Function to update player score
async def update_player_score(player_id, score):
    await initialize_client()
    try:
        print(f"Updating score: leaderboard, score={score}, playerId={player_id}")
        await client.custom_command(["ZADD", "leaderboard", str(score), player_id])
    except Exception as e:
        print(f"Error updating score for player {player_id}: {e}")
        raise

# Function to get player rank
async def get_player_rank(player_id):
    await initialize_client()
    try:
        rank = await client.custom_command(["ZREVRANK", "leaderboard", player_id])
        print(f"Rank for player {player_id}: {rank}")
        return int(rank) + 1 if rank is not None else None  # Ranks are zero-based
    except Exception as e:
        print(f"Error getting rank for player {player_id}: {e}")
        return None

# Function to get top N players
async def get_top_players(n):
    await initialize_client()
    try:
        response = await client.custom_command(
            ["ZREVRANGE", "leaderboard", "0", str(n - 1), "WITHSCORES"]
        )
        print(f"Raw leaderboard data: {response}")

        players = []
        for i in range(0, len(response), 2):
            player_id = response[i]
            score = float(response[i + 1])
            data = await get_player_data(player_id)
            print(f"Fetched data for playerId={player_id}, score={score}: {data}")
            players.append({
                "rank": len(players) + 1,
                "playerId": player_id,
                "score": score,
                **(data or {})
            })

        return players
    except Exception as e:
        print(f"Error getting top {n} players: {e}")
        return []

# Function to close the client connection
async def close_client():
    global client
    if client:
        await client.close()
        client = None

# Example usage
async def example_usage():
    try:
        # 1. Initialize player data
        print("Initializing player data...")
        await set_player_data("player1", {"name": "Alice", "level": 5})
        await set_player_data("player2", {"name": "Bob", "level": 8})
        await set_player_data("player3", {"name": "Charlie", "level": 3})

        # 2. Get player data
        print("Fetching player data...")
        player1_data = await get_player_data("player1")
        print(f"Player 1 Data: {player1_data}")
        player2_data = await get_player_data("player2")
        print(f"Player 2 Data: {player2_data}")

        # 3. Update player scores
        print("Updating player scores...")
        await update_player_score("player1", 1500)
        await update_player_score("player2", 1800)
        await update_player_score("player3", 1200)

        # 4. Get player rank
        print("Getting player ranks...")
        player1_rank = await get_player_rank("player1")
        print(f"Player 1 Rank: {player1_rank}")
        player2_rank = await get_player_rank("player2")
        print(f"Player 2 Rank: {player2_rank}")

        # 5. Fetch top 2 players
        print("Fetching top 2 players...")
        top_players = await get_top_players(2)
        print(f"Top Players: {json.dumps(top_players, indent=2)}")

    except Exception as e:
        print(f"Error during example usage: {e}")
    finally:
        # Ensure the client is closed
        print("Closing Valkey client...")
        await close_client()

# Run the example usage
asyncio.run(example_usage())
`,
        'Session Cache': `# Session Cache Use Case in Python
# ...code for session cache use case...
import asyncio
from glide import (
  NodeAddress,
  GlideClient,
  GlideClientConfiguration,
)
import os
async def session_cache_example(client, username):
  # Check if the session data (user's visit count) exists
  if await client.hexists(username, 'visits'):
      visits = await client.hincrby(username, 'visits', 1)
      
      # Set the expiration for the user session to 10 seconds
      await client.expire(username, 10)
      return f"Incremented visit count for {username}. Visits: {visits}"
          
  else:
      # If the user doesn't exist in the session, create a new session with visit count 0
      await client.hset(username, {'visits': '0'})  # Store '0' as string
      await client.expire(username, 10)  # Set session to expire after 10 seconds
      return f'New session created for {username}. Visits: 0'
# Example usage
username = 'john_doe'
async def main():
  # Create Glide client
  config = GlideClientConfiguration([NodeAddress("localhost", 6379)])
  client = await GlideClient.create(config)
  result = await session_cache_example(client, username)
  print(result)
asyncio.run(main())`, Cluster: `import asyncio
from glide import (
  NodeAddress,
  GlideClusterClient,
  GlideClusterClientConfiguration,
)
import os
async def session_cache_example(client, username):
  # Check if the session data (user's visit count) exists
  if await client.hexists(username, 'visits'):
      visits = await client.hincrby(username, 'visits', 1)
      
      # Set the expiration for the user session to 10 seconds
      await client.expire(username, 10)
      return f"Incremented visit count for {username}. Visits: {visits}"
          
  else:
      # If the user doesn't exist in the session, create a new session with visit count 0
      await client.hset(username, {'visits': '0'})  # Store '0' as string
      await client.expire(username, 10)  # Set session to expire after 10 seconds
      return f'New session created for {username}. Visits: 0'
# Example usage
username = 'john_doe'
async def main():
  # Create Glide cluster client
  host = os.getenv('VALKEY_CLUSTER_HOST', 'localhost')
  port = int(os.getenv('VALKEY_CLUSTER_PORT', '7000'))
  config = GlideClusterClientConfiguration([NodeAddress(host, port)])
  client = await GlideClusterClient.create(config)
  result = await session_cache_example(client, username)
  print(result)
asyncio.run(main())`,
        'Recommendation System': `# Recommendation System Use Case in Python
# ...code for recommendation system use case...
import json
import numpy as np
import asyncio
from glide import (
  NodeAddress,
  GlideClient,
  GlideClientConfiguration,
)
async def store_products(client, products):
  # Store each product in Valkey
  product_keys = []
  for p in products:
      product_key = f"product:{p['id']}"
      await client.hset(
          product_key,
          {"name": p["name"], "embedding": json.dumps(p["embedding"])}
      )
      product_keys.append(product_key)
  await client.hset("products:index", {"keys": json.dumps(product_keys)})
async def recommend(client, user_embeddings, top_n):
  user_avg = np.mean(user_embeddings, axis=0)
  recs = []
  # Retrieve keys of all products (you might store them in a separate index key)
  product_keys = [
      f"product:{i}" for i in range(1, 9)
  ] 
  for key in product_keys:
      # Retrieve fields individually
      name_bytes = await client.hget(key, "name")
      embedding_bytes = await client.hget(key, "embedding")
      
      name = name_bytes.decode("utf-8")
      embedding = json.loads(embedding_bytes.decode("utf-8"))
      sim = np.dot(user_avg, embedding)
      recs.append((name, sim))
  return sorted(recs, key=lambda x: -x[1])[:top_n]
async def main():
  # Create Glide client
  config = GlideClientConfiguration([NodeAddress("localhost", 6379)])
  client = await GlideClient.create(config)
  # Sample dataset
  products = [
      {"id": "1", "name": "Red Scarf", "embedding": [0.1, 0.3, 0.5], "color": "Red", "price": 20},
      {"id": "2", "name": "Blue Hat", "embedding": [0.4, 0.1, 0.6], "color": "Blue", "price": 15},
      {"id": "3", "name": "Green Jacket", "embedding": [0.2, 0.5, 0.7], "color": "Green", "price": 50},
      {"id": "4", "name": "Yellow Gloves", "embedding": [0.6, 0.1, 0.2], "color": "Yellow", "price": 10},
      {"id": "5", "name": "Black Shoes", "embedding": [0.3, 0.3, 0.8], "color": "Black", "price": 80},
      {"id": "6", "name": "White T-Shirt", "embedding": [0.7, 0.6, 0.1], "color": "White", "price": 25},
      {"id": "7", "name": "Purple Socks", "embedding": [0.1, 0.9, 0.4], "color": "Purple", "price": 5},
      {"id": "8", "name": "Orange Belt", "embedding": [0.5, 0.2, 0.1], "color": "Orange", "price": 18},
  ]
  await store_products(client, products)
  # Sample users
  user_embeddings = [[0.1, 0.3, 0.5], [0.3, 0.4, 0.6]]
  recommendations = await recommend(client, user_embeddings, top_n=3)
  print(recommendations)
asyncio.run(main())`
    },
    'valkey-glide (Node)': {
        Standalone: `// Valkey Glide Standalone Node.js Template
// Valkey Glide Example (Node)
import { GlideClient } from '@valkey/valkey-glide';

async function main() {
    const host = process.env.VALKEY_HOST || 'localhost';
    const port = process.env.VALKEY_PORT || 6379;
    const client = await GlideClient.createClient({
        addresses: [{ host, port: parseInt(port) }],
        clientName: 'example-client'
    });

    // Example operations
    await client.set('key', 'value');
    const value = await client.get('key');
    console.log('Retrieved value:', value);

    await client.close();
}

await main();`,
        Cluster: `// Valkey Glide Cluster Node.js Template
// Valkey Glide Example (Node) - Cluster Mode
import { GlideClusterClient } from '@valkey/valkey-glide';

async function main() {
    const host = process.env.VALKEY_CLUSTER_HOST || 'localhost';
    const port = process.env.VALKEY_CLUSTER_PORT || 7000;
    const client = await GlideClusterClient.createClient({
        addresses: [{ host, port: parseInt(port) }],
        clientName: 'example-cluster-client'
    });

    // Example operations
    await client.set('key', 'value');
    const value = await client.get('key');
    console.log('Retrieved value:', value);

    await client.close();
}

await main();`,
        Leaderboard: `// Leaderboard Use Case in Node.js
// ...code for leaderboard use case...
// Import Valkey-Glide
import { GlideClient } from '@valkey/valkey-glide';
// Initialize the Valkey client
let client;
async function initializeClient(mode = 'standalone') {
try {
  if (!client) {
    const host = process.env.VALKEY_HOST || 'localhost';
    const port = process.env.VALKEY_PORT || 6379;
    client = await GlideClient.createClient({
      addresses: [
        {
          host: host,
          port: port,
        },
      ],
      clientName: 'leaderboard_client',
    });
    console.log('Connected to Valkey server');
  }
} catch (error) {
  console.error('Error initializing Valkey client:', error);
  throw error;
}
}
// Function to set player data
async function setPlayerData(playerId, data) {
await initializeClient();
try {
  const key = \`player:\${playerId}\`;
  console.log(\`Storing player data: key=\${key}, data=\${JSON.stringify(data)}\`);
  await client.set(key, JSON.stringify(data));
} catch (error) {
  console.error(\`Error setting data for player \${playerId}:\`, error);
  throw error;
}
}
// Function to get player data
async function getPlayerData(playerId) {
await initializeClient();
try {
  const key = \`player:\${playerId}\`;
  const data = await client.get(key);
  console.log(\`Retrieved data for key=\${key}:\`, data);
  return data ? JSON.parse(data) : null;
} catch (error) {
  console.error(\`Error getting data for player \${playerId}:\`, error);
  return null;
}
}
// Function to update player score
async function updatePlayerScore(playerId, score) {
await initializeClient();
try {
  console.log(\`Updating score: leaderboard, score=\${score}, playerId=\${playerId}\`);
  await client.customCommand(['ZADD', 'leaderboard', score.toString(), playerId]);
} catch (error) {
  console.error(\`Error updating score for player \${playerId}:\`, error);
  throw error;
}
}
// Function to get player rank
async function getPlayerRank(playerId) {
await initializeClient();
try {
  const rank = await client.customCommand(['ZREVRANK', 'leaderboard', playerId]);
  console.log(\`Rank for player \${playerId}:\`, rank);
  return rank !== null ? parseInt(rank) + 1 : null; // Ranks are zero-based
} catch (error) {
  console.error(\`Error getting rank for player \${playerId}:\`, error);
  return null;
}
}
// Function to get top N players
async function getTopPlayers(n) {
await initializeClient();
try {
  const response = await client.customCommand([
    'ZREVRANGE',
    'leaderboard',
    '0',
    (n - 1).toString(),
    'WITHSCORES',
  ]);
  console.log('Raw leaderboard data:', response);
  const players = [];
  for (const [playerId, scoreStr] of response) {
    const score = parseFloat(scoreStr);
    const data = await getPlayerData(playerId);
    console.log(\`Fetched data for playerId=\${playerId}, score=\${score}:\`, data);
    players.push({
      rank: players.length + 1,
      playerId,
      score,
      ...data,
    });
  }
  return players;
} catch (error) {
  console.error(\`Error getting top \${n} players:\`, error);
  return [];
}
}
// Function to close the client connection
async function closeClient() {
if (client) {
  await client.close();
  client = null;
}
}
async function exampleUsage() {
try {
  // 1. Initialize player data
  console.log("Initializing player data...");
  await setPlayerData("player1", { name: "Alice", level: 5 });
  await setPlayerData("player2", { name: "Bob", level: 8 });
  await setPlayerData("player3", { name: "Charlie", level: 3 });
  // 2. Get player data
  console.log("Fetching player data...");
  const player1Data = await getPlayerData("player1");
  console.log("Player 1 Data:", player1Data);
  const player2Data = await getPlayerData("player2");
  console.log("Player 2 Data:", player2Data);
  // 3. Update player scores
  console.log("Updating player scores...");
  await updatePlayerScore("player1", 1500);
  await updatePlayerScore("player2", 1800);
  await updatePlayerScore("player3", 1200);
  // 4. Get player rank
  console.log("Getting player ranks...");
  const player1Rank = await getPlayerRank("player1");
  console.log("Player 1 Rank:", player1Rank);
  const player2Rank = await getPlayerRank("player2");
  console.log("Player 2 Rank:", player2Rank);
  // 5. Fetch top 2 players
  console.log("Fetching top 2 players...");
  const topPlayers = await getTopPlayers(2);
  console.log("Top Players:", JSON.stringify(topPlayers, null, 2));
} catch (error) {
  console.error("Error during example usage:", error);
} finally {
  // Ensure the client is closed
  console.log("Closing Valkey client...");
  await closeClient();
}
}
// Run the example usage
await exampleUsage();`,
'Session Cache': `// Session Cache Use Case in Node.js
// ...code for session cache use case... 
import { GlideClient } from '@valkey/valkey-glide';

async function sessionCacheExample(client, username) {
    // Check if the 'visits' field exists in the user's hash
    const exists = await client.hexists(username, 'visits');

    if (exists) {
        // Increment the 'visits' field by 1
        const visits = await client.hincrBy(username, 'visits', 1);

        // Set the expiration for the user session to 10 seconds
        await client.expire(username, 10);

        return \`Incremented visit count for \${username}. Visits: \${visits}\`;
    } else {
        // If the user doesn't exist in the session, create a new session with visit count 0
        await client.hset(username, { visits: '0' }); // Store '0' as a string
        await client.expire(username, 10);

        return \`New session created for \${username}. Visits: 0\`;
    }
}

async function main() {
    const host = process.env.VALKEY_HOST || 'localhost';
    const port = process.env.VALKEY_PORT ? parseInt(process.env.VALKEY_PORT) : 6379;

    // Create the Glide client
    const client = await GlideClient.createClient({
        addresses: [{ host, port }],
        clientName: 'session-cache-client'
    });

    const username = 'john_doe';

    try {
        const result = await sessionCacheExample(client, username);
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

// Run the main function
await main();
`,
'Recommendation System': `// Recommendation System Use Case in Node.js
// ...code for recommendation system use case...
import { GlideClient } from '@valkey/valkey-glide';

// Utility function to calculate the dot product of two arrays
function dotProduct(a, b) {
    return a.reduce((sum, value, i) => sum + value * b[i], 0);
}

// Function to store products in Valkey Glide
async function storeProducts(client, products) {
    const productKeys = [];
    for (const product of products) {
        const productKey = \`product:\${product.id}\`;
        await client.customCommand([
            'HSET',
            productKey,
            'name',
            product.name,
            'embedding',
            JSON.stringify(product.embedding),
        ]);
        productKeys.push(productKey);
    }
    await client.customCommand([
        'HSET',
        'products:index',
        'keys',
        JSON.stringify(productKeys),
    ]);
}

// Function to get recommendations
async function recommend(client, userEmbeddings, topN) {
    // Calculate the average user embedding
    const userAvg = userEmbeddings[0].map((_, i) =>
        userEmbeddings.reduce((sum, embedding) => sum + embedding[i], 0) / userEmbeddings.length
    );

    const recs = [];
    // Retrieve keys of all products (assuming 8 products)
    const productKeys = Array.from({ length: 8 }, (_, i) => \`product:\${i + 1}\`);

    for (const key of productKeys) {
        const name = await client.customCommand(['HGET', key, 'name']);
        const embeddingStr = await client.customCommand(['HGET', key, 'embedding']);

        const embedding = JSON.parse(embeddingStr);
        const sim = dotProduct(userAvg, embedding);

        recs.push({ name, similarity: sim });
    }

    // Sort by similarity in descending order and return top N recommendations
    return recs.sort((a, b) => b.similarity - a.similarity).slice(0, topN);
}

// Main function
async function main() {
    const client = await GlideClient.createClient({
        addresses: [{ host: 'localhost', port: 6379 }],
    });

    const products = [
        { id: '1', name: 'Red Scarf', embedding: [0.1, 0.3, 0.5] },
        { id: '2', name: 'Blue Hat', embedding: [0.4, 0.1, 0.6] },
        { id: '3', name: 'Green Jacket', embedding: [0.2, 0.5, 0.7] },
        { id: '4', name: 'Yellow Gloves', embedding: [0.6, 0.1, 0.2] },
        { id: '5', name: 'Black Shoes', embedding: [0.3, 0.3, 0.8] },
        { id: '6', name: 'White T-Shirt', embedding: [0.7, 0.6, 0.1] },
        { id: '7', name: 'Purple Socks', embedding: [0.1, 0.9, 0.4] },
        { id: '8', name: 'Orange Belt', embedding: [0.5, 0.2, 0.1] },
    ];

    await storeProducts(client, products);

    const userEmbeddings = [
        [0.1, 0.3, 0.5],
        [0.3, 0.4, 0.6],
    ];

    const recommendations = await recommend(client, userEmbeddings, 3);
    console.log('Top Recommendations:', recommendations);

    await client.close();
}

// Run the main function
main().catch((error) => {
    console.error('Error:', error);
});
`
    },
    'valkey-glide (Java)': {
        Standalone: `// Valkey Glide Standalone Java Template
// Valkey Glide Example (Java)
import io.valkey.glide.*;
import java.util.Arrays;

public class Example {
    public static void main(String[] args) {
        String host = System.getenv("VALKEY_HOST") != null ? System.getenv("VALKEY_HOST") : "localhost";
        int port = System.getenv("VALKEY_PORT") != null ? Integer.parseInt(System.getenv("VALKEY_PORT")) : 6379;
        
        GlideClientConfiguration config = new GlideClientConfiguration(
            Arrays.asList(new NodeAddress(host, port))
        );
        
        try (GlideClient client = GlideClient.create(config)) {
            // Example operations
            client.set("key", "value").get();
            String value = client.get("key").get();
            System.out.println("Retrieved value: " + value);
        }
    }
}`,
        Cluster: `// Valkey Glide Cluster Java Template
// Valkey Glide Example (Java) - Cluster Mode
import io.valkey.glide.*;
import java.util.Arrays;

public class Example {
    public static void main(String[] args) {
        String host = System.getenv("VALKEY_CLUSTER_HOST") != null ? System.getenv("VALKEY_CLUSTER_HOST") : "localhost";
        int port = System.getenv("VALKEY_CLUSTER_PORT") != null ? Integer.parseInt(System.getenv("VALKEY_CLUSTER_PORT")) : 7000;
        
        GlideClientConfiguration config = new GlideClientConfiguration(Arrays.asList(
            new NodeAddress(host, port)
        ));
        
        try (GlideClient client = GlideClient.create(config)) {
            // Example operations
            client.set("key", "value").get();
            String value = client.get("key").get();
            System.out.println("Retrieved value: " + value);
        }
    }
}`,
        Leaderboard: `// Leaderboard Use Case in Java
// ...code for leaderboard use case...`
    },
    'valkey-py (Python)': {
        Standalone: `# Valkey Example
import valkey
import os

host = os.getenv('VALKEY_HOST', 'localhost')
port = int(os.getenv('VALKEY_PORT', '6379'))
client = valkey.Valkey(host=host, port=port, db=0)

# Example operations
client.set('key', 'value')
value = client.get('key')
print(f"Retrieved value: {value}")`,
        Cluster: `# Valkey Cluster Example
import valkey
import os

host = os.getenv('VALKEY_CLUSTER_HOST', 'localhost')
port = int(os.getenv('VALKEY_CLUSTER_PORT', '7000'))
client = valkey.cluster.ValkeyCluster(host=host, port=port)

# Example operations
client.set('key', 'value')
value = client.get('key')
print(f"Retrieved value: {value}")`
    },
    'iovalkey (Node)': {
        Standalone: `// IOValkey Example
import IOValkey from 'iovalkey';

async function main() {
    const host = process.env.VALKEY_HOST || 'localhost';
    const port = process.env.VALKEY_PORT || 6379;
    const client = new IOValkey({
        host,
        port: parseInt(port)
    });
    
    // Example operations
    await client.set('key', 'value');
    const value = await client.get('key');
    console.log('Retrieved value:', value);
    
    await client.quit();
}

await main();`,
        Cluster: `// IOValkey Example - Cluster Mode
import IOValkey from 'iovalkey';

async function main() {
    const host = process.env.VALKEY_CLUSTER_HOST || 'localhost';
    const port = process.env.VALKEY_CLUSTER_PORT || 7000;
    const client = new IOValkey.Cluster([
        { host, port: parseInt(port) }
    ]);
    
    // Example operations
    await client.set('key', 'value');
    const value = await client.get('key');
    console.log('Retrieved value:', value);
    
    await client.quit();
}

await main();`
    },
    'valkey-java (Java)': {
        Standalone: `// Valkey Java Example
import io.valkey.Client;
import io.valkey.ClientBuilder;

public class Example {
    public static void main(String[] args) {
        String host = System.getenv("VALKEY_HOST") != null ? System.getenv("VALKEY_HOST") : "localhost";
        int port = System.getenv("VALKEY_PORT") != null ? Integer.parseInt(System.getenv("VALKEY_PORT")) : 6379;
        
        Client client = new ClientBuilder()
            .withHostAndPort(host, port)
            .build();
            
        // Example operations
        client.set("key", "value");
        String value = client.get("key");
        System.out.println("Retrieved value: " + value);
        
        client.close();
    }
}`,
        Cluster: `// Valkey Java Example - Cluster Mode
import io.valkey.Client;
import io.valkey.ClientBuilder;

public class Example {
    public static void main(String[] args) {
        String host = System.getenv("VALKEY_CLUSTER_HOST") != null ? System.getenv("VALKEY_CLUSTER_HOST") : "localhost";
        int port = System.getenv("VALKEY_CLUSTER_PORT") != null ? Integer.parseInt(System.getenv("VALKEY_CLUSTER_PORT")) : 7000;
        
        Client client = new ClientBuilder()
            .withClusterNodes(host + ":" + port)
            .build();
            
        // Example operations
        client.set("key", "value");
        String value = client.get("key");
        System.out.println("Retrieved value: " + value);
        
        client.close();
    }
}`
    },
    'valkey-go (Go)': {
        Standalone: `// Valkey Go Example
package main

import (
    "fmt"
    "os"
    "github.com/valkey-io/valkey-go/v9"
    "context"
)

func main() {
    ctx := context.Background()
    host := os.Getenv("VALKEY_HOST")
    if host == "" {
        host = "localhost:6379"
    }
    
    rdb := valkey.NewClient(&valkey.Options{
        Addr: host,
    })
    defer rdb.Close()

    // Example operations
    err := rdb.Set(ctx, "key", "value", 0).Err()
    if err != nil {
        panic(err)
    }

    val, err := rdb.Get(ctx, "key").Result()
    if err != nil {
        panic(err)
    }
    fmt.Println("key", val)
}`,

        Cluster: `// Valkey Go Example - Cluster Mode
package main

import (
    "fmt"
    "os"
    "github.com/valkey-io/valkey-go/v9"
    "context"
)

func main() {
    ctx := context.Background()
    host := os.Getenv("VALKEY_CLUSTER_HOST")
    if host == "" {
        host = "localhost:7000"
    }

    rdb := valkey.NewFailoverClient(&valkey.FailoverOptions{
        MasterName:    "mymaster",
        SentinelAddrs: []string{host},
    })
    defer rdb.Close()

    // Example operations
    err := rdb.Set(ctx, "key", "value", 0).Err()
    if err != nil {
        panic(err)
    }

    val, err := rdb.Get(ctx, "key").Result()
    if err != nil {
        panic(err)
    }
    fmt.Println("key", val)
}`,
    }
};
