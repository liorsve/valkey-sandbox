export const trendingHashtags = {
  starterCode: `async function trackHashtag(client, hashtag) {
    // TODO: Implement hashtag tracking
    // Return new count for hashtag
    return 0;
}

async function getTrending(client, limit = 10) {
    // TODO: Implement trending retrieval
    // Return array of [hashtag, count] pairs
    return [];
}`,

  solutionCode: `async function trackHashtag(client, hashtag) {
    try {
        return await client.zincrby("trending_tags", 1, hashtag);
    } catch (error) {
        console.error("Error tracking hashtag:", error);
        return 0;
    }
}

async function getTrending(client, limit = 10) {
    try {
        const results = await client.zrevrange("trending_tags", 0, limit-1, "WITHSCORES");
        return results.map(([tag, score]) => [tag, parseInt(score)]);
    } catch (error) {
        console.error("Error getting trending hashtags:", error);
        return [];
    }
}`,

  tests: [
    {
      name: "Track Single Hashtag",
      setup: 'await client.delete("trending_tags");',
      code: `
const count = await trackHashtag(client, "#valkey");
assert.strictEqual(count, 1, "First use should have count 1");
const nextCount = await trackHashtag(client, "#valkey");
assert.strictEqual(nextCount, 2, "Second use should have count 2");`,
    },
    {
      name: "Get Trending Hashtags",
      code: `
await trackHashtag(client, "#database");
const trending = await getTrending(client, 2);
assert.strictEqual(trending.length, 2, "Should return 2 trending hashtags");
assert.strictEqual(trending[0][0], "#valkey", "Most used should be first");
assert.strictEqual(trending[0][1], 2, "Should have correct count");`,
    },
  ],
};

export default trendingHashtags;
