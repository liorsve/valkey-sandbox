export const challengeMetadata = {
  id: "event-counter",
  title: "Recent Events Counter",
  difficulty: "Easy",
  points: 3,
  description: `Track events within a time window using Valkey Sorted Sets.

**Objective**:
- Store events with timestamps
- Count events within a sliding window
- Clean up old events

**Requirements**:
- Use sorted sets with timestamps as scores
- Implement sliding window functionality
- Handle data cleanup`,

  requirements: [
    "Store events with current timestamp",
    "Count events within time window",
    "Remove expired events",
    "Handle errors gracefully",
  ],

  hints: [
    "Use ZADD with timestamps as scores",
    "ZCOUNT can get events within a time range",
    "ZREMRANGEBYSCORE removes old events",
    "Convert timestamps consistently",
  ],

  expectedBehavior: [
    "New events should be added with current timestamp",
    "Only events within window should be counted",
    "Old events should be cleaned up",
    "Error handling should be robust",
  ],
};
