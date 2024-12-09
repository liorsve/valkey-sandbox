<template>
  <div class="sidebar">
    <div class="top-section">
      <!-- Client Dropdown -->
      <div class="dropdown-container">
        <select id="clientDropdown" :value="selectedClient" @change="onClientChange">
          <option v-for="client in availableClients" :key="client" :value="client">
            {{ client }}
          </option>
        </select>
      </div>
      <!-- Mode Dropdown -->
      <div class="dropdown-container">
        <select id="modeDropdown" :value="executionMode" @change="onModeChange">
          <option value="Standalone">Standalone</option>
          <option value="Cluster">Cluster</option>
        </select>
      </div>
      <!-- Buttons -->
      <button v-if="currentTab === 'playground'" @click="$emit('run-code')">
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
      ],
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
  },
  methods: {
    onClientChange(event) {
      this.$emit('update-client', event.target.value, this.executionMode);
    },
    onModeChange(event) {
      this.$emit('update-mode', this.selectedClient, event.target.value);
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

.sidebar button,
.sidebar select {
  margin-bottom: 15px;
  padding: 15px;
  font-size: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #555;
  color: #ffffff;
  border: 1rem solid;
  border-color: rgb(34, 34, 62);
  border-radius: 25px;
  box-sizing: border-box;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.sidebar button:hover,
.sidebar select:hover {
  background-color: #666;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-color: rgb(95, 95, 180);
}

.sidebar select option {
  background-color: #555;
  color: #ffffff;
  padding: 10px;
}

.sidebar select option:hover {
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

.sidebar .dropdown-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  margin-right: 10px;
  width: 100%;
}

.sidebar .dropdown-container select {
  flex: 1;
  padding: 15px 45px 15px 45px;
  font-size: 16px;
  background-color: #555;
  color: #d3daef;
  border: 1rem solid;
  border-color: rgb(34, 34, 62);
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 24px 24px;
  box-sizing: border-box;
  overflow: hidden;
  text-indent: 5px;
  appearance: menulist;
}

#clientDropdown {
  background-image: url('@/assets/images/icons/client.png');
  background-size: 32px 32px;
}

#modeDropdown {
  background-image: url('@/assets/images/icons/cluster.png');
  background-size: 32px 32px;
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
