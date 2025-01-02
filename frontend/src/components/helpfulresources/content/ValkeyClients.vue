<template>
  <div class="valkey-clients">
    <!-- Show languages grid when no language is selected -->
    <div v-if="!selectedLang" class="languages-grid">
      <div
        v-for="lang in languages"
        :key="lang"
        class="language-card"
        @click="selectLanguage(lang)"
      >
        <div class="language-icon">{{ getLanguageEmoji(lang) }}</div>
        <h3>{{ lang }}</h3>
        <div class="client-count" v-if="clientCounts[lang]">
          {{ clientCounts[lang] }} clients available
        </div>
      </div>
    </div>

    <!-- Show clients list when language is selected but no client is selected -->
    <div v-else-if="!selectedClient" class="clients-container">
      <button class="back-btn" @click="handleBack">← Back to Languages</button>
      <h2>{{ selectedLang }} Clients</h2>
      <div class="clients-list">
        <div
          v-for="client in languageClients"
          :key="client"
          class="client-item"
          @click="selectClient(client)"
        >
          <div class="client-header">
            <h3>{{ client }}</h3>
            <span class="client-arrow">→</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Show client details when both language and client are selected -->
    <div v-else class="client-detail">
      <button class="back-btn" @click="handleBack">
        ← Back to {{ selectedLang }} Clients
      </button>
      <div v-if="loading" class="loading-spinner">⟳</div>
      <div v-else class="client-content" v-html="clientContent"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import documentationService from "@/services/documentationService";
import cacheService from "@/services/cacheService";

export default {
  name: "ValkeyClients",
  setup() {
    const languages = ref([]);
    const selectedLang = ref(null);
    const languageClients = ref([]);
    const selectedClient = ref(null);
    const clientContent = ref("");
    const loading = ref(false);
    const clientCounts = ref({});

    onMounted(async () => {
      try {
        languages.value = await documentationService.getClientLanguages();
      } catch (error) {
        console.error("Failed to load languages:", error);
      }
    });

    const selectLanguage = async (lang) => {
      selectedLang.value = lang;
      selectedClient.value = null;
      clientContent.value = "";

      try {
        await loadLanguageClients(lang);
      } catch (error) {
        console.error("Failed to load clients:", error);
      }
    };

    const selectClient = async (client) => {
      loading.value = true;
      try {
        clientContent.value = await documentationService.getClientContent(
          selectedLang.value,
          client
        );
        selectedClient.value = client;
      } catch (error) {
        console.error("Failed to load client content:", error);
      } finally {
        loading.value = false;
      }
    };

    const handleBack = () => {
      selectedClient.value = null;
      clientContent.value = "";
    };

    const getLanguageEmoji = (lang) => {
      const emojis = {
        python: "🐍",
        javascript: "💛",
        java: "☕",
        go: "🔵",
        rust: "🦀",
        "c#": "©️",
        ruby: "💎",
        php: "🐘",
      };
      return emojis[lang.toLowerCase()] || "📦";
    };

    const loadLanguageClients = async (lang) => {
      const cacheKey = `clients:${lang}`;
      const cached = cacheService.get(cacheKey);
      if (cached) {
        languageClients.value = cached;
        return;
      }

      try {
        const clients = await documentationService.getLanguageClients(lang);
        languageClients.value = clients;
        cacheService.set(cacheKey, clients);
        clientCounts.value[lang] = clients.length;
      } catch (error) {
        console.error("Failed to load clients:", error);
      }
    };

    return {
      languages,
      selectedLang,
      languageClients,
      selectedClient,
      clientContent,
      loading,
      selectLanguage,
      selectClient,
      handleBack,
      getLanguageEmoji,
      clientCounts,
    };
  },
};
</script>

<style scoped>
.valkey-clients {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.languages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.language-card {
  background: var(--surface-darker);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--surface-light);
}

.language-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}

.language-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.client-count {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.clients-container {
  padding: 2rem;
}

.clients-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.client-item {
  background: var(--surface-darker);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  border: 1px solid var(--surface-light);
  cursor: pointer;
  transition: all 0.3s ease;
}

.client-item:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}

.client-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.client-arrow {
  font-size: 1.5rem;
  color: var(--text-secondary);
}

.client-detail {
  padding: 2rem;
}

.loading-spinner {
  font-size: 2rem;
  text-align: center;
}

.client-content {
  line-height: 1.6;
  margin-top: 1rem;
}
</style>
