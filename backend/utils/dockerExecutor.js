import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory path for ES modules
const __filename = fileURLToPath(import.meta.url);
const currentDir = path.dirname(__filename);
const tempDir = path.join(currentDir, 'temp');

// Ensure temp directory exists
await fs.mkdir(tempDir, { recursive: true }).catch(() => {});

const executionMode = process.env.EXECUTION_MODE || 'standalone';

async function executeCode(language, code, mode = 'standalone', callback) {
    try {
        const execMode = (mode || executionMode).toLowerCase();
        const isCluster = execMode === 'cluster';
        const host = isCluster ? '127.0.0.1' : '127.0.0.1';
        const port = isCluster ? 7000 : 6379;

        const fileId = Date.now();
        const fileExtension = language === 'python' ? 'py' : 'js';
        const fileName = `code_${fileId}.${fileExtension}`;
        const tempFile = path.join(tempDir, fileName);

        const dockerMappings = {
            'python': {
                image: 'python-executor',
                buildCommand: (codeFile) => `python3 /app/temp/${codeFile}`
            },
            'javascript': {
                image: 'node:latest',
                buildCommand: (codeFile) => `node "/app/temp/${codeFile}"`
            }
        };

        const mapping = dockerMappings[language.toLowerCase()];
        if (!mapping) {
            callback(`Unsupported language: ${language}`);
            return;
        }

        await fs.writeFile(tempFile, code);

        const containerName = `executor_${Date.now()}`;
        const command = mapping.buildCommand(fileName);

        let dockerRunCmd;

        if (language.toLowerCase() === 'javascript') {
            dockerRunCmd = `docker run --rm --name ${containerName} \
      -v ${tempDir}:/app/temp \
      -v ${path.resolve(process.cwd(), 'node_modules')}:/app/temp/node_modules \
      -w /app/temp \
      -e VALKEY_HOST=${host} \
      -e VALKEY_PORT=${port} \
      -e VALKEY_CLUSTER_HOST=${host} \
      -e VALKEY_CLUSTER_PORT=${port} \
      -e NODE_PATH=/app/temp/node_modules \
      --network=host \
      ${mapping.image} ${command}`;
        } else if (language.toLowerCase() === 'python') {
            dockerRunCmd = `docker run --rm --name ${containerName} \
      -v ${tempDir}:/app/temp \
      -w /app/temp \
      -e VALKEY_HOST=${host} \
      -e VALKEY_PORT=${port} \
      -e VALKEY_CLUSTER_HOST=${host} \
      -e VALKEY_CLUSTER_PORT=${port} \
      --network=host \
      ${mapping.image} ${command}`;
        }

        exec(dockerRunCmd, async (error, stdout, stderr) => {
            if (error) {
                callback(`Error: ${stderr}`);
                return;
            }
            callback(stdout);

            // Check if the container exists before attempting to remove it
            exec(`docker ps -a -q -f name=${containerName}`, (err, containerId) => {
                if (err) {
                    console.error(`Error checking container ${containerName}:`, err);
                    return;
                }
                if (containerId.trim()) {
                    // Clean up container
                    exec(`docker rm ${containerName}`, (err) => {
                        if (err) {
                            console.error(`Error removing container ${containerName}:`, err);
                        } else {
                            console.log(`Container ${containerName} removed.`);
                        }
                    });
                } else {
                    console.log(`Container ${containerName} does not exist.`);
                }
            });

            // Delete the temporary code file after sending the response
            fs.unlink(tempFile, (err) => {
                if (err) {
                    console.error(`Error deleting temporary file ${tempFile}:`, err);
                } else {
                    console.log(`Temporary file ${tempFile} deleted.`);
                }
            });
        });
    } catch (error) {
        callback(`Error executing code: ${error.message}`);
        try {
            await fs.unlink(tempFile);
        } catch {} // Ignore cleanup errors
    }
}

export default executeCode;
