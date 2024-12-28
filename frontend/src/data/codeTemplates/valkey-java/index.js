export const valkeyJava = {
  standalone: {
    code: `// Valkey Java Example
import io.valkey.Client;
import io.valkey.ClientBuilder;

public class Example {
    public static void main(String[] args) {
        String host = System.getenv("VALKEY_STANDALONE_HOST") != null ? System.getenv("VALKEY_STANDALONE_HOST") : "valkey-standalone";
        int port = System.getenv("VALKEY_STANDALONE_PORT") != null ? Integer.parseInt(System.getenv("VALKEY_STANDALONE_PORT")) : 6379;
        
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
    description:
      "A standalone Java template for Valkey Glide, demonstrating basic set and get operations.",
  },

  cluster: {
    code: `// Valkey Java Example - Cluster Mode
import io.valkey.Client;
import io.valkey.ClientBuilder;

public class Example {
    public static void main(String[] args) {
        String host = System.getenv("VALKEY_CLUSTER_HOST") != null ? System.getenv("VALKEY_CLUSTER_HOST") : "valkey-cluster";
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
}`,
    description:
      "A cluster mode Java template for Valkey Glide, showcasing interaction with a Valkey cluster.",
  },
};

export default valkeyJava;
