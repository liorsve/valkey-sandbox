import { reactive, watch } from "vue";
import dataNavigator from "../data/index";

const DEFAULT_STATE = {
  currentClient: "glide-node",
  executionMode: "cluster",
  currentTab: "playground",
  currentUseCase: "Session Cache",
  leaderboard: [],
};

const savedState = (() => {
  const stored = localStorage.getItem("valkey-sandbox-state");
  if (!stored) return DEFAULT_STATE;

  const parsed = JSON.parse(stored);
  return {
    ...DEFAULT_STATE,
    ...parsed,
    currentClient: parsed.currentClient || DEFAULT_STATE.currentClient,
    executionMode: parsed.executionMode || DEFAULT_STATE.executionMode,
  };
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

  getTemplateCode(clientId, templateName) {
    if (!clientId || !templateName) {
      return "// Default template due to missing client or template.";
    }
    const template = dataNavigator.getTemplate(clientId, templateName);

    if (template && template.code) {
      return template.code;
    }
    console.warn(
      `No template found for clientId "${clientId}" and templateName "${templateName}".`
    );
    return "// No template available for this configuration";
  },

  getInitialCode() {
    if (this.currentTab === "watchInAction" && this.watchState.selectedClient) {
      return this.getTemplateCode(
        this.watchState.selectedClient,
        this.watchState.selectedAction
      );
    }

    if (this.currentTab === "playground") {
      return this.getTemplateCode(
        this.currentClient || DEFAULT_STATE.currentClient,
        this.executionMode || DEFAULT_STATE.executionMode
      );
    }

    if (this.currentTab === "commonUseCases") {
      return this.getTemplateCode(
        this.currentClient || DEFAULT_STATE.currentClient,
        this.currentUseCase || DEFAULT_STATE.currentUseCase
      );
    }

    return this.getTemplateCode(
      DEFAULT_STATE.currentClient,
      DEFAULT_STATE.executionMode
    );
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
    const previousTab = this.currentTab;
    this.currentTab = tab;

    if (tab === "watch-in-action" || previousTab === "watch-in-action") {
      this.clearWatchState();
    }

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

  saveState() {
    localStorage.setItem(
      "valkey-sandbox-state",
      JSON.stringify({
        currentClient: this.currentClient,
        executionMode: this.executionMode,
        currentTab: this.currentTab,
        currentUseCase: this.currentUseCase,
        watchState: this.watchState,
      })
    );
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

  initializeDefaults() {
    if (!this.currentClient) {
      this.setClient(DEFAULT_STATE.currentClient);
    }
    if (!this.executionMode) {
      this.setMode(DEFAULT_STATE.executionMode);
    }
    this.saveState();
    this.initializeWatchers();
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
});

store.initializeDefaults();
export default store;
