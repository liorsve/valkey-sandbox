<template>
  <div class="helpful-resources">
    <LoadingOverlay
      :show="loading"
      text="Loading documentation..."
      :show-logo="false"
      :enable-blur="false"
    />

    <div v-show="!loading && !selectedContent" class="resource-carousel">
      <button class="arrow-btn left" @click="scrollLeft">‹</button>
      <div class="carousel-viewport">
        <div
          v-for="(page, idx) in visiblePages"
          :key="page.id"
          class="carousel-item"
          :class="{
            active: idx === 1,
            prev: idx === 0,
            next: idx === 2,
          }"
          @click="selectPage(page)"
        >
          <div class="item-content">
            <div class="item-emoji">{{ page.emoji }}</div>
            <h3 class="item-title">{{ page.title }}</h3>
            <p class="item-description">{{ page.description }}</p>
          </div>
        </div>
      </div>
      <button class="arrow-btn right" @click="scrollRight">›</button>
    </div>

    <div v-show="!loading && selectedContent" class="content-area">
      <DocSidebar
        :current-section="selectedSection"
        :sections="contentNavigation"
        @select-section="handleSectionSelect"
        @select-item="handleItemSelect"
        @back="handleBack"
      />
      <div class="content-main" ref="contentMain">
        <component
          v-if="selectedContent?.component"
          :is="selectedContent.component"
          v-bind="selectedContent.props || {}"
        />
      </div>
    </div>

    <div class="bottom-links">
      <a
        v-for="link in links"
        :key="link.url"
        :href="link.url"
        target="_blank"
        class="link-item"
      >
        <img :src="link.icon" :alt="link.name" />
        <span class="link-text">{{ link.name }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import {
  ref,
  computed,
  onMounted,
  nextTick,
  markRaw,
  defineAsyncComponent,
} from "vue";
import { store } from "@/store";
import lazyDocumentation from "@/services/lazyDocumentation";
import LoadingOverlay from "../common/LoadingOverlay.vue";
import loadingController from "@/services/loadingController";

import LinkedInIcon from "@/assets/icons/linkedin.svg";
import GitHubIcon from "@/assets/icons/git-valkey.svg";
import ValkeyLogoIcon from "@/assets/images/Valkey-logo.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import GlideGitIcon from "@/assets/icons/glide-git.svg";

const DocComponents = {
  GeneralConcepts: markRaw(
    defineAsyncComponent(() => import("./content/GeneralConcepts.vue"))
  ),
  CommandsReference: markRaw(
    defineAsyncComponent(() => import("./content/CommandsReference.vue"))
  ),
  GlideDocumentation: markRaw(
    defineAsyncComponent(() => import("./content/GlideDocumentation.vue"))
  ),
  LatestNews: markRaw(
    defineAsyncComponent(() => import("./content/LatestNews.vue"))
  ),
  ValkeyClients: markRaw(
    defineAsyncComponent(() => import("./content/ValkeyClients.vue"))
  ),
  ValkeyModules: markRaw(
    defineAsyncComponent(() => import("./content/ValkeyModules.vue"))
  ),
  Roadmap: markRaw(defineAsyncComponent(() => import("./content/Roadmap.vue"))),
};

const links = [
  {
    name: "Valkey LinkedIn",
    url: "https://linkedin.com/company/valkey",
    icon: LinkedInIcon,
  },
  {
    name: "Valkey GitHub",
    url: "https://github.com/valkey-io/valkey",
    icon: GitHubIcon,
  },
  {
    name: "Valkey Site",
    url: "https://valkey.io",
    icon: ValkeyLogoIcon,
  },
  {
    name: "Valkey Twitter",
    url: "https://twitter.com/valkey_io",
    icon: TwitterIcon,
  },
  {
    name: "Glide GitHub",
    url: "https://github.com/valkey-io/valkey-glide",
    icon: GlideGitIcon,
  },
];

export default {
  name: "HelpfulResources",
  components: {
    LoadingOverlay,
    DocSidebar: markRaw(defineAsyncComponent(() => import("./DocSidebar.vue"))),
    ...DocComponents,
  },

  setup() {
    const activeIndex = ref(0);
    const selectedContent = ref(null);
    const selectedSection = ref(null);
    const searchQuery = ref("");
    const searchResults = ref([]);
    const contentMain = ref(null);
    const loading = ref(true);

    const pages = [
      {
        id: "general",
        emoji: "📚",
        title: "General Concepts",
        description: "Learn the foundations of Valkey from topics & basics.",
        component: DocComponents.GeneralConcepts,
      },
      {
        id: "commands",
        emoji: "⚙️",
        title: "Commands Reference",
        description: "Full Valkey commands with usage examples & details.",
        component: DocComponents.CommandsReference,
      },
      {
        id: "glide",
        emoji: "🛠️",
        title: "Glide Documentation",
        description: "Integration details for Valkey Glide.",
        component: DocComponents.GlideDocumentation,
      },
      {
        id: "news",
        emoji: "📰",
        title: "Latest News",
        description: "Stay updated on announcements & blog posts.",
        component: DocComponents.LatestNews,
      },
      {
        id: "clients",
        emoji: "💻",
        title: "Valkey Clients",
        description: "Explore language-specific client libraries.",
        component: DocComponents.ValkeyClients,
      },
      {
        id: "modules",
        emoji: "🔌",
        title: "Valkey Modules",
        description: "Add-on modules & advanced capabilities.",
        component: DocComponents.ValkeyModules,
      },
      {
        id: "roadmap",
        emoji: "🚧",
        title: "Valkey Road Map",
        description: "Upcoming features & system improvements.",
        component: DocComponents.Roadmap,
      },
    ];

    onMounted(async () => {
      try {
        await initializeDocumentation();
      } finally {
        loading.value = false;
        loadingController.finishComponentTransition("helpfulResources");
      }
    });

    const initializeDocumentation = async () => {
      try {
        await lazyDocumentation.initializeDocumentation();
      } catch (error) {
        console.error("Failed to initialize documentation:", error);
      } finally {
        loading.value = false;
      }
    };

    const contentNavigation = computed(() => {
      return selectedContent.value?.sections || [];
    });

    const handleSearch = async () => {
      if (searchQuery.value.length < 2) {
        searchResults.value = [];
        return;
      }
      searchResults.value = await store.searchDocumentation(searchQuery.value);
    };

    const selectSearchResult = (result) => {
      selectPage(pages.find((p) => p.id === result.pageId));
      selectedSection.value = result.sectionId;
      searchQuery.value = "";
      searchResults.value = [];
      nextTick(() => {
        scrollToSection(result.sectionId);
      });
    };

    const selectPage = (page) => {
      if (!page?.component) {
        console.error("Invalid page selection:", page);
        return;
      }

      selectedSection.value = null;

      selectedContent.value = {
        component: page.component,
        props: { pageId: page.id },
        sections: getSectionsForPage(page.id),
      };
    };

    const getSectionsForPage = (pageId) => {
      const sectionMappings = {
        commands: [
          { id: "strings", title: "String Operations", icon: "📝" },
          { id: "hashes", title: "Hash Operations", icon: "🔨" },
          { id: "lists", title: "List Operations", icon: "📋" },
          { id: "sets", title: "Set Operations", icon: "🎯" },
          { id: "sorted-sets", title: "Sorted Set Operations", icon: "📊" },
          { id: "pubsub", title: "Pub/Sub", icon: "📢" },
          { id: "transactions", title: "Transactions", icon: "🔄" },
          { id: "scripting", title: "Scripting", icon: "📜" },
        ],
        general: [
          { id: "introduction", title: "Introduction", icon: "📚" },
          { id: "architecture", title: "Architecture", icon: "🏗️" },
          { id: "clustering", title: "Clustering", icon: "🌐" },
          { id: "security", title: "Security", icon: "🔒" },
        ],
        clients: [
          { id: "overview", title: "Overview", icon: "📋" },
          { id: "languages", title: "Languages", icon: "💻" },
          { id: "best-practices", title: "Best Practices", icon: "✨" },
        ],
        modules: [
          { id: "overview", title: "Overview", icon: "📦" },
          { id: "official", title: "Official Modules", icon: "✅" },
          { id: "community", title: "Community Modules", icon: "🌟" },
        ],
      };

      return sectionMappings[pageId] || [];
    };

    const scrollToSection = (sectionId) => {
      if (!sectionId || typeof sectionId !== "string") return;

      selectedSection.value = sectionId;
      nextTick(() => {
        const element = contentMain.value?.querySelector(`#${sectionId}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      });
    };

    const handleSectionSelect = (sectionId) => {
      selectedSection.value = sectionId;
      const componentMap = {
        general: DocComponents.GeneralConcepts,
        commands: DocComponents.CommandsReference,
        glide: DocComponents.GlideDocumentation,
        news: DocComponents.LatestNews,
        clients: DocComponents.ValkeyClients,
        modules: DocComponents.ValkeyModules,
        roadmap: DocComponents.Roadmap,
      };

      if (componentMap[sectionId]) {
        selectedContent.value = {
          component: componentMap[sectionId],
          props: { pageId: sectionId },
          sections: getSectionsForPage(sectionId),
        };
      }
    };

    const handleItemSelect = (itemId) => {
      if (selectedContent.value?.component) {
        nextTick(() => {
          const element = document.getElementById(itemId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
    };

    const handleBack = () => {
      selectedContent.value = null;
      selectedSection.value = null;
    };

    const visiblePages = computed(() => {
      const total = pages.length;
      const current = activeIndex.value;
      return [
        pages[(current - 1 + total) % total],
        pages[current],
        pages[(current + 1) % total],
      ];
    });

    return {
      activeIndex,
      pages,
      selectedContent,
      selectedSection,
      contentNavigation,
      searchQuery,
      searchResults,
      contentMain,
      handleSearch,
      selectSearchResult,
      selectPage,
      scrollToSection,
      scrollLeft() {
        activeIndex.value =
          activeIndex.value <= 0 ? pages.length - 1 : activeIndex.value - 1;
      },
      scrollRight() {
        activeIndex.value =
          activeIndex.value >= pages.length - 1 ? 0 : activeIndex.value + 1;
      },
      links,
      visiblePages,
      loading,
      loadingController,
      getSectionsForPage,
      handleSectionSelect,
      handleItemSelect,
      handleBack,
    };
  },
};
</script>

<style scoped>
.helpful-resources {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.resource-carousel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(
    to bottom,
    var(--surface-darker),
    var(--surface-dark)
  );
  position: relative;
  overflow: visible;
}

.carousel-viewport {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 1800px;
  perspective: 2000px;
  transform-style: preserve-3d;
}

.carousel-item {
  flex: 0 0 auto;
  width: 500px;
  height: 360px;
  margin: 0 -50px;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  transform-style: preserve-3d;
}

.carousel-item.prev,
.carousel-item.next {
  transform: scale(0.8) translateZ(-200px);
  opacity: 0.4;
  filter: blur(2px);
}

.carousel-item.prev {
  transform: scale(0.8) translateX(-40%) translateZ(-200px) rotateY(10deg);
}
.carousel-item.next {
  transform: scale(0.8) translateX(40%) translateZ(-200px) rotateY(-10deg);
}

.carousel-item.active {
  transform: scale(1) translateZ(0);
  opacity: 1;
  z-index: 1;
  filter: blur(0);
}

.item-content {
  height: 100%;
  background: linear-gradient(
    135deg,
    var(--surface-dark) 0%,
    var(--surface-darker) 100%
  );
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
}

.item-content:hover {
  transform: translateY(-5px);
  border-color: var(--primary-color);
}

.item-emoji {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.item-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 1rem 0;
  color: var(--text-primary);
}

.item-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 80%;
}

.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--surface-dark);
  border: 2px solid var(--surface-light);
  color: var(--text-primary);
  font-size: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
}

.arrow-btn::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.4s ease;
}

.arrow-btn:hover::before {
  transform: translate(-50%, -50%) scale(1);
}

.arrow-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.arrow-btn:hover {
  background: var(--primary-color);
  border-color: var(--primary-hover);
  transform: translateY(-50%) scale(1.1);
}

.arrow-btn.left {
  left: 2%;
}
.arrow-btn.right {
  right: 2%;
}

.bottom-links {
  padding: 2rem;
  display: flex;
  justify-content: center;
  gap: 3rem;
  background: var(--surface-darker);
  border-top: 1px solid var(--surface-light);
}

.link-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
}

.link-item::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120%;
  height: 120%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.link-item:hover::before {
  transform: translate(-50%, -50%) scale(1);
}

.link-item img {
  width: 42px;
  height: 42px;
  border-radius: 8px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: brightness(1.1) contrast(0.9);
}

.link-item .link-text {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  transition: all 0.3s ease;
}

.link-item:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.link-item:hover img {
  transform: scale(1.1) rotate(-5deg);
  filter: brightness(1.2) contrast(1);
}

.link-item:hover .link-text {
  transform: translateX(5px);
  color: rgba(255, 255, 255, 1);
}

.content-area {
  display: flex;
  height: 100%;
  overflow: hidden;
  background: var(--surface-darker);
}

.content-sidebar {
  width: 250px;
  padding: 1rem;
  background: var(--surface-darker);
  border-right: 1px solid var(--surface-light);
}

.content-main {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  max-width: calc(100% - 280px);
}

.nav-item {
  padding: 0.5rem;
  cursor: pointer;
  border-radius: var(--radius-sm);
}

.nav-item.active {
  background: var(--surface-light);
  color: var(--text-accent);
}

.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes softPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.interactive-element {
  animation: softPulse 2s infinite;
}
</style>
