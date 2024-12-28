import path from "path";

export const config = {
  port: process.env.PORT || 3001,
  tempDir: "/tmp/executions",
  execution: {
    timeout: 30000,
  },
  languages: {
    javascript: {
      command: "node",
      extension: ".js",
    },
    python: {
      command: "python",
      extension: ".py",
    },
  },
  nodeEnv: {
    modulesPath: path.resolve(process.cwd(), "environments/node/node_modules"),
  },
};
