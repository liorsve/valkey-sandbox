export class TestRunner {
    constructor(ws) {
        this.ws = ws;
    }

    async runTests(code, language, tests, terminal) {
        const results = [];
        
        for (const test of tests) {
            // Show test being executed
            terminal?.write(`\nRunning test: ${test.name}\n`);
            
            // Combine setup code, user code, and test code
            const fullCode = this.buildTestCode(code, test, language);
            
            try {
                // Return a promise that resolves when we get the test result
                const result = await new Promise((resolve) => {
                    const messageHandler = (event) => {
                        const response = JSON.parse(event.data);
                        if (response.action === 'output') {
                            // Test execution output
                            terminal?.write(response.data);
                            
                            // Check if the output indicates success
                            const passed = !response.data.includes('AssertionError') && 
                                         !response.data.includes('Error:');
                            
                            resolve({
                                name: test.name,
                                passed,
                                output: response.data
                            });
                            
                            // Remove the message handler
                            this.ws.removeEventListener('message', messageHandler);
                        }
                    };
                    
                    // Add temporary message handler
                    this.ws.addEventListener('message', messageHandler);
                    
                    // Send code for execution
                    this.ws.send(JSON.stringify({
                        action: 'runCode',
                        data: {
                            language,
                            code: fullCode,
                            mode: 'cluster' // Challenges always run in cluster mode
                        }
                    }));
                });
                
                results.push(result);
            } catch (error) {
                results.push({
                    name: test.name,
                    passed: false,
                    error: error.message
                });
            }
        }
        
        return results;
    }

    buildTestCode(userCode, test, language) {
        switch (language) {
            case 'python':
                return `
import asyncio
from valkey_glide import GlideClusterClient

async def setup_client():
    client = await GlideClusterClient.create_client(
        addresses=[{"host": "localhost", "port": 7000}],
        client_name="test-client"
    )
    return client

${test.setup || ''}

${userCode}

async def run_test():
    client = await setup_client()
    try {
        ${test.code}
    finally:
        await client.close()

asyncio.run(run_test())
`;

            case 'javascript':
                return `
const { GlideClusterClient } = require('@valkey/valkey-glide');

async function setupClient() {
    const client = await GlideClusterClient.createClient({
        addresses: [{ host: 'localhost', port: 7000 }],
        clientName: 'test-client'
    });
    return client;
}

${test.setup || ''}

${userCode}

async function runTest() {
    const client = await setupClient();
    try {
        ${test.code}
    } finally {
        await client.close();
    }
}

runTest().catch(console.error);
`;

            case 'java':
                return `
import io.valkey.glide.*;

public class Challenge {
    ${userCode}

    public static void main(String[] args) {
        GlideClient client = GlideClusterClient.builder()
            .addAddress("localhost", 7000)
            .clientName("test-client")
            .build();
            
        try {
            ${test.setup || ''}
            ${test.code}
        } finally {
            client.close();
        }
    }
}
`;

            default:
                throw new Error(`Unsupported language: ${language}`);
        }
    }
}
