export const queueManager = {
  name: "Queue Manager",
  description: "Distributed queue implementation with Valkey Glide",
  code: `// Queue Example using Valkey Glide in Java
import io.valkey.glide.*;
import java.util.*;

public class QueueManager {
    private final GlideClusterClient client;
    private final String queueKey;

    public QueueManager(GlideClusterClient client, String queueKey) {
        this.client = client;
        this.queueKey = queueKey;
    }

    public void addTask(String task) throws Exception {
        client.rpush(queueKey, task).get();
        System.out.println("Added task: " + task);
    }

    public void processQueue() throws Exception {
        while (true) {
            String task = client.lpop(queueKey).get();
            if (task == null) {
                System.out.println("Queue empty");
                break;
            }
            processTask(task);
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
            QueueManager queueManager = new QueueManager(client, "task-queue");

            // Add sample tasks
            List<String> tasks = Arrays.asList(
                "Process Order #123",
                "Send Email Newsletter",
                "Update User Profile",
                "Generate Report"
            );

            System.out.println("Adding tasks to queue...");
            for (String task : tasks) {
                queueManager.addTask(task);
            }

            System.out.println("\\nProcessing queue...");
            queueManager.processQueue();
        }
    }
}`,
};

export default queueManager;
