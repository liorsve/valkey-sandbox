<template>
  <div class="general-concepts">
    <div v-if="loading" class="loading-state">
      <div class="loader"></div>
      <p>Loading General Concepts...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
      <button @click="retry" class="retry-button">Try Again</button>
    </div>
    <div v-else class="topics-container">
      <div v-for="topic in topics" :key="topic.id" class="topic-section">
        <h2>{{ topic.title || topic.id }}</h2>
        <div class="topic-content" v-html="topic.content"></div>
      </div>
      <div v-if="!topics.length" class="fallback-content">
        <div v-html="fallbackContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import store from "@/store";

export default {
  name: "GeneralConcepts",
  setup() {
    const topics = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fallbackContent = ref(`
      <h1>Getting Started with Valkey</h1>
      <p>Welcome to Valkey, the distributed key-value store system designed for modern applications.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Distributed architecture</li>
        <li>High availability</li>
        <li>Horizontal scalability</li>
        <li>Rich data structures</li>
        <li>Multiple client libraries</li>
      </ul>

      <h2>Quick Start</h2>
      <p>Check out our playground to start experimenting with Valkey!</p>
    `);

    const loadTopics = async () => {
      loading.value = true;
      error.value = null;

      try {
        const data = await store.getGeneralConcepts();
        topics.value = Array.isArray(data) ? data : [];
      } catch (err) {
        error.value = "Failed to load documentation. Please try again later.";
        console.error("Failed to load General Concepts:", err);
      } finally {
        loading.value = false;
      }
    };

    const retry = () => {
      loadTopics();
    };

    onMounted(() => {
      loadTopics();
    });

    return {
      topics,
      loading,
      error,
      retry,
      fallbackContent,
    };
  },
};
</script>

<style scoped>
.general-concepts {
  padding: 1rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.loader {
  border: 3px solid var(--surface-light);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

:deep(pre) {
  background: var(--surface-darker);
  padding: 1rem;
  border-radius: var(--radius-sm);
  overflow-x: auto;
}

:deep(code) {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9em;
}

.error {
  color: var(--error-color);
  text-align: center;
}

.error-state {
  text-align: center;
  padding: 2rem;
  color: var(--error-color);
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  border: none;
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: var(--primary-hover);
  transform: translateY(-1px);
}

.topics-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.topic-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background: var(--surface-darker);
  border-radius: var(--radius-md);
  border: 1px solid var(--surface-light);
}

.topic-section h2 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.fallback-content {
  opacity: 0.8;
  animation: fadeIn 0.3s ease-in;
}

:deep(pre) {
  background: var(--surface-dark);
  padding: 1rem;
  border-radius: var(--radius-sm);
  overflow-x: auto;
  margin: 1rem 0;
}

:deep(code) {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9em;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 0.8;
    transform: translateY(0);
  }
}
</style>
