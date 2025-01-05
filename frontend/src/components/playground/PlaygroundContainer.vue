<template>
  <div class="playground-container">
    <div class="content-container">
      <div class="editor-container">
        <Editor
          ref="editorComponent"
          :content="currentContent"
          :language="editorLanguage"
          @update:content="handleEditorContentChange"
        />
      </div>
      <div v-if="loading" class="loading-overlay">Loading template...</div>
      <div class="terminal-container" :class="{ hidden: !terminalVisible }">
        <AppTerminal ref="terminal" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from "vue";
import { store } from "@/store";
import Editor from "../Editor.vue";
import AppTerminal from "../AppTerminal.vue";

export default defineComponent({
  name: "PlaygroundContainer",
  components: {
    Editor,
    AppTerminal,
  },
  props: {
    currentTab: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      default: "// Default initial content.",
    },
    language: {
      type: String,
      default: "javascript",
    },
    terminalVisible: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { expose }) {
    const currentContent = ref("// Loading...");
    const loading = ref(true);
    const editorComponent = ref(null);
    const terminal = ref(null);

    // Load content asynchronously
    onMounted(async () => {
      try {
        currentContent.value = await store.getInitialCode();
        store.setLastEditorContent(currentContent.value);
        loading.value = false;
      } catch (error) {
        console.error("Failed to load initial code:", error);
        currentContent.value = "// Failed to load template";
        loading.value = false;
      }
    });

    const editorLanguage = computed(() => {
      return store.getLanguage(store.currentClient);
    });

    const handleEditorContentChange = (newContent) => {
      currentContent.value = newContent;
    };

    const getCurrentContent = () => {
      return (
        editorComponent.value?.getCurrentContent?.() || currentContent.value
      );
    };

    const handleExecutionResult = (result) => {
      if (!result) return;

      let output = result.output;

      if (output) {
        terminal.value?.write(output + "\n");
      }

      if (result.error) {
        terminal.value?.writeError(result.error);
      }
    };

    expose({
      getCurrentContent,
      editorComponent,
    });

    watch(
      () => props.content,
      async (newContent) => {
        if (typeof newContent === "string") {
          currentContent.value = newContent;
          loading.value = false;
        }
      },
      { immediate: true }
    );

    return {
      currentContent,
      loading,
      editorLanguage,
      handleEditorContentChange,
      editorComponent,
      handleExecutionResult,
      terminal,
    };
  },
});
</script>

<style scoped>
.playground-container {
  display: flex;
  flex: 1;
  background: var(--surface-darker);
  margin-left: var(--sidebar-width);
  max-height: calc(100vh - var(--top-tabs-height));
  overflow: hidden;
  position: relative;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-sm) var(--spacing-lg) var(--spacing-lg);
  gap: var(--spacing-md);
  max-height: 100%;
  position: absolute;
  inset: 0;
}

.editor-container {
  flex: 2;
  min-height: 0;
  max-height: calc(70vh - var(--top-tabs-height));
  overflow: hidden;
  background: var(--surface-dark);
  position: relative;
}

.terminal-container {
  flex: 1;
  min-height: 200px;
  max-height: calc(30vh - var(--spacing-lg));
  overflow: hidden;
  background: var(--surface-dark);
  position: relative;
}

.terminal-container.hidden {
  display: none;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  font-size: 1.2rem;
  z-index: 10;
}
</style>
