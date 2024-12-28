export const eventCounter = {
  starterCode: `public class EventCounter {
    private static final String EVENTS_KEY = "events";

    public CompletableFuture<Boolean> addEvent(GlideClient client, String eventId) {
        // TODO: Implement event addition
        // Add event with current timestamp
        return CompletableFuture.completedFuture(false);
    }

    public CompletableFuture<Long> getRecentEventsCount(GlideClient client, int windowSeconds) {
        // TODO: Implement recent events count
        // Return count of events within time window
        return CompletableFuture.completedFuture(0L);
    }
}`,

  solutionCode: `public class EventCounter {
    private static final String EVENTS_KEY = "events";

    public CompletableFuture<Boolean> addEvent(GlideClient client, String eventId) {
        try {
            double currentTime = System.currentTimeMillis() / 1000.0;
            return client.zadd(EVENTS_KEY, currentTime, eventId)
                .thenApply(result -> result != null && result > 0)
                .exceptionally(e -> {
                    System.err.println("Error adding event: " + e.getMessage());
                    return false;
                });
        } catch (Exception e) {
            return CompletableFuture.completedFuture(false);
        }
    }

    public CompletableFuture<Long> getRecentEventsCount(GlideClient client, int windowSeconds) {
        try {
            double now = System.currentTimeMillis() / 1000.0;
            double minTime = now - windowSeconds;
            return client.zcount(EVENTS_KEY, minTime, now)
                .exceptionally(e -> {
                    System.err.println("Error getting recent events: " + e.getMessage());
                    return 0L;
                });
        } catch (Exception e) {
            return CompletableFuture.completedFuture(0L);
        }
    }
}`,

  tests: [
    {
      name: "Basic Event Addition",
      setup: 'await client.delete("events");',
      code: `
EventCounter counter = new EventCounter();
Boolean result = counter.addEvent(client, "event1").get();
Assert.assertTrue("Should successfully add event", result);
Long count = counter.getRecentEventsCount(client, 60).get();
Assert.assertEquals("Should have one recent event", 1L, count.longValue());`,
    },
    {
      name: "Time Window Handling",
      code: `
counter.addEvent(client, "event2").get();
counter.addEvent(client, "event3").get();
Long count = counter.getRecentEventsCount(client, 1).get(); // 1 second window
Thread.sleep(2000); // Wait for events to age
Long countAfter = counter.getRecentEventsCount(client, 1).get();
Assert.assertEquals("Should have no events in recent window", 0L, countAfter.longValue());`,
    },
  ],
};

export default eventCounter;
