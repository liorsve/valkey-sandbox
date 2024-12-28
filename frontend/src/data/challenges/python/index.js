import visitorCounter from "./implementations/visitor-counter";
import eventCounter from "./implementations/event-counter";
import trendingHashtags from "./implementations/trending-hashtags";
import distributedLock from "./implementations/distributed-lock";

export const pythonChallenges = {
  difficulty: {
    easy: [visitorCounter, eventCounter],
    medium: [trendingHashtags],
    hard: [distributedLock],
  },

  // Index by ID for direct access
  byId: {
    "visitor-counter": visitorCounter,
    "event-counter": eventCounter,
    "trending-hashtags": trendingHashtags,
    "distributed-lock": distributedLock,
  },
};

export default pythonChallenges;
