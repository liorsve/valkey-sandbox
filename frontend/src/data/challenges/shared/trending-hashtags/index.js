export const challengeMetadata = {
  id: "trending-hashtags",
  title: "Trending Hashtags",
  difficulty: "Medium",
  points: 5,
  description: `Implement a trending hashtags system using Valkey's sorted sets.

**Objective**:
- Track hashtag usage frequency
- Maintain real-time trending list
- Support efficient queries

**Requirements**:
- Use sorted sets for tracking
- Support atomic increments
- Return sorted results`,

  requirements: [
    "Increment hashtag counts atomically",
    "Retrieve top trending hashtags",
    "Sort by popularity",
    "Support limit parameter",
  ],

  hints: [
    "ZINCRBY atomically updates scores",
    "ZREVRANGE gets top items with scores",
    "Consider time-based decay for trends",
    "Use batch operations where possible",
  ],

  expectedBehavior: [
    "Hashtag counts should increment correctly",
    "Results should be sorted by popularity",
    "Top N hashtags should be retrievable",
    "Duplicates should update existing counts",
  ],
};
