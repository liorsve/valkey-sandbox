import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { install as VueMonacoEditorPlugin } from "@guolao/vue-monaco-editor";
import { createEventBus } from "./composables/useEventBus";
import { createWebSocketManager } from "./composables/useWebSocket";

// Import styles statically to ensure they're available immediately
import "./styles/variables.css";

const app = createApp(App);

// Create dependencies before app mount
const eventBus = createEventBus();
const wsManager = createWebSocketManager(eventBus);

// Provide global services
app.provide("eventBus", eventBus);
app.provide("wsManager", wsManager);

// Configure Monaco Editor
app.use(VueMonacoEditorPlugin, {
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs",
  },
});

// Make store available globally (for debugging)
window.Storage = store;

const removeLoader = () => {
  const loader = document.getElementById("preloader");
  if (loader) {
    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 300);
  }
};

// Initialize application with proper error handling
(() => {
  try {
    app.mount("#app");
  } catch (error) {
    console.error("Failed to initialize app:", error);
  } finally {
    removeLoader();
  }
})();

// Handle initialization errors
window.addEventListener("error", (e) => {
  console.error("Application Error:", e);
  removeLoader();
});
