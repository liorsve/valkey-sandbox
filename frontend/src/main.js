import { createApp } from "vue";
import App from "./App.vue";
import { install as VueMonacoEditorPlugin } from "@guolao/vue-monaco-editor";
import { store } from "./store";
import "./styles/variables.css";

window.Storage = store;

const app = createApp(App);

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
