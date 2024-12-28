import mitt from "mitt";

const emitter = mitt();

export const EventTypes = {
  CODE_EXECUTION: "code:execution",
  CODE_RESULT: "code:result",
  TERMINAL_OUTPUT: "terminal:output",
  TERMINAL_CLEAR: "terminal:clear",
  GAME_ACTION: "game:action",
  LEADERBOARD_UPDATE: "leaderboard:update",
  TASK_UPDATE: "task:update",
  CONNECTION_STATUS: "connection:status",
  ERROR: "error",
  EDITOR_LANGUAGE_CHANGED: "editor:language",
};

export function useEventBus() {
  const emit = (type, data) => {
    emitter.emit(type, data);
  };

  const on = (type, handler) => {
    emitter.on(type, handler);
  };

  const off = (type, handler) => {
    emitter.off(type, handler);
  };

  return {
    emit,
    on,
    off,
    EventTypes,
  };
}
