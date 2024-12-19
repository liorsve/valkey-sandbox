export const codeTemplates = {
    'valkey-glide (Python)': {
        Standalone: `# Valkey Glide Standalone Python Template
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
        Cluster: `# Valkey Glide Example (Python) - Cluster Mode
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
        'Session Cache': `import asyncio
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
import json
import numpy as np
import asyncio
from glide import (
  NodeAddress,
  GlideClusterClient,
  GlideClusterClientConfiguration,
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
  config = GlideClusterClientConfiguration([NodeAddress("localhost", 7000)])
  client = await GlideClusterClient.create(config)
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
asyncio.run(main())`,
        'Lock': `# Lock Example using Valkey Glide in Python
import asyncio
from glide import NodeAddress, GlideClusterClient, GlideClusterClientConfiguration, ConditionalChange, ExpirySet, ExpiryType
import os

async def lock_example(client, lock_key, resource_key):
    # Try to acquire lock with 10 second expiry
    lock_acquired = await client.set(
        lock_key, 
        'locked', 
        conditional_set=ConditionalChange.ONLY_IF_DOES_NOT_EXIST, 
        expiry=ExpirySet(ExpiryType.SEC, 10)
    )
    if lock_acquired:
        try:
            # Critical section - modify resource
            await client.incr(resource_key)
            current = await client.get(resource_key)
            print(f"Modified resource: {current}")
        finally:
            # Always release the lock
            await client.delete(lock_key)
            print("Lock released")
    else:
        print("Lock is held by another process")

async def main():
    host = os.getenv('VALKEY_HOST', 'localhost')
    port = int(os.getenv('VALKEY_PORT', '7000'))
    config = GlideClusterClientConfiguration([NodeAddress(host, port)])
    client = await GlideClusterClient.create(config)
    
    await lock_example(client, 'mylock', 'counter')
    
    await client.close()

asyncio.run(main())`,
        'Queue': `# Queue Example using Valkey Glide in Python
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
    host = os.getenv('VALKEY_HOST', 'localhost')
    port = int(os.getenv('VALKEY_PORT', '7000'))
    config = GlideClusterClientConfiguration([NodeAddress(host, port)])
    client = await GlideClusterClient.create(config)
    
    await queue_example(client, 'myqueue')
    
    await client.close()

asyncio.run(main())`,
    },
    'valkey-glide (Node)': {
        Standalone: `// Valkey Glide Standalone Node.js Template
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
        Cluster: `// Valkey Glide Example (Node) - Cluster Mode
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
        'Session Cache': `// Session Cache Use Case in Node.js
import { GlideClusterClient } from '@valkey/valkey-glide';

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
    const port = process.env.VALKEY_PORT ? parseInt(process.env.VALKEY_PORT) : 7000;

    // Create the Glide client
    const client = await GlideClusterClient.createClient({
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
import { GlideClusterClient } from '@valkey/valkey-glide';

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
    const client = await GlideClusterClient.createClient({
        addresses: [{ host: 'localhost', port: 7000 }],
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
await main();
`,
        'Lock': `// Lock Example using Valkey Glide in Node.js
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
        addresses: [{ host: 'localhost', port: 7000 }],
    });
    
    await lockExample(client, 'mylock', 'counter');
    
    await client.close();
}

await main();`,
        'Queue': `// Queue Example using Valkey Glide in Node.js
import { GlideClusterClient } from '@valkey/valkey-glide';

async function queueExample(client, queueKey) {
    // Add items to queue
    const tasks = ['task1', 'task2', 'task3'];
    for (const task of tasks) {
        await client.rpush(queueKey, task);
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
        addresses: [{ host: 'localhost', port: 7000 }],
    });
    
    await queueExample(client, 'myqueue');
    
    await client.close();
}

await main();`,
    },
    'valkey-glide (Java)': {
        Standalone: `// Valkey Glide Standalone Java Template
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
        Cluster: `// Valkey Glide Example (Java) - Cluster Mode
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
        'Lock': `// Lock Example using Valkey Glide in Java
import io.valkey.glide.*;
import java.util.Arrays;

public class LockExample {
    public static void main(String[] args) throws Exception {
        GlideClientConfiguration config = new GlideClientConfiguration(
            Arrays.asList(new NodeAddress("localhost", 6379))
        );
        
        try (GlideClient client = GlideClient.create(config)) {
            lockExample(client, "mylock", "counter");
        }
    }
    
    private static void lockExample(GlideClient client, String lockKey, String resourceKey) throws Exception {
        // Try to acquire lock with 10 second expiry
        boolean lockAcquired = client.set(lockKey, "locked", new SetArgs().nx().ex(10)).get();
        if (lockAcquired) {
            try {
                // Critical section - modify resource
                client.incr(resourceKey).get();
                String current = client.get(resourceKey).get();
                System.out.println("Modified resource: " + current);
            } finally {
                // Always release the lock
                client.del(lockKey).get();
                System.out.println("Lock released");
            }
        } else {
            System.out.println("Lock is held by another process");
        }
    }
}`,
        'Queue': `// Queue Example using Valkey Glide in Java
import io.valkey.glide.*;
import java.util.Arrays;
import java.util.List;

public class QueueExample {
    public static void main(String[] args) throws Exception {
        GlideClientConfiguration config = new GlideClientConfiguration(
            Arrays.asList(new NodeAddress("localhost", 6379))
        );
        
        try (GlideClient client = GlideClient.create(config)) {
            queueExample(client);
        }
    }
    
    private static void queueExample(GlideClient client) throws Exception {
        String queueKey = "myqueue";
        
        // Add items to queue
        List<String> tasks = Arrays.asList("task1", "task2", "task3");
        for (String task : tasks) {
            client.rpush(queueKey, task).get();
            System.out.println("Added to queue: " + task);
        }
        
        // Process queue
        while (true) {
            String task = client.lpop(queueKey).get();
            if (task == null) break;
            System.out.println("Processing: " + task);
            Thread.sleep(1000); // Simulate work
        }
    }
}`,
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
    if (host == "") {
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
    if (host == "") {
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
