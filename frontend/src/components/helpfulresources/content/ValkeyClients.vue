<template>
  <div class="valkey-clients">
    <div v-if="loading" class="loading-state">
      <div class="loader"></div>
      <p>Loading client libraries...</p>
    </div>
    <div v-else class="clients-grid">
      <div v-for="lang in languages" :key="lang.id" class="language-card">
        <div class="language-header">
          <span class="language-icon">{{
            lang.icon || getLanguageEmoji(lang.name)
          }}</span>
          <h3>{{ lang.name }}</h3>
          <span :class="['status-badge', lang.status]">{{ lang.status }}</span>
        </div>
        <div class="clients-list">
          <div v-for="client in lang.clients" :key="client" class="client-item">
            {{ client }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import documentationService from "@/services/documentationService";

export default {
  name: "ValkeyClients",
  props: {
    pageId: {
      type: String,
      default: "clients",
    },
  },

  setup() {
    const loading = ref(true);
    const languages = ref([]);
    const error = ref(null);

    const getLanguageEmoji = (lang) => {
      if (!lang || typeof lang !== "string") return "💻";

      const emojiMap = {
        python: "🐍",
        nodejs: "🟢",
        javascript: "🟡",
        java: "☕",
        go: "🔵",
        rust: "🦀",
        cpp: "⚡",
        csharp: "🔷",
        php: "🐘",
        ruby: "💎",
        scala: "🔴",
        kotlin: "🎯",
        swift: "🔶",
        dart: "🎯",
        elixir: "💧",
        lua: "🌙",
        nim: "👑",
        ocaml: "🐫",
        julia: "🔮",
        zig: "⚡",
      };

      return emojiMap[lang.toLowerCase()] || "💻";
    };

    onMounted(async () => {
      try {
        const data = await documentationService.getClientLanguages();
        languages.value = Array.isArray(data) ? data : [];
      } catch (err) {
        error.value = "Failed to load client libraries";
        console.error("Failed to load clients:", err);
      } finally {
        loading.value = false;
      }
    });

    return {
      loading,
      languages,
      error,
      getLanguageEmoji,
    };
  },
};
</script>

<style scoped>
.valkey-clients {
  padding: 2rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loader {
  border: 3px solid var(--surface-light);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.clients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.language-card {
  background: var(--surface-dark);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  border: 1px solid var(--surface-light);
  transition: all 0.3s ease;
}

.language-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border-color: var(--primary-color);
}

.language-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.language-icon {
  font-size: 2rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.stable {
  background: var(--success-color);
  color: var(--surface-darker);
}

.status-badge.beta {
  background: var(--warning-color);
  color: var(--surface-darker);
}

.status-badge.development {
  background: var(--info-color);
  color: var(--surface-darker);
}

.clients-list {
  margin-top: 1rem;
}

.client-item {
  padding: 0.5rem;
  background: var(--surface-darker);
  border-radius: var(--radius-sm);
  margin-bottom: 0.5rem;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9rem;
}

.client-item:hover {
  background: var(--surface-light);
}
</style>
