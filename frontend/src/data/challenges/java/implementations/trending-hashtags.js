export const trendingHashtags = {
  starterCode: `public class HashtagTracker {
    private static final String TRENDING_KEY = "trending_tags";

    public CompletableFuture<Long> trackHashtag(GlideClient client, String hashtag) {
        // TODO: Implement hashtag tracking
        // Return new count for hashtag
        return CompletableFuture.completedFuture(0L);
    }

    public CompletableFuture<List<SimpleEntry<String, Long>>> getTrending(GlideClient client, int limit) {
        // TODO: Implement trending retrieval
        // Return list of hashtag-count pairs
        return CompletableFuture.completedFuture(new ArrayList<>());
    }
}`,

  solutionCode: `public class HashtagTracker {
    private static final String TRENDING_KEY = "trending_tags";

    public CompletableFuture<Long> trackHashtag(GlideClient client, String hashtag) {
        try {
            return client.zincrby(TRENDING_KEY, 1, hashtag)
                .exceptionally(e -> {
                    System.err.println("Error tracking hashtag: " + e.getMessage());
                    return 0L;
                });
        } catch (Exception e) {
            return CompletableFuture.completedFuture(0L);
        }
    }

    public CompletableFuture<List<SimpleEntry<String, Long>>> getTrending(GlideClient client, int limit) {
        try {
            return client.zrevrangeWithScores(TRENDING_KEY, 0, limit - 1)
                .thenApply(results -> {
                    List<SimpleEntry<String, Long>> trending = new ArrayList<>();
                    for (ZRangeWithScoresResult result : results) {
                        trending.add(new SimpleEntry<>(
                            result.getElement(), 
                            (long) result.getScore()
                        ));
                    }
                    return trending;
                })
                .exceptionally(e -> {
                    System.err.println("Error getting trending: " + e.getMessage());
                    return new ArrayList<>();
                });
        } catch (Exception e) {
            return CompletableFuture.completedFuture(new ArrayList<>());
        }
    }
}`,

  tests: [
    {
      name: "Track Single Hashtag",
      setup: 'await client.delete("trending_tags");',
      code: `
HashtagTracker tracker = new HashtagTracker();
Long count = tracker.trackHashtag(client, "#valkey").get();
Assert.assertEquals("First use should have count 1", 1L, count.longValue());
Long nextCount = tracker.trackHashtag(client, "#valkey").get();
Assert.assertEquals("Second use should have count 2", 2L, nextCount.longValue());`,
    },
    {
      name: "Get Trending Hashtags",
      code: `
tracker.trackHashtag(client, "#database").get();
List<SimpleEntry<String, Long>> trending = tracker.getTrending(client, 2).get();
Assert.assertEquals("Should return 2 trending hashtags", 2, trending.size());
Assert.assertEquals("Most used should be first", "#valkey", trending.get(0).getKey());
Assert.assertEquals("Should have correct count", 2L, trending.get(0).getValue().longValue());`,
    },
  ],
};

export default trendingHashtags;
