<template>
  <div class="doc-sidebar">
    <div class="sidebar-header">
      <h3>Documentation</h3>
      <button v-if="showBackButton" class="back-btn" @click="$emit('back')">
        <span class="back-icon">←</span>
        Back
      </button>
    </div>

    <div class="sidebar-content">
      <div class="nav-sections">
        <!-- Main sections -->
        <div
          v-for="section in mainSections"
          :key="section.id"
          class="section-item"
          :class="{ active: currentSection === section.id }"
          @click="handleSectionClick(section)"
        >
          <span class="section-icon">{{ section.icon }}</span>
          <span class="section-title">{{ section.title }}</span>
        </div>

        <!-- Show subsections only for current section -->
        <div
          v-if="currentSection && currentSubsections.length"
          class="subsections"
        >
          <div
            v-for="subsection in currentSubsections"
            :key="subsection.id"
            class="subsection-item"
            :class="{ active: currentItem === subsection.id }"
            @click="handleSubsectionClick(subsection)"
          >
            <span class="subsection-icon">{{ subsection.icon || "📄" }}</span>
            {{ subsection.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocSidebar",
  props: {
    currentSection: String,
    currentItem: String,
    sections: {
      type: Array,
      default: () => [],
    },
    showBackButton: {
      type: Boolean,
      default: true,
    },
  },

  emits: ["select-section", "select-item", "back"],

  computed: {
    mainSections() {
      return [
        { id: "general", title: "General Concepts", icon: "📚" },
        { id: "commands", title: "Commands Reference", icon: "⚙️" },
        { id: "glide", title: "Glide Documentation", icon: "🛠️" },
        { id: "news", title: "Latest News", icon: "📰" },
        { id: "clients", title: "Client Libraries", icon: "💻" },
        { id: "modules", title: "Modules", icon: "🔌" },
        { id: "roadmap", title: "Road Map", icon: "🚧" },
      ];
    },
    currentSubsections() {
      const section = this.sections.find((s) => s.id === this.currentSection);
      if (!section?.items) {
        // If no items found in sections prop, try to get from default mappings
        const defaultSections = {
          general: [
            { id: "introduction", title: "Introduction" },
            { id: "architecture", title: "Architecture" },
            { id: "clustering", title: "Clustering" },
          ],
          commands: [
            { id: "strings", title: "Strings" },
            { id: "hashes", title: "Hashes" },
            { id: "lists", title: "Lists" },
          ],
          clients: [
            { id: "overview", title: "Overview" },
            { id: "languages", title: "Language Support" },
          ],
          modules: [
            { id: "overview", title: "Overview" },
            { id: "official", title: "Official Modules" },
          ],
          glide: [
            { id: "intro", title: "Introduction" },
            { id: "setup", title: "Setup Guide" },
          ],
        };
        return defaultSections[this.currentSection] || [];
      }
      return section.items;
    },
  },

  methods: {
    handleSectionClick(section) {
      this.$emit("select-section", section.id);
    },
    handleSubsectionClick(subsection) {
      this.$emit("select-item", subsection.id);
    },
  },
};
</script>

<style scoped>
.doc-sidebar {
  width: 280px;
  background: var(--surface-darker);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  color: var(--text-primary);
  transform: translateX(-2px);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.section-item,
.subsection-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-radius: var(--radius-sm);
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.section-item:hover,
.subsection-item:hover {
  background: var(--surface-dark);
  transform: translateX(4px);
}

.section-item.active,
.subsection-item.active {
  background: var(--surface-light);
  color: var(--primary-color);
}

.section-icon,
.subsection-icon {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
}

.subsections {
  margin-left: 1rem;
  margin-top: 0.5rem;
  border-left: 2px solid var(--border-color);
  padding-left: 1rem;
}

.subsection-item {
  font-size: 0.9rem;
  padding: 0.5rem 0.75rem;
}
</style>
