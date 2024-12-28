export const sessionCache = {
  name: "Session Cache",
  description: "Manage user sessions with expiration using Valkey Glide",
  code: `// Session Cache Use Case in Java
import io.valkey.glide.*;
import java.util.*;
import java.util.concurrent.CompletableFuture;

public class SessionCacheExample {
    private static class Session {
        private final GlideClusterClient client;
        private final String username;

        public Session(GlideClusterClient client, String username) {
            this.client = client;
            this.username = username;
        }

        public CompletableFuture<String> manageSession() {
            return client.hexists(username, "visits")
                .thenCompose(exists -> {
                    if (exists) {
                        return incrementVisits();
                    } else {
                        return createNewSession();
                    }
                });
        }

        private CompletableFuture<String> incrementVisits() {
            return client.hincrBy(username, "visits", 1)
                .thenCompose(visits -> {
                    client.expire(username, 10);
                    return CompletableFuture.completedFuture(
                        String.format("Incremented visit count for %s. Visits: %d", username, visits)
                    );
                });
        }

        private CompletableFuture<String> createNewSession() {
            Map<String, String> sessionData = new HashMap<>();
            sessionData.put("visits", "0");
            return client.hset(username, sessionData)
                .thenCompose(result -> {
                    client.expire(username, 10);
                    return CompletableFuture.completedFuture(
                        String.format("New session created for %s. Visits: 0", username)
                    );
                });
        }
    }

    public static void main(String[] args) throws Exception {
        GlideClusterClientConfiguration config = new GlideClusterClientConfiguration(
            Arrays.asList(new NodeAddress("valkey-cluster", 7000))
        );
        
        try (GlideClusterClient client = GlideClusterClient.create(config)) {
            Session session = new Session(client, "john_doe");
            String result = session.manageSession().get();
            System.out.println(result);
        }
    }
}`,
};

export default sessionCache;
