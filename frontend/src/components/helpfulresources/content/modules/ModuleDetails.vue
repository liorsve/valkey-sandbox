<template>
  <div class="module-details">
    <div class="module-header">
      <div class="module-meta">
        <span class="module-category">{{ module.category }}</span>
        <span class="module-version">v{{ module.version }}</span>
        <span :class="['module-status', module.status]">{{
          module.status
        }}</span>
      </div>
      <h1>{{ module.name }}</h1>
      <p class="module-description">{{ module.description }}</p>
    </div>

    <div class="module-content">
      <section class="features">
        <h2>Features</h2>
        <ul class="feature-list">
          <li v-for="feature in module.features" :key="feature">
            {{ feature }}
          </li>
        </ul>
      </section>

      <section class="installation">
        <h2>Installation</h2>
        <div class="install-tabs">
          <button
            v-for="lang in module.installation"
            :key="lang.name"
            :class="['tab-btn', { active: selectedLang === lang.name }]"
            @click="selectedLang = lang.name"
          >
            {{ lang.name }}
          </button>
        </div>
        <div class="install-content">
          <pre><code>{{ currentInstallGuide }}</code></pre>
        </div>
      </section>

      <section class="examples" v-if="module.examples?.length">
        <h2>Examples</h2>
        <div
          v-for="example in module.examples"
          :key="example.title"
          class="example-block"
        >
          <h3>{{ example.title }}</h3>
          <pre><code>{{ example.code }}</code></pre>
          <p>{{ example.explanation }}</p>
        </div>
      </section>

      <section class="compatibility">
        <h2>Compatibility</h2>
        <div class="compatibility-grid">
          <div
            v-for="comp in module.compatibility"
            :key="comp.version"
            class="comp-item"
          >
            <span class="comp-version">{{ comp.version }}</span>
            <span class="comp-status" :class="comp.status">{{
              comp.status
            }}</span>
          </div>
        </div>
      </section>

      <section class="links">
        <a :href="module.repository" class="repo-link" target="_blank">
          <span class="icon">📦</span> Repository
        </a>
        <a :href="module.documentation" class="docs-link" target="_blank">
          <span class="icon">📚</span> Documentation
        </a>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModuleDetails",
  props: {
    module: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedLang: this.module.installation?.[0]?.name,
    };
  },
  computed: {
    currentInstallGuide() {
      const lang = this.module.installation?.find(
        (l) => l.name === this.selectedLang
      );
      return lang?.guide || "";
    },
  },
};
</script>

<style scoped>
.module-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.module-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.module-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.module-status {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.9em;
}

.module-status.stable {
  background: var(--success-color);
}
.module-status.beta {
  background: var(--warning-color);
}
.module-status.alpha {
  background: var(--error-color);
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  list-style: none;
  padding: 0;
}

.feature-list li {
  padding: 1rem;
  background: var(--surface-darker);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.install-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tab-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: var(--surface-darker);
  color: var(--text-primary);
  cursor: pointer;
  border-radius: var(--radius-sm);
}

.tab-btn.active {
  background: var(--primary-color);
}

.example-block {
  margin: 2rem 0;
}

pre {
  background: var(--surface-darker);
  padding: 1.5rem;
  border-radius: var(--radius-md);
  overflow-x: auto;
}

.compatibility-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.comp-item {
  padding: 1rem;
  background: var(--surface-darker);
  border-radius: var(--radius-sm);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.links {
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
}

.links a {
  padding: 1rem 2rem;
  border-radius: var(--radius-md);
  background: var(--surface-darker);
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.links a:hover {
  transform: translateY(-2px);
  background: var(--primary-color);
}
</style>
