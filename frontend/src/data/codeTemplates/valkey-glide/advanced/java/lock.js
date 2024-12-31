export const lockManager = {
  name: "Lock Manager",
  description: "Distributed locking mechanism with Valkey Glide",
  code: `// Lock Example using Valkey Glide in Java
import io.valkey.glide.*;
import java.util.*;
import java.util.concurrent.*;

public class LockManager {
    private final GlideClusterClient client;
    private final int lockTimeout;

    public LockManager(GlideClusterClient client, int lockTimeout) {
        this.client = client;
        this.lockTimeout = lockTimeout;
    }

    public boolean acquireLock(String lockKey) throws Exception {
        return client.set(lockKey, "locked", new SetArgs().nx().ex(lockTimeout)).get();
    }

    public void releaseLock(String lockKey) throws Exception {
        client.del(lockKey).get();
    }

    public void executeCriticalSection(String lockKey, String resourceKey, Runnable task) throws Exception {
        try {
            if (acquireLock(lockKey)) {
                try {
                    System.out.println("Lock acquired");
                    // Modify shared resource
                    client.incr(resourceKey).get();
                    String value = client.get(resourceKey).get();
                    System.out.println("Resource value: " + value);
                    
                    // Execute task
                    task.run();
                } finally {
                    releaseLock(lockKey);
                    System.out.println("Lock released");
                }
            } else {
                System.out.println("Failed to acquire lock");
            }
        } catch (Exception e) {
            System.err.println("Error in critical section: " + e.getMessage());
            throw e;
        }
    }

    public static void main(String[] args) throws Exception {
        GlideClusterClientConfiguration config = new GlideClusterClientConfiguration(
            Arrays.asList(new NodeAddress("valkey-cluster", 7000))
        );

        try (GlideClusterClient client = GlideClusterClient.create(config)) {
            LockManager lockManager = new LockManager(client, 10);
            String lockKey = "example-lock";
            String resourceKey = "shared-counter";

            // Simulate multiple workers
            ExecutorService executor = Executors.newFixedThreadPool(3);
            for (int i = 1; i <= 5; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    try {
                        lockManager.executeCriticalSection(
                            lockKey,
                            resourceKey,
                            () -> {
                                try {
                                    System.out.println("Task " + taskId + " executing");
                                    Thread.sleep(1000); // Simulate work
                                } catch (InterruptedException e) {
                                    Thread.currentThread().interrupt();
                                }
                            }
                        );
                    } catch (Exception e) {
                        System.err.println("Worker " + taskId + " error: " + e.getMessage());
                    }
                });
            }

            executor.shutdown();
            executor.awaitTermination(1, TimeUnit.MINUTES);
        }
    }
}`,
};

export default lockManager;
