import clusterClient from "../utils/clusterClient.js";
import { GlideJson } from "@valkey/valkey-glide";
import dotenv from "dotenv";

dotenv.config();

class DocumentationHandler {
  constructor() {
    this.initialized = false;
  }

  async ensureInitialized() {
    if (!this.initialized) {
      try {
        this.client = await clusterClient.getClient();
        this.initialized = true;
      } catch (error) {
        console.error("Failed to initialize cluster client:", error);
        throw new Error("Documentation service unavailable");
      }
    }
  }

  async getModules() {
    await this.ensureInitialized();
    try {
      const modules = await GlideJson.objkeys(this.client, "content:modules");
      return modules;
    } catch (error) {
      console.error("Failed to fetch modules:", error);
      throw error;
    }
  }

  async getModuleContent(moduleId) {
    await this.ensureInitialized();
    try {
      return await GlideJson.get(this.client, "content:modules", {
        path: `$.${moduleId}`,
      });
    } catch (error) {
      console.error("Failed to fetch module content:", error);
      throw error;
    }
  }

  async getClientLanguages() {
    await this.ensureInitialized();
    try {
      return await GlideJson.objkeys(this.client, "content:clients");
    } catch (error) {
      console.error("Failed to fetch client languages:", error);
      throw error;
    }
  }

  async getLanguageClients(language) {
    await this.ensureInitialized();
    try {
      const clients = await GlideJson.objkeys(
        this.client,
        `content:clients:${language}`
      );
      return clients;
    } catch (error) {
      console.error("Failed to fetch language clients:", error);
      throw error;
    }
  }

  async getClientContent(language, clientId) {
    await this.ensureInitialized();
    try {
      return await GlideJson.get(this.client, `content:clients:${language}`, {
        path: `$.${clientId}`,
      });
    } catch (error) {
      console.error("Failed to fetch client content:", error);
      throw error;
    }
  }

  async getGeneralConcepts() {
    try {
      await this.ensureInitialized();

      const topics = await GlideJson.objkeys(this.client, "content:topics");
      if (!topics || !topics.length) {
        console.warn("No topics found, returning defaults");
        return this.getDefaultGeneralConcepts();
      }

      const allTopics = await Promise.all(
        topics.map(async (topic) => {
          try {
            const content = await GlideJson.get(this.client, "content:topics", {
              path: `$.${topic}`,
            });
            return { id: topic, content };
          } catch (err) {
            console.error(`Failed to fetch topic ${topic}:`, err);
            return null;
          }
        })
      );

      const validTopics = allTopics.filter(Boolean);
      return validTopics.length
        ? validTopics
        : this.getDefaultGeneralConcepts();
    } catch (error) {
      console.error("Failed to fetch topics:", error);
      return this.getDefaultGeneralConcepts();
    }
  }

  getDefaultGeneralConcepts() {
    return [
      {
        id: "introduction",
        title: "Introduction to Valkey",
        content: `# Welcome to Valkey

## Overview
Valkey is a modern distributed key-value store designed for high performance and scalability.

### Key Features
- Distributed Architecture
- High Availability
- Horizontal Scaling
- Rich Data Structures
- Multi-Language Client Support
- Enterprise-Grade Security

## Quick Start
Get started with Valkey in minutes using our quick installation guide.`,
      },
      {
        id: "data-types",
        title: "Data Types",
        content: `# Valkey Data Types

## Core Data Structures
- Strings: Basic key-value storage
- Lists: Ordered collections
- Sets: Unique element collections
- Hashes: Field-value pairs
- Sorted Sets: Scored element collections
- Bitmaps: Bit-level operations
- HyperLogLog: Probabilistic counting
- Streams: Log-like data structures

## Use Cases
Learn how to effectively use each data type for your specific needs.`,
      },
      {
        id: "cluster",
        title: "Clustering",
        content: `# Valkey Clustering

## High Availability
- Automatic failover
- Master-replica replication
- Cluster sharding
- Data persistence

## Management
- Node management
- Scaling operations
- Monitoring
- Performance tuning`,
      },
      {
        id: "security",
        title: "Security",
        content: `# Security Features

## Core Security
- Access Control Lists (ACL)
- SSL/TLS Encryption
- Authentication
- Authorization

## Best Practices
- Security configurations
- Network security
- Data protection
- Compliance considerations`,
      },
      {
        id: "clients",
        title: "Client Libraries",
        content: `# Valkey Client Libraries

## Official Clients
- Node.js
- Python
- Java
- Go (Coming Soon)

## Features
- Connection pooling
- Auto-reconnection
- Transaction support
- Cluster awareness`,
      },
      {
        id: "performance",
        title: "Performance",
        content: `# Performance Optimization

## Key Areas
- Memory optimization
- CPU utilization
- Network latency
- Command pipelining

## Monitoring
- Latency monitoring
- Memory analysis
- Performance metrics
- Debugging tools`,
      },
    ];
  }

  async getCommands() {
    await this.ensureInitialized();
    try {
      const commands = await GlideJson.objkeys(this.client, "content:commands");
      return commands;
    } catch (error) {
      console.error("Failed to fetch commands:", error);
      throw error;
    }
  }

  async getCommandContent(commandId) {
    await this.ensureInitialized();
    try {
      return await GlideJson.get(this.client, "content:commands", {
        path: `$.${commandId}`,
      });
    } catch (error) {
      console.error("Failed to fetch command content:", error);
      throw error;
    }
  }
}

export default new DocumentationHandler();
