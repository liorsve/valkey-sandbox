export const javaBasicTemplates = {
  standalone: {
    code: `// Valkey Glide Standalone Java Template
import io.valkey.glide.*;
import java.util.Arrays;

public class Example {
    public static void main(String[] args) {
        String host = System.getenv("VALKEY_STANDALONE_HOST") != null ? System.getenv("VALKEY_STANDALONE_HOST") : "valkey-standalone";
        int port = System.getenv("VALKEY_STANDALONE_PORT") != null ? Integer.parseInt(System.getenv("VALKEY_STANDALONE_PORT")) : 6379;
        
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
    description: "A standalone Java template for Valkey Glide.",
  },

  cluster: {
    code: `// Valkey Glide Example (Java) - Cluster Mode
import io.valkey.glide.*;
import java.util.Arrays;

public class Example {
    public static void main(String[] args) {
        String host = System.getenv("VALKEY_CLUSTER_HOST") != null ? System.getenv("VALKEY_CLUSTER_HOST") : "valkey-cluster";
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
}`,
    description: "A cluster mode Java template for Valkey Glide.",
  },
};

export default javaBasicTemplates;
