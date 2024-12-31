export const basicTemplates = {
  standalone: {
    code: `// IOValkey Example
import IOValkey from 'iovalkey';

async function main() {
    const host = process.env.VALKEY_STANDALONE_HOST || 'valkey-standalone';
    const port = process.env.VALKEY_STANDALONE_PORT || 6379;
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
    description:
      "A standalone IOValkey template demonstrating basic set and get operations.",
  },

  cluster: {
    code: `// IOValkey Example - Cluster Mode
import IOValkey from 'iovalkey';

async function main() {
    const host = process.env.VALKEY_CLUSTER_HOST || 'valkey-cluster';
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

await main();`,
    description:
      "A cluster mode IOValkey template showcasing interaction with a Valkey cluster.",
  },
};

export default basicTemplates;
