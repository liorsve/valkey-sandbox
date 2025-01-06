<template>
  <div class="watch-container">
    <div class="watch-header"></div>
    <Transition name="fade" mode="out-in">
      <div v-if="hasError" class="error-state">
        <p>
          {{
            hasError
              ? "Failed to load the selected template."
              : "Initializing..."
          }}
        </p>
        <button v-if="hasError" @click="handleReload">Reload</button>
      </div>
      <template v-else>
        <ActionSelect v-if="!hasSelection" @select="handleActionSelect" />

        <div v-else class="visualization-layout">
          <div class="code-section">
            <WatchEditor
              v-model:content="editorContent"
              :language="currentLanguage"
              @ready="handleEditorReady"
            />
            <WatchTerminal @ready="handleTerminalReady" />
          </div>

          <div class="visualization-section">
            <component
              v-if="currentVisualization"
              :is="currentVisualization"
              :ws="ws"
              :isConnected="isConnected"
              :terminal="terminalInstance"
              @terminal-write="handleTerminalWrite"
              class="visualization-section"
            />
          </div>
        </div>
      </template>
    </Transition>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  computed,
  onBeforeUnmount,
  nextTick,
  watch,
  ref,
  provide,
} from "vue";
import { useWatchInAction } from "@/composables/useWatchInAction";
import { store } from "@/store";
import loadingController from "@/services/loadingController";
import WatchEditor from "./components/WatchEditor.vue";
import WatchTerminal from "./components/WatchTerminal.vue";
import ActionSelect from "./ActionSelect.vue";
import LeaderboardVisualization from "./visualizations/LeaderboardVisualization.vue";
import TaskManagerVisualization from "./visualizations/TaskManagerVisualization.vue";
import { useEventBus } from "@/composables/useEventBus";
import { useWebSocket } from "@/composables/useWebSocket";

export default defineComponent({
  name: "WatchContainer",
  components: {
    WatchEditor,
    WatchTerminal,
    ActionSelect,
    LeaderboardVisualization,
    TaskManagerVisualization,
  },
  setup() {
    const wsManager = useWebSocket();
    const terminalInstance = ref(null);
    const cleaning = ref(false);
    const editorContent = ref("// Loading...");
    const { on, off } = useEventBus();

    onBeforeUnmount(() => {
      off("tab-changed");
      cleanup();
    });

    const initializeEventListeners = () => {
      on("tab-changed", handleTabChange);

      const tabElement = document.querySelector('[data-tab="watch-in-action"]');
      if (tabElement) {
        tabElement.addEventListener("click", () => {
          cleanup();
          store.watchState = { selectedAction: null, selectedClient: null };
          nextTick(() => {
            window.location.hash = "#select-screen";
          });
        });
      }

      watch(
        () => store.currentTab,
        async (newTab, oldTab) => {
          if (oldTab === "watchInAction" || newTab === "watchInAction") {
            await cleanup();
          }
        }
      );
    };

    const initialize = async () => {
      try {
        if (!editorContent.value) {
          editorContent.value = store.getInitialCode();
        }
        isEditorReady.value = true;

        window.requestAnimationFrame(() => {
          window.dispatchEvent(new Event("resize"));
        });

        initializeEventListeners();

        await nextTick();
        loadingController.finishComponentTransition("watchInAction");
      } catch (error) {
        console.error("[WatchContainer] Mount error:", error);
        loadingController.finishComponentTransition("watchInAction");
      }
    };

    onMounted(async () => {
      loadingController.start("Loading Watch Container...");
      try {
        await initialize();
      } finally {
        loadingController.finish();
      }
    });

    provide("websocket", wsManager);
    provide("terminal", terminalInstance);

    const {
      isConnected,
      currentVisualization,
      currentLanguage,
      isEditorReady,
      hasError,
      handleTerminalWrite,
      handleEditorReady,
      handleCodeUpdate,
      handleReplace,
    } = useWatchInAction();

    const cleanup = async () => {
      if (cleaning.value) return;
      cleaning.value = true;

      try {
        if (wsManager?.isConnectionValid()) {
          await wsManager.send({
            action: "cleanup",
            data: {
              force: true,
              source: "watch-container",
            },
          });
        }
        store.clearWatchState();
      } catch (error) {
        console.error("[WatchContainer] Cleanup error:", error);
      } finally {
        cleaning.value = false;
      }
    };

    const handleTabChange = () => {
      cleanup();
    };

    const handleTerminalReady = (term) => {
      terminalInstance.value = term;
      term.writeln("\x1b[1;34m=== Watch in Action Terminal ===\x1b[0m");
      term.writeln(" Ready to watch your actions in real-time...");
    };

    const selectedAction = computed(() => store.watchState?.selectedAction);
    const selectedTemplate = computed(() => store.currentUseCase);
    const selectedClient = computed(() => store.currentClient);

    const hasSelection = computed(() => {
      return Boolean(store.watchState?.selectedAction);
    });

    const handleActionSelect = async ({ action, client, language }) => {
      try {
        store.setWatchState(client, action, language);
        currentLanguage.value = language;

        await new Promise((resolve) => setTimeout(resolve, 300));

        const template = await store.getTemplateCode(client, action);
        editorContent.value = template || "// No template available";

        currentVisualization.value =
          action === "Leaderboard"
            ? LeaderboardVisualization
            : TaskManagerVisualization;
      } catch (error) {
        console.error("Error handling action select:", error);
        editorContent.value = "// Error loading template";
        hasError.value = true;
      }
    };

    const currentVisualizationComponent = computed(() => {
      const template = selectedTemplate.value;
      if (!template) return null;

      switch (template) {
        case "Leaderboard":
          return "LeaderboardVisualization";
        case "Task Manager":
          return "TaskManagerVisualization";
        default:
          return null;
      }
    });

    const handleBack = () => {
      currentVisualization.value = null;
      if (wsManager.ws) {
        wsManager.ws.close();
        wsManager.ws = null;
      }
    };

    return {
      store,
      ws: wsManager.ws,
      isConnected,
      selectedAction,
      selectedTemplate,
      selectedClient,
      terminalInstance,
      editorContent,
      currentVisualization: currentVisualizationComponent,
      currentLanguage,
      isEditorReady,
      hasError,
      handleActionSelect,
      handleTerminalReady,
      handleTerminalWrite,
      handleEditorReady,
      handleCodeUpdate,
      handleReload: () => window.location.reload(),
      hasSelection,
      handleReplace,
      loadingController,
      handleBack,
    };
  },
});
</script>

<style scoped>
.watch-container {
  height: calc(100vh - var(--header-height));
  width: 100%;
  background: var(--surface-darker);
  position: relative;
  overflow: hidden;
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 0;
}

.visualization-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  max-width: 100%;
  height: calc(100% - var(--top-tabs-height));
  flex: 1;
  min-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
  margin-top: var(--spacing-md);
}

.code-section {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  padding-bottom: 10px;
}

.visualization-section {
  padding: 2rem;
  background: var(--surface-dark);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.visualization-section {
  background: linear-gradient(
    145deg,
    var(--surface-light),
    var(--surface-dark)
  );
  border: 1px solid var(--accent-highlight);
  box-shadow: 0 0 15px rgba(0, 195, 255, 0.1);
  border-radius: var(--radius-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-block-end: 10px;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
}

.error-state button {
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.visualization-layout {
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.watch-header {
  margin-bottom: 20px;
}

.back-button {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #444;
}
</style>
