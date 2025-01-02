import clusterClient from "../utils/clusterClient.js";
import { GlideJson } from "@valkey/valkey-glide";
import dotenv from "dotenv";

dotenv.config();

class DocumentationHandler {
  async getClient() {
    return await clusterClient.getClient();
  }

  async getModules() {
    const client = await this.getClient();
    const modules = await GlideJson.objkeys(client, "content:modules");
    return modules;
  }

  async getModuleContent(moduleId) {
    const client = await this.getClient();
    return await GlideJson.get(client, "content:modules", {
      path: `$.${moduleId}`,
    });
  }

  async getClientLanguages() {
    const client = await this.getClient();
    return await GlideJson.objkeys(client, "content:clients");
  }

  async getLanguageClients(language) {
    const client = await this.getClient();
    const clients = await GlideJson.objkeys(
      client,
      `content:clients:${language}`
    );
    return clients;
  }

  async getClientContent(language, clientId) {
    const client = await this.getClient();
    return await GlideJson.get(client, `content:clients:${language}`, {
      path: `$.${clientId}`,
    });
  }

  async getGeneralConcepts() {
    const client = await this.getClient();
    const topics = await GlideJson.objkeys(client, "content:topics");
    const allTopics = await Promise.all(
      topics.map(async (topic) => ({
        id: topic,
        content: await GlideJson.get(client, "content:topics", {
          path: `$.${topic}`,
        }),
      }))
    );
    return allTopics;
  }

  async getCommands() {
    const client = await this.getClient();
    const commands = await GlideJson.objkeys(client, "content:commands");
    return commands;
  }

  async getCommandContent(commandId) {
    const client = await this.getClient();
    return await GlideJson.get(client, "content:commands", {
      path: `$.${commandId}`,
    });
  }
}

export default new DocumentationHandler();
