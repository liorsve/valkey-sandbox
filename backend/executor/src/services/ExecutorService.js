import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";
import { config } from "../config/index.js";

const execAsync = promisify(exec);

export class ExecutorService {
  constructor() {
    this.ensureTempDir();
  }

  languageConfig = {
    javascript: {
      extension: ".js",
      command:
        process.env.NODE_ENV === "development" ? "node" : "/usr/local/bin/node",
    },
    python: {
      extension: ".py",
      command: "/environments/python/venv/bin/python3.11",
    },
  };

  async ensureTempDir() {
    try {
      await fs.mkdir(config.tempDir, { recursive: true });
      // Ensure node_modules symlink exists
      const nodeModulesPath = path.join(config.tempDir, "node_modules");
      try {
        await fs.access(nodeModulesPath);
      } catch {
        await fs.symlink(config.nodeEnv.modulesPath, nodeModulesPath, "dir");
      }
    } catch (error) {
      console.error("Failed to setup execution environment:", error);
    }
  }

  async createTempFile(code, language) {
    const langConfig = this.languageConfig[language];

    const fileName = `execution_${Date.now()}${langConfig.extension}`;
    const filePath = path.join(config.tempDir, fileName);
    await fs.writeFile(filePath, code);
    return filePath;
  }

  async executeCode(language, code) {
    const langConfig = this.languageConfig[language];
    if (!langConfig) {
      throw new Error(`Unsupported language: ${language}`);
    }

    let filePath;
    try {
      filePath = await this.createTempFile(code, language);
      const startTime = Date.now();

      const execOptions = {
        timeout: config.execution.timeout,
        env: {
          ...process.env,
          PYTHONPATH: "/environments/python/venv/lib/python3.11/site-packages",
          NODE_PATH: "/environments/node/node_modules",
          PATH:
            "/environments/python/venv/bin:/usr/local/bin:/usr/bin:" +
            process.env.PATH,
        },
        cwd: config.tempDir,
      };

      const { stdout, stderr } = await execAsync(
        `${langConfig.command} ${filePath}`,
        execOptions
      );

      return {
        output: stdout,
        error: stderr || null,
        executionTime: Date.now() - startTime,
      };
    } catch (error) {
      const errorMessage = error.stderr || error.message;
      throw new Error(`Execution failed: ${errorMessage}`);
    } finally {
      if (filePath) {
        try {
          await fs.unlink(filePath);
        } catch (error) {
          console.error("Failed to cleanup temp file:", error);
        }
      }
    }
  }
}
