import { createApp } from 'vue'
import App from './App.vue'
import * as monaco from 'monaco-editor';

// Optionally, register additional languages
monaco.languages.register({ id: 'python' });
monaco.languages.register({ id: 'java' });
monaco.languages.register({ id: 'go' });

const app = createApp(App)
app.mount('#app')
