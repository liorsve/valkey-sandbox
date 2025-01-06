<template>
  <div class="coding-challenges">
    <div class="challenge-sidebar">
      <ul class="challenge-list">
        <li
          v-for="challenge in availableChallenges"
          :key="challenge.id"
          @click="selectChallenge(challenge)"
          :class="{ active: challenge.id === selectedChallenge?.id }"
        >
          {{ challenge.title }}
          <span class="difficulty-badge">{{ challenge.difficulty }}</span>
        </li>
      </ul>
      <div v-if="selectedChallenge" class="challenge-info">
        <h3>{{ selectedChallenge.title }}</h3>
        <div
          v-if="selectedChallenge.description"
          class="markdown"
          v-html="sanitizedDescription"
        ></div>
        <div class="language-select">
          <label for="glide-client">Glide Client:</label>
          <select
            id="glide-client"
            v-model="selectedLanguage"
            @change="updateLanguage"
          >
            <option
              v-for="lang in availableLanguages"
              :key="lang"
              :value="lang"
            >
              {{ languageLabels[lang] }}
            </option>
          </select>
        </div>
        <div v-if="showHints" class="hints">
          <h4>Hints:</h4>
          <ul>
            <li v-for="(hint, index) in selectedChallenge.hints" :key="index">
              {{ hint }}
            </li>
          </ul>
        </div>
        <button @click="toggleHints" class="hint-btn">
          {{ showHints ? "Hide" : "Show" }} Hints
        </button>
        <button @click="runTests" class="run-tests-btn">Run Tests</button>
        <div v-if="feedback" class="feedback" :class="feedbackType">
          {{ feedback }}
        </div>
      </div>
    </div>

    <div class="challenge-workspace">
      <div class="editor-terminal">
        <CodeEditor
          v-model:modelValue="userCode"
          :language="selectedLanguage"
          class="challenge-editor"
          :key="`editor-${selectedChallenge?.id}-${selectedLanguage}`"
        />
        <AppTerminal
          ref="terminal"
          class="challenge-terminal"
          :key="`terminal-${selectedChallenge?.id}`"
        />
      </div>

      <div v-if="testResults.length" class="test-results">
        <div
          v-for="(result, index) in testResults"
          :key="index"
          :class="['test-result', result.status]"
        >
          <div class="test-header">
            <span>{{ result.name }}</span>
            <span class="status">{{ result.status }}</span>
          </div>
          <pre v-if="result.details" class="test-details">{{
            result.details
          }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import CodeEditor from "@/components/Editor.vue";
import AppTerminal from "@/components/AppTerminal.vue";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ChallengeManager from "@/data/codeTemplates/valkey-glide/challenges";

export class TestRunner {
  async runTests(code, language, tests, terminal) {
    const displayClient = store.currentClient;
    const results = [];

    for (const test of tests) {
      try {
        const result = await new Promise((resolve) => {
          const messageHandler = (event) => {
            const response = JSON.parse(event.data);
            if (response.action === "output") {
              terminal?.write(`[${displayClient}] ${response.data}`);
              const passed = response.passed || false;
              resolve({
                name: test.name,
                passed,
                output: response.data,
              });
            }
          };
          ws.addEventListener("message", messageHandler);
          ws.send(
            JSON.stringify({
              action: "runTest",
              code,
              language,
              test: test.name,
              client: displayClient,
            })
          );
        });

        results.push(result);
      } catch (error) {
        console.error(`Error running test "${test.name}":`, error);
        results.push({
          name: test.name,
          passed: false,
          output: `Error: ${error.message}`,
        });
      }
    }

    return results;
  }
}

export default defineComponent({
  name: "CodingChallenges",
  components: { CodeEditor, AppTerminal },
  props: {
    ws: {
      type: WebSocket,
      required: true,
      validator: (value) => value instanceof WebSocket,
    },
    isConnected: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      selectedChallenge: null,
      selectedLanguage: "python",
      userCode: "",
      feedback: "",
      feedbackType: "info",
      testResults: [],
      showHints: false,
      languageLabels: {
        python: "Glide - Python",
        javascript: "Glide - Node.js",
        java: "Glide - Java",
      },
    };
  },
  computed: {
    availableLanguages() {
      return ["python", "javascript", "java"];
    },
    availableChallenges() {
      return ChallengeManager.listChallenges(this.selectedLanguage);
    },
    sanitizedDescription() {
      if (!this.selectedChallenge?.description) return "";
      return DOMPurify.sanitize(marked(this.selectedChallenge.description));
    },
  },
  methods: {
    selectChallenge(challenge) {
      this.selectedChallenge = ChallengeManager.getChallenge(
        challenge.id,
        this.selectedLanguage
      );
      this.userCode = this.selectedChallenge.starterCode;
      this.feedback = "";
      this.testResults = [];
      this.showHints = false;

      this.$nextTick(() => {
        if (this.$refs.terminal) {
          this.$refs.terminal.clear();
          this.$refs.terminal.writeWelcomeMessage("challenges");
        }
      });
    },
    updateLanguage() {
      if (this.selectedChallenge) {
        const challenge = ChallengeManager.getChallenge(
          this.selectedChallenge.id,
          this.selectedLanguage
        );
        this.selectedChallenge = challenge;
        this.userCode = challenge.starterCode;
      }
      this.testResults = [];
    },
    async runTests() {
      if (!this.selectedChallenge || !this.userCode) {
        this.feedback = "Please select a challenge and write some code first";
        return;
      }

      this.feedback = "Running tests...";
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
        const allPassed = results.every((r) => r.passed);

        if (allPassed) {
          this.feedback = `All tests passed! You earned ${this.selectedChallenge.points} points!`;
          this.$emit("challenge-completed", {
            id: this.selectedChallenge.id,
            points: this.selectedChallenge.points,
          });
        } else {
          this.feedback = "Some tests failed. Check the results below.";
        }
      } catch (error) {
        this.feedback = `Error running tests: ${error.message}`;
        console.error("Test execution error:", error);
      }
    },
    toggleHints() {
      this.showHints = !this.showHints;
    },
  },

  beforeRouteUpdate(to, from, next) {
    if (this.$refs.terminal) {
      this.$refs.terminal.clear();
    }
    next();
  },

  activated() {
    if (this.$refs.terminal) {
      this.$refs.terminal.writeWelcomeMessage("challenges");
    }
  },

  updated() {
    if (this.$refs.terminal) {
      this.$refs.terminal.writeWelcomeMessage("challenges");
    }
  },
  beforeUnmount() {
    if (this.$refs.terminal) {
      this.$refs.terminal.clear();
    }
  },
  deactivated() {
    if (this.$refs.terminal) {
      this.$refs.terminal.clear();
    }
  },
});
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
