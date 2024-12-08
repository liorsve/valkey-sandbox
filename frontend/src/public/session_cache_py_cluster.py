import asyncio
from glide import (
    NodeAddress,
    GlideClusterClient,
    GlideClusterClientConfiguration,
)

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

asyncio.run(main())