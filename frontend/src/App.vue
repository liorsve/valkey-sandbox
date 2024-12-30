<template>
  <div class="app">
    <TopTabs :activeTab="store.currentTab" @change-tab="handleTabChange" />
    <main class="app-main">
      <Sidebar
        v-if="store.currentTab !== 'watchInAction'"
        :current-tab="store.currentTab"
        @content-update="handleContentUpdate"
      />
      <component
        :is="currentView"
        ref="mainComponent"
        :current-tab="store.currentTab"
        :content="editorContent"
        :language="currentLanguage"
        :terminal-visible="store.terminalVisible"
        class="main-content"
        :class="{ 'full-width': store.currentTab === 'watchInAction' }"
      />
    </main>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  onMounted,
  ref,
  provide,
  inject,
  onBeforeUnmount,
} from "vue";
import { store } from "./store";
import { EventTypes } from "./composables/useEventBus";
import TopTabs from "./components/layout/TopTabs.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import PlaygroundContainer from "./components/playground/PlaygroundContainer.vue";
import WatchContainer from "./components/watch/WatchContainer.vue";

export default defineComponent({
  name: "App",
  components: {
    TopTabs,
    Sidebar,
    PlaygroundContainer,
    WatchContainer,
  },
  setup() {
    const mainComponent = ref(null);
    const editorContent = ref(
      store.getInitialCode() || "// Initial code not available."
    );

    const getEditorContent = () => {
      return mainComponent.value?.getCurrentContent?.() || "";
    };

    provide("getEditorContent", getEditorContent);
    provide("editorContent", editorContent);

    const eventBus = inject("eventBus");
    const wsManager = inject("wsManager");
    const playgroundComponents = ["playground", "commonUseCases"];

    const currentView = computed(() => {
      const tab = store.currentTab;
      if (!tab) return PlaygroundContainer;

      switch (tab) {
        case "watchInAction":
          return WatchContainer;
        case playgroundComponents.includes(tab):
          return PlaygroundContainer;
        default:
          return PlaygroundContainer;
      }
    });

    const currentLanguage = computed(() => {
      return store.getLanguage(store.currentClient);
    });

    const editorLanguage = computed(() => {
      return store.getLanguage(selectedClient.value);
    });

    const handleTabChange = async (tab) => {
      try {
        const { emit: emitEvent } = eventBus;
        const prevTab = store.currentTab;

        // Cleanup old tab
        if (prevTab !== tab) {
          emitEvent(EventTypes.TERMINAL_CLEAR);
          // Avoid removing message listeners for playground components while switching between them
          if (
            !(
              playgroundComponents.includes(prevTab) &&
              playgroundComponents.includes(tab)
            )
          ) {
            wsManager.removeMessageListener("sidebar");
          }
          wsManager.removeMessageListener("watchInAction");
          if (prevTab === "watchInAction") {
            await cleanupWatchComponents();
          }
        }

        store.setTab(tab);

        // Only update content if tab actually changed
        if (prevTab !== tab) {
          if (tab === "watchInAction") {
            store.clearWatchState();
          } else if (tab === "commonUseCases") {
            if (!store.currentUseCase) {
              store.setUseCase("Session Cache");
            }
            editorContent.value =
              store.getTemplateCode(
                store.currentClient,
                store.currentUseCase
              ) || "// Template not available.";
          }
        }
      } catch (error) {
        console.error("[App] Tab change error:", error);
        store.addNotification("Error switching tabs", "error");
      }
    };

    const cleanupWatchComponents = async () => {
      try {
        if (wsManager?.isConnectionValid()) {
          await wsManager.send({
            action: "cleanup",
            data: { force: true },
          });
        }
        store.clearWatchState();
      } catch (error) {
        console.error("[App] Cleanup error:", error);
      }
    };

    const handleContentUpdate = (content) => {
      editorContent.value = content;
    };

    const initializeWebSocket = () => {
      console.log("[App] Initializing global WebSocket...");
      try {
        wsManager.connect();

        onMounted(() => {
          const healthCheck = setInterval(() => {
            if (!wsManager.isConnectionValid()) {
              wsManager.connect().catch((err) => {
                console.warn("[App] Reconnection attempt failed:", err);
              });
            }
          }, 30000);

          onBeforeUnmount(() => clearInterval(healthCheck));
        });
      } catch (error) {
        console.error("[App] WebSocket initialization error:", error);
        store.addNotification("WebSocket connection failed", "error");
      }
    };

    const handleWSMessage = (message) => {
      try {
        if (message.action === "connected") {
          store.setConnection(true);
        } else if (message.action === "updateLeaderboard") {
          store.updateLeaderboard(message.payload);
        }
      } catch (error) {
        console.error("[App] Message parse error:", error);
      }
    };

    onMounted(() => {
      initializeWebSocket();
      wsManager.addMessageListener(handleWSMessage);

      store.initializeDefaults();
      editorContent.value = store.getInitialCode();

      console.log("[App] Mounted with tab:", store.currentTab);
    });

    onBeforeUnmount(() => {
      wsManager.removeMessageListener(handleWSMessage);
      eventBus.off(EventTypes.CODE_EXECUTION);
      eventBus.off(EventTypes.CODE_RESULT);
    });

    return {
      store,
      currentView,
      currentLanguage,
      handleTabChange,
      handleContentUpdate,
      editorContent,
      editorLanguage,
      mainComponent,
      getEditorContent,
    };
  },
});
</script>

<style>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #121212;
  color: #ffffff;
  overflow: hidden;
  /* Prevent scrolling on main container */
}

.app-main {
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
}

.main-content {
  flex: 1;
}

.main-content.full-width {
  width: 100%;
}
</style>
