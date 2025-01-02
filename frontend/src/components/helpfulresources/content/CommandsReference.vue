<template>
  <div class="commands-reference">
    <div class="commands-header">
      <div class="search-box">
        <input
          v-model="filter"
          placeholder="Search commands..."
          class="search-input"
        />
        <span class="search-icon">🔍</span>
      </div>

      <div class="categories-scroll">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="['category-btn', { active: selectedCategory === cat }]"
          @click="selectCategory(cat)"
        >
          {{ getCategoryEmoji(cat) }} {{ cat }}
        </button>
      </div>
    </div>

    <virtual-scroller
      class="commands-list"
      :items="filteredCommands"
      :item-height="150"
      v-slot="{ item }"
    >
      <div class="command-card">
        <div class="command-header">
          <h3>{{ item.name }}</h3>
          <span class="command-category">{{ item.category }}</span>
        </div>
        <p class="command-description">{{ item.description }}</p>
        <div class="command-examples">
          <pre v-for="(ex, i) in item.examples" :key="i">{{ ex }}</pre>
        </div>
      </div>
    </virtual-scroller>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { VirtualScroller } from "vue-virtual-scroller";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import store from "@/store";
export default {
  components: { VirtualScroller },
  name: "CommandsReference",

  setup() {
    const filter = ref("");
    const selectedCategory = ref("All");

    const commands = ref([]);
    const loading = ref(true);

    onMounted(async () => {
      try {
        const data = await store.getCommandReference();
        commands.value = data.commands.map((cmd) => ({
          id: cmd.id,
          name: cmd.name,
          category: cmd.category,
          description: cmd.description,
          examples: cmd.examples,
        }));
      } catch (error) {
        console.error("Failed to load commands:", error);
      } finally {
        loading.value = false;
      }
    });

    const categories = computed(() => {
      const cats = ["All", ...new Set(commands.value.map((c) => c.category))];
      return cats.sort();
    });

    const filteredCommands = computed(() => {
      return commands.value.filter((cmd) => {
        const matchesFilter =
          !filter.value ||
          cmd.name.toLowerCase().includes(filter.value.toLowerCase()) ||
          cmd.description.toLowerCase().includes(filter.value.toLowerCase());

        const matchesCategory =
          selectedCategory.value === "All" ||
          cmd.category === selectedCategory.value;

        return matchesFilter && matchesCategory;
      });
    });

    const getCategoryEmoji = (category) => {
      const emojis = {
        Strings: "📝",
        Lists: "📋",
        Sets: "🎯",
        Hashes: "🔑",
        "Sorted Sets": "📊",
        "Pub/Sub": "📡",
        Transactions: "🔄",
        Scripting: "📜",
        Connection: "🔌",
        Server: "⚙️",
      };
      return emojis[category] || "📦";
    };

    return {
      filter,
      selectedCategory,
      categories,
      filteredCommands,
      getCategoryEmoji,
    };
  },
};
</script>

<style scoped>
.commands-reference {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.commands-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--surface-darker);
  padding: 1rem;
  border-bottom: 1px solid var(--surface-light);
}

.categories-scroll {
  overflow-x: auto;
  white-space: nowrap;
  padding: 1rem 0;
  scrollbar-width: thin;
}

.commands-list {
  height: calc(100vh - 200px);
  overflow-y: auto;
}

.filter-input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--surface-light);
  background: var(--surface-darker);
  color: var(--text-primary);
}

.category-selector {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.category-btn {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--surface-light);
  background: var(--surface-darker);
  color: var(--text-primary);
  cursor: pointer;
}

.category-btn.active {
  background: var(--surface-light);
  color: var(--text-accent);
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.command-card {
  background: var(--surface-darker);
  border-radius: var(--radius-md);
  padding: 1rem;
  border: 1px solid var(--surface-light);
}

.command-name {
  color: var(--text-accent);
  margin: 0 0 0.5rem 0;
}

.command-category {
  font-size: 0.8em;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.command-examples {
  margin-top: 1rem;
}

.example-code {
  background: var(--surface-dark);
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  margin: 0.5rem 0;
  overflow-x: auto;
}
</style>
