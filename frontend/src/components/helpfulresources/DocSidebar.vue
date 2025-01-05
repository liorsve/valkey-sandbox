<template>
  <div class="doc-sidebar">
    <div class="sidebar-header">
      <h3>Documentation</h3>
    </div>
    <div class="sidebar-content">
      <div class="nav-section">
        <div
          v-for="section in documentSections"
          :key="section.id"
          class="section-item"
          :class="{ active: currentSection === section.id }"
          @click="selectSection(section.id)"
        >
          <span class="section-icon">{{ section.icon }}</span>
          {{ section.title }}
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
  },
  setup(props, { emit }) {
    const documentSections = [
      { id: "topics", title: "General Topics", icon: "📚" },
      { id: "glide", title: "Glide API", icon: "⚡" },
      { id: "commands", title: "Commands", icon: "🎮" },
      { id: "modules", title: "Modules", icon: "📦" },
      { id: "news", title: "Latest News", icon: "📰" },
      { id: "clients", title: "Client Libraries", icon: "💻" },
      { id: "blog", title: "Weekly Blog", icon: "📝" },
      { id: "roadmap", title: "Road Map", icon: "🚧" },
    ];

    const selectSection = (sectionId) => {
      emit("select-section", sectionId);
    };

    return {
      documentSections,
      selectSection,
    };
  },
};
</script>

<style scoped>
.doc-sidebar {
  width: var(--sidebar-width);
  transition: width 0.3s ease;
  background: var(--surface-darker);
  border-right: 1px solid var(--surface-light);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--surface-dark);
  border-bottom: 1px solid var(--surface-light);
}

.collapse-btn {
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 1.2em;
}

.sidebar-content {
  overflow-y: auto;
  height: calc(100% - 3rem);
}

.sidebar-content.collapsed {
  width: 60px;
}

.section-header {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: var(--text-primary);
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: var(--radius-sm);
  margin: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid transparent;
}

.section-header:hover {
  background: rgba(255, 255, 255, 0.07);
  transform: translateX(5px);
  border-color: var(--primary-color);
}

.section-header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-icon {
  font-size: 1.4em;
  transition: transform 0.3s ease;
}

.section-header:hover .section-icon {
  transform: scale(1.2);
}

.expand-icon {
  font-size: 1.2em;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.7;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.section-items {
  padding: 0.5rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem 0.75rem 3rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: var(--radius-sm);
  margin: 0.25rem 0.5rem;
  position: relative;
  background: transparent;
}

.item-marker {
  position: absolute;
  left: 1.5rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.nav-item:hover .item-marker {
  opacity: 1;
  transform: translateX(0);
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  transform: translateX(5px);
}

.nav-item.active {
  background: var(--surface-light);
  color: var(--primary-color);
  font-weight: 500;
  border-right: 3px solid var(--primary-color);
}

/* Animations */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
  max-height: 300px;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateX(-10px);
}

.section-item {
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.section-item:hover {
  background: var(--surface-light);
  transform: translateX(5px);
}

.section-item.active {
  background: var(--surface-light);
  color: var(--primary-color);
  border-right: 3px solid var(--primary-color);
}

.section-icon {
  font-size: 1.2em;
}
</style>
