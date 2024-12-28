export const valkeyPy = {
  standalone: {
    code: `# Valkey Example
import valkey
import os

host = os.getenv('VALKEY_STANDALONE_HOST', 'valkey-standalone')
port = int(os.getenv('VALKEY_STANDALONE_PORT', '6379'))
client = valkey.Valkey(host=host, port=port, db=0)

# Example operations
client.set('key', 'value')
value = client.get('key')
print(f"Retrieved value: {value}")`,
    description:
      "A standalone Python template for Valkey Glide, demonstrating basic set and get operations.",
  },
  cluster: {
    code: `# Valkey Cluster Example
import valkey
import os

host = os.getenv('VALKEY_CLUSTER_HOST', 'valkey-cluster')
port = int(os.getenv('VALKEY_CLUSTER_PORT', '7000'))
client = valkey.cluster.ValkeyCluster(host=host, port=port)

# Example operations
client.set('key', 'value')
value = client.get('key')
print(f"Retrieved value: {value}")`,
    description:
      "A cluster mode Python template for Valkey Glide, showcasing interaction with a Valkey cluster.",
  },
};

export default valkeyPy;
