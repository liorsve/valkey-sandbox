import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { install as VueMonacoEditorPlugin } from "@guolao/vue-monaco-editor";
import { createEventBus } from "./composables/useEventBus";
import { createWebSocketManager } from "./composables/useWebSocket";
import VueVirtualScroller from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

import "./styles/variables.css";

const app = createApp(App);

app.use(VueVirtualScroller);

const eventBus = createEventBus();
const wsManager = createWebSocketManager(eventBus);

app.provide("eventBus", eventBus);
app.provide("wsManager", wsManager);

app.use(VueMonacoEditorPlugin, {
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs",
  },
});

window.Storage = store;

const removeLoader = () => {
  const loader = document.getElementById("preloader");
  if (loader) {
    loader.classList.add("fade-out");
    setTimeout(() => loader.remove(), 300);
  }
};

(() => {
  try {
    app.mount("#app");
  } catch (error) {
    console.error("Failed to initialize app:", error);
  } finally {
    removeLoader();
  }
})();

window.addEventListener("error", (e) => {
  console.error("Application Error:", e);
  removeLoader();
});
