# Browser-Based IDE Application

## Overview

This application is a browser-based IDE with support for various Valkey clients and execution modes. It features a code editor, terminal output, dynamic code templates, and gamified visualizations for specific use cases.

## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- Docker and Docker Compose installed.

### Frontend Setup

```bash
cd frontend
npm install
npm run serve
```

### Backend Setup

```bash
cd backend
npm install
node server.js
```

### Docker Setup

```bash 
cd backend
cd docker
docker-compose up
```

By creating a custom Docker image with the required Python packages and updating the execution logic, your Python code will execute correctly in the current setup.

### Usage

Access the application at http://localhost:8080.
Select a client and execution mode.
Write or modify code in the editor.
Click the Run button to execute the code.
For gamified use cases, navigate to the relevant tabs and interact with the controls.
