<template>
  <div id="app" class="appContainer">
    <TopTabs :activeTab="currentTab" @change-tab="switchTab" />
    <div class="mainContent" :class="{ 'no-sidebar': hideSidebar }">
      <div v-if="['playground', 'commonUseCases'].includes(currentTab)" class="content">
        <Editor class="codeEditor" v-model:content="content" :language="language" />
        <AppTerminal class="terminal" ref="terminal" />
      </div>
      <div v-else-if="currentTab === 'watchInAction'" class="content">
        <!-- Overlay Modal -->
        <div v-if="!selectedGlide" class="overlay">
          <!-- Close button -->
          <button class="close-button" @click="closeOverlay">×</button>
          <div class="selection-container">
            <!-- First selection -->
            <div v-if="!selectedAction">
              <button class="selection-button" @click="selectAction('leaderboard')">Leaderboard</button>
              <button class="selection-button" @click="selectAction('taskManager')">Task Manager</button>
            </div>
            <!-- Second selection -->
            <div v-else>
              <button class="selection-button" @click="selectGlide('valkey-glide (Node)')">Glide - Node.js</button>
              <button class="selection-button" @click="selectGlide('valkey-glide (Python)')">Glide - Python</button>
              <button class="selection-button" @click="selectGlide('valkey-glide (Java)')">Glide - Java</button>
            </div>
          </div>
        </div>
        <!-- Content after selections -->
        <div v-else class="watch-content">
          <div class="editor-terminal">
            <Editor ref="editor" v-model:content="content" :language="language" />
            <AppTerminal ref="terminal" />
          </div>
          <div class="visualization">
            <LeaderboardComponent v-if="selectedAction === 'leaderboard'" />
            <TaskManager v-else-if="selectedAction === 'taskManager'" />
          </div>
        </div>
      </div>
      <!-- ...other tabs... -->
      <AppSidebar class="sidebar" :currentTab="currentTab" :selectedClient="selectedClient"
        :executionMode="executionMode" @run-code="runCode" @navigate="navigate" @select-usecase="selectUseCase"
        @update-client="updateClient" @update-mode="updateMode" />
    </div>
  </div>
</template>

<script>
import Editor from './components/Editor.vue';
import AppTerminal from './components/AppTerminal.vue';
import AppSidebar from './components/Sidebar.vue';
import LeaderboardComponent from './components/Leaderboard.vue';
import TaskManager from './components/TaskManager.vue';
import TopTabs from './components/TopTabs.vue';
import { codeTemplates } from './assets/codeTemplates';

export default {
  name: 'App',

  components: {
    Editor,
    AppTerminal,
    AppSidebar,
    LeaderboardComponent,
    TaskManager,
    TopTabs,
  },

  data() {
    return {
      currentTab: 'playground',
      selectedClient: 'valkey-glide (Python)',
      executionMode: 'Standalone',
      clients: [
        'valkey-glide (Java)',
        'valkey-glide (Python)',
        'valkey-glide (Node)',
        'valkey-py (Python)',
        'iovalkey (Node)',
        'valkey-go (Go)',
        'valkey-java (Java)',
      ],
      executionModes: ['Standalone', 'Cluster'],
      wsRetryCount: 0,
      ws: null,
      wsConnected: false,
      wsBaseUrl: `/appws`,
      language: 'javascript',
      currentView: 'editor',
      selectedUseCase: null,
      selectedAction: null,
      selectedGlide: null,
      content: '',
      hideSidebar: false,
    };
  },

  created() {
    this.setupWebSocket();
  },

  beforeUnmount() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    try {
      this.$refs.editor?.dispose();
      this.$refs.terminal?.dispose();
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  },

  mounted() {
    this.updateTemplate();
  },

  watch: {
    currentTab(newTab, oldTab) {
      if (newTab !== 'watchInAction') {
        this.resetWatchInAction();
        this.hideSidebar = false;
      }
    },
  },

  methods: {
    getWebSocketUrl() {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      return `${protocol}//${window.location.host}/appws`;
    },

    setupWebSocket() {
      if (this.ws?.readyState === WebSocket.OPEN) {
        return;
      }

      const wsUrl = this.getWebSocketUrl();
      console.log('[WS] Connecting to', wsUrl);

      try {
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          console.log('[WS] Connected');
          this.wsConnected = true;
          this.wsRetryCount = 0;
        };

        this.ws.onclose = (event) => {
          console.log('[WS] Closed:', event.code, event.reason);
          this.wsConnected = false;
          this.ws = null;
        };

        this.ws.onerror = (error) => {
          console.error('[WS] Error:', error);
        };

        this.ws.onmessage = (event) => {
          try {
            const response = JSON.parse(event.data);
            if (response.action === 'output') {
              this.$refs.terminal?.write(response.data);
            }
          } catch (error) {
            console.error('[WS] Message parse error:', error);
          }
        };
      } catch (error) {
        console.error('[WS] Setup error:', error);
      }
    },

    updateTemplate() {
      const selectedTemplate = codeTemplates[this.selectedClient];
      let template;
      if (this.currentTab === 'commonUseCases') {
        // Handle the case where a specific use case is selected
        if (this.selectedUseCase) {
        template = selectedTemplate[this.selectedUseCase] || '// No template available for selected use case';
        } else {
        // Default template for 'commonUseCases'
        template = selectedTemplate['Leaderboard'];
        }
      } else {
        template = selectedTemplate[this.executionMode] || '// No template available for execution mode';
        }

      this.content = template;
      this.updateLanguage();
    },

    getTemplate() {
      const selectedTemplate = codeTemplates[this.selectedClient];
      if (!selectedTemplate) {
        return '// No template available for selected client';
      }
      return selectedTemplate[this.executionMode] || '// No template available for selected mode';
    },

    updateLanguage() {
      const clientLanguageMap = {
        'valkey-glide (Python)': 'python',
        'valkey-glide (Java)': 'java',
        'valkey-glide (Node)': 'javascript',
        'valkey-py (Python)': 'python',
        'iovalkey (Node)': 'javascript',
        'valkey-go (Go)': 'go',
        'valkey-java (Java)': 'java',
      };
      this.language = clientLanguageMap[this.selectedClient] || 'javascript';
    },

    runCode() {
      const code = this.content;
      const language = this.language;

      this.$refs.terminal?.write('\x1b[2J\x1b[3J\x1b[;H');

      if (!this.wsConnected) {
        this.$refs.terminal?.write('Connecting to server...\n');
        this.setupWebSocket();
        setTimeout(() => this.executeCode(language, code), 1000);
        return;
      }

      this.executeCode(language, code);
    },

    executeCode(language, code) {
      if (this.ws?.readyState === WebSocket.OPEN) {
        try {
          this.ws.send(
            JSON.stringify({
              action: 'runCode',
              data: {
                language,
                code,
                mode: this.executionMode.toLowerCase(),
              },
            })
          );
        } catch (error) {
          console.error('Error sending code:', error);
          this.$refs.terminal?.write('Error sending code to server\n');
        }
      } else {
        this.$refs.terminal?.write('Not connected to server\n');
      }
    },

    navigate(view) {
      this.currentView = view;
    },

    switchTab(tabName) {
      if (this.currentTab === 'watchInAction' && tabName === 'watchInAction') {
        this.resetWatchInAction();
      }
      this.currentTab = tabName;
      this.selectedUseCase = null;
      this.updateTemplate();
    },

    selectUseCase(useCase) {
      this.selectedUseCase = useCase;
      this.updateTemplate();
    },

    selectAction(action) {
      this.selectedAction = action;
      this.selectedGlide = null;
    },

    selectGlide(glide) {
      this.selectedGlide = glide;
      this.hideSidebar = true;
      this.updateTemplateForAction();
    },

    updateTemplateForAction() {
      const selectedTemplate = codeTemplates[this.selectedGlide];
      const templateKey =
        this.selectedAction.charAt(0).toUpperCase() + this.selectedAction.slice(1);
      const template =
        selectedTemplate[templateKey] || '// No template available for selected action';
      this.content = template;
      this.updateLanguage();
    },

    onContentChange(newContent) {
      this.content = newContent;
    },
    updateClient(newClient, newMode) {
      this.selectedClient = newClient;
      this.executionMode = newMode;
      this.updateTemplate();
    },
    updateMode(newClient, newMode) {
      this.selectedClient = newClient;
      this.executionMode = newMode;
      this.updateTemplate();
    },
    closeOverlay() {
      this.resetWatchInAction();
      this.currentTab = 'playground';
    },
    resetWatchInAction() {
      this.selectedAction = null;
      this.selectedGlide = null;
      this.hideSidebar = false;
    },
  },
};
</script>

<style>
/* Global styles */
body {
  background-color: #121212;
  color: #ffffff;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}

.appContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.mainContent {
  flex: 1;
  display: flex;
  flex-direction: row;
  padding: 15px;
  gap: 15px;
  overflow: hidden;
  position: static;
}

.mainContent.no-sidebar .sidebar {
  display: none;
}

.mainContent.no-sidebar {
  padding: 0;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.codeEditor {
  flex: 2;
  min-height: 0;
}

.terminal {
  flex: 1;
  background-color: #1e1e1e;
  min-height: 0;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
  order: 2;
}

.editor-terminal,
.visualization {
  height: 100%;
}

.action-selection,
.glide-selection {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.editor-terminal {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.editor-terminal>* {
  flex: 1;
  min-height: 0;
}

.visualization {
  flex: 1;
}

.sidebar {
  z-index: 10;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .mainContent {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    order: 1;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.selection-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.selection-button {
  padding: 20px 40px;
  font-size: 24px;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: #fff;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-bottom: 20px; /* Add more bottom space between buttons */
  margin-right: 20px; /* Optional: Add right space between buttons if they are inline */
}

.selection-button:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.close-button {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 36px;
  background: none;
  color: #fff;
  border: none;
  cursor: pointer;
}

.close-button:hover {
  color: #ccc;
}

.watch-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  gap: 15px;
}

.editor-terminal {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-terminal>* {
  flex: 1;
  overflow: hidden;
}

.visualization {
  flex: 1;
  background-color: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
}

/* Adjust content and mainContent styles */
.content,
.mainContent {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>
