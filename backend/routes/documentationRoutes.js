import { Router } from "express";
import DocumentationHandler from "../handlers/DocumentationHandler.js";

const router = Router();

router.get("/docs/search", async (req, res) => {
  try {
    const { query } = req.query;
    const results = await DocumentationHandler.searchDocs(query);
    res.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Search failed" });
  }
});

// Modules routes
router.get("/docs/modules", async (req, res) => {
  try {
    const modules = await DocumentationHandler.getModules();
    res.json({ modules });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch modules" });
  }
});

router.get("/docs/modules/:moduleId", async (req, res) => {
  try {
    const content = await DocumentationHandler.getModuleContent(
      req.params.moduleId
    );
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch module content" });
  }
});

// Clients routes
router.get("/docs/clients", async (req, res) => {
  try {
    const clients = await DocumentationHandler.getClients();
    res.json({ clients });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

// Updated clients routes with hierarchical structure
router.get("/docs/clients/languages", async (req, res) => {
  try {
    const languages = await DocumentationHandler.getClientLanguages();
    res.json({ languages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch client languages" });
  }
});

router.get("/docs/clients/:language", async (req, res) => {
  try {
    const clients = await DocumentationHandler.getLanguageClients(
      req.params.language
    );
    res.json({ clients });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch language clients" });
  }
});

router.get("/docs/clients/:language/:clientId", async (req, res) => {
  try {
    const content = await DocumentationHandler.getClientContent(
      req.params.language,
      req.params.clientId
    );
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch client content" });
  }
});

// Commands routes
router.get("/docs/commands", async (req, res) => {
  try {
    const commands = await DocumentationHandler.getCommands();
    res.json({ commands });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch commands" });
  }
});

router.get("/docs/commands/:commandId", async (req, res) => {
  try {
    const content = await DocumentationHandler.getCommandContent(
      req.params.commandId
    );
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch command content" });
  }
});

// Topics routes
router.get("/docs/topics", async (req, res) => {
  try {
    const topics = await DocumentationHandler.getGeneralConcepts();
    if (!topics) {
      return res.status(404).json({
        error: "No topics found",
        topics: [],
      });
    }
    res.json({ topics });
  } catch (error) {
    console.error("Failed to fetch topics:", error);
    res.status(500).json({
      error: "Failed to fetch topics",
      message: error.message,
      topics: [],
    });
  }
});

export default router;
