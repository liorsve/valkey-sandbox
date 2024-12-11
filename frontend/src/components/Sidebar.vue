<template>
  <div v-if="!hideSidebar" class="sidebar">
    <div class="top-section">
      <div class="dropdown-container">
        <select id="clientDropdown" :value="selectedClient" @change="onClientChange">
          <option v-for="client in availableClients" :key="client" :value="client">
            {{ client }}
          </option>
        </select>
      </div>
      <div v-if="currentTab !== 'commonUseCases'" class="dropdown-container">
        <select id="modeDropdown" :value="executionMode" @change="onModeChange">
          <option value="Standalone">Standalone</option>
          <option value="Cluster">Cluster</option>
        </select>
      </div>
      <button v-if="currentTab === 'playground' || currentTab === 'commonUseCases'" @click="$emit('run-code')">
        Run
      </button>
      <div v-if="currentTab === 'commonUseCases'" class="usecase-buttons">
        <button v-for="useCase in commonUseCases" :key="useCase" @click="$emit('select-usecase', useCase)">
          {{ useCase }}
        </button>
      </div>
    </div>
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="Logo" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    currentTab: {
      type: String,
      required: true,
    },
    selectedClient: {
      type: String,
      required: true,
    },
    executionMode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      commonUseCases: [
        'Leaderboard',
        'Queue',
        'Lock',
        'Session Cache',
        'Recommendation System',
        'Search Engine',
        'Web App Cache',
        'Task Manager',
      ],
      defaultClient: 'valkey-glide (Python)',
    };
  },
  computed: {
    availableClients() {
      if (this.currentTab === 'commonUseCases') {
        return ['valkey-glide (Python)', 'valkey-glide (Java)', 'valkey-glide (Node)'];
      } else {
        return this.$parent.clients;
      }
    },
    hideSidebar() {
      return this.currentTab === 'watchInAction' && this.$parent.hideSidebar;
    },
  },
  methods: {
    onClientChange(event) {
      this.$emit('update-client', event.target.value, this.executionMode);
    },
    onModeChange(event) {
      this.$emit('update-mode', this.selectedClient, event.target.value);
    },
    setDefaultClient() {
      if (this.currentTab === 'commonUseCases') {
        this.$emit('update-client', this.defaultClient, this.executionMode);
      }
    },
  },
  watch: {
    currentTab(newTab) {
      if (newTab === 'commonUseCases') {
        this.setDefaultClient();
      }
    },
  },
};
</script>

<style scoped>
.sidebar {
  color-scheme: dark;
  width: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
  flex-shrink: 0;
  overflow-y: auto;
}

.sidebar .top-section {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  margin-bottom: 20px;
}

.sidebar button {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  border: none;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.sidebar button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #2563eb, #7e22ce);
}

.sidebar button:active {
  transform: scale(0.97);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.sidebar button:focus {
  outline: 2px solid #9333ea;
  outline-offset: 3px;
}

.sidebar .dropdown-container select {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  border: 2px solid #9333ea;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  transition: box-shadow 0.2s ease;
  width: 100%;
}

.sidebar .dropdown-container {
  width: 100%;
}

.sidebar .dropdown-container select:hover {
  background-color: #444;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #2563eb, #7e22ce);
}

.sidebar .dropdown-container select:focus {
  outline: 2px solid #9333ea;
  outline-offset: 2px;
  border: 2px solid #9333ea;
}

.sidebar .dropdown-container select option {
  background-color: #555;
  color: #ffffff;
  padding: 10px;
}

.sidebar .dropdown-container select option:hover {
  background-color: #666;
}

.sidebar select {
  margin-right: 5px;
  border-radius: 5px;
}

.sidebar button {
  margin-bottom: 30px;
  border-radius: 25px;
}

.sidebar button img {
  margin-right: 10px;
  width: 32px;
  height: 32px;
}

.sidebar .dropdown-container select {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(135deg, #3b82f6, #9333ea);
  border: 2px solid #9333ea;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  transition: box-shadow 0.2s ease;
}

.sidebar .dropdown-container select:hover {
  background-color: #444;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #2563eb, #7e22ce);
}

.sidebar .dropdown-container select:focus {
  outline: 2px solid #9333ea;
  outline-offset: 2px;
  border: 2px solid #9333ea;
}

.sidebar .dropdown-container select option {
  background-color: #555;
  color: #ffffff;
  padding: 10px;
}

.sidebar .dropdown-container select option:hover {
  background-color: #666;
}

.logo {
  flex-shrink: 0;
  padding: 10px;
  margin-top: auto;
  position: relative;
  bottom: 80px;
  overflow: hidden;
}

.logo img {
  width: 100%;
  height: auto;
  max-width: 220px;
  display: block;
  margin: 0 auto;
  border: 3px solid #505050;
  border-radius: 8px;
  padding: 5px;
  background-color: #4a4a4a;
  object-fit: contain;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }

  .sidebar .top-section {
    flex-direction: row;
    align-items: center;
  }

  .sidebar button,
  .sidebar select {
    margin-bottom: 0;
    margin-right: 10px;
  }

  .sidebar .logo {
    display: none;
  }
}

.usecase-buttons button {
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  background-color: #595757;
  color: #fff;
  border: none;
  border-radius: 5px;
}

.usecase-buttons button:hover {
  background-color: #888;
}

.some-class {
  text-decoration: none;
}
</style>
