import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { store } from "../store";
import { wsInstance, ensureConnection } from "./useWebSocket";
import { useEventBus, EventTypes } from "./useEventBus";

export function useWatchInAction() {
  const isConnected = ref(false);
  const terminalInstance = ref(null);
  const editorContent = ref("");
  const currentVisualization = ref(null);
  const currentLanguage = ref("javascript");
  const isEditorReady = ref(false);
  const hasError = ref(false);

  const connect = async () => {
    try {
      const ws = await ensureConnection();
      if (ws) {
        isConnected.value = true;
        hasError.value = false;
      }
    } catch (error) {
      console.error("[WatchInAction] Connection error:", error);
      hasError.value = true;
    }
  };

  // Reset state when leaving watch-in-action
  const cleanup = async () => {
    try {
      if (wsInstance.isConnectionValid()) {
        await wsInstance.send({
          action: "cleanup",
          data: { force: true },
        });
      }
      currentVisualization.value = null;
      editorContent.value = "";
      store.clearWatchState();
    } catch (error) {
      console.error("[WatchInAction] Cleanup error:", error);
    }
  };

  // Watch for tab changes
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
    ws: wsInstance.ws,
    isConnected,
    terminalInstance,
    editorContent,
    currentVisualization,
    currentLanguage,
    isEditorReady,
    hasError,
    connect,
    cleanup,
  };
}
