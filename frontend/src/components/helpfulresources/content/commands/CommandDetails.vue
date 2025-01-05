<template>
  <div class="command-details">
    <div class="command-header">
      <div class="command-title">
        <span class="category-icon">{{ command.categoryIcon }}</span>
        <h1>{{ command.name }}</h1>
        <span class="category-badge">{{ command.category }}</span>
      </div>
      <div class="command-meta">
        <span class="complexity" v-if="command.complexity">
          Time Complexity: {{ command.complexity }}
        </span>
        <span class="since" v-if="command.since">
          Since: {{ command.since }}
        </span>
      </div>
    </div>

    <div class="command-content">
      <section class="description">
        <h2>Description</h2>
        <p>{{ command.description }}</p>
      </section>

      <section class="syntax">
        <h2>Syntax</h2>
        <pre><code>{{ command.syntax }}</code></pre>
      </section>

      <section class="parameters" v-if="command.parameters?.length">
        <h2>Parameters</h2>
        <div class="param-grid">
          <div
            v-for="param in command.parameters"
            :key="param.name"
            class="param-item"
          >
            <h4>{{ param.name }}</h4>
            <p>{{ param.description }}</p>
            <span class="param-type">{{ param.type }}</span>
          </div>
        </div>
      </section>

      <section class="examples">
        <h2>Examples</h2>
        <div class="example-list">
          <div
            v-for="(example, index) in command.examples"
            :key="index"
            class="example-item"
          >
            <div class="example-code">
              <pre><code>{{ example.command }}</code></pre>
            </div>
            <div class="example-output" v-if="example.output">
              <span class="output-label">Output:</span>
              <pre><code>{{ example.output }}</code></pre>
            </div>
            <p class="example-explanation" v-if="example.explanation">
              {{ example.explanation }}
            </p>
          </div>
        </div>
      </section>

      <section class="related" v-if="command.related?.length">
        <h2>Related Commands</h2>
        <div class="related-commands">
          <router-link
            v-for="cmd in command.related"
            :key="cmd"
            :to="`/commands/${cmd}`"
            class="related-command"
          >
            {{ cmd }}
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommandDetails",
  props: {
    command: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.command-details {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.command-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
}

.command-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.category-icon {
  font-size: 2rem;
}

.category-badge {
  padding: 0.5rem 1rem;
  background: var(--surface-light);
  border-radius: var(--radius-md);
  font-size: 0.9rem;
}

.command-meta {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  color: var(--text-secondary);
}

section {
  margin: 2rem 0;
}

.param-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.param-item {
  padding: 1rem;
  background: var(--surface-darker);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

.example-item {
  margin: 1.5rem 0;
  padding: 1rem;
  background: var(--surface-darker);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
}

pre {
  padding: 1rem;
  background: var(--surface-dark);
  border-radius: var(--radius-sm);
  overflow-x: auto;
}

.related-commands {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.related-command {
  padding: 0.5rem 1rem;
  background: var(--surface-light);
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.related-command:hover {
  background: var(--primary-color);
  transform: translateY(-2px);
}
</style>
