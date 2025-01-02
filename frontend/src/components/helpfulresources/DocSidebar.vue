<template>
  <div class="doc-sidebar">
    <div class="sidebar-header">
      <h3>{{ currentPageTitle }}</h3>
      <button class="collapse-btn" @click="toggleSidebar">
        {{ isCollapsed ? "→" : "←" }}
      </button>
    </div>

    <div class="sidebar-content" :class="{ collapsed: isCollapsed }">
      <div v-for="section in sections" :key="section.id" class="nav-section">
        <div class="section-header" @click="toggleSection(section.id)">
          <span class="section-icon">{{ section.icon }}</span>
          <span class="section-title">{{ section.title }}</span>
          <span
            class="expand-icon"
            :class="{ expanded: isExpanded(section.id) }"
          >
            ›
          </span>
        </div>

        <div v-show="isExpanded(section.id)" class="section-items">
          <a
            v-for="item in section.items"
            :key="item.id"
            :class="['nav-item', { active: currentItem === item.id }]"
            @click="selectItem(item)"
          >
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "DocSidebar",
  props: {
    currentSection: {
      type: [String, Object],
      default: null,
    },
    sections: {
      type: Array,
      default: () => [
        {
          id: "default",
          title: "Documentation",
          icon: "📚",
          items: [{ id: "overview", title: "Overview" }],
        },
      ],
    },
  },
  emits: ["select-item"],

  setup(props, { emit }) {
    const searchQuery = ref("");
    const expandedSections = ref(["general"]); // Default expanded section
    const currentItem = ref(null); // Add this line
    const isCollapsed = ref(false);
    const currentPageTitle = ref("Documentation");

    const toggleSection = (sectionId) => {
      const index = expandedSections.value.indexOf(sectionId);
      if (index === -1) {
        expandedSections.value.push(sectionId);
      } else {
        expandedSections.value.splice(index, 1);
      }
    };

    const selectItem = (item) => {
      if (!item || !item.id) return;
      currentItem.value = item.id;
      emit("select-item", item.id);
    };

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const isExpanded = (sectionId) => {
      return expandedSections.value.includes(sectionId);
    };

    return {
      searchQuery,
      expandedSections,
      toggleSection,
      selectItem,
      currentItem, // Add this line
      isCollapsed,
      toggleSidebar,
      isExpanded,
      currentPageTitle,
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
</style>
