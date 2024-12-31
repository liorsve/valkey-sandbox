export const pythonBasicTemplates = {
  standalone: {
    code: `# Valkey Glide Standalone Python Template
import asyncio
from glide import NodeAddress, GlideClient, GlideClientConfiguration
import os

async def main():
    host = os.getenv('VALKEY_STANDALONE_HOST', 'localhost')
    port = int(os.getenv('VALKEY_STANDALONE_PORT', '6379'))
    config = GlideClientConfiguration([NodeAddress(host, port)])
    client = await GlideClient.create(config)
    
    # Example operations
    await client.set("key", "value")
    value = await client.get("key")
    print(f"Retrieved value: {value}")
    
    await client.close()

asyncio.run(main())`,
    description:
      "A standalone Python template for Valkey Glide with example operations.",
  },
  cluster: {
    code: `# Valkey Glide Example (Python) - Cluster Mode
import asyncio
from glide import NodeAddress, GlideClusterClient, GlideClusterClientConfiguration
import os

async def main():
    host = os.getenv('VALKEY_CLUSTER_HOST', 'valkey-cluster')
    port = int(os.getenv('VALKEY_CLUSTER_PORT', '7000'))
    config = GlideClusterClientConfiguration([NodeAddress(host, port)])
    client = await GlideClusterClient.create(config)
    
    # Example operations
    await client.set("key", "value")
    value = await client.get("key")
    print(f"Retrieved value: {value}")
    
    await client.close()

asyncio.run(main())`,
    description:
      "A Python template for Valkey Glide in cluster mode with example operations.",
  },
};

export default pythonBasicTemplates;
