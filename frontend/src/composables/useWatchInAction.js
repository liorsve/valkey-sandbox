import { ref, onMounted, onUnmounted, watch } from "vue";
import { store } from "../store";
import { useEventBus, EventTypes } from "./useEventBus";
import { wsInstance, ensureConnection } from "./useWebSocket";

export function useWatchInAction() {
  const isConnected = ref(false);
  const selectedAction = ref(null);
  const terminalInstance = ref(null);
  const editorContent = ref(null);
  const currentVisualization = ref(null);
  const currentLanguage = ref("javascript");
  const isEditorReady = ref(false);
  const hasError = ref(false);
  let reconnectTimeout = null;

  const connect = async () => {
    try {
      const ws = await ensureConnection();
      if (ws) {
        isConnected.value = true;
        hasError.value = false;
        console.log("[WatchInAction] Using global WebSocket connection");
      }
    } catch (error) {
      console.error("[WatchInAction] Connection error:", error);
      hasError.value = true;
    }
  };

  const handleActionSelect = (action) => {
    const { emit: emitEvent } = useEventBus();
    selectedAction.value = action;
    const displayClient = action.client;
    store.setWatchState(displayClient, action.action);
    emitEvent(EventTypes.TERMINAL_CLEAR);
    editorContent.value = store.getTemplateCode(displayClient, action.action);
  };

  const handleTerminalReady = (terminal) => {
    terminalInstance.value = terminal;
  };

  const handleTerminalWrite = (data) => {
    if (terminalInstance.value) {
      terminalInstance.value.write(data);
    }
  };

  const handleEditorReady = () => {
    isEditorReady.value = true;
  };

  const handleCodeUpdate = (newContent) => {
    editorContent.value = newContent;
  };

  const handleReplace = () => {
    if (selectedAction.value) {
      editorContent.value = store.getTemplateCode(
        selectedAction.value.client,
        selectedAction.value.action
      );
    }
  };

  // Watch for store changes
  watch(
    () => store.currentTab,
    (newTab) => {
      if (newTab === "watchInAction") {
        connect();
      }
    },
    { immediate: true }
  );

  onMounted(async () => {
    await connect();
  });

  onUnmounted(() => {
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout);
    }
  });

  return {
    ws: wsInstance.ws,
    isConnected,
    selectedAction,
    terminalInstance,
    editorContent,
    currentVisualization,
    currentLanguage,
    isEditorReady,
    hasError,
    handleActionSelect,
    handleTerminalReady,
    handleTerminalWrite,
    handleEditorReady,
    handleCodeUpdate,
    handleReplace,
    store,
  };
}
