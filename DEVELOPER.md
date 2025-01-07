# 🛠️ Valkey Sandbox Developer Guide

> Where distributed computing meets rubber ducks 🦆

## 🎯 Current Status

### Core Components
- ✅ Frontend (Vue.js 3 with WebSocket)
- ✅ Backend (Node.js with Express)
- ✅ Code Execution System (Docker-based)
- ✅ Real-time Updates (WebSocket)
- 🟡 Testing Framework (Help wanted!)
- 🟡 Documentation System (Work in progress)

### Language Support
- ✅ Node.js (Valkey-glide, iovalkey)
- ✅ Python (Valkey-glide, valkey-py)
- 🟨 Java (Compilation support coming soon)
- 🟨 Go (Runtime integration planned)

### Features
- ✅ Monaco Code Editor
- ✅ Real-time Code Execution
- ✅ Task Manager Demo
- ✅ Leaderboard Demo
- ✅ Code Templates (Python, Node.js, Java)
- 🟡 Challenge System (Under construction)
- 🟡 Documentation Browser (Needs love)

## 🏗️ Architecture

```
[Frontend 8080] ←→ [Backend 3000] ←→ [Valkey Services]
      ↓               ↓                ↑
Vue.js + Monaco   Node.js + Express    |
WebSocket Client  WebSocket Server     |
                      ↓               |
                Docker Executors ─────┘
                (Python/Node.js)
```

## 🚀 Quick Start

1. Clone & Setup:
```bash
git clone https://github.com/avifenesh/valkey-sandbox.git
cd valkey-sandbox
./setup.sh --dev  # For development
# or
./setup.sh        # For production
```

2. Access:
- Frontend: http://localhost:8080
- Backend: http://localhost:3000
- Valkey Standalone: localhost:6379
- Valkey Cluster: localhost:7000-7005

## 💻 Code Execution

### System Overview
- Docker-based isolated environments with resource limits
- Multi-language support (Python/Node.js)
- Real-time output streaming
- Security pattern analysis

### Language Examples

#### Python with Valkey-glide
```python
from valkey_glide import GlideClient

# Connect to Valkey
client = GlideClient(host='valkey-standalone', port=6379)

# Basic operations
await client.set('key', 'value')
result = await client.get('key')
print(f"Retrieved: {result}")

# Example response
{
  'output': 'Retrieved: value\n',
  'error': None,
  'execution_time': 0.001,
  'memory_used': 8192
}
```

#### Node.js with Valkey-glide
```javascript
import { GlideClient } from '@valkey/valkey-glide';

// Connect to Valkey
const client = await GlideClient.createClient({
  host: 'valkey-standalone',
  port: 6379
});

// Basic operations
await client.set('key', 'value');
const result = await client.get('key');
console.log('Retrieved:', result);

// Example response
{
  output: "Retrieved: value\n",
  error: null,
  executionTime: 0.001,
  memoryUsed: 15925248
}
```

## 📡 Communication & Security

### WebSocket Protocol
```javascript
// Execute code
{
  action: 'runCode',
  data: {
    language: 'python|javascript',
    code: string,
    mode: 'standalone|cluster'
  }
}

// Task management
{
  action: 'startTasks',
  data: { tasks: Task[] }
}
```

### Security Features
```javascript
// Resource limits
{
  memory: "128mb",
  cpu: "5s",
  fileSize: "1mb",
  processes: 5
}

// Forbidden patterns
const forbidden = [
  "process.env",
  'require("child_process")',
  'import("child_process")',
  "eval",
  "Function",
];
```

## 🚀 Frontend Performance

### 1. Core Features
- Lazy loading & code splitting
- WebSocket optimizations
- Virtual scrolling
- Service worker caching
- Memory caching
- State management

### 2. Implementation Examples
```javascript
// Lazy loading with code splitting
const routes = [
  {
    path: '/playground',
    component: () => import('@/views/Playground.vue')
  }
];

// WebSocket message batching
const wsManager = {
  queuedMessages: [],
  retryDelay: 5000,
  maxRetries: 5,
  
  sendBatch() {
    if (this.queuedMessages.length) {
      this.ws.send(JSON.stringify(this.queuedMessages));
      this.queuedMessages = [];
    }
  }
};
```

## 🎨 Vue Components Architecture

### Core Components

#### Watch-in-Action Components
```vue
// Key visualization components for real-time demos
components/
├── watch/
│   ├── WatchContainer.vue       # Main container for watch-in-action demos
│   ├── ActionSelect.vue         # Demo selection interface
│   ├── visualizations/
│   │   ├── LeaderboardVisualization.vue    # Real-time sorted sets demo
│   │   └── TaskManagerVisualization.vue     # Distributed locks & queues demo
│   └── components/
       ├── WatchEditor.vue       # Specialized code editor for demos
       └── WatchTerminal.vue     # Real-time output terminal
```

#### Editor Components
```vue
// Base editor components with Monaco integration
components/
├── base/
│   ├── BaseEditor.vue          # Monaco editor wrapper
│   └── BaseTerminal.vue        # Xterm.js terminal wrapper
└── Editor.vue                  # Main editor component with language support
```

#### Layout Components
```vue
// Core layout and navigation components
components/layout/
├── Sidebar.vue                # Main navigation sidebar
├── TopTabs.vue               # Tab-based navigation
└── LoadingOverlay.vue        # Loading states & transitions
```

### Key Features

1. **Real-time Visualization**
   ```javascript
   // WatchContainer.vue
   const wsManager = useWebSocket();
   const terminalInstance = ref(null);

   // Handles real-time updates
   const messageHandler = (event) => {
     switch (event.action) {
       case "taskUpdate":
         handleTaskUpdate(event.payload);
         break;
       case "leaderboardUpdate":
         handleLeaderboardUpdate(event.payload);
         break;
     }
   };
   ```

2. **Code Editor Integration**
   ```javascript
   // BaseEditor.vue
   const editorOptions = {
     fontFamily: "JetBrains Mono",
     fontSize: 14,
     minimap: { enabled: false },
     automaticLayout: true,
     scrollBeyondLastLine: false
   };
   ```

3. **WebSocket Communication**
   ```javascript
   // Example from WatchVisualization
   const handleActionSelect = async ({ action, client }) => {
     wsManager.send({
       action: "init",
       component: action,
       client: client
     });
     // Handle response in messageHandler
   };
   ```

4. **State Management**
   ```javascript
   // Store integration example
   const state = reactive({
     currentClient: savedState.currentClient,
     executionMode: savedState.executionMode,
     currentTab: getTabFromHash(),
     watchState: null
   });
   ```

### Component Communication

1. **Event Bus Pattern**
   ```javascript
   const eventBus = {
     on: (event, callback) => { /* ... */ },
     emit: (event, data) => { /* ... */ },
     off: (event, callback) => { /* ... */ }
   };
   ```

2. **Props & Events**
   ```vue
   <!-- Parent-child communication -->
   <WatchVisualization
     :ws="wsInstance"
     :isConnected="isConnected"
     @terminal-write="handleTerminalWrite"
   />
   ```

3. **Dependency Injection**
   ```javascript
   // Provide at app level
   provide('wsManager', wsManager);
   provide('eventBus', eventBus);

   // Inject in components
   const wsManager = inject('wsManager');
   const eventBus = inject('eventBus');
   ```

### Performance Optimizations

1. **Lazy Loading**
   ```javascript
   const DocComponents = {
     GeneralConcepts: defineAsyncComponent(() => 
       import('./content/GeneralConcepts.vue')
     ),
     CommandsReference: defineAsyncComponent(() => 
       import('./content/CommandsReference.vue')
     )
   };
   ```

2. **Virtual Scrolling**
   ```vue
   <virtual-scroller
     :items="commandList"
     :item-height="40"
     v-slot="{ item }"
   >
     <command-item :command="item" />
   </virtual-scroller>
   ```

3. **Debounced Updates**
   ```javascript
   const debouncedUpdate = debounce((value) => {
     store.saveState(value);
   }, 300);
   ```

## 🔧 Development Setup

### Using Setup Script

The `setup.sh` script provides additional options:

```bash
./setup.sh --dev   # Development mode with hot-reloading
./setup.sh         # Production mode
./setup.sh --cleanup  # Clean up all running processes
./setup.sh --log  # Enable logging
./setup.sh --rebuild  # Rebuild Docker images
./setup.sh --reinstall  # Reinstall dependencies
```

Features:

- Automatic dependency checking
- Service health monitoring
- Development/Production environment setup
- Clean process management
- Logging configuration

### Manual Setup

1. Frontend Development:

```bash
cd frontend
npm install
npm run serve
```

2. Backend Development:

```bash
cd backend
npm install
npm run dev
```

### Docker Development

Modify `docker-compose.yml` for development:

- Use volume mounts for hot reloading
- Enable debug ports
- Set environment to development

## 🎯 Project Roadmap

### Planned Improvements

1. Testing Infrastructure

   - Jest for backend
   - Vue Test Utils for frontend
   - Cypress for E2E tests
   - GitHub Actions CI/CD

2. Documentation

   - OpenAPI/Swagger for REST endpoints
   - WebSocket protocol documentation
   - Example collection

3. Features

   - Valkey cluster management UI
   - Challenge system
   - Template marketplace

4. Security
   - Authentication system?
   - Rate limiting
   - Sandbox environment isolation
   - Code analysis

### Current Limitations

1. No test coverage
2. Limited error handling
3. Basic monitoring
4. Missing CI/CD pipeline

## 📝 Coding Standards

- Use ESLint and Prettier for code formatting
- Follow Vue.js style guide for frontend code
- Write meaningful commit messages
- Document new features and APIs

## 🔄 Workflow

1. Create feature branch from `main`
2. Implement changes
3. Write tests
4. Submit PR with description
5. Code review
6. Merge to `main`

## 📚 API Documentation

### Backend Endpoints

- `POST /execute` - Run code
- `GET /templates` - Get code templates
- `WS /appws` - WebSocket connection

### Valkey Integration

- Standalone mode: Direct connection
- Cluster mode: Managed through proxy

## 🔍 Debugging

### WebSocket Debugging

```javascript
// Enable debug mode
const ws = new WebSocket("ws://localhost:8080/appws");
ws.onmessage = (e) => console.log("WS:", JSON.parse(e.data));
```

### Docker Logs

```bash
# View specific service
docker-compose logs -f backend

# View all services
docker-compose logs -f
```

### Resource Monitoring

```bash
# Check container stats
docker stats

# Monitor cluster
watch -n1 'docker-compose exec valkey-cluster valkey-cli -p 7000 cluster info'
```

## 📚 Additional Resources

### API Documentation

- Backend API Spec: `/docs/api.md`
- WebSocket Protocol: `/docs/websocket.md`
- Valkey Integration: `/docs/valkey.md`

### Examples

- Task Manager: `/examples/task-manager`
- Leaderboard: `/examples/leaderboard`
- Code Execution: `/examples/code-execution`
