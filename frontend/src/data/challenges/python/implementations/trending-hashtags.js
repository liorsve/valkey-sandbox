export const trendingHashtags = {
  starterCode: `async def track_hashtag(client, hashtag):
    """Increment the count for a hashtag in the trending set.
    Returns the new count for the hashtag."""
    # TODO: Implement hashtag tracking logic
    pass

async def get_trending(client, limit=10):
    """Get the top trending hashtags with their counts.
    Returns list of (hashtag, count) tuples, sorted by count descending."""
    # TODO: Implement trending hashtags retrieval
    pass`,

  solutionCode: `async def track_hashtag(client, hashtag):
    try:
        return await client.zincrby("trending_tags", 1, hashtag)
    except Exception as e:
        print(f"Error tracking hashtag: {e}")
        return 0

async def get_trending(client, limit=10):
    try:
        results = await client.zrevrange("trending_tags", 0, limit-1, withscores=True)
        return [(tag.decode(), int(score)) for tag, score in results.items()]
    except Exception as e:
        print(f"Error getting trending hashtags: {e}")
        return []`,

  tests: [
    {
      name: "Track Single Hashtag",
      setup: 'await client.delete("trending_tags")',
      code: `
count = await track_hashtag(client, "#valkey")
assert count == 1, "First use should have count 1"
count = await track_hashtag(client, "#valkey")
assert count == 2, "Second use should have count 2"
`,
    },
    {
      name: "Get Trending Hashtags",
      code: `
await track_hashtag(client, "#database")
trending = await get_trending(client, 2)
assert len(trending) == 2, "Should return 2 trending hashtags"
assert trending[0][0] == "#valkey", "Most used should be first"
assert trending[0][1] == 2, "Should have correct count"
`,
    },
  ],
};

export default trendingHashtags;
