export const sessionCache = {
  name: "Session Cache",
  description: "Manage user sessions with expiration using Valkey Glide",
  code: `// Session Cache Use Case in Node.js
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
    const host = process.env.VALKEY_CLUSTER_HOST || 'valkey-cluster';
    const port = process.env.VALKEY_CLUSTER_PORT || 7000;

    const client = await GlideClusterClient.createClient({
        addresses: [{ host, port: parseInt(port) }],
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

await main();`
};

export default sessionCache;
