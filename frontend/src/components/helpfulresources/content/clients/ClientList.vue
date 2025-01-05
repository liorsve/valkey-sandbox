<template>
  <div class="client-list">
    <div class="header">
      <button class="back-btn" @click="$emit('back')">
        <span class="back-icon">←</span>
        Back to Languages
      </button>
      <h2>{{ language.name }} Clients</h2>
    </div>

    <div class="clients-grid">
      <div
        v-for="client in sortedClients"
        :key="client.id"
        class="client-card"
        @click="$emit('select', client)"
      >
        <div class="client-header">
          <h3>{{ client.name }}</h3>
          <span :class="['status-badge', client.status]">{{
            client.status
          }}</span>
        </div>
        <p class="description">{{ client.description }}</p>
        <div class="version">v{{ client.version }}</div>
        <div class="features">
          <div
            v-for="feature in client.features.slice(0, 3)"
            :key="feature"
            class="feature"
          >
            {{ feature }}
          </div>
          <div v-if="client.features.length > 3" class="more-features">
            +{{ client.features.length - 3 }} more
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClientList",
  props: {
    language: {
      type: Object,
      required: true,
    },
    clients: {
      type: Array,
      required: true,
    },
  },
  computed: {
    sortedClients() {
      return [...this.clients].sort((a, b) => {
        // Sort Glide clients first, then by status
        if (a.name.includes("Glide") && !b.name.includes("Glide")) return -1;
        if (!a.name.includes("Glide") && b.name.includes("Glide")) return 1;
        return b.status === "stable" ? 1 : -1;
      });
    },
  },
};
</script>

<style scoped>
.client-list {
  padding: 1.5rem;
}

.header {
  margin-bottom: 2rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--surface-dark);
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  margin-bottom: 1rem;
}

.back-icon {
  font-size: 1.2rem;
}

.clients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.client-card {
  background: var(--surface-darker);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.client-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary-color);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.client-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.version {
  color: var(--text-accent);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature {
  background: var(--surface-dark);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
}

.more-features {
  color: var(--text-secondary);
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
}
</style>
