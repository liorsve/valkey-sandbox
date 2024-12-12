# Developer Guide

## 🏗️ Architecture

### Components
- Frontend (Vue.js)
- Backend (Node.js)
- ValKey Standalone Instance
- ValKey Cluster
- Python Executor Service
- Node.js Executor Service

### Network Architecture
```
[Frontend (8080)] → [Backend (3000)] → [ValKey Standalone (6379)]
                                    → [ValKey Cluster (7000-7005)]
                                    → [Python Executor (3002)]
                                    → [Node.js Executor (3001)]
```

## 🔧 Development Setup

### Using Setup Script

The `setup.sh` script provides two modes:
```bash
./setup.sh --dev   # Development mode with hot-reloading
./setup.sh         # Production mode
./setup.sh --cleanup  # Clean up all running processes
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
   - ValKey cluster management UI
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

### ValKey Integration
- Standalone mode: Direct connection
- Cluster mode: Managed through proxy

## 🔍 Debugging

- Frontend: Vue DevTools
- Backend: Node.js Inspector
- Docker: Container logs

## 🧪 Testing (Planned)

### Test Structure
```
tests/
├── unit/
│   ├── frontend/
│   └── backend/
├── integration/
└── e2e/
```

### Test Stack (To Be Implemented)
- Jest
- Vue Test Utils
- Cypress
- Supertest
