import visitorCounter from "./implementations/visitor-counter";
import eventCounter from "./implementations/event-counter";
import trendingHashtags from "./implementations/trending-hashtags";
import distributedLock from "./implementations/distributed-lock";

export const nodeChallenges = {
  difficulty: {
    easy: [visitorCounter, eventCounter],
    medium: [trendingHashtags],
    hard: [distributedLock],
  },

  byId: {
    "visitor-counter": visitorCounter,
    "event-counter": eventCounter,
    "trending-hashtags": trendingHashtags,
    "distributed-lock": distributedLock,
  },
};

export default nodeChallenges;
