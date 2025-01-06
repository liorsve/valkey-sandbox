<template>
  <div class="action-select" :class="{ 'client-select': showClients }">
    <Transition name="fade">
      <div v-if="initializing" class="initializing-state">
        <div class="loading-content">
          <div class="loading-title">{ Watch in Action }</div>
          <div class="loading-text">Preparing interactive environment...</div>
          <div class="loading-spinner"></div>
        </div>
      </div>
      <div v-else class="select-container">
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
    </Transition>
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
    const initializing = ref(true);
    const { on, off } = useEventBus();

    onMounted(() => {
      const tabElement = document.querySelector('[data-tab="watch-in-action"]');

      if (tabElement) {
        tabElement.addEventListener("click", handleWatchInActionClick);
      }

      on("tab-changed", (tab) => {
        if (tab === "watch-in-action") {
          store.clearWatchState();
          showClients.value = false;
          selectedAction.value = null;
        }
      });

      setTimeout(() => {
        initializing.value = false;
      }, 800);
    });

    onBeforeUnmount(() => {
      const tabElement = document.querySelector('[data-tab="watch-in-action"]');
      if (tabElement) {
        tabElement.removeEventListener("click", handleWatchInActionClick);
      }
      off("tab-changed");
    });

    const handleWatchInActionClick = () => {
      if (window.location.hash.includes("watch-in-action")) {
        store.watchState.selectedAction = null;
        store.watchState.selectedClient = null;
        showClients.value = false;
        selectedAction.value = null;
      }
    };

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

    return {
      showClients,
      actions,
      glideClients,
      selectAction,
      selectClient,
      initializing,
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

.initializing-state {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--surface-darker);
}

.loading-content {
  text-align: center;
}

.loading-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: "JetBrains Mono", monospace;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.loading-text {
  color: var(--text-secondary);
  margin: 1rem 0;
  font-size: 1.1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  margin: 20px auto;
  border: 3px solid var(--surface-light);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.select-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.select-title {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-primary);
  font-size: 2rem;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.action-card {
  background: var(--surface-dark);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.action-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.action-card:hover::before {
  opacity: 1;
}

.action-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.action-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.action-name {
  color: var(--text-primary);
  margin: 1rem 0;
  font-size: 1.5rem;
}

.action-description {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.5;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.card-highlight {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}
</style>
