# ValKey Sandbox

An interactive development environment for exploring [ValKey](https://valkey.io/) features and [ValKey-Glide](https://github.com/valkey-io/valkey-glide) client implementations along with various other main valkey clients.

## 🚀 Features

- Interactive code editor with syntax highlighting
- Real-time terminal output
- Multiple execution modes (Standalone/Cluster)
- Built-in code templates
- WebSocket-based real-time updates
- Integrated Python and Node.js execution environments
- Example implementations:
  - Session Cache Management
  - Recommendation Engine
  - Real-time Leaderboard
  - **Gamified Watch-in-Action Features**
    - Leaderboard
    - Task Manager

## 🎮 Gamified Watch-in-Action

Experience ValKey's capabilities through interactive gamified features:

- **Leaderboard**: A dynamic leaderboard showcasing real-time data updates, player rankings, and score changes.
- **Task Manager**: Visualize and manage task queues, learn about task scheduling, and observe task execution in real-time.

## 🛠️ Prerequisites

- Docker and Docker Compose
- Node.js (v14 or higher)
- npm or yarn

## 🏃‍♂️ Quick Start

1. Clone and setup:
```bash
git clone https://github.com/yourusername/valkey-sandbox.git
cd valkey-sandbox
chmod +x setup.sh
./setup.sh --dev  # For development mode
# or
./setup.sh        # For production mode
```

2. Access the sandbox at `http://localhost:8080`

3. Run tests:
WIP

## 💡 Contributing

We welcome contributions! Here are some areas where you can help:

### Priority Areas
1. Test Coverage
   - Implement unit tests for backend services
   - Add frontend component tests
   - Create integration tests
   - Add E2E testing setup

2. Documentation
   - API documentation
   - Usage examples
   - Tutorial content

3. Features
   - Additional code templates
   - More ValKey-Glide examples
   - Performance monitoring
   - Support for multiple ValKey versions

4. UI/UX Improvements
   - Theme customization
   - Mobile responsiveness
   - Accessibility enhancements

### How to Contribute
1. Check existing issues or create a new one
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

See [DEVELOPER.md](DEVELOPER.md) for technical details.

## 🔗 Related Projects

- [ValKey](https://valkey.io/) - High-performance in-memory database
- [ValKey-Glide](https://github.com/valkey-io/valkey-glide) - Official client library

## 🔧 Configuration

Environment variables can be configured in:
- Frontend: `/frontend/.env`
- Backend: Docker environment settings

## 📚 Documentation

For detailed documentation and contribution guidelines, see [DEVELOPER.md](DEVELOPER.md)

## 🤝 Support

For issues and feature requests, please use the GitHub issue tracker.

## 📜 License

This project is licensed under the Apache License 2.0.

Both this project and ValKey-Glide are licensed under the Apache License 2.0. ValKey has its own licensing terms.

For more details, see the [LICENSE](LICENSE) file.

### Third-Party Licenses

This project uses ValKey-Glide under the Apache License 2.0:

```
Copyright 2024 ValKey IO

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

For all other dependencies, please see their respective license files in the node_modules directory.
