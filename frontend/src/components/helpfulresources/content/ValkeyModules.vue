<template>
  <div class="valkey-modules">
    <div class="modules-grid">
      <div v-for="module in modules" :key="module.id" class="module-card">
        <div class="module-header">
          <h3>{{ module.name }}</h3>
          <span :class="['module-status', module.status]">{{
            module.status
          }}</span>
        </div>

        <p class="module-description">{{ module.description }}</p>

        <div class="module-details">
          <div class="module-compatibility">
            <h4>Compatibility</h4>
            <div class="compatibility-list">
              <span v-for="ver in module.compatibility" :key="ver">{{
                ver
              }}</span>
            </div>
          </div>

          <div class="module-features">
            <h4>Key Features</h4>
            <ul>
              <li v-for="feature in module.features" :key="feature">
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>

        <div class="module-footer">
          <a
            v-if="module.docs"
            :href="module.docs"
            target="_blank"
            class="module-link"
            >Documentation</a
          >
          <a
            v-if="module.github"
            :href="module.github"
            target="_blank"
            class="module-link"
            >GitHub</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ValkeyModules",

  setup() {
    const modules = [
      {
        id: "search",
        name: "Valkey Search",
        status: "stable",
        description:
          "Full-text search capabilities for Valkey with advanced querying and indexing.",
        compatibility: ["Valkey 7.0+", "Valkey 8.0+"],
        features: [
          "Full-text indexing",
          "Fuzzy search",
          "Field weights",
          "Relevance scoring",
        ],
        docs: "https://docs.valkey.io/modules/search",
        github: "https://github.com/valkey-io/valkey-search",
      },
      // More modules would be defined here
    ];

    return {
      modules,
    };
  },
};
</script>

<style scoped>
.valkey-modules {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
}

.module-card {
  background: var(--surface-darker);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  border: 1px solid var(--surface-light);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.module-status {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.8em;
}

.module-status.stable {
  background: var(--success);
  color: var(--surface-darker);
}

.module-status.beta {
  background: var(--warning);
  color: var(--surface-darker);
}

.module-description {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
}

.module-details {
  margin-bottom: 1.5rem;
}

.module-details h4 {
  margin-bottom: 0.5rem;
  color: var(--text-accent);
}

.compatibility-list {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.compatibility-list span {
  background: var(--surface-dark);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.9em;
}

.module-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.module-features li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.module-features li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--text-accent);
}

.module-footer {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--surface-light);
}

.module-link {
  color: var(--text-accent);
  text-decoration: none;
}

.module-link:hover {
  text-decoration: underline;
}
</style>
