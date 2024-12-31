import { createEventBus } from "./composables/useEventBus";
import { createWebSocketManager } from "./composables/useWebSocket";

export function initializeApp(app) {
  const eventBus = createEventBus();
  const wsManager = createWebSocketManager(eventBus);

  app.provide("eventBus", eventBus);
  app.provide("wsManager", wsManager);

  app.mixin({
    mounted() {
      if (this.$root === this && wsManager && !wsManager.ws) {
        wsManager.connect();
      }
    },
  });

  return { eventBus, wsManager };
}
