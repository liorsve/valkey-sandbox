# Developer Guide

## 🚀 Overview

This sandbox environment provides a secure, scalable platform for executing code with Valkey integration. It supports both standalone and cluster modes with real-time visualization capabilities.

## 🏗️ Architecture

### Core Components

```
[Frontend (Vue.js)] → [Backend (Node.js)] → [Code Executors]
                                        → [Valkey Services]

- Frontend (8080): Vue.js interface with real-time visualizations
- Backend (3000): Node.js API & WebSocket server
- Executors: Sandboxed Python (3002) and Node.js (3001) environments
- Valkey: Standalone (6379) and Cluster (7000-7005) instances
```

## 🔧 Development Setup

### Using Setup Script

The `setup.sh` script provides additional options:

```bash
./setup.sh --dev   # Development mode with hot-reloading
./setup.sh         # Production mode
./setup.sh --cleanup  # Clean up all running processes
./setup.sh --log  # Enable logging
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
   - Performance benchmarking tools
   - Template marketplace

4. Security
   - Authentication system
   - Rate limiting
   - Sandbox environment isolation

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

## 💻 Code Execution

### JavaScript Executor

The Node.js executor provides a secure environment with:

- Resource Limits:
  ```javascript
  {
    memory: "128mb",
    cpu: "5s",
    fileSize: "1mb",
    processes: 5
  }
  ```

#### Usage Example

```javascript
// Direct usage
import { executeCode } from "./executor.js";

const code = `
function fibonacci(n) {
  let [a, b] = [0, 1];
  for(let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a;
}
console.log(fibonacci(10));
`;

const result = await executeCode(code);
/* Output:
{
  output: "55\nTime: 0.001s\nMemory: 15.2MB",
  error: null,
  executionTime: 0.001,
  memoryUsed: 15925248
}
*/
```

#### WebSocket Integration

```javascript
// Send code execution request
ws.send(
  JSON.stringify({
    action: "runCode",
    data: {
      language: "javascript",
      code: 'console.log("Hello")',
      mode: "standalone",
    },
  })
);

// Handle response
ws.onmessage = (event) => {
  const response = JSON.parse(event.data);
  if (response.action === "output") {
    console.log(response.data);
  }
};
```

### Python Executor

The Python executor provides a secure environment for running Python code with:

- Resource limits:
  - Memory: 128MB
  - CPU time: 5 seconds
  - File size: 1MB
  - Process limit: 5 processes

#### Usage Example

```python
# Direct usage
from executor import execute_code

code = """
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

print(fibonacci(10))
"""

result = execute_code(code)
print(result)
# Output: {
#   'output': '55\nTime: 0.001s\nMemory: 8192KB',
#   'error': None,
#   'execution_time': 0.001,
#   'memory_used': 8192
# }
```

## 🔐 Security Features

### Code Execution Safety

1. Sandboxed Environments

   - Isolated Docker containers
   - Resource limitations
   - Network restrictions

2. Code Analysis

   ```javascript
   // Forbidden patterns
   const forbidden = [
     "process.env",
     'require("child_process")',
     'import("child_process")',
     "eval",
     "Function",
   ];
   ```

3. Resource Monitoring
   - Real-time memory tracking
   - CPU usage limits
   - Execution timeouts

## 🛠️ Development

### Quick Start

```bash
# Development mode
./setup.sh --dev

# Production mode
./setup.sh

# Scale for multiple users
./setup-per-user.sh user123
```

### Environment Variables

```bash
# Required
VALKEY_STANDALONE_HOST=valkey-standalone
VALKEY_STANDALONE_PORT=6379
VALKEY_CLUSTER_HOST=valkey-cluster

# Optional
LOGGING_ENABLED=false
START_SCRIPT=start:prod
```

### WebSocket Protocol

1. **Code Execution**

   ```javascript
   // Request
   {
     action: 'runCode',
     data: {
       language: 'python|javascript',
       code: string,
       mode: 'standalone|cluster'
     }
   }

   // Response
   {
     action: 'output',
     data: {
       output: string,
       error: string|null,
       executionTime: number,
       memoryUsed: number
     }
   }
   ```

2. **Task Management**

   ```javascript
   // Start tasks
   {
     action: 'startTasks',
     data: { tasks: Task[] }
   }

   // Task completion
   {
     action: 'taskCompleted',
     data: { taskId: string }
   }
   ```

## 📊 Visualizations

### 1. Task Manager

- Distributed lock demonstration
- Queue management visualization
- Real-time task execution

### 2. Leaderboard

- Sorted set operations
- Real-time score updates
- Rank change animations

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
