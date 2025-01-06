import { ref } from "vue";

class LoadingController {
  constructor() {
    this.isLoading = ref(true);
    this.loadingText = ref("Loading Valkey Sandbox...");
    this._minimumLoadTime = 800;
    this._loadStartTime = Date.now();
    this.activeTransitions = new Set();
  }

  start(text = "Loading...") {
    this._loadStartTime = Date.now();
    this.isLoading.value = true;
    this.loadingText.value = text;
    document.body.style.overflow = "hidden";
  }

  async finish() {
    const elapsed = Date.now() - this._loadStartTime;
    const remaining = Math.max(0, this._minimumLoadTime - elapsed);

    await new Promise((resolve) => setTimeout(resolve, remaining));

    this.isLoading.value = false;
    document.body.style.overflow = "";
  }

  setLoadingText(text) {
    this.loadingText.value = text;
  }

  startTransition(text = "Loading...") {
    this.start(text);
    return this.finish.bind(this);
  }

  startComponentTransition(componentName) {
    this.activeTransitions.add(componentName);
    this.isLoading.value = true;
    this.loadingText.value = `Loading ${componentName}...`;
  }

  finishComponentTransition(componentName) {
    this.activeTransitions.delete(componentName);
    if (this.activeTransitions.size === 0) {
      this.finish();
    }
  }

  isTransitioning(componentName) {
    return this.activeTransitions.has(componentName);
  }
}

export default new LoadingController();
