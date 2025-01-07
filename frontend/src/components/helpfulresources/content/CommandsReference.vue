<template>
  <div class="commands-reference">
    <div class="commands-header">
      <div class="search-box">
        <input
          v-model="searchQuery"
          placeholder="Search commands..."
          class="search-input"
          @input="handleSearch"
        />
        <span class="search-icon">🔍</span>
      </div>

      <div
        v-if="!selectedCommand"
        :class="[
          'categories-grid',
          { 'single-category': selectedCategory !== 'All' },
        ]"
      >
        <div
          v-for="cat in categories"
          :key="cat"
          :class="['category-card', { active: selectedCategory === cat }]"
          @click="selectCategory(cat)"
        >
          <div class="category-icon">{{ getCategoryEmoji(cat) }}</div>
          <div class="category-name">{{ cat }}</div>
          <div class="command-count" v-if="cat !== 'All'">
            {{ getCommandCount(cat) }}
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedCommand" class="command-details">
      <CommandDetails
        :command="selectedCommand"
        @back="selectedCommand = null"
      />
    </div>
    <div v-else>
      <CommandsList
        :commands="filteredCommands"
        @select-command="selectCommand"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import store from "@/store";
import CommandDetails from "./commands/CommandDetails.vue";
import CommandsList from "./commands/CommandsList.vue";
import { getCommandExample } from "@/services/commandExamples";

export default {
  name: "CommandsReference",
  components: {
    CommandDetails,
    CommandsList,
  },

  setup() {
    const searchQuery = ref("");
    const selectedCategory = ref("All");
    const selectedCommand = ref(null);
    const commands = ref([]);
    const searchTimeout = ref(null);
    const loading = ref(false);

    onMounted(async () => {
      if (!commands.value.length) {
        loading.value = true;
        try {
          await store.initializeDocumentation("commands");
          const commandsData = store.documentationState.commands.data;
          commands.value = commandsData.map((cmd) => ({
            name: cmd.name, // Using name as unique identifier
            category: cmd.category,
            description: cmd.description,
            examples: cmd.examples,
          }));
        } catch (error) {
          console.error("Failed to load commands:", error);
        } finally {
          loading.value = false;
        }
      }
    });

    const categories = computed(() => {
      const cats = ["All", ...new Set(commands.value.map((c) => c.category))];
      return cats.sort();
    });

    const filteredCommands = computed(() => {
      return commands.value.filter((cmd) => {
        const matchesSearch = searchQuery.value
          ? cmd.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            cmd.description
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())
          : true;

        const matchesCategory =
          selectedCategory.value === "All" ||
          cmd.category === selectedCategory.value;

        return matchesSearch && matchesCategory;
      });
    });

    const getCategoryEmoji = (category) => {
      const emojis = {
        "String Operations": "📝",
        "List Operations": "📋",
        "Set Operations": "🎯",
        "Hash Operations": "🔑",
        "Sorted Set Operations": "📊",
        "Pub/Sub": "📡",
        Transactions: "💫",
        Scripting: "📜",
        "Connection Management": "🔌",
        "Server Management": "⚙️",
        "Cluster Management": "🌐",
        "Stream Operations": "🌊",
        Geospatial: "🗺️",
        HyperLogLog: "📊",
        All: "🎮",
      };
      return emojis[category] || "📦";
    };

    const getCommandCount = (category) => {
      return commands.value.filter((cmd) => cmd.category === category).length;
    };

    const selectCategory = (category) => {
      selectedCategory.value = category;
    };

    const handleSearch = () => {
      if (searchTimeout.value) {
        clearTimeout(searchTimeout.value);
      }
      searchTimeout.value = setTimeout(() => {}, 300);
    };

    const selectCommand = (command) => {
      const details = getCommandExample(command.name.toLowerCase());
      selectedCommand.value = { ...command, ...details };
    };

    return {
      searchQuery,
      selectedCategory,
      selectedCommand,
      categories,
      filteredCommands,
      getCategoryEmoji,
      selectCategory,
      handleSearch,
      selectCommand,
      getCommandCount,
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

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  padding: 1rem 0;
  max-height: 400px;
  overflow-y: auto;
  transition: all 0.3s ease;
}

.categories-grid.single-category {
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  max-height: 100px;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: var(--surface-dark);
  border: 1px solid var(--surface-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.05));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.category-card:hover::before {
  opacity: 1;
}

.category-card.active {
  background: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.category-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.category-name {
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  color: var(--text-primary);
}

.command-count {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--surface-darker);
  padding: 0.2rem 0.5rem;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  opacity: 0.8;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--primary-color);
}

.category-card.active .category-name,
.category-card.active .category-icon {
  color: var(--text-accent);
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

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-box {
  position: relative;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--surface-light);
  background: var(--surface-darker);
  color: var(--text-primary);
  font-size: 1rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}
</style>
