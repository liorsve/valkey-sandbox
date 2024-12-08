<template>
  <div class="sidebar">
    <div class="top-section">
      <div class="dropdown-container">
        <select id="clientDropdown" v-model="$parent.selectedClient" @change="$parent.updateTemplate">
          <option value="valkey-glide (Python)">
            valkey-glide (Python)
          </option>
          <option value="valkey-glide (Java)">
            valkey-glide (Java)
          </option>
          <option value="valkey-glide (Node)">
            valkey-glide (Node)
          </option>
          <option value="valkey-py (Python)">
            valkey-py (Python)
          </option>
          <option value="iovalkey (Node)">
            iovalkey (Node)
          </option>
          <option value="valkey-go (Go)">
            valkey-go (Go)
          </option>
          <option value="valkey-java (Java)">
            valkey-java (Java)
          </option>
        </select>
      </div>

      <div class="dropdown-container">
        <select id="modeDropdown" v-model="$parent.executionMode" @change="$parent.updateTemplate">
          <option value="Standalone">
            Standalone
          </option>
          <option value="Cluster">
            Cluster
          </option>
        </select>
      </div>

      <button id="runButton" @click="$emit('run-code')">
        <img src="../assets/images/icons/run.png" alt="Run Icon">
        Run
      </button>

      <button id="usecasesButton">
        <img src="../assets/images/icons/usecases.png" alt="Usecases Icon">
        UseCases
      </button>

      <button id="watchActionButton">
        <img src="../assets/images/icons/action.png" alt="Action Icon">
        Watch in Action
      </button>
    </div>

    <!-- Logo at the Bottom -->
    <div class="logo">
      <img src="../assets/images/logo.png" alt="Logo">
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  emits: ["run-code"],
};
</script>

<style scoped>
.sidebar {
  color-scheme: dark;
  width: 250px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}

.sidebar .top-section {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column;
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
  /* Even lighter background */
  color: #ffffff;
  /* White text color */
  border: 1rem solid;
  border-color: rgb(75, 75, 160);
  /* Lighter border color */
  border-radius: 25px;
  /* More rounded corners */
  box-sizing: border-box;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
  /* Ensure inner content respects border radius */
}

.sidebar button:hover,
.sidebar select:hover {
  background-color: #666;
  /* Lighter on hover */
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border-color: rgb(95, 95, 180);
  /* Even lighter border color on hover */
}

.sidebar select option {
  background-color: #555;
  /* Match select background */
  color: #ffffff;
  /* White text */
  padding: 10px;
  /* Add some padding */
}

.sidebar select option:hover {
  background-color: #666;
  /* Lighter on hover */
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
  /* Increased from 24px */
  height: 32px;
  /* Increased from 24px */
}

.sidebar .dropdown-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
}

.sidebar .dropdown-container select {
  flex: 1;
  padding: 15px;
  font-size: 16px;
  background-color: #555;
  /* Match other elements */
  color: #ffffff;
  /* White text */
  border: 1rem solid;
  border-color: rgb(75, 75, 160);
  /* Match other elements */
  border-radius: 5px;
  /* Fixed border radius */
  background-repeat: no-repeat;
  background-position: 10px center;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  overflow: hidden;
  /* Ensure inner content respects border radius */
}

#clientDropdown {
  background-image: url('../assets/images/icons/client.png');
  background-size: 32px 32px;
  /* Increased from 24px */
}

#modeDropdown {
  background-image: url('../assets/images/icons/cluster.png');
  background-size: 32px 32px;
  /* Increased from 24px */
}

.logo img {
  width: 100%;
  height: auto;
  max-width: 500px;
}

/* Responsive Adjustments */
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
</style>
