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
    <div v-else>
      <!-- Summary View -->
      <div v-if="!selectedConcept" class="concepts-grid">
        <div
          v-for="concept in concepts"
          :key="concept.id"
          class="concept-card"
          @click="selectConcept(concept)"
        >
          <div class="concept-icon">{{ concept.icon }}</div>
          <div class="concept-content">
            <h3>{{ concept.title }}</h3>
            <p>{{ concept.summary }}</p>
          </div>
          <div class="concept-footer">
            <span class="read-more">Read More →</span>
          </div>
        </div>
      </div>

      <!-- Detail View -->
      <div v-else class="concept-detail">
        <button class="back-button" @click="selectedConcept = null">
          ← Back to Concepts
        </button>
        <div class="detail-content">
          <h1>{{ selectedConcept.title }}</h1>
          <div class="content-body" v-html="selectedConcept.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { conceptsData } from "./data/conceptsData";

export default {
  name: "GeneralConcepts",
  setup() {
    const loading = ref(true);
    const error = ref(null);
    const selectedConcept = ref(null);
    const concepts = ref([]);

    const loadConcepts = async () => {
      loading.value = true;
      error.value = null;

      try {
        // Simulating API call with local data
        await new Promise((resolve) => setTimeout(resolve, 500));
        concepts.value = conceptsData;
      } catch (err) {
        error.value = "Failed to load concepts. Please try again later.";
        console.error("Failed to load concepts:", err);
      } finally {
        loading.value = false;
      }
    };

    const selectConcept = (concept) => {
      selectedConcept.value = concept;
      window.scrollTo(0, 0);
    };

    const retry = () => {
      loadConcepts();
    };

    onMounted(() => {
      loadConcepts();
    });

    return {
      concepts,
      loading,
      error,
      retry,
      selectedConcept,
      selectConcept,
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

.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

.concept-card {
  background: var(--surface-darker);
  border: 1px solid var(--surface-light);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.concept-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.concept-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.concept-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.concept-content p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

.concept-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--surface-light);
}

.read-more {
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: 500;
}

.concept-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.back-button {
  background: var(--surface-dark);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: var(--primary-color);
  transform: translateX(-4px);
}

.detail-content {
  background: var(--surface-darker);
  border-radius: var(--radius-lg);
  padding: 2rem;
  border: 1px solid var(--surface-light);
}

.detail-content h1 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.content-body {
  color: var(--text-secondary);
  line-height: 1.7;
}

.content-body :deep(h2) {
  color: var(--text-primary);
  margin: 2rem 0 1rem;
}

.content-body :deep(pre) {
  background: var(--surface-dark);
  padding: 1rem;
  border-radius: var(--radius-md);
  margin: 1rem 0;
  overflow-x: auto;
}

.content-body :deep(code) {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9em;
}

.content-body :deep(ul) {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.content-body :deep(li) {
  margin: 0.5rem 0;
}
</style>
