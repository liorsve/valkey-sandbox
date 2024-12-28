export const visitorCounter = {
  starterCode: `public class VisitorTracker {
    private static final String VISITOR_KEY = "visitors";

    public CompletableFuture<Boolean> addVisitor(GlideClient client, String visitorId) {
        // TODO: Implement visitor addition logic
        // Return true if visitor was new, false if already seen
        return CompletableFuture.completedFuture(false);
    }

    public CompletableFuture<Long> getVisitorCount(GlideClient client) {
        // TODO: Implement visitor counting logic
        // Return total number of unique visitors
        return CompletableFuture.completedFuture(0L);
    }
}`,

  solutionCode: `public class VisitorTracker {
    private static final String VISITOR_KEY = "visitors";

    public CompletableFuture<Boolean> addVisitor(GlideClient client, String visitorId) {
        try {
            return client.sadd(VISITOR_KEY, visitorId)
                .thenApply(result -> result != null && result > 0)
                .exceptionally(e -> {
                    System.err.println("Error adding visitor: " + e.getMessage());
                    return false;
                });
        } catch (Exception e) {
            return CompletableFuture.completedFuture(false);
        }
    }

    public CompletableFuture<Long> getVisitorCount(GlideClient client) {
        try {
            return client.scard(VISITOR_KEY)
                .exceptionally(e -> {
                    System.err.println("Error getting visitor count: " + e.getMessage());
                    return 0L;
                });
        } catch (Exception e) {
            return CompletableFuture.completedFuture(0L);
        }
    }
}`,

  tests: [
    {
      name: "Basic Visitor Addition",
      setup: 'await client.delete("visitors");',
      code: `
VisitorTracker tracker = new VisitorTracker();
Boolean result = tracker.addVisitor(client, "user1").get();
Assert.assertTrue("Should return true for new visitor", result);
Long count = tracker.getVisitorCount(client).get();
Assert.assertEquals("Count should be 1 after adding first visitor", 1L, count.longValue());`,
    },
    {
      name: "Duplicate Visitor",
      code: `
Boolean firstAdd = tracker.addVisitor(client, "user2").get();
Boolean secondAdd = tracker.addVisitor(client, "user2").get();
Assert.assertTrue("First addition should return true", firstAdd);
Assert.assertFalse("Second addition should return false", secondAdd);`,
    },
  ],
};

export default visitorCounter;
