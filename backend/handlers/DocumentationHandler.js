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
    await this.ensureInitialized();
    try {
      const topics = await GlideJson.objkeys(this.client, "content:topics");
      const allTopics = await Promise.all(
        topics.map(async (topic) => ({
          id: topic,
          content: await GlideJson.get(this.client, "content:topics", {
            path: `$.${topic}`,
          }),
        }))
      );
      return allTopics;
    } catch (error) {
      console.error("Failed to fetch topics:", error);
      throw error;
    }
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
