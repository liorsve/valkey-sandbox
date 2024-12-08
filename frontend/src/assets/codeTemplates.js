export const codeTemplates = {
    'valkey-glide (Python)': {
        Standalone: `# Valkey Glide Example (Python)
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

asyncio.run(main())`
    },
    'valkey-glide (Node)': {
        Standalone: `// Valkey Glide Example (Node)
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

await main();`
    },
    'valkey-glide (Java)': {
        Standalone: `// Valkey Glide Example (Java)
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
}`
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
}`
    }
};
