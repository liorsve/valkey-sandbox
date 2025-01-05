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

      <div class="categories-scroll" v-if="!selectedCommand">
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

    <div v-if="selectedCommand" class="command-details">
      <CommandDetails
        :command="selectedCommand"
        @back="selectedCommand = null"
      />
    </div>
    <div v-else class="commands-list" ref="scrollParent">
      <div
        :style="{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }"
      >
        <div
          v-for="virtualItem in virtualizer.getVirtualItems()"
          :key="virtualItem.key"
          class="command-card"
          :style="{
            position: 'absolute',
            top: 0,
            transform: `translateY(${virtualItem.start}px)`,
            width: '100%',
          }"
          @click="selectCommand(filteredCommands[virtualItem.index])"
        >
          <div class="command-header">
            <h3>{{ filteredCommands[virtualItem.index].name }}</h3>
            <span class="command-category">
              {{ filteredCommands[virtualItem.index].category }}
            </span>
          </div>
          <p class="command-description">
            {{ filteredCommands[virtualItem.index].description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useVirtualizer } from "@tanstack/vue-virtual";
import store from "@/store";
import CommandDetails from "./commands/CommandDetails.vue";
import { getCommandExample } from "@/services/commandExamples";

export default {
  name: "CommandsReference",
  components: {
    CommandDetails,
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

    const commandsList = ref(null);
    const pageSize = 20;
    const currentPage = ref(0);

    const visibleCommands = computed(() => {
      const start = currentPage.value * pageSize;
      return filteredCommands.value.slice(start, start + pageSize);
    });

    const handleScroll = () => {
      if (!commandsList.value) return;

      const { scrollTop, scrollHeight, clientHeight } = commandsList.value;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        currentPage.value++;
      }
    };

    onMounted(() => {
      commandsList.value?.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      commandsList.value?.removeEventListener("scroll", handleScroll);
    });

    const scrollParent = ref(null);

    const virtualizer = useVirtualizer({
      count: computed(() => filteredCommands.value.length),
      getScrollElement: () => scrollParent.value,
      estimateSize: () => 150,
      overscan: 5,
    });

    const selectCategory = (category) => {
      selectedCategory.value = category;
      if (scrollParent.value) {
        scrollParent.value.scrollTop = 0;
      }
    };

    const handleSearch = () => {
      if (searchTimeout.value) {
        clearTimeout(searchTimeout.value);
      }
      searchTimeout.value = setTimeout(() => {
        // Correct way to scroll virtualizer to top
        if (scrollParent.value) {
          scrollParent.value.scrollTop = 0;
        }
      }, 300);
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
      visibleCommands,
      commandsList,
      scrollParent,
      virtualizer,
      selectCategory,
      handleSearch,
      selectCommand,
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
  padding: 1rem;
  scroll-behavior: smooth;
  position: relative;
  contain: strict;
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
  padding: 1rem;
  border: 1px solid var(--surface-light);
  background: var(--surface-darker);
  border-radius: var(--radius-md);
  animation: fadeIn 0.3s ease-in-out;
  margin: 0.5rem 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.command-card:hover {
  transform: translateY(-2px) !important;
  border-color: var(--primary-color);
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
