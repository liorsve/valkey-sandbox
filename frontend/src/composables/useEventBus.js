import mitt from "mitt";
import { inject } from "vue";

export const EventTypes = {
  CODE_EXECUTION: "code:execution",
  CODE_RESULT: "code:result",
  TERMINAL_OUTPUT: "TERMINAL_OUTPUT",
  TERMINAL_CLEAR: "terminal:clear",
  GAME_ACTION: "game:action",
  ERROR: "ERROR",
  EDITOR_LANGUAGE_CHANGED: "editor:language",
  WS_OPEN: "ws:open",
  WS_ERROR: "ws:error",
  WS_CLOSE: "ws:close",
};

export function createEventBus() {
  const emitter = mitt();
  return {
    on: emitter.on,
    off: emitter.off,
    emit: emitter.emit,
  };
}

export function useEventBus() {
  const eventBus = inject("eventBus");
  if (!eventBus) {
    throw new Error("EventBus not provided");
  }
  return eventBus;
}
