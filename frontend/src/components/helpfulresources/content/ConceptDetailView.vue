<template>
  <div class="concept-detail">
    <header class="detail-header">
      <button class="back-button" @click="$emit('back')">
        <span class="icon">←</span>
        <span>Back to Concepts</span>
      </button>
      <div class="header-content">
        <span class="concept-icon">{{ concept.icon }}</span>
        <h1>{{ concept.title }}</h1>
      </div>
    </header>

    <div class="detail-content" v-html="concept.content"></div>

    <div class="detail-footer">
      <div class="related-links">
        <!-- Add related links if needed -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConceptDetailView",
  props: {
    concept: {
      type: Object,
      required: true,
    },
  },
  emits: ["back"],
};
</script>

<style scoped>
.concept-detail {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.detail-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--surface-dark);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: var(--primary-color);
  transform: translateX(-4px);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.concept-icon {
  font-size: 2.5rem;
}

.detail-content {
  font-size: 1.1rem;
  line-height: 1.7;
}

.detail-content :deep(h1) {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.detail-content :deep(h2) {
  font-size: 1.8rem;
  color: var(--text-primary);
  margin: 2rem 0 1rem;
}

.detail-content :deep(ul) {
  list-style-type: none;
  padding: 0;
}

.detail-content :deep(li) {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.detail-content :deep(li::before) {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--primary-color);
}

.detail-content :deep(code) {
  background: var(--surface-darker);
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-sm);
  font-family: "JetBrains Mono", monospace;
}

.detail-content :deep(pre) {
  background: var(--surface-darker);
  padding: 1rem;
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: 1rem 0;
}
</style>
