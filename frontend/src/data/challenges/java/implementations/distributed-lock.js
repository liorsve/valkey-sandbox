export const distributedLock = {
  starterCode: `public class LockManager {
    public CompletableFuture<Boolean> acquireLock(GlideClient client, 
                                                 String resourceId, 
                                                 String clientId, 
                                                 int timeout) {
        // TODO: Implement lock acquisition
        // Return true if lock acquired, false otherwise
        return CompletableFuture.completedFuture(false);
    }

    public CompletableFuture<Boolean> releaseLock(GlideClient client,
                                                 String resourceId,
                                                 String clientId) {
        // TODO: Implement lock release
        // Return true if lock released, false if not owner
        return CompletableFuture.completedFuture(false);
    }
}`,

  solutionCode: `public class LockManager {
    public CompletableFuture<Boolean> acquireLock(GlideClient client, 
                                                 String resourceId, 
                                                 String clientId, 
                                                 int timeout) {
        try {
            String lockKey = "lock:" + resourceId;
            return client.set(lockKey, clientId, 
                    new SetArgs()
                        .nx()
                        .ex(timeout))
                .thenApply(result -> result != null)
                .exceptionally(e -> {
                    System.err.println("Error acquiring lock: " + e.getMessage());
                    return false;
                });
        } catch (Exception e) {
            return CompletableFuture.completedFuture(false);
        }
    }

    public CompletableFuture<Boolean> releaseLock(GlideClient client,
                                                 String resourceId,
                                                 String clientId) {
        try {
            String lockKey = "lock:" + resourceId;
            return client.get(lockKey)
                .thenCompose(currentOwner -> {
                    if (currentOwner != null && currentOwner.equals(clientId)) {
                        return client.del(lockKey)
                            .thenApply(result -> true);
                    }
                    return CompletableFuture.completedFuture(false);
                })
                .exceptionally(e -> {
                    System.err.println("Error releasing lock: " + e.getMessage());
                    return false;
                });
        } catch (Exception e) {
            return CompletableFuture.completedFuture(false);
        }
    }
}`,

  tests: [
    {
      name: "Lock Acquisition",
      setup: 'await client.delete("lock:resource1");',
      code: `
LockManager manager = new LockManager();
Boolean result = manager.acquireLock(client, "resource1", "client1", 10).get();
Assert.assertTrue("Should acquire available lock", result);
Boolean result2 = manager.acquireLock(client, "resource1", "client2", 10).get();
Assert.assertFalse("Should not acquire locked resource", result2);`,
    },
    {
      name: "Lock Release",
      code: `
Boolean released = manager.releaseLock(client, "resource1", "client1").get();
Assert.assertTrue("Owner should release lock", released);
Boolean wrongRelease = manager.releaseLock(client, "resource1", "client2").get();
Assert.assertFalse("Non-owner should not release lock", wrongRelease);`,
    },
  ],
};

export default distributedLock;
