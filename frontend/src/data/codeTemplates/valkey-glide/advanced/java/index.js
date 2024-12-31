import sessionCache from './session-cache';
import recommendationSystem from './recommendation-system';
import queueManager from './queue';
import lockManager from './lock';
import leaderboard from './leaderboard';
import taskManager from './task-manager';

export const javaAdvancedTemplates = {
  "Session Cache": sessionCache,
  "Recommendation System": recommendationSystem,
  "Queue Manager": queueManager,
  "Lock Manager": lockManager,
  "Leaderboard": leaderboard,
  "Task Manager": taskManager
};

export default javaAdvancedTemplates;
