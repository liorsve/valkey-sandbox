export const lockManager = {
  name: "Lock Manager",
  description: "Distributed locking mechanism with Valkey Glide",
  code: `# Lock Example using Valkey Glide in Python
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
    host = os.getenv('VALKEY_CLUSTER_HOST', 'valkey-cluster')
    port = int(os.getenv('VALKEY_CLUSTER_PORT', '7000'))
    config = GlideClusterClientConfiguration([NodeAddress(host, port)])
    client = await GlideClusterClient.create(config)
    
    await lock_example(client, 'mylock', 'counter')
    
    await client.close()

asyncio.run(main())`
};

export default lockManager;
