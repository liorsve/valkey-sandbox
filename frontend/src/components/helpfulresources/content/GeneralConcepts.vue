<template>
  <div class="general-concepts">
    <div v-if="loading" class="loading-state">
      <div class="loader"></div>
      <p>Loading General Concepts...</p>
    </div>
    <div v-else class="content" v-html="content"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { store } from "../../../store";

export default {
  name: "GeneralConcepts",
  props: {
    pageId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const content = ref("");
    const loading = ref(true);

    onMounted(async () => {
      try {
        content.value = await store.getGeneralConcepts();
      } catch (error) {
        console.error("Failed to load General Concepts:", error);
        content.value = '<p class="error">Failed to load documentation</p>';
      } finally {
        loading.value = false;
      }
    });

    return { content, loading };
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
</style>
