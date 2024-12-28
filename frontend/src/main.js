import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { install as VueMonacoEditorPlugin } from "@guolao/vue-monaco-editor";
import "./styles/variables.css";
import { initializeApp } from "./boot";

window.Storage = store;

const app = createApp(App);

const { eventBus, wsManager } = initializeApp(app);

app.use(VueMonacoEditorPlugin, {
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs",
  },
});

const removeLoader = () => {
  const loader = document.getElementById("preloader");
  if (loader) {
    loader.classList.add("fade-out");
    setTimeout(() => {
      loader.remove();
    }, 300);
  }
};

app.mount("#app");

removeLoader();

window.addEventListener("error", (e) => {
  console.error("Application Error:", e);
  removeLoader();
});
