import sessionCache from "./session-cache";
import recommendationSystem from "./recommendation-system";
import taskManager from "./task-manager";
import leaderboard from "./leaderboard";
import lock from "./lock";
import queue from "./queue";

export const pythonAdvancedTemplates = {
  "Session Cache": sessionCache,
  "Recommendation System": recommendationSystem,
  "Task Manager": taskManager,
  Leaderboard: leaderboard,
  "Lock Manager": lock,
  "Queue Manager": queue,
};

export default pythonAdvancedTemplates;
