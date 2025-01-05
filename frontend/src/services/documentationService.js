import { renderMarkdown } from "@/utils/markdownRenderer";

class DocumentationService {
  constructor() {
    this.API_BASE = "http://localhost:3000/api";
  }

  async validateResponse(response, context) {
    if (!response.ok) {
      throw new Error(
        `API Error (${response.status}): Failed to fetch ${context}`
      );
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Invalid response type for ${context}`);
    }

    const text = await response.text();
    if (!text) {
      throw new Error(`Empty response for ${context}`);
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      console.error(`JSON parse error for ${context}:`, text);
      throw new Error(`Invalid JSON response for ${context}`);
    }
  }

  async fetchContent(path) {
    try {
      const response = await fetch(`${this.API_BASE}/docs${path}`);
      if (!response.ok) throw new Error(`Failed to fetch ${path}`);

      const { content } = await response.json();
      return renderMarkdown(content);
    } catch (error) {
      console.error("Documentation fetch error:", error);
      throw error;
    }
  }

  async searchDocs(query) {
    if (!query || query.length < 2) return [];

    try {
      const response = await fetch(
        `${this.API_BASE}/docs/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Search failed");

      const { results } = await response.json();
      return results;
    } catch (error) {
      console.error("Search error:", error);
      return [];
    }
  }

  async getGeneralConcepts() {
    try {
      const response = await fetch(`${this.API_BASE}/docs/topics`);
      console.log("Topics response:", response); // Debug logging
      const data = await this.validateResponse(response, "topics");

      if (!data.topics || !Array.isArray(data.topics)) {
        return this.getDefaultGeneralConcepts();
      }

      return data.topics;
    } catch (error) {
      console.error("Topics fetch error:", error);
      throw error;
    }
  }

  getDefaultGeneralConcepts() {
    return [
      {
        id: "intro",
        title: "Introduction to Valkey",
        content: `# Introduction to Valkey
        
Valkey is a modern distributed key-value store system designed for high performance and scalability.

## Key Features

- Distributed Architecture
- High Availability
- Horizontal Scaling
- Rich Data Structures
- Multi-Language Support`,
      },
      {
        id: "architecture",
        title: "System Architecture",
        content: `# Valkey Architecture

## Core Components

- Distributed Storage Engine
- Replication Manager
- Client Protocol Handler
- Command Processor`,
      },
    ];
  }

  async getClientDocs() {
    const files = await this.fetchDirectory("/clients");
    return Promise.all(
      files.map(async (file) => {
        const rawContent = await this.fetchContent(`/clients/${file.name}`);
        return {
          id: file.name.replace(".md", ""),
          title: file.name.replace(".md", ""),
          content: renderMarkdown(rawContent),
        };
      })
    );
  }

  async getModuleDocs() {
    const rawContent = await this.fetchContent(
      "/modules/community/github.com/README.md"
    );
    return renderMarkdown(rawContent);
  }

  async getRenderedGlideDocs() {
    try {
      const response = await fetch("/docs/GLIDE_DOCS.md");
      if (!response.ok) throw new Error("Failed to load Glide docs");

      const text = await response.text();
      return text ? renderMarkdown(text) : this.getDefaultGlideDocs();
    } catch (error) {
      console.warn("Failed to load Glide docs, using default:", error);
      return this.getDefaultGlideDocs();
    }
  }

  getDefaultGlideDocs() {
    return renderMarkdown(`# Valkey Glide Documentation

## Overview

Valkey Glide is the official client library interface for Valkey.

## Features

- Simple API
- Type Safety
- Connection Pooling
- Automatic Reconnection
- Transaction Support`);
  }

  async getModules() {
    const response = await fetch(`${this.API_BASE}/docs/modules`);
    const { modules } = await response.json();
    return modules;
  }

  async getModuleContent(moduleId) {
    const response = await fetch(`${this.API_BASE}/docs/modules/${moduleId}`);
    const { content } = await response.json();
    return content;
  }

  async getClients() {
    const response = await fetch(`${this.API_BASE}/docs/clients`);
    const { clients } = await response.json();
    return clients;
  }

  async getCommands() {
    try {
      const response = await fetch(`${this.API_BASE}/docs/commands`);
      console.log("Commands response:", response);
      const data = await this.validateResponse(response, "commands");
      return data.commands;
    } catch (error) {
      console.error("Commands fetch error:", error);
      throw error;
    }
  }

  getDefaultCommands() {
    return [
      {
        name: "GET",
        category: "Strings",
        description: "Get the value of a key",
        syntax: "GET key",
        examples: ["GET mykey"],
      },
      {
        name: "SET",
        category: "Strings",
        description: "Set the string value of a key",
        syntax: "SET key value [EX seconds] [NX|XX]",
        examples: ["SET mykey value"],
      },
    ];
  }

  async getCommandContent(commandId) {
    const response = await fetch(`${this.API_BASE}/docs/commands/${commandId}`);
    const { content } = await response.json();
    return content;
  }

  async getClientLanguages() {
    try {
      const response = await fetch(`${this.API_BASE}/docs/clients/languages`);
      const data = await this.validateResponse(response, "languages");
      return data.languages || [];
    } catch (error) {
      console.error("Failed to fetch languages:", error);
      return ["javascript", "python"];
    }
  }

  async getLanguageClients(language) {
    const response = await fetch(`${this.API_BASE}/docs/clients/${language}`);
    const { clients } = await response.json();
    return clients;
  }

  async getClientContent(language, clientId) {
    const response = await fetch(
      `${this.API_BASE}/docs/clients/${language}/${clientId}`
    );
    const { content } = await response.json();
    return content;
  }
}

export default new DocumentationService();
