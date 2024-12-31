export const nodeBasicTemplates = {
  standalone: {
    code: `// Valkey Glide Standalone Node.js Template
import { GlideClient } from '@valkey/valkey-glide';

async function main() {
    const host = process.env.VALKEY_STANDALONE_HOST || 'valkey-standalone';
    const port = process.env.VALKEY_STANDALONE_PORT || 6379;
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
    description: "Valkey Glide Standalone Node.js Template",
  },
  cluster: {
    code: `// Valkey Glide Example (Node) - Cluster Mode
import { GlideClusterClient } from '@valkey/valkey-glide';

async function main() {
    const host = process.env.VALKEY_CLUSTER_HOST || 'valkey-cluster';
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
    description: "Valkey Glide Example (Node) - Cluster Mode",
  },
};

export default nodeBasicTemplates;
