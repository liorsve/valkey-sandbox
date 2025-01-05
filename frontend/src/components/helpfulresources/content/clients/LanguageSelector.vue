<template>
  <div class="language-grid">
    <div
      v-for="lang in languages"
      :key="lang.id"
      class="language-card"
      @click="$emit('select', lang)"
    >
      <div class="language-icon">{{ lang.icon }}</div>
      <div class="language-info">
        <h3>{{ lang.name }}</h3>
        <span :class="['status-badge', lang.status]">{{ lang.status }}</span>
      </div>
      <div class="client-count">
        {{ lang.clients.length }} clients available
      </div>
      <div class="glide-badge" v-if="hasGlideSupport(lang)">
        <span class="glide-icon">⚡</span> Glide Support
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LanguageSelector",
  props: {
    languages: {
      type: Array,
      required: true,
    },
  },
  methods: {
    hasGlideSupport(lang) {
      const glideLanguages = ["nodejs", "python", "java", "go", "cpp", "ruby"];
      return glideLanguages.includes(lang.id);
    },
  },
};
</script>

<style scoped>
.language-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

.language-card {
  background: var(--surface-darker);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.language-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.language-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.language-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  text-transform: uppercase;
}

.status-badge.stable {
  background: var(--success-color);
}
.status-badge.beta {
  background: var(--warning-color);
}
.status-badge.development {
  background: var(--info-color);
}

.client-count {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.glide-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--accent-color)
  );
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.glide-icon {
  font-size: 1.2rem;
}
</style>
