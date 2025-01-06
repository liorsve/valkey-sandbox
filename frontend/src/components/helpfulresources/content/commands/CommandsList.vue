<template>
  <div class="commands-list">
    <RecycleScroller
      class="scroller"
      :items="props.commands"
      :item-size="100"
      :key-field="'name'"
    >
      <template #default="{ item }">
        <div class="command-row" @click="handleCommandClick(item)">
          <div class="command-header">
            <h3>{{ item.name }}</h3>
            <span class="command-category">{{ item.category }}</span>
          </div>
          <p class="command-description">{{ item.description }}</p>
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>

<script setup>
const props = defineProps({
  commands: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["select-command"]);

const handleCommandClick = (command) => {
  emit("select-command", command);
};
</script>

<style scoped>
.commands-list {
  height: calc(100vh - 200px);
  width: 100%;
}

.scroller {
  height: 100%;
}

.command-row {
  padding: 1rem;
  background: var(--surface-darker);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.command-row:hover {
  transform: translateY(-2px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
}

.command-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.command-header h3 {
  margin: 0;
  color: var(--text-accent);
}

.command-category {
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  background: var(--surface-light);
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
}

.command-description {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--text-secondary);
}

.virtualizer-container {
  min-height: 100px;
  position: relative;
}
</style>
