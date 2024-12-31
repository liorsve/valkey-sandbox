import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { store } from "../store";
import { useEventBus, EventTypes } from "./useEventBus";
import { useWebSocket, ensureConnection } from "./useWebSocket";

export function useWatchInAction() {
  const wsManager = useWebSocket();
  const eventBus = useEventBus();

  const isConnected = ref(false);
  const terminalInstance = ref(null);
  const editorContent = ref("");
  const currentVisualization = ref(null);
  const currentLanguage = ref("javascript");
  const isEditorReady = ref(false);
  const hasError = ref(false);
  const someState = ref(null);
  const { on, off, emit } = eventBus;

  let isConnecting = false;

  const connect = async () => {
    if (isConnecting) return;
    isConnecting = true;
    try {
      const ws = await ensureConnection(wsManager);
      if (ws && ws.readyState === WebSocket.OPEN) {
        isConnected.value = true;
        hasError.value = false;
      } else {
        throw new Error("WebSocket connection failed");
      }
    } catch (error) {
      console.error("[WatchInAction] Connection error:", error);
      hasError.value = true;
      isConnected.value = false;
    } finally {
      isConnecting = false;
    }
  };

  const cleanup = async () => {
    try {
      if (wsManager.isConnectionValid()) {
        await wsManager.send({
          action: "cleanup",
          data: { force: true },
        });
      }
      currentVisualization.value = null;
      editorContent.value = "";
      store.clearWatchState();
      eventBus.off(EventTypes.SOME_EVENT);
    } catch (error) {
      console.error("[WatchInAction] Cleanup error:", error);
    }
  };

  const performAction = (action) => {
    emit(EventTypes.GAME_ACTION, action);
  };

  on(EventTypes.SOME_EVENT, (payload) => {
    someState.value = payload;
  });

  watch(
    () => store.currentTab,
    async (newTab, oldTab) => {
      if (oldTab === "watchInAction") {
        await cleanup();
      }
      if (newTab === "watchInAction") {
        await connect();
      }
    }
  );

  onMounted(connect);
  onBeforeUnmount(cleanup);

  return {
    ws: wsManager.ws,
    isConnected,
    terminalInstance,
    editorContent,
    currentVisualization,
    currentLanguage,
    isEditorReady,
    hasError,
    someState,
    connect,
    cleanup,
    performAction,
  };
}
