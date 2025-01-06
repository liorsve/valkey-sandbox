import { reactive, watch } from "vue";
import dataNavigator from "../data/index";
import lazyDocumentation from "../services/lazyDocumentation";

const DEFAULT_STATE = {
  currentClient: "glide-node",
  executionMode: "cluster",
  currentTab: "playground",
  currentUseCase: "Session Cache",
  leaderboard: [],
};

const VALID_TABS = [
  "playground",
  "watchInAction",
  "commonUseCases",
  "community",
  "helpfulResources",
];

const getTabFromHash = () => {
  const hashTab = window.location.hash.slice(1);
  return VALID_TABS.includes(hashTab) ? hashTab : DEFAULT_STATE.currentTab;
};

const savedState = (() => {
  try {
    const stored = localStorage.getItem("valkey-sandbox-state");
    if (!stored) return { ...DEFAULT_STATE };

    const parsed = JSON.parse(stored);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      currentClient: parsed.currentClient || DEFAULT_STATE.currentClient,
      executionMode: parsed.executionMode || DEFAULT_STATE.executionMode,
    };
  } catch (error) {
    console.error("[Store] Error parsing saved state:", error);
    return { ...DEFAULT_STATE };
  }
})();

const CONFIG = {
  clients: [
    {
      id: "glide-python",
      name: "Valkey-glide (Python)",
      language: "python",
    },
    {
      id: "glide-node",
      name: "Valkey-glide (Node)",
      language: "javascript",
    },
    { id: "glide-java", name: "Valkey-glide (Java)", language: "java" },
    { id: "valkey-py", name: "Valkey-py (Python)", language: "python" },
    { id: "iovalkey", name: "iovalkey (Node)", language: "javascript" },
    { id: "valkey-java", name: "Valkey-java (Java)", language: "java" },
    { id: "valkey-go", name: "Valkey-go (Go)", language: "go" },
  ],
  modes: [
    { id: "standalone", name: "Standalone" },
    { id: "cluster", name: "Cluster" },
  ],
  useCases: [
    { id: "Session Cache", name: "Session Cache" },
    { id: "Lock Manager", name: "Lock" },
    { id: "Queue Manager", name: "Queue" },
    { id: "Leaderboard", name: "Leaderboard" },
    { id: "Task Manager", name: "Task Manager" },
    { id: "Recommendation System", name: "Recommendation System" },
  ],
};

export const store = reactive({
  currentClient: savedState.currentClient || DEFAULT_STATE.currentClient,
  executionMode: savedState.executionMode || DEFAULT_STATE.executionMode,
  currentTab: savedState.currentTab || DEFAULT_STATE.currentTab,
  currentUseCase: savedState.currentUseCase || DEFAULT_STATE.currentUseCase,
  isConnected: false,
  terminalVisible: true,
  notifications: [],
  watchState: {
    selectedClient: null,
    selectedAction: null,
  },
  leaderboard: savedState.leaderboard || DEFAULT_STATE.leaderboard,

  documentationState: {
    languages: { loaded: false, data: null },
    topics: { loaded: false, data: null },
    commands: { loaded: false, data: null },
    currentSection: null,
  },

  setLastEditorContent(content) {
    this.lastEditorContent = content;
  },
  getAllClients() {
    return CONFIG.clients;
  },

  getGlideClients() {
    return CONFIG.clients.filter((client) => client.id.includes("glide"));
  },

  getAllModes() {
    return [
      { id: "standalone", name: "Standalone" },
      { id: "cluster", name: "Cluster" },
    ];
  },

  getSidebarSections(tab) {
    const sections = [
      {
        title: "Client Library",
        type: "dropdown",
        key: "client",
        items: CONFIG.clients,
      },
    ];

    if (tab === "playground") {
      sections.push({
        title: "Mode",
        type: "dropdown",
        key: "mode",
        items: CONFIG.modes,
      });
    }

    if (tab === "commonUseCases") {
      sections.push({
        title: "Use Cases",
        type: "buttons",
        key: "useCase",
        items: CONFIG.useCases,
      });
    }

    return sections;
  },

  async getTemplateCode(clientId, templateName) {
    if (!clientId || !templateName) {
      retu;
    }

    try {
      const template = await dataNavigator.getTemplate(clientId, templateName);
      return template?.code;
    } catch (error) {
      console.error("[Store] Template loading error:", error);
      retu;
    }
  },

  async getInitialCode() {
    try {
      let code;

      if (
        this.currentTab === "watchInAction" &&
        this.watchState.selectedClient
      ) {
        code = await this.getTemplateCode(
          this.watchState.selectedClient,
          this.watchState.selectedAction
        );
      } else if (this.currentTab === "playground") {
        code = await this.getTemplateCode(
          this.currentClient || DEFAULT_STATE.currentClient,
          this.executionMode || DEFAULT_STATE.executionMode
        );
      } else if (this.currentTab === "commonUseCases") {
        code = await this.getTemplateCode(
          this.currentClient || DEFAULT_STATE.currentClient,
          this.currentUseCase || DEFAULT_STATE.currentUseCase
        );
      }

      return code;
    } catch (error) {
      console.error("[Store] Error loading code:", error);
      retu;
    }
  },

  setClient(clientDisplayName) {
    this.currentClient = clientDisplayName;
    this.saveState();
  },

  setMode(mode) {
    this.executionMode = mode;
    this.saveState();
  },

  setTab(tab) {
    if (!VALID_TABS.includes(tab)) {
      console.warn("[Store] Invalid tab:", tab);
      return;
    }

    const previousTab = this.currentTab;
    this.currentTab = tab;

    if (previousTab === "watch-in-action") {
      this.clearWatchState();
    }

    window.history.replaceState(null, "", `#${tab}`);

    this.saveState();
  },

  setUseCase(useCase) {
    this.currentUseCase = useCase;
    this.saveState();
  },

  setConnection(status) {
    this.isConnected = status;
  },

  toggleTerminal() {
    this.terminalVisible = !this.terminalVisible;
  },

  addNotification(message, type = "info") {
    const id = Date.now();
    this.notifications.push({ id, message, type });
    setTimeout(() => {
      this.removeNotification(id);
    }, 5000);
  },

  removeNotification(id) {
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.notifications.splice(index, 1);
    }
  },

  saveState(immediate = false) {
    if (!this._initialized && !immediate) {
      return false;
    }

    if (this._saveTimeout) {
      clearTimeout(this._saveTimeout);
    }

    this._saveTimeout = setTimeout(() => {
      const stateToSave = {
        currentClient: this.currentClient,
        executionMode: this.executionMode,
        currentUseCase: this.currentUseCase,
        watchState: this.watchState,
        lastSaved: Date.now(),
      };

      try {
        localStorage.setItem(
          "valkey-sandbox-state",
          JSON.stringify(stateToSave)
        );
        console.debug("[Store] State saved in background");
        return true;
      } catch (error) {
        console.error("[Store] Failed to save state:", error);
        return false;
      }
    }, 1000);
  },

  setWatchState(client, action, language) {
    this.watchState = {
      selectedClient: client,
      selectedAction: action,
      language: language || this.getLanguage(client),
    };
    this.currentClient = client;
    this.currentUseCase = action;
    this.currentLanguage = language || this.getLanguage(client);
    this.saveState();
  },

  clearWatchState() {
    this.watchState = {
      selectedAction: null,
      selectedClient: null,
      language: null,
    };

    this.currentUseCase = null;
    this.lastEditorContent = null;

    const savedState = JSON.parse(
      localStorage.getItem("valkey-sandbox-state") || "{}"
    );
    delete savedState.watchState;
    localStorage.setItem("valkey-sandbox-state", JSON.stringify(savedState));
  },

  isWatchTab() {
    return ["watchInAction", "community", "helpfulResources"].includes(
      this.currentTab
    );
  },

  getLanguage(clientId) {
    if (!clientId) return "javascript";
    if (clientId.includes("python") || clientId.includes("py")) return "python";
    if (clientId.includes("java")) return "java";
    if (clientId.includes("go")) return "go";
    return "javascript";
  },

  getDefaultClient() {
    return "glide-node";
  },

  getDefaultMode() {
    return "cluster";
  },

  async initializeDefaults() {
    if (this._initialized) return;

    try {
      const hashTab = getTabFromHash();
      const initialState = {
        currentTab:
          hashTab === "watchInAction" && !this.watchState?.selectedAction
            ? "playground"
            : hashTab,
        currentClient: savedState.currentClient || DEFAULT_STATE.currentClient,
        executionMode: savedState.executionMode || DEFAULT_STATE.executionMode,
        currentUseCase:
          savedState.currentUseCase || DEFAULT_STATE.currentUseCase,
      };

      Object.assign(this, initialState);

      this.initializeWatchers();

      if (this.currentTab === "commonUseCases") {
        await this.getTemplateCode(this.currentClient, this.currentUseCase);
      }

      this._initialized = true;
      this.saveState();
    } catch (error) {
      console.error("[Store] Initialization error:", error);
      throw error;
    }
  },

  isValidTab(tab) {
    return [
      "playground",
      "watchInAction",
      "commonUseCases",
      "community",
      "helpfulResources",
      "about",
    ].includes(tab);
  },

  translateClientName(clientId) {
    const client = CONFIG.clients.find((client) => client.id === clientId);

    if (!client) {
      console.warn(
        `translateClientName: No client found with ID "${clientId}". Using default client.`
      );
      return this.getDefaultClientId();
    }

    return client.name;
  },

  getDefaultClientId() {
    const defaultClient = CONFIG.clients.find(
      (client) => client.name === DEFAULT_STATE.currentClient
    );
    return defaultClient ? defaultClient.id : null;
  },

  getAllUseCases() {
    return CONFIG.useCases;
  },

  initializeWatchers() {
    watch(
      () => this.currentClient,
      () => this.saveState()
    );

    watch(
      () => this.executionMode,
      () => this.saveState()
    );

    watch(
      () => this.currentTab,
      () => this.saveState()
    );

    watch(
      () => this.currentUseCase,
      () => this.saveState()
    );

    watch(
      () => this.watchState,
      () => this.saveState(),
      { deep: true }
    );
  },

  updateLeaderboard(newData) {
    this.leaderboard = newData;
  },

  searchDocumentation: async (query) => {
    const docService = await lazyDocumentation.getDocumentationService();
    return await docService.searchDocs(query);
  },

  getGeneralConcepts: async () => {
    const docService = await lazyDocumentation.getDocumentationService();
    return await docService.getGeneralConcepts();
  },

  getCommandReference: async () => {
    const docService = await lazyDocumentation.getDocumentationService();
    return await docService.getCommands();
  },

  async loadDocumentationSection(section) {
    if (this.documentationState[section]?.loaded) {
      return this.documentationState[section].data;
    }

    const docService = await lazyDocumentation.getDocumentationService();
    try {
      let data;
      switch (section) {
        case "languages":
          data = await docService.getClientLanguages();
          break;
        case "topics":
          data = await docService.getGeneralConcepts();
          break;
        case "commands":
          data = await docService.getCommands();
          break;
      }

      this.documentationState[section] = {
        loaded: true,
        data,
      };
      return data;
    } catch (error) {
      console.error(`Failed to load ${section}:`, error);
      throw error;
    }
  },

  async initializeDocumentation(section) {
    if (!section || this.documentationState.currentSection === section) return;

    this.documentationState.currentSection = section;

    await this.loadDocumentationSection(section);

    this.backgroundLoadRelatedContent(section);
  },

  backgroundLoadRelatedContent(section) {
    const relatedContent = {
      languages: ["topics"],
      topics: ["commands"],
      commands: ["languages"],
    };

    setTimeout(async () => {
      try {
        const related = relatedContent[section] || [];
        for (const contentType of related) {
          if (!this.documentationState[contentType].loaded) {
            await this.loadDocumentationSection(contentType);
          }
        }
      } catch (error) {
        console.error("Background content load failed:", error);
      }
    }, 2000);
  },

  async getGlideDocs() {
    try {
      if (this.documentationState.glide?.loaded) {
        return this.documentationState.glide.data;
      }

      const data = await documentationService.getGlideDocs();
      this.documentationState.glide = {
        loaded: true,
        data,
      };
      return data;
    } catch (error) {
      console.error("Failed to load Glide documentation:", error);
      return this.getFallbackGlideDocs();
    }
  },

  getFallbackGlideDocs() {
    return `# Valkey Glide Documentation

## Overview

Valkey Glide is the official high-performance client for Valkey, designed for modern distributed applications.

## Features

- High-performance optimized client
- Built-in clustering support
- Automatic reconnection handling
- Connection pooling
- TypeScript support

## Getting Started

\`\`\`bash
npm install @valkey/valkey-glide
\`\`\`

Check the playground for interactive examples!`;
  },
});

window.addEventListener("hashchange", () => {
  const newTab = window.location.hash.slice(1);
  if (store.isValidTab(newTab)) {
    if (newTab === "watchInAction" && !store.watchState?.selectedAction) {
      window.history.replaceState(null, "", "#playground");
      store.setTab("playground");
    } else {
      store.setTab(newTab);
    }
  }
});

export default store;
