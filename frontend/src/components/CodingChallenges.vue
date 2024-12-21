<template>
    <div class="coding-challenges">
        <div class="challenge-sidebar">
            <ul class="challenge-list">
                <li v-for="challenge in challenges" :key="challenge.id" @click="selectChallenge(challenge)"
                    :class="{ active: challenge.id === selectedChallenge?.id }">
                    {{ challenge.title }}
                </li>
            </ul>
            <div v-if="selectedChallenge" class="challenge-info">
                <h3>{{ selectedChallenge.title }}</h3>
                <div v-if="selectedChallenge.description" class="markdown" v-text="sanitizedDescription"></div>
                <div class="language-select">
                    <label for="glide-client">Glide Client:</label>
                    <select id="glide-client" v-model="selectedLanguage" @change="updateLanguage">
                        <option v-for="client in glideClients" :key="client.value" :value="client.value">
                            {{ client.label }}
                        </option>
                    </select>
                </div>
                <button @click="runTests" class="run-tests-btn">Run Tests</button>
                <div v-if="feedback" class="feedback">{{ feedback }}</div>
            </div>
        </div>

        <div class="challenge-workspace">
            <div class="editor-terminal">
                <CodeEditor v-model:modelValue="userCode" :default-language="selectedLanguage" class="challenge-editor"
                    :key="`editor-${selectedChallenge?.id}`" />
                <AppTerminal ref="terminal" class="challenge-terminal" :key="`terminal-${selectedChallenge?.id}`" />
            </div>

            <div v-if="testResults.length" class="test-results">
                <div v-for="(result, index) in testResults" :key="index" :class="['test-result', result.status]">
                    <div class="test-header">
                        <span>{{ result.name }}</span>
                        <span class="status">{{ result.status }}</span>
                    </div>
                    <pre v-if="result.details" class="test-details">{{ result.details }}</pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CodeEditor from '@/components/Editor.vue';
import AppTerminal from '@/components/AppTerminal.vue';
import { TestRunner } from '../services/testRunner';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default {
    name: 'CodingChallenges',
    components: { CodeEditor, AppTerminal },
    props: {
        ws: {
            type: WebSocket,
            required: true,
            validator: function (value) {
                return value instanceof WebSocket;
            }
        },
        isConnected: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            challenges: [
                {
                    id: 1,
                    title: 'Unique Visitor Counter',
                    description: `
Implement a system to count the number of unique visitors using Valkey Sets.

**Objective**:
- Every time a user visits the site, add their user ID to a set.
- Implement a function to return the total number of unique visitors.

**Requirements**:
- Use the appropriate Valkey data structure.
- The system should handle concurrent access.

**Example**:
\`\`\`python
# Expected Valkey commands:
client.sadd("unique_visitors", user_id)
total_visitors = client.scard("unique_visitors")
\`\`\`
`,
                    starterCode: {
                        python: `async def unique_visitor_counter(client, visitor_id):
    return await client.sadd("unique_visitors", visitor_id)

async def get_visitor_count(client):
    return await client.scard("unique_visitors")`,
                        javascript: `async function uniqueVisitorCounter(client, visitorId) {
    return await client.sadd("unique_visitors", visitorId);
}

async function getVisitorCount(client) {
    return await client.scard("unique_visitors");
}`,
                        java: `public class VisitorCounter {
    public void addVisitor(GlideClient client, String visitorId) {
        client.sadd("unique_visitors", visitorId);
    }
    
    public int getVisitorCount(GlideClient client) {
        return client.scard("unique_visitors");
    }
}`
                    },
                    tests: {
                        // ...existing tests...
                    },
                    hints: [
                        "Use SADD to add visitors - it automatically handles duplicates",
                        "SCARD returns the total number of unique elements",
                        "Consider periodic cleanup of old visitor data"
                    ]
                },
                {
                    id: 2,
                    title: 'Recent Events Counter',
                    description: `
Implement a counter that tracks events occurring within the last 60 seconds using Valkey Sorted Sets.

**Objective**:
- Each event has a timestamp.
- Store events in a way that allows querying events within the last 60 seconds.
- Implement a function to return the count of recent events.

**Requirements**:
- Use Valkey's sorted sets to store events with timestamps.
- Ensure old events are cleaned up to prevent memory overflow.

**Example**:
\`\`\`python
# Add event with current timestamp
client.zadd("events", { event_id: current_timestamp })
# Remove events older than 60 seconds
client.zremrangebyscore("events", 0, current_timestamp - 60)
\`\`\`
`,
                    // ...additional challenge data...
                },
                // ...other challenges...
            ],
            selectedChallenge: null,
            userCode: '',
            feedback: '',
            selectedLanguage: 'python',
            glideClients: [
                { label: 'Glide - Python', value: 'python' },
                { label: 'Glide - JavaScript', value: 'javascript' },
                { label: 'Glide - Java', value: 'java' },
            ],
            showHints: false,
            testResults: [],
        };
    },
    computed: {
        formatDescription() {
            if (!this.selectedChallenge) return '';
            return marked(this.selectedChallenge.description);
        },
        sanitizedDescription() {
            if (!this.formatDescription) return '';
            return DOMPurify.sanitize(this.formatDescription);
        }
    },
    methods: {
        selectChallenge(challenge) {
            this.selectedChallenge = challenge;
            this.userCode = challenge.starterCode[this.selectedLanguage] || '';
            this.feedback = '';
            this.testResults = [];

            // Let the component fully mount before showing welcome message
            this.$nextTick(() => {
                if (this.$refs.terminal) {
                    this.$refs.terminal.clear();
                    this.$refs.terminal.writeWelcomeMessage('challenges');
                }
            });
        },
        updateLanguage() {
            if (this.selectedChallenge) {
                this.userCode = this.selectedChallenge.starterCode[this.selectedLanguage] || '';
            }
            this.testResults = [];
        },
        async runTests() {
            if (!this.selectedChallenge || !this.userCode) {
                this.feedback = 'Please select a challenge and write some code first';
                return;
            }

            this.feedback = 'Running tests...';
            this.testResults = [];

            try {
                const testRunner = new TestRunner(this.ws);
                const tests = this.selectedChallenge.tests[this.selectedLanguage];

                if (!tests) {
                    this.feedback = `Tests not available for ${this.selectedLanguage}`;
                    return;
                }

                const results = await testRunner.runTests(
                    this.userCode,
                    this.selectedLanguage,
                    tests,
                    this.$refs.terminal
                );

                this.testResults = results;
                const allPassed = results.every(r => r.passed);

                if (allPassed) {
                    this.feedback = `All tests passed! You earned ${this.selectedChallenge.points} points!`;
                    this.$emit('challenge-completed', {
                        id: this.selectedChallenge.id,
                        points: this.selectedChallenge.points
                    });
                } else {
                    this.feedback = 'Some tests failed. Check the results below.';
                }
            } catch (error) {
                this.feedback = `Error running tests: ${error.message}`;
                console.error('Test execution error:', error);
            }
        },
        toggleHints() {
            this.showHints = !this.showHints;
        },
    },

    beforeRouteUpdate(to, from, next) {
        // Handle cleanup before route changes
        if (this.$refs.terminal) {
            this.$refs.terminal.clear();
        }
        next();
    },

    activated() {
        // Handle keep-alive activation
        if (this.$refs.terminal) {
            this.$refs.terminal.writeWelcomeMessage('challenges');
        }
    },

    updated() {
        // Handle component updates
        if (this.$refs.terminal) {
            this.$refs.terminal.writeWelcomeMessage('challenges');
        }
    },
    beforeUnmount() {
        // Ensure proper cleanup
        if (this.$refs.terminal) {
            this.$refs.terminal.clear();
        }
    },
    deactivated() {
        // Handle keep-alive deactivation
        if (this.$refs.terminal) {
            this.$refs.terminal.clear();
        }
    }
};
</script>

<style scoped>
.coding-challenges {
    display: flex;
    height: 100%;
    background: #1e1e1e;
    gap: 20px;
    padding: 20px;
}

.challenge-sidebar {
    width: 300px;
    flex-shrink: 0;
    overflow-y: auto;
    background: #252525;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.challenge-workspace {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 20px;
}

.editor-terminal {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    background: #252525;
    border-radius: 8px;
    overflow: hidden;
}

.challenge-editor {
    flex: 1;
    min-height: 0;
}

.challenge-terminal {
    height: 250px;
    /* Fixed height instead of flex */
    flex-shrink: 0;
    border-top: 1px solid #333;
}

.test-results {
    height: 200px;
    overflow-y: auto;
    background: #252525;
    border-radius: 8px;
    padding: 20px;
}
</style>
