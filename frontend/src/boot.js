import { createEventBus } from "./composables/useEventBus";
import { createWebSocketManager } from "./composables/useWebSocket";

export function initializeApp(app) {
  const eventBus = createEventBus();
  const wsManager = createWebSocketManager(eventBus);

  app.provide("eventBus", eventBus);
  app.provide("wsManager", wsManager);

  // Remove the mixin and handle connection in App.vue
  return { eventBus, wsManager };
}
