class LazyDocumentationLoader {
  constructor() {
    this.documentationService = null;
    this.markdownRenderer = null;
    this.stylesheetLoaded = false;
  }

  async getDocumentationService() {
    if (!this.documentationService) {
      const module = await import("./documentationService");
      this.documentationService = module.default;
    }
    return this.documentationService;
  }

  async getMarkdownRenderer() {
    if (!this.markdownRenderer) {
      const module = await import("../utils/markdownRenderer");
      this.markdownRenderer = module.default;
    }
    return this.markdownRenderer;
  }

  async loadStylesheet() {
    if (!this.stylesheetLoaded) {
      try {
        await import("@/components/helpfulresources/styles/markdown.css");
        this.stylesheetLoaded = true;
      } catch (error) {
        console.error("Failed to load markdown styles:", error);
      }
    }
  }

  async initializeDocumentation() {
    await Promise.all([
      this.getDocumentationService(),
      this.getMarkdownRenderer(),
      this.loadStylesheet(),
    ]);
  }
}

export default new LazyDocumentationLoader();
