export const taskManager = {
  name: "Task Manager",
  description: "Combined queue and lock management system",
  code: `// Task Manager with Queue and Lock using Valkey Glide in Java
import io.valkey.glide.*;
import java.util.*;
import java.util.concurrent.*;

public class TaskManager {
    private final GlideClusterClient client;
    private final String lockKey;
    private final String queueKey;

    public TaskManager(GlideClusterClient client, String lockKey, String queueKey) {
        this.client = client;
        this.lockKey = lockKey;
        this.queueKey = queueKey;
    }

    public void addTask(String task) throws Exception {
        client.rpush(queueKey, task).get();
        System.out.println("Added task: " + task);
    }

    public void processQueue() throws Exception {
        while (true) {
            // Try to acquire lock
            boolean lockAcquired = client.set(lockKey, "locked", new SetArgs().nx().ex(10)).get();
            if (lockAcquired) {
                try {
                    String task = client.lpop(queueKey).get();
                    if (task == null) {
                        System.out.println("Queue empty");
                        break;
                    }
                    processTask(task);
                } finally {
                    client.del(lockKey).get();
                }
            } else {
                System.out.println("Waiting for lock...");
                Thread.sleep(500);
            }
        }
    }

    private void processTask(String task) throws Exception {
        System.out.println("Processing task: " + task);
        Thread.sleep(1000); // Simulate work
        System.out.println("Completed task: " + task);
    }

    public static void main(String[] args) throws Exception {
        GlideClusterClientConfiguration config = new GlideClusterClientConfiguration(
            Arrays.asList(new NodeAddress("valkey-cluster", 7000))
        );

        try (GlideClusterClient client = GlideClusterClient.create(config)) {
            TaskManager taskManager = new TaskManager(
                client, "task-lock", "task-queue"
            );

            // Add sample tasks
            List<String> tasks = Arrays.asList(
                "Backup Database",
                "Send Notifications",
                "Process Payments",
                "Generate Reports"
            );

            System.out.println("Adding tasks to queue...");
            for (String task : tasks) {
                taskManager.addTask(task);
            }

            // Simulate multiple workers
            ExecutorService executor = Executors.newFixedThreadPool(3);
            for (int i = 1; i <= 3; i++) {
                final int workerId = i;
                executor.submit(() -> {
                    try {
                        System.out.println("Worker " + workerId + " started");
                        taskManager.processQueue();
                    } catch (Exception e) {
                        System.err.println("Worker " + workerId + " error: " + e.getMessage());
                    }
                });
            }

            executor.shutdown();
            executor.awaitTermination(1, TimeUnit.MINUTES);
        }
    }
}`,
};

export default taskManager;
