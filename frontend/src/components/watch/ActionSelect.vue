<template>
  <div class="action-select" :class="{ 'client-select': showClients }">
    <div class="overlay"></div>
    <div class="select-container">
      <h2 class="select-title">
        {{
          showClients
            ? "Choose Your Glide Client"
            : "What Would You Like to Watch?"
        }}
      </h2>

      <div class="options-grid">
        <template v-if="!showClients">
          <button
            v-for="action in actions"
            :key="action.id"
            class="option-button"
            @click="selectAction(action)"
          >
            <div class="option-content">
              <span class="option-icon">{{ action.icon }}</span>
              <h3>{{ action.title }}</h3>
              <p>{{ action.description }}</p>
            </div>
          </button>
        </template>
        <template v-else>
          <button
            v-for="client in glideClients"
            :key="client.id"
            class="option-button client-button"
            @click="selectClient(client)"
          >
            <div class="option-content">
              <span class="client-icon">{{ client.icon }}</span>
              <h3>{{ client.name }}</h3>
              <p>{{ client.description }}</p>
            </div>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { store } from "@/store";
import { useEventBus } from "@/composables/useEventBus";

export default {
  name: "ActionSelect",
  emits: ["select"],
  setup(_, { emit }) {
    const showClients = ref(false);
    const selectedAction = ref(null);

    const actions = [
      {
        id: "Leaderboard",
        title: "Leaderboard",
        description: "Watch sorted sets in action with real-time score updates",
        icon: "🏆",
      },
      {
        id: "Task Manager",
        title: "Task Manager",
        description: "See distributed locks and queues at work",
        icon: "⚙️",
      },
    ];

    const glideClients = [
      {
        name: "Valkey-glide (Node)",
        id: "glide-node",
        description:
          "Blazing fast and non-blocking, perfect for Node.js ninjas",
        icon: "🔋",
      },
      {
        name: "Valkey-glide (Python)",
        id: "glide-python",
        description: "Elegant and efficient, perfect for Pythonistas",
        icon: "🐍",
      },
      {
        name: "Valkey-glide (Java)",
        id: "glide-java",
        description: "Rock-solid and robust, ideal for Java gurus",
        icon: "☕",
      },
    ];

    const selectAction = (action) => {
      try {
        selectedAction.value = action;
        showClients.value = true;
        store.setUseCase(action.id);
      } catch (error) {
        console.error("Error selecting action:", error);
      }
    };

    const selectClient = (client) => {
      try {
        const language = client.id.includes("python")
          ? "python"
          : client.id.includes("java")
          ? "java"
          : "javascript";
        store.setClient(client.id);
        emit("select", {
          action: selectedAction.value.id,
          client: client.id,
          language,
        });
      } catch (error) {
        console.error("Error selecting client:", error);
      }
    };

    const handleWatchInActionClick = () => {
      if (window.location.hash.includes("watch-in-action")) {
        store.watchState.selectedAction = null;
        store.watchState.selectedClient = null;
        showClients.value = false;
        selectedAction.value = null;
      }
    };

    onMounted(() => {
      const { on, off } = useEventBus();
      const tabElement = document.querySelector('[data-tab="watch-in-action"]');

      on("tab-changed", (tab) => {
        if (tab === "watch-in-action") {
          store.clearWatchState();
          showClients.value = false;
          selectedAction.value = null;
        }
      });

      if (tabElement) {
        tabElement.addEventListener("click", handleWatchInActionClick);
      }

      onBeforeUnmount(() => {
        if (tabElement) {
          tabElement.removeEventListener("click", handleWatchInActionClick);
        }
        off("tab-changed");
      });
    });

    return {
      showClients,
      actions,
      glideClients,
      selectAction,
      selectClient,
    };
  },
};
</script>

<style scoped>
.action-select {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
}

.select-container {
  position: relative;
  max-width: 1200px;
  width: 90%;
  z-index: 1;
  text-align: center;
}

.select-title {
  color: var(--text-primary);
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-shadow: 0 0 20px var(--primary-color);
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
}

.option-button {
  background: var(--surface-darker);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-align: left;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.option-button:hover {
  transform: translateY(-6px);
  border-color: var(--primary-color);
  box-shadow: var(--shadow-lg);
}

.option-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
}

.option-icon,
.client-icon {
  font-size: 3rem;
}

h3 {
  color: var(--text-primary);
  font-size: 1.5rem;
  margin: 0;
}

p {
  color: var(--text-secondary);
  margin: 0;
  font-size: var(--text-base);
}
</style>
