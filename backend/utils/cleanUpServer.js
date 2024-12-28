import { GlideClusterClient, GlideClient } from "@valkey/valkey-glide";

export async function createCleanupClient(mode = "cluster") {
  const maxRetries = 10;
  const retryDelay = 2000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const host =
        process.env[
          mode === "cluster" ? "VALKEY_CLUSTER_HOST" : "VALKEY_STANDALONE_HOST"
        ];
      const port =
        process.env[
          mode === "cluster" ? "VALKEY_CLUSTER_PORT" : "VALKEY_STANDALONE_PORT"
        ];

      const ClientClass = mode === "cluster" ? GlideClusterClient : GlideClient;
      const clientConfig = {
        addresses: [{ host, port: parseInt(port) }],
        clientName: `cleanup-client-${Date.now()}`,
        connectionTimeout: 5000,
        retryStrategy: (times) => Math.min(times * 200, 1000),
      };

      if (mode === "cluster") {
        clientConfig.clusterMode = true;
      }

      const client = await ClientClass.createClient(clientConfig);
      console.log(
        `[Cleanup] Successfully connected to ${mode} on attempt ${attempt}`
      );
      return client;
    } catch (error) {
      if (attempt === maxRetries) {
        console.error(
          `[Cleanup] Failed to create client after ${maxRetries} attempts:`,
          error.message
        );
        return null;
      }
      console.warn(
        `[Cleanup] Connection attempt ${attempt} failed, retrying in ${retryDelay}ms`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
  return null;
}

export async function cleanupCluster(mode = "cluster") {
  let client = null;
  try {
    client = await createCleanupClient(mode);
    if (!client) {
      console.warn(
        `[Cleanup] Skipping ${mode} cleanup - unable to create client`
      );
      return;
    }

    if (mode === "cluster") {
      // For cluster mode, we need to flush all nodes
      const clusterNodes = await client.clusterNodes();
      await Promise.all(
        clusterNodes.map(async (node) => {
          const nodeClient = await GlideClusterClient.createClient({
            addresses: [{ host: node.host, port: node.port }],
            clientName: `cleanup-node-${Date.now()}`,
          });
          await nodeClient.flushall();
          nodeClient.close();
        })
      );
    } else {
      // For standalone mode, simple flushall
      await client.flushall();
    }

    console.log(`[Cleanup] Successfully flushed ${mode} data`);
  } catch (error) {
    console.error(`[Cleanup] Error during ${mode} cleanup:`, error.message);
  } finally {
    if (client) {
      client.close();
    }
  }
}
