import express from "express";
import { ExecutorService } from "./services/ExecutorService.js";
import { config } from "./config/index.js";

const app = express();
const executorService = new ExecutorService();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/execute", async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({
      output: null,
      error: "Missing required parameters: language and code",
      executionTime: 0,
    });
  }

  try {
    const runtime = language.toLowerCase();
    if (!config.languages[runtime]) {
      throw new Error(`Unsupported language: ${runtime}`);
    }

    const result = await executorService.executeCode(runtime, code);
    res.json(result);
  } catch (error) {
    console.error("[Execute] Error:", error);
    res.status(500).json({
      output: null,
      error: error.message,
      executionTime: 0,
    });
  }
});

const port = config.port;
app.listen(port, "0.0.0.0", () => {
  console.log(`[Executor] Service running on port ${port}`);
});
