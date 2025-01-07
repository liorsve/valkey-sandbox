# 🚀 Valkey Sandbox

> 🤓 Where state-of-the-art key-value storage meet rubber ducks!

Welcome to the Valkey Sandbox - your interactive playground for exploring distributed computing meets the joy of coding! Grab your favorite caffeinated beverage ☕, put on your debugging hat 🎩, and let's dive into some key-value store fun!

Valkey Sandbox is your gateway to effortlessly exploring Valkey's power with various Valkey clients.  
No setup, no orchestration—just sit, start, and experience a fully functional app in seconds.  
With an easy-to-use IDE, customizable infrastructure, and support for multiple clients like GLIDE across various programming languages, it delivers a practical, hands-on Valkey experience.  
All the common use cases, simple or complex, are at your fingertips.  
Dive in, choose what to build, and discover how GLIDE simplifies Valkey workflows. Modern, intuitive, and ready to go.

## 🚀 Features

- **Interactive Code Editor**: Syntax-highlighted code editor with real-time validation.
- **Real-time Terminal Output**: View output from your code executions instantly.
- **Multiple Execution Modes**: Switch between Standalone and Cluster modes effortlessly.
- **Built-in Code Templates**: Start quickly with ready example implementations such as:
  - Queue Management
  - Session Cache
  - Recommendation System
  - And more.
- **WebSocket-based Real-time Updates**: Experience seamless data updates without page refreshes.
- **Integrated Execution Environments**: Run Python and Node.js code directly in the browser, with Java and Go support coming soon.
- **Gamified Watch-in-Action Features**:
  - **Leaderboard**: Dynamic leaderboard showcasing real-time data updates, player rankings, and score changes.
  - **Task Manager**: Visualize and manage task queues, learn about task scheduling, and observe task execution in real-time.
- **Resources**: Access a wealth of valuable materials, including documentation, tutorials, blogs, FAQs, deployment guides, sessions, and more to deepen your understanding of Valkey and Glide.
- **Challenge Yourself**: Try some coding challenges to discover new features, and unleash the full potential of Valkey and valkey clients.

## 🦆 Why Valkey Sandbox?

- **Zero to Hero**: No setup headaches - we handled the boring stuff!
- **It Just Works™**: Because life's too short for configuration files
- **Actual Magic**: Not really, just very good engineering (but we won't tell if you don't)
- **Open Source Power**: Built by geeks, for geeks, with <3

## 🎮 Gamified Watch-in-Action

Experience Valkey's capabilities through interactive gamified features that not only showcase but actually execute real Glide code, demonstrating Valkey's abilities in an engaging and enjoyable way:

- **Leaderboard**: Observe Valkey handling real-time data updates and ranking computations powered by live code execution.
- **Task Manager**: Visualize and interact with task scheduling and execution using Valkey's queue management, seeing firsthand how the underlying code operates.

## 🎯 Challenge Yourself - In Progress
Coding challenges are a fun way to explore new features and unleash the full potential of Valkey and Glide.

## 🛠️ Prerequisites for running locally

- **Docker and Docker Compose**
- **Node.js** (v14 or higher)
- **npm** or **yarn**

## 🏃‍♂️ Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/avifenesh/valkey-sandbox.git
   cd valkey-sandbox
   ```
2. **Set up the environment**:

   ```bash
   chmod +x setup.sh
   ./setup.sh --dev  # For development mode
   # or
   ./setup.sh        # For production mode
   ```

   - To clean up running processes:
     ```bash
     ./setup.sh --cleanup
     ```

3. **Access the sandbox**:
   - Open your browser and navigate to `http://localhost:3000`.

With just one click, you'll have a fully orchestrated, functioning application ready to use.

## 💡 Contributing

We welcome contributions! Here are some areas where you can help:

### Priority Areas

1. **Test Coverage**

   - Implement unit tests for backend services.
   - Add frontend component tests.
   - Create integration tests.
   - Add E2E testing setup.

2. **Documentation**

   - API documentation.
   - Usage examples.
   - Tutorial content.

3. **Features**

   - Additional code templates.
   - More Valkey-Glide examples.
   - Performance monitoring.
   - Support for multiple Valkey versions.

4. **UI/UX Improvements**
   - Theme customization.
   - Mobile responsiveness.
   - Accessibility enhancements.

### How to Contribute

1. **Check existing issues** or **create a new one**.
2. **Fork the repository**.
3. **Create a feature branch**.
4. **Submit a pull request**.

See [DEVELOPER.md](DEVELOPER.md) for technical details.

## 🔗 Related Projects

- [Valkey](https://valkey.io/) - High-performance in-memory database.
- [Valkey-Glide](https://github.com/valkey-io/valkey-glide) - Official client library.

## 📚 Documentation

For detailed documentation and contribution guidelines, see [DEVELOPER.md](DEVELOPER.md).

## 🤝 Support

For issues and feature requests, please use the GitHub issue tracker.

## 📜 License

This project is licensed under the Apache License 2.0. For more details, see the [LICENSE](LICENSE) file.

This project uses [Valkey-Glide](https://github.com/valkey-io/valkey-glide/blob/main/LICENSE) under the Apache License 2.0.

For all other dependencies, please see their respective license files in the `node_modules` directory.
