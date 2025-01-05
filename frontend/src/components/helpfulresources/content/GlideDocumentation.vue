<template>
  <div class="glide-documentation">
    <div v-if="loading" class="loading-state">
      <div class="loader"></div>
      <p>Loading Glide documentation...</p>
    </div>
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>
    <div v-else class="markdown-body" v-html="renderedContent"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import documentationService from "@/services/documentationService";
import "highlight.js/styles/github-dark.css";

export default {
  name: "GlideDocumentation",
  props: {
    pageId: {
      type: String,
      required: true,
    },
  },
  setup() {
    const loading = ref(true);
    const error = ref(null);
    const renderedContent = ref("");

    const loadContent = async () => {
      loading.value = true;
      error.value = null;

      try {
        renderedContent.value =
          await documentationService.getRenderedGlideDocs();
      } catch (err) {
        console.error("Failed to load Glide docs:", err);
        error.value = "Failed to load documentation. Please try again later.";
      } finally {
        loading.value = false;
      }
    };

    onMounted(loadContent);

    return {
      loading,
      error,
      renderedContent,
    };
  },
};
</script>

<style scoped>
.glide-documentation {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
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

.error {
  color: var(--error-color);
  text-align: center;
}

/* Enhance code blocks */
:deep(.markdown-body pre) {
  background: var(--surface-dark);
  border: 1px solid var(--surface-light);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

:deep(.markdown-body pre) {
  position: relative !important;
  padding: 2rem 1.5rem 1.5rem !important;
}

:deep(.markdown-body pre)::before {
  content: "TypeScript";
  position: absolute !important;
  top: 0 !important;
  right: 1rem !important;
  background: var(--primary-color) !important;
  color: var(--surface-darker) !important;
  padding: 0.2rem 1rem !important;
  border-radius: 0 0 0.5rem 0.5rem !important;
  font-size: 0.8rem !important;
  font-weight: 500 !important;
}

:deep(.markdown-body code) {
  font-family: "JetBrains Mono", monospace;
  color: var(--text-primary);
}

/* Enhance headings */
:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3) {
  color: var(--text-primary);
  border-bottom: 2px solid var(--surface-light);
  padding-bottom: 0.5rem;
  margin: 2rem 0 1rem;
}

/* Enhance links */
:deep(.markdown-body .links-section) {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

:deep(.markdown-body a) {
  color: var(--primary-color);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  background: var(--surface-dark);
  border: 1px solid var(--surface-light);
  transition: all 0.3s ease;
  display: inline-block;
}

:deep(.markdown-body a:hover) {
  background: var(--surface-light);
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

:deep(.enhanced-link) {
  position: relative !important;
  padding: 0.5rem 1rem !important;
  margin: 0.25rem !important;
  background: var(--surface-darker) !important;
  border: 1px solid var(--surface-light) !important;
  border-radius: var(--radius-md) !important;
  color: var(--primary-color) !important;
  text-decoration: none !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

:deep(.enhanced-link:hover) {
  transform: translateY(-2px) !important;
  border-color: var(--primary-color) !important;
  box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.2) !important;
}

/* Content boxes */
:deep(.markdown-body .content-box) {
  background: var(--surface-dark);
  border: 1px solid var(--surface-light);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  margin: 1.5rem 0;
}

/* Code highlighting for TypeScript */
:deep(.markdown-body .language-typescript),
:deep(.markdown-body .language-ts) {
  color: #9cdcfe;
}

:deep(.markdown-body .token.keyword) {
  color: #c586c0;
}

:deep(.markdown-body .token.string) {
  color: #ce9178;
}

:deep(.markdown-body .token.function) {
  color: #dcdcaa;
}

:deep(.markdown-body .token.comment) {
  color: #6a9955;
}

/* Add highlight.js TypeScript theme */
@import "highlight.js/styles/github-dark.css";

/* Enhanced content styling */
:deep(.markdown-body) {
  font-size: 1.1rem;
  line-height: 1.8;
}

:deep(.markdown-body p) {
  margin: 1.5rem 0;
}

:deep(.code-block) {
  position: relative;
  margin: 2rem 0;
}

:deep(.code-block:hover) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

/* Enhanced code block styling */
:deep(.code-block) {
  position: relative !important;
  margin: 2rem 0 !important;
  transition: all 0.3s ease !important;
}

:deep(.code-header) {
  position: absolute !important;
  top: 0 !important;
  right: 1rem !important;
  background: var(--primary-color) !important;
  padding: 0.2rem 0.8rem !important;
  border-radius: 0 0 var(--radius-sm) var(--radius-sm) !important;
  font-size: 0.8rem !important;
  color: var(--surface-darker) !important;
  opacity: 0.9 !important;
}

:deep(.code-block:hover) {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
}
</style>
