<template>
  <div class="app">
    <LoadingOverlay
      :show="loading"
      :text="loadingController.loadingText.value"
    />

    <TopTabs :activeTab="store.currentTab" @change-tab="handleTabChange" />
    <Transition name="fade-slide" mode="out-in">
      <main v-show="!loading" class="app-main">
        <Sidebar
          v-if="showDefaultSidebar"
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
          :class="{
            'full-width': store.currentTab === 'watchInAction',
            'with-sidebar': showDefaultSidebar,
          }"
        />
      </main>
    </Transition>
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
  nextTick,
} from "vue";
import { store } from "./store";
import { EventTypes } from "./composables/useEventBus";
import TopTabs from "./components/layout/TopTabs.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import { defineAsyncComponent } from "vue";
import loadingController from "@/services/loadingController";
import LoadingOverlay from "./components/common/LoadingOverlay.vue";

const PlaygroundContainer = defineAsyncComponent(() =>
  import("./components/playground/PlaygroundContainer.vue")
);
const WatchContainer = defineAsyncComponent(() =>
  import("./components/watch/WatchContainer.vue")
);
const HelpfulResources = defineAsyncComponent(() =>
  import("./components/helpfulresources/HelpfulResources.vue")
);

export default defineComponent({
  name: "App",
  components: {
    TopTabs,
    Sidebar,
    PlaygroundContainer,
    WatchContainer,
    HelpfulResources,
    LoadingOverlay,
  },
  setup() {
    const mainComponent = ref(null);
    const eventBus = inject("eventBus");
    const wsManager = inject("wsManager");

    if (!eventBus || !wsManager) {
      throw new Error("Required services not provided");
    }

    const editorContent = ref("// Loading...");
    const isLoading = ref(true);
    const loading = ref(true);

    onMounted(async () => {
      loadingController.start("Initializing Valkey Sandbox...");

      try {
        await store.initializeDefaults();
        const content = await store.getInitialCode();
        editorContent.value = content;

        if (!wsManager.isConnectionValid()) {
          loadingController.setLoadingText("Establishing connection...");
          wsManager.addMessageListener((message) => {
            if (message.action === "connected") store.setConnection(true);
            if (message.action === "updateLeaderboard")
              store.updateLeaderboard(message.payload);
          }, "global");

          await wsManager.connect();
          wsManager.startHealthCheck();
        }
      } catch (error) {
        console.error("App initialization error:", error);
        editorContent.value = "// Error initializing application";
      } finally {
        await loadingController.finish();
        loading.value = false;
      }
    });

    // Clean up on unmount
    onBeforeUnmount(() => {
      wsManager.stopHealthCheck();
      wsManager.removeMessageListener("global");
      eventBus.off(EventTypes.CODE_EXECUTION);
      eventBus.off(EventTypes.CODE_RESULT);
    });

    const getEditorContent = () => {
      return mainComponent.value?.getCurrentContent?.() || "";
    };

    provide("getEditorContent", getEditorContent);
    provide("editorContent", editorContent);

    provide("loadingController", loadingController);

    const playgroundComponents = ["playground", "commonUseCases"];

    const currentView = computed(() => {
      const tab = store.currentTab;
      if (!tab) return PlaygroundContainer;

      switch (tab) {
        case "watchInAction":
          return WatchContainer;
        case "helpfulResources":
          return HelpfulResources;
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
      // Start loading immediately before any async operations
      loadingController.start(`Loading ${tab}...`);

      try {
        const prevTab = store.currentTab;

        // Set the new tab immediately to avoid UI flicker
        store.setTab(tab);

        if (prevTab === "watchInAction" && tab !== "watchInAction") {
          await cleanupWatchComponents();
        }

        if (prevTab !== tab) {
          eventBus.emit(EventTypes.TERMINAL_CLEAR);
          if (
            !(
              playgroundComponents.includes(prevTab) &&
              playgroundComponents.includes(tab)
            )
          ) {
            wsManager.removeMessageListener("sidebar");
          }
          wsManager.removeMessageListener("watchInAction");
          if (tab === "watchInAction") {
            store.clearWatchState();
          } else if (tab === "commonUseCases") {
            if (!store.currentUseCase) {
              store.setUseCase("Session Cache");
            }
            const content = await store.getTemplateCode(
              store.currentClient,
              store.currentUseCase
            );
            editorContent.value = content || "// Template not available";
          }
        }
      } catch (error) {
        console.error("[App] Tab change error:", error);
        store.addNotification("Error switching tabs", "error");
      } finally {
        await loadingController.finish();
      }
    };

    const cleanupWatchComponents = async () => {
      try {
        if (
          wsManager?.isConnectionValid() &&
          store.currentTab === "watchInAction"
        ) {
          await wsManager.send({
            action: "cleanup",
            data: {
              force: true,
              source: "app",
            },
          });
          store.clearWatchState();
        }
      } catch (error) {
        console.error("[App] Cleanup error:", error);
      }
    };

    const handleContentUpdate = async (content) => {
      if (content instanceof Promise) {
        try {
          editorContent.value = await content;
        } catch (error) {
          console.error("Content loading error:", error);
          editorContent.value = "// Error loading content";
        }
      } else {
        editorContent.value = content;
      }
    };

    const showDefaultSidebar = computed(() => {
      return !["watchInAction", "helpfulResources"].includes(store.currentTab);
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
      showDefaultSidebar,
      isLoading,
      loading,
      loadingController,
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

.main-content.with-sidebar {
  margin-left: var(--sidebar-width);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Add smooth transitions to components */
.main-content {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
</style>
