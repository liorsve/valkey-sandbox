<template>
  <div id="app" class="appContainer">
    <TopTabs :activeTab="currentTab" @change-tab="switchTab" />
    <div class="mainContent" :class="{ 'no-sidebar': hideSidebar }">
      <div v-if="['playground', 'commonUseCases'].includes(currentTab)" class="content">
        <Editor class="codeEditor" v-model:content="content" :language="language" />
        <AppTerminal class="terminal" ref="terminal" :class="terminalClass" />
      </div>
      <div v-else-if="currentTab === 'watchInAction'" class="content">
        <div v-if="!selectedGlide && !restoring" class="overlay">
          <button class="close-button" @click="closeOverlay">×</button>
          <div class="selection-container">
            <div v-if="!selectedAction">
              <button class="selection-button" @click="selectAction('Leaderboard')">Leaderboard</button>
              <button class="selection-button" @click="selectAction('Task Manager')">Task Manager</button>
            </div>
            <div v-else>
              <button class="selection-button" @click="selectGlide('valkey-glide (Node)')">Glide - Node.js</button>
              <button class="selection-button" @click="selectGlide('valkey-glide (Python)')">Glide - Python</button>
              <button class="selection-button" @click="selectGlide('valkey-glide (Java)')">Glide - Java</button>
            </div>
          </div>
        </div>
        <div v-else class="watch-content">
          <div class="replace-action-btn" :style="{ left: buttonPosition.x + 'px', top: buttonPosition.y + 'px' }"
            @mousedown="startDrag" :class="{ 'dragging': isDragging }" title="Click to replace or drag to move">
            <span class="icon">⟳</span>
            <span class="text" data-full="Action">Replace</span>
          </div>
          <div class="editor-terminal">
            <Editor ref="editor" v-model:content="content" :language="language" :read-only="isReadOnly" />
            <AppTerminal class="terminal" ref="terminal" :class="terminalClass" />
          </div>
          <div class="visualization">
            <LeaderboardComponent v-if="selectedAction === 'Leaderboard'" :ws="ws" :isConnected="wsConnected"
              @terminal-write="handleTerminalWrite" />
            <TaskManager v-else-if="selectedAction === 'Task Manager'" :ws="ws" :isConnected="wsConnected"
              @terminal-write="handleTerminalWrite" @send-message="handleTaskManagerMessage" />
          </div>
        </div>
      </div>
      <div v-else-if="currentTab === 'challenges'" class="challenge-content">
        <div class="challenge-navigation">
          <button v-for="section in challengeSections" :key="section.id"
            :class="['challenge-nav-btn', { active: currentChallengeSection === section.id }]">
            {{ section.label }}
          </button>
        </div>
        <div class="challenge-main">
          <keep-alive>
            <component :is="currentChallengeComponent" v-if="currentChallengeComponent" :ws="ws"
              :is-connected="wsConnected" :key="currentChallengeSection" class="challenge-component" />
          </keep-alive>
        </div>
      </div>
      <AppSidebar class="sidebar" :currentTab="currentTab" :selectedClient="selectedClient"
        :executionMode="executionMode" @run-code="runCode" @navigate="navigate" @select-usecase="selectUseCase"
        @update-client="updateClient" @update-mode="updateMode" @start-task="startTask" :clients="clients" />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import Editor from './components/Editor.vue';
import AppTerminal from './components/AppTerminal.vue';
import AppSidebar from './components/Sidebar.vue';
import LeaderboardComponent from './components/Leaderboard.vue';
import TaskManager from './components/TaskManager.vue';
import TopTabs from './components/TopTabs.vue';
import { codeTemplates } from './assets/codeTemplates';
import { watchInActionTemplates } from './assets/watchInActionTemplates.js';
import { defaultTemplate } from './assets/watchInActionTemplates';
import CodingChallenges from './components/CodingChallenges.vue';
import Quizzes from './components/Quizzes.vue';
import WeeklyChallenge from './components/WeeklyChallenge.vue';

export default defineComponent({
  name: 'App',

  components: {
    Editor,
    AppTerminal,
    AppSidebar,
    LeaderboardComponent,
    TaskManager,
    TopTabs,
    CodingChallenges,
    Quizzes,
    WeeklyChallenge,
  },

  data() {
    return {
      currentTab: localStorage.getItem('currentTab') || 'playground',
      selectedClient: localStorage.getItem('selectedClient') || 'valkey-glide (Python)',
      executionMode: localStorage.getItem('executionMode') || 'Standalone',
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
      language: 'python',
      currentView: 'editor',
      selectedUseCase: null,
      selectedAction: null,
      selectedGlide: null,
      content: '',
      hideSidebar: false,
      isReadOnly: false,
      terminalClass: '',
      wsRetryTimeout: null,
      maxRetries: 5,
      retryCount: 0,
      retryDelay: 1000,
      restoring: false,
      buttonPosition: { x: 12, y: 65 },
      isDragging: false,
      dragOffset: { x: 0, y: 0 },
      dragStartTime: 0,
      dragStartPos: { x: 0, y: 0 },
      currentChallengeSection: 'coding',
      challengeSections: [
        { id: 'coding', label: 'Coding Challenges' },
        { id: 'quiz', label: 'Quizzes' },
        { id: 'weekly', label: 'Weekly Challenge' }
      ],
    };
  },

  created() {
    this.setupWebSocket();
    this.restoreWatchInActionState();
  },

  beforeUnmount() {
    this.cleanup();
  },

  mounted() {
    this.updateTemplate();
    if (this.$refs.terminal) {
      this.$refs.terminal.writeWelcomeMessage(this.currentTab);
    }
    if (this.currentTab === 'playground') {
      const selectedTemplate = codeTemplates[this.selectedClient];
      this.content = selectedTemplate?.[this.executionMode] || '// No template available';
      this.updateLanguage();
    }
  },

  watch: {
    currentTab(newTab, oldTab) {
      if (oldTab === 'watchInAction') {
        if (this.ws?.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({
            action: 'cleanupTasks',
            data: { previousTab: oldTab }
          }));
        }
        this.resetWatchInAction();
        this.hideSidebar = false;
      }
      if (newTab === 'watchInAction') {
        this.isReadOnly = true;
        this.updateTemplate();
      } else {
        this.isReadOnly = false;
      }
    },
    selectedGlide() {
      if (this.currentTab === 'watchInAction') {
        this.updateTemplate();
      }
    },
  },

  setup() {
    onMounted(() => {
      setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
          preloader.style.display = 'none';
        }
      }, 300);
    });
  },

  computed: {
    currentChallengeComponent() {
      switch (this.currentChallengeSection) {
        case 'coding':
          return CodingChallenges;
        case 'quiz':
          return Quizzes;
        case 'weekly':
          return WeeklyChallenge;
        default:
          return null;
      }
    }
  },

  methods: {
    getWebSocketUrl() {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      return `${protocol}//${window.location.host}/appws`;
    },

    async setupWebSocket() {
      // Clear any existing timeout
      if (this.wsRetryTimeout) {
        clearTimeout(this.wsRetryTimeout);
        this.wsRetryTimeout = null;
      }

      if (this.ws?.readyState === WebSocket.OPEN) {
        return this.ws;
      }

      return new Promise((resolve, reject) => {
        if (this.retryCount >= this.maxRetries) {
          console.error('[WS] Max retry attempts reached');
          reject(new Error('Max retry attempts reached'));
          return;
        }

        try {
          const wsUrl = this.getWebSocketUrl();
          console.log(`[WS] Connecting to ${wsUrl} (Attempt ${this.retryCount + 1})`);

          this.ws = new WebSocket(wsUrl);

          const cleanupSocket = () => {
            if (this.ws) {
              this.ws.onclose = null;
              this.ws.onerror = null;
              this.ws.onmessage = null;
              this.ws.onopen = null;
              this.ws.close();
              this.ws = null;
            }
          };

          this.ws.onopen = () => {
            console.log('[WS] Connection established');
            this.wsConnected = true;
            this.retryCount = 0;
            this.retryDelay = 1000;
            resolve(this.ws);
          };

          this.ws.onclose = (event) => {
            console.log('[WS] Connection closed:', event.reason);
            this.wsConnected = false;
            cleanupSocket();

            // Only retry if we haven't reached max attempts
            if (this.retryCount < this.maxRetries) {
              this.retryDelay *= 2; // Exponential backoff
              this.retryCount++;
              this.wsRetryTimeout = setTimeout(() => {
                this.setupWebSocket().catch(console.error);
              }, this.retryDelay);
            }
          };

          this.ws.onerror = (error) => {
            console.error('[WS] Error:', error);
            cleanupSocket();
            reject(error);
          };

          this.ws.onmessage = (event) => {
            try {
              const message = JSON.parse(event.data);
              this.handleWebSocketMessage(message);
            } catch (error) {
              console.error('[WS] Message parsing error:', error);
            }
          };

        } catch (error) {
          console.error('[WS] Setup error:', error);
          this.wsConnected = false;
          reject(error);
        }
      });
    },

    handleWebSocketMessage(message) {
      if (!message || !message.action) return;

      console.log('[WS] Processing message:', message);

      try {
        switch (message.action) {
          case 'cleanupComplete':
            console.log('Cleanup completed successfully');
            break;

          case 'output':
            this.$refs.terminal?.write(message.data);
            break;

          case 'gameCommand':
            this.handleGameCommand(message.data);
            break;

          case 'error':
            console.error('[WS] Server error:', message.data);
            this.$refs.terminal?.write(`Error: ${message.data}\n`);
            break;

          default:
            console.log('[WS] Unhandled message action:', message.action);
        }
      } catch (error) {
        console.error('[WS] Error handling message:', error);
      }
    },

    cleanup() {
      if (this.ws?.readyState === WebSocket.OPEN) {
        try {
          this.ws.send(JSON.stringify({
            action: 'cleanup',
            data: {
              tab: this.currentTab,
              mode: this.executionMode.toLowerCase(),
              useCase: this.selectedUseCase
            }
          }));
        } catch (error) {
          console.error('[WS] Error sending cleanup message:', error);
        }
      }

      // Reset state
      if (this.wsRetryTimeout) {
        clearTimeout(this.wsRetryTimeout);
        this.wsRetryTimeout = null;
      }

      // Reset WebSocket
      if (this.ws) {
        this.ws.onclose = null;
        this.ws.onerror = null;
        this.ws.onmessage = null;
        this.ws.onopen = null;
        this.ws.close();
        this.ws = null;
      }

      this.wsConnected = false;
      this.retryCount = 0;
      this.retryDelay = 1000;
    },

    updateTemplate() {
      try {
        if (this.currentTab === 'watchInAction') {
          if (!this.selectedGlide || !this.selectedAction) {
            this.content = defaultTemplate;
            return;
          }
          const template = watchInActionTemplates[this.selectedGlide]?.[this.selectedAction];
          if (template) {
            this.content = template;
            this.language = this.getLanguageForGlide(this.selectedGlide);
          } else {
            this.content = '// No template available for this combination';
          }
        } else {
          // Handle regular code templates
          const selectedTemplate = codeTemplates[this.selectedClient];
          if (this.currentTab === 'commonUseCases' && this.selectedUseCase) {
            if (['Task Manager', 'Leaderboard'].includes(this.selectedUseCase)) {
              // Try to get template from watchInActionTemplates first
              const template = watchInActionTemplates[this.selectedClient]?.[this.selectedUseCase];
              if (template) {
                this.content = template;
                return;
              }
            }
            // Fall back to regular use case templates
            this.content = selectedTemplate?.[this.selectedUseCase] || '// No template available for selected use case';
          } else {
            // Regular mode templates (Standalone/Cluster)
            this.content = selectedTemplate?.[this.executionMode] || '// No template available for selected mode';
          }
          this.updateLanguage();
        }
      } catch (error) {
        console.error('Error updating template:', error);
        this.content = '// Error loading template';
      }
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

      if (this.ws?.readyState !== WebSocket.OPEN) {
        this.setupWebSocket();
      }

      this.executeCode(language, code);
    },

    executeCode(language, code) {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          action: 'runCode',
          data: {
            language,
            code,
            mode: this.executionMode.toLowerCase(),
          },
        }));
      } else {
        console.error('WebSocket is not open.');
      }
    },

    navigate(view) {
      this.currentView = view;
    },

    async switchTab(tabName) {
      // Don't switch if it's the same tab
      if (this.currentTab === tabName) {
        if (tabName === 'watchInAction') {
          this.resetWatchInAction();
        }
        return;
      }

      // Cleanup current tab
      this.cleanup();

      // Close existing websockets
      window.dispatchEvent(new Event('close-websockets'));

      // Reset state based on target tab
      switch (tabName) {
        case 'playground': {
          this.selectedClient = localStorage.getItem('selectedClient') || 'valkey-glide (Python)';
          this.executionMode = localStorage.getItem('executionMode') || 'Standalone';
          this.selectedUseCase = null;
          const selectedTemplate = codeTemplates[this.selectedClient];
          this.content = selectedTemplate?.[this.executionMode] || '// No template available';
          break;
        }

        case 'commonUseCases':
          this.selectedClient = 'valkey-glide (Python)';
          this.executionMode = 'Cluster';
          this.selectedUseCase = 'Recommendation System';
          localStorage.setItem('executionMode', 'Cluster');
          break;

        case 'watchInAction':
          // Only set defaults if not restoring from saved state
          if (!this.restoring) {
            localStorage.removeItem('watchInActionAction');
            localStorage.removeItem('watchInActionGlide');
            this.selectedAction = null;
            this.selectedGlide = null;
            this.hideSidebar = false;
          }
          break;
      }

      // Update current tab
      this.currentTab = tabName;
      localStorage.setItem('currentTab', tabName);

      // Reinitialize WebSocket connection
      await this.setupWebSocket();

      // Send initialization after WebSocket is connected
      if (this.ws?.readyState === WebSocket.OPEN) {
        // Clear any existing state first
        await this.ws.send(JSON.stringify({
          action: 'cleanup',
          data: {
            previousTab: this.currentTab,
            mode: this.executionMode.toLowerCase()
          }
        }));

        // Initialize new state
        await this.ws.send(JSON.stringify({
          action: 'init',
          data: {
            client: this.selectedClient,
            mode: this.executionMode,
            tab: tabName,
            useCase: this.selectedUseCase
          }
        }));

        // Flush servers if needed
        if (tabName === 'commonUseCases' || this.executionMode === 'Cluster') {
          await this.ws.send(JSON.stringify({
            action: 'flushServers',
            suppressOutput: true,
            data: {
              mode: this.executionMode.toLowerCase()
            }
          }));
        }
      }

      // Clear terminal and show welcome message
      this.$refs.terminal?.write('\x1b[2J\x1b[3J\x1b[;H');
      this.$refs.terminal?.writeWelcomeMessage(tabName);

      // Update template for the new tab
      this.updateTemplate();
      this.updateLanguage();
    },

    selectUseCase(useCase) {
      this.selectedUseCase = useCase;
      this.updateTemplate();
    },

    selectAction(action) {
      this.selectedAction = action;
      this.selectedGlide = null;
      localStorage.setItem('watchInActionAction', action);
    },

    selectGlide(glide) {
      this.selectedGlide = glide;
      this.hideSidebar = true;
      localStorage.setItem('watchInActionGlide', glide);
      this.updateTemplateForAction();
    },

    updateTemplateForAction() {
      try {
        if (this.currentTab === 'watchInAction') {
          const template = watchInActionTemplates[this.selectedGlide]?.[this.selectedAction];
          if (template) {
            this.content = template;
            this.language = this.getLanguageForGlide(this.selectedGlide);
          } else {
            this.content = '// No template available for this action';
          }
        } else {
          const selectedTemplate = codeTemplates[this.selectedClient];
          const template = selectedTemplate?.[this.executionMode] || '// No template available';
          this.content = template;
          this.updateLanguage();
        }
      } catch (error) {
        console.error('Error updating template for action:', error);
        this.content = '// Error loading template';
      }
    },

    getLanguageForGlide(glide) {
      switch (glide) {
        case 'valkey-glide (Python)':
          return 'python';
        case 'valkey-glide (Node)':
          return 'javascript';
        case 'valkey-glide (Java)':
          return 'java';
        default:
          return 'python';
      }
    },

    onContentChange(newContent) {
      this.content = newContent;
    },
    async flushServers() {
      if (this.ws?.readyState === WebSocket.OPEN) {
        try {
          await this.ws.send(JSON.stringify({
            action: 'flushServers',
            data: {
              mode: this.executionMode.toLowerCase()
            }
          }));
        } catch (error) {
          console.error('Error flushing servers:', error);
          this.$refs.terminal?.write('Error flushing servers\n');
        }
      }
    },

    async updateClient(newClient, newMode) {
      try {
        this.selectedClient = newClient;
        this.executionMode = newMode;
        localStorage.setItem('selectedClient', newClient);
        localStorage.setItem('executionMode', newMode);

        // Update template immediately after changing client
        const selectedTemplate = codeTemplates[newClient];
        if (selectedTemplate) {
          this.content = selectedTemplate[this.executionMode] || '// No template available';
        }
        this.updateLanguage();

        if (this.ws?.readyState === WebSocket.OPEN) {
          await this.ws.send(JSON.stringify({
            action: 'updateClient',
            data: {
              client: this.selectedClient,
              mode: this.executionMode,
            }
          }));
        }
      } catch (error) {
        console.error('Error updating client:', error);
      }
    },

    async updateMode(newClient, newMode) {
      this.selectedClient = newClient;
      localStorage.setItem('selectedClient', newClient);
      this.executionMode = newMode;
      localStorage.setItem('executionMode', newMode);
      this.updateTemplate();

      if (this.currentTab === 'commonUseCases') {
        await this.flushServers();
      }

      // Send init message after mode update
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          action: 'init',
          data: {
            client: this.selectedClient,
            mode: this.executionMode,
            tab: this.currentTab
          }
        }));
      }
    },

    closeOverlay() {
      this.resetWatchInAction();
      this.currentTab = 'playground';
      this.selectedClient = localStorage.getItem('selectedClient') || 'valkey-glide (Python)';
      this.executionMode = localStorage.getItem('executionMode') || 'Cluster';
      this.updateTemplate();
    },
    resetWatchInAction() {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          action: 'cancelTaskManager'
        }));
      }
      this.selectedAction = null;
      this.selectedGlide = null;
      this.hideSidebar = false;
      localStorage.removeItem('watchInActionAction');
      localStorage.removeItem('watchInActionGlide');
    },
    handleTerminalWrite(message) {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({
          action: 'gameCommand',
          data: message
        }));
      }
      this.$refs.terminal?.write(message);
    },
    closeWatchInAction() {
      this.currentTab = 'playground';
      this.selectedGlide = null;
      this.selectedAction = null;
      this.selectedUseCase = null;
      this.selectedClient = localStorage.getItem('selectedClient') || 'valkey-glide (Python)';
      this.executionMode = localStorage.getItem('executionMode') || 'Cluster';
      this.updateTemplate();
    },

    handleGameCommand(command) {
      if (!command || typeof command !== 'object') return;

      console.log('[Game] Received command:', command);

      switch (command.type) {
        case 'startGame':
          if (this.selectedAction === 'Leaderboard') {
            this.$refs.leaderboard?.startGame();
          }
          break;

        case 'lockAcquired':
          if (this.selectedAction === 'Task Manager') {
            this.$refs.taskManager?.handleCommand(command);
          }
          break;

        case 'performTask':
          if (this.selectedAction === 'Task Manager') {
            this.$refs.taskManager?.handleCommand(command);
          }
          break;

        case 'lockReleased':
          if (this.selectedAction === 'Task Manager') {
            this.$refs.taskManager?.handleCommand(command);
          }
          break;

        case 'complete':
          if (this.selectedAction === 'Task Manager') {
            this.$refs.taskManager?.handleCommand(command);
          }
          break;

        default:
          console.log('[Game] Unknown command type:', command.type);
      }
    },
    startTask() {
      this.$refs.taskManager.startTask();
    },
    handleTaskManagerMessage({ action, data }) {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ action, data }));
      }
    },
    restoreWatchInActionState() {
      if (this.currentTab === 'watchInAction') {
        const savedAction = localStorage.getItem('watchInActionAction');
        const savedGlide = localStorage.getItem('watchInActionGlide');
        if (savedAction && savedGlide) {
          this.restoring = true;
          this.selectedAction = savedAction;
          this.selectedGlide = savedGlide;
          this.hideSidebar = true;
          this.updateTemplateForAction();
          this.restoring = false;
        }
      }
    },
    startDrag(e) {
      if (!e.target.closest('.replace-action-btn')) return;

      this.dragStartTime = Date.now();
      this.dragStartPos = { x: e.clientX, y: e.clientY };
      this.isDragging = true;

      const buttonRect = e.target.closest('.replace-action-btn').getBoundingClientRect();
      this.dragOffset = {
        x: e.clientX - buttonRect.left,
        y: e.clientY - buttonRect.top
      };

      const onMouseMove = (e) => {
        if (!this.isDragging) return;

        const newX = e.clientX - this.dragOffset.x;
        const newY = e.clientY - this.dragOffset.y;

        // Get button dimensions
        const buttonWidth = 120;
        const buttonHeight = 32;

        // Add bounds with padding
        const padding = 10;
        const maxX = window.innerWidth - buttonWidth - padding;
        const maxY = window.innerHeight - buttonHeight - padding;
        const minX = padding;
        const minY = 60;

        requestAnimationFrame(() => {
          this.buttonPosition = {
            x: Math.max(minX, Math.min(maxX, newX)),
            y: Math.max(minY, Math.min(maxY, newY))
          };
        });
      };

      const onMouseUp = (e) => {
        const dragDistance = Math.hypot(
          e.clientX - this.dragStartPos.x,
          e.clientY - this.dragStartPos.y
        );
        const dragDuration = Date.now() - this.dragStartTime;

        if (dragDuration < 200 && dragDistance < 5) {
          this.resetWatchInAction();
        }

        this.isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },

    handleReplaceClick(e) {
      e.preventDefault();
      e.stopPropagation();
    },
  }
});
</script>

<style>
body {
  background-color: #0a0b0e;
  color: #e4e4e4;
  margin: 0;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

#app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #0a0b0e 0%, #141618 100%);
}

.appContainer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.mainContent {
  flex: 1;
  display: flex;
  flex-direction: row;
  /* Change to row to restore side-by-side layout */
  padding: 20px;
  gap: 20px;
  overflow: hidden;
}

.watch-in-action-view {
  display: flex;
  flex-direction: column;
  flex: 1;
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
  min-height: 0;
  gap: 15px;
}

.codeEditor {
  flex: 2;
  /* Give editor more space than terminal */
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.editor-terminal .codeEditor {
  flex: 1;
  min-height: 0;
}

.editor-terminal .terminal {
  background-color: #0f1113;
  border-top: 1px solid #2a2f35;
}

.sidebar {
  flex-shrink: 0;
  height: 100%;
  order: 2;
  background: #1a1d21;
  border-left: 1px solid #2a2f35;
  padding: 20px;
}

.editor-terminal,
.visualization {
  height: 100%;
  background: #1a1d21;
  border-radius: 8px;
  border: 1px solid #2a2f35;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  min-height: 0;
}

.editor-terminal .codeEditor {
  flex: 2;
  min-height: 0;
}

.editor-terminal .terminal {
  flex: 0 0 200px;
  min-height: 0;
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

.sidebar {
  z-index: 10;
}

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
  background-color: rgba(10, 11, 14, 0.95);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.selection-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #1a1d21;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #2a2f35;
  box-shadow: 0 0 30px rgba(0, 255, 157, 0.1);
}

.selection-button {
  padding: 15px 30px;
  font-size: 16px;
  background: #1a1d21;
  color: #00ff9d;
  border: 1px solid #00ff9d;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 255, 157, 0.2);
  margin-bottom: 20px;
  margin-right: 20px;
}

.selection-button:hover {
  background: #00ff9d;
  color: #0a0b0e;
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(0, 255, 157, 0.4);
}

.selection-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg,
      transparent,
      rgba(0, 255, 157, 0.2),
      transparent);
  transition: 0.5s;
}

.selection-button:hover::before {
  left: 100%;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 36px;
  background: none;
  color: #00ff9d;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.close-button:hover {
  color: #00ff9d;
  opacity: 1;
  text-shadow: 0 0 10px rgba(0, 255, 157, 0.5);
}

.watch-content {
  display: flex;
  flex: 1;
  gap: 20px;
  padding: 20px;
  overflow: hidden;
  flex-direction: row;
  height: 100%;
}

.editor-terminal {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.editor-terminal .codeEditor {
  flex: 1;
  min-height: 0;
}

.editor-terminal .terminal {
  flex: 1;
  /* Allow terminal to grow */
  min-height: 200px;
  max-height: 50vh;
}

/* Ensure visualization takes available space */
.visualization {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  max-height: 100%;
  height: 100%;
}

.content,
.mainContent {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.double-height {
  min-height: 600px;
}

.appContainer::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(rgba(0, 255, 157, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 157, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
}

.replace-action-btn {
  position: absolute;
  cursor: grab;
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  border: none;
  border-radius: 30px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 100;
  user-select: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  min-width: 80px;
  /* Width for "Replace" */
  height: 32px;
  overflow: hidden;
}

.replace-action-btn .icon {
  font-size: 14px;
  animation: spin 2s linear infinite;
}

.replace-action-btn .text {
  color: white;
  font-weight: 500;
  position: relative;
  white-space: nowrap;
}

.replace-action-btn .text::after {
  content: attr(data-full);
  position: absolute;
  left: 100%;
  margin-left: 4px;
  opacity: 0;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.replace-action-btn:hover {
  min-width: 120px;
  /* Width for "Replace Action" */
  transform: scale(1.05);
  background: linear-gradient(135deg, #2563eb, #7e22ce);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.replace-action-btn:hover .text::after {
  opacity: 1;
}

.replace-action-btn.dragging {
  cursor: grabbing;
  min-width: 120px;
  opacity: 0.9;
  transform: scale(1.05);
}

.replace-action-btn.dragging .text::after {
  opacity: 1;
}

@media (max-width: 768px) {
  .replace-action-btn {
    position: fixed;
    bottom: 20px;
    left: 50% !important;
    top: auto !important;
    transform: translateX(-50%);
  }
}

.challenge-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1e1e1e;
  overflow: hidden;
}

.challenge-main {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.challenge-component {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}

.challenge-navigation {
  display: flex;
  gap: 1px;
  background: #2d2d2d;
  padding: 10px 20px;
  border-bottom: 1px solid #333;
}

.challenge-nav-btn {
  padding: 10px 20px;
  color: #e4e4e4;
  background: transparent;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.challenge-nav-btn:hover {
  background: #3d3d3d;
}

.challenge-nav-btn.active {
  background: #4a148c;
  color: white;
}

.challenge-main {
  flex: 1;
  overflow: auto;
  padding: 20px;
}
</style>
