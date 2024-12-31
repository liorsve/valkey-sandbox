import axios from "axios";
import fs from "fs/promises";

const TEMP_DIR = "/app/temp";
const EXECUTOR_URL =
  process.env.EXECUTOR_SERVICE_URL || "http://docker-executor:3001";


export class ExecutorService {
  constructor() {
    this.ensureTempDir();
  }

  async ensureTempDir() {
    try {
      await fs.mkdir(TEMP_DIR, { recursive: true });
      await fs.chmod(TEMP_DIR, 0o777);
      console.log("[Executor] Temp directory ready:", TEMP_DIR);
    } catch (error) {
      console.error("[Executor] Failed to create temp directory:", error);
    }
  }

  async executeCode(language, code) {
    try {
      const response = await axios.post(
        `${EXECUTOR_URL}/execute`,
        {
          language,
          code,
        },
        {
          timeout: 30000,
        }
      );

      return response.data;
    } catch (error) {
      console.error("[Executor] Error:", error.message);
      throw new Error(error.response?.data?.error || error.message);
    }
  }
}
