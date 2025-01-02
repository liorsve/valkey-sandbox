import { marked } from "marked";

class DocumentationService {
  constructor() {
    this.API_BASE = "/api";
  }

  async fetchContent(path) {
    try {
      const response = await fetch(`${this.API_BASE}/docs${path}`);
      if (!response.ok) throw new Error(`Failed to fetch ${path}`);

      const { content } = await response.json();
      return marked(content);
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
    const response = await fetch(`${this.API_BASE}/docs/topics`);
    const { topics } = await response.json();
    return topics;
  }

  async getClientDocs() {
    const files = await this.fetchDirectory("/clients");
    return Promise.all(
      files.map(async (file) => {
        const content = await this.fetchContent(`/clients/${file.name}`);
        return {
          id: file.name.replace(".md", ""),
          title: file.name.replace(".md", ""),
          content,
        };
      })
    );
  }

  async getModuleDocs() {
    return this.fetchContent("/modules/community/github.com/README.md");
  }

  async getGlideDocs() {
    try {
      const response = await fetch(`/api/docs/glide/README.md`);
      if (!response.ok) throw new Error("Failed to fetch Glide docs");

      const data = await response.json();
      return data.content; // Assuming backend returns { content: '...' }
    } catch (error) {
      console.error("Failed to load Glide docs:", error);
      throw error;
    }
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
    const response = await fetch(`${this.API_BASE}/docs/commands`);
    const { commands } = await response.json();
    return commands;
  }

  async getCommandContent(commandId) {
    const response = await fetch(`${this.API_BASE}/docs/commands/${commandId}`);
    const { content } = await response.json();
    return content;
  }

  async getClientLanguages() {
    const response = await fetch(`${this.API_BASE}/docs/clients/languages`);
    const { languages } = await response.json();
    return languages;
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
