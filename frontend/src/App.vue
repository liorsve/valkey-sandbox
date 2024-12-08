<template>
  <div id="app" class="appContainer">
    <div class="mainContent">
      <Editor class="codeEditor" ref="editor" :language="language" />
      <AppTerminal class="terminal" ref="terminal" />
    </div>
    <Sidebar class="sidebar" @run-code="runCode" />
  </div>
</template>

<script>
import Editor from './components/Editor.vue';
import AppTerminal from './components/Terminal.vue';
import Sidebar from './components/Sidebar.vue';
import { codeTemplates } from './assets/codeTemplates';

export default {
  name: 'App',

  components: {
    Editor,
    AppTerminal,
    Sidebar,
  },

  data() {
    return {
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
  },

  mounted() {
    this.updateTemplate();
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
      const template = this.getTemplate();
      this.$refs.editor?.setValue(template);
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
      const code = this.$refs.editor?.getValue() || '';
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

/* App layout */
#app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  /* Ensure row direction for sidebar and main content */
}

.appContainer {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  /* Ensure full height */
}

.mainContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  gap: 15px;
  /* Space between editor and terminal */
  overflow: hidden;
  /* Prevent content overflow */
}

.codeEditor {
  flex: 2;
  /* Allocate less space to the editor */
  min-height: 0;

}

.terminal {
  flex: 1;
  background-color: #1e1e1e;
  min-height: 0;
  /* Allow shrinking */
}

/* Sidebar */
.sidebar {
  width: 250px;
  flex-shrink: 0;
  /* Prevent sidebar from shrinking */
}
</style>
