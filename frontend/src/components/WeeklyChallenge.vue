<template>
    <div class="weekly-challenge">
        <div class="left-panel">
            <h2>Weekly Challenge</h2>
            <h3>{{ challenge.title }}</h3>
            <p>{{ challenge.description }}</p>
            <div class="language-select">
                <label for="glide-client">Glide Client:</label>
                <select id="glide-client" v-model="selectedLanguage" @change="updateLanguage">
                    <option v-for="client in glideClients" :key="client.value" :value="client.value">
                        {{ client.label }}
                    </option>
                </select>
            </div>
            <button @click="submitCode">Submit</button>
            <div v-if="feedback">
                <p>{{ feedback }}</p>
            </div>
        </div>
        <div class="right-panel">
            <CodeEditor v-model:modelValue="userCode" :default-language="selectedLanguage" />
            <AppTerminal ref="terminal" />
        </div>
        <div class="deadline-info">
            <h4>Challenge Deadline</h4>
            <p>{{ countdown }}</p>
        </div>
    </div>
</template>

<script>
import { nextTick } from 'vue';
import CodeEditor from '@/components/Editor.vue';
import AppTerminal from '@/components/AppTerminal.vue';
import { weeklyChallenge } from '../data/challenges';
import { TestRunner } from '../services/testRunner';

export default {
    name: 'WeeklyChallenge',
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
            challenge: weeklyChallenge.current,
            submissionDeadline: null,
            countdown: '',
            userCode: '',
            feedback: '',
            selectedLanguage: 'python',
            glideClients: [
                { label: 'Glide - Python', value: 'python' },
                { label: 'Glide - JavaScript', value: 'javascript' },
                { label: 'Glide - Java', value: 'java' },
            ],
        };
    },
    mounted() {
        // Set deadline to end of the week
        const now = new Date();
        const endOfWeek = new Date();
        endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);
        this.submissionDeadline = endOfWeek;

        this.startCountdown();

        nextTick(() => {
            if (this.$refs.terminal) {
                this.$refs.terminal.handleResize();
            }
        });
    },
    beforeUnmount() {
        if (this.$refs.terminal) {
            this.$refs.terminal.clear();
        }
    },
    activated() {
        nextTick(() => {
            if (this.$refs.terminal) {
                this.$refs.terminal.handleResize();
            }
        });
    },
    methods: {
        startCountdown() {
            setInterval(() => {
                const now = new Date();
                const diff = this.submissionDeadline - now;

                if (diff <= 0) {
                    this.countdown = 'Challenge ended';
                    return;
                }

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

                this.countdown = `${days}d ${hours}h ${minutes}m remaining`;
            }, 60000);
        },

        async submitCode() {
            if (!this.userCode) return;

            try {
                const testRunner = new TestRunner(this.ws);
                const tests = this.challenge.tests[this.selectedLanguage];

                this.feedback = 'Running tests...';
                const results = await testRunner.runTests(
                    this.userCode,
                    this.selectedLanguage,
                    tests,
                    this.$refs.terminal
                );

                const allPassed = results.every(r => r.passed);

                if (allPassed) {
                    // Store submission
                    await this.ws.send(JSON.stringify({
                        action: 'submitWeeklyChallenge',
                        data: {
                            code: this.userCode,
                            language: this.selectedLanguage,
                            challengeId: this.challenge.id
                        }
                    }));

                    this.feedback = 'Your solution has been submitted! Results will be sent via email at the end of the week.';
                } else {
                    this.feedback = 'Some tests failed. Please fix the issues before submitting.';
                }
            } catch (error) {
                this.feedback = `Error submitting solution: ${error.message}`;
            }
        },
        updateLanguage() {
            // Update the editor language if needed
        },
    },
};
</script>

<style scoped>
.weekly-challenge {
    display: flex;
}

.left-panel {
    width: 40%;
    padding: 20px;
}

.right-panel {
    width: 60%;
    display: flex;
    flex-direction: column;
}
</style>
