<template>
  <div ref="editorContainer" class="editor-container">
    <vue-monaco-editor v-model:value="code" :language="language" theme="vs-dark" :options="MONACO_EDITOR_OPTIONS"
      @mount="handleMount" @change="onChange" />
    <div v-if="showTestMarkers" class="test-markers">
      <div v-for="marker in testMarkers" :key="marker.id" :class="['marker', marker.type]"
        :style="{ top: `${marker.line * 19}px` }">
        {{ marker.message }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, shallowRef, onBeforeUnmount, computed, nextTick, onMounted } from 'vue';
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';

export default defineComponent({
  components: {
    VueMonacoEditor,
  },
  name: 'AppEditor',
  props: {
    language: {
      type: String,
      default: 'javascript',
    },
    content: {
      type: String,
      default: '',
    },
    showTestMarkers: {
      type: Boolean,
      default: false
    },
    testResults: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:content'],
  setup(props, { emit }) {
    const MONACO_EDITOR_OPTIONS = {
      automaticLayout: true,
      formatOnType: true,
      formatOnPaste: true,
      fixedOverflowWidgets: true,
      glyphMargin: true,
      scrollbar: {
        vertical: 'auto',
        horizontal: 'auto',
      },
      fontSize: 14,
    };
    const editorRef = shallowRef();
    const code = ref(props.content);

    const handleResize = () => {
      if (editorRef.value) {
        editorRef.value.layout();
      }
    };

    const handlePaste = () => {
      editorRef.value?.getAction('editor.action.formatDocument').run();
    };

    const handleBlur = () => {
      editorRef.value?.getAction('editor.action.formatDocument').run();
    };

    const handleMount = editor => {
      editorRef.value = editor;
      code.value = props.content;

      nextTick(() => {
        if (editor) {
          const editorContainer = editor.getDomNode();
          if (editorContainer) {
            editorContainer.style.paddingTop = '10px';
            handleResize();
          }
        }
      });
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
      if (editorRef.value) {
        editorRef.value.dispose();
      }
    });

    const onChange = (value) => {
      emit('update:content', value);
    };

    const testMarkers = computed(() => {
      return props.testResults.map((result, index) => ({
        id: index,
        line: result.line,
        type: result.passed ? 'success' : 'error',
        message: result.message
      }));
    });

    // Add test decorations
    watch(() => props.testResults, (newResults) => {
      if (editorRef.value && newResults.length) {
        const editor = editorRef.value;
        editor.deltaDecorations([], newResults.map(result => ({
          range: new monaco.Range(result.line, 1, result.line, 1),
          options: {
            isWholeLine: true,
            className: `test-decoration ${result.passed ? 'success' : 'error'}`
          }
        })));
      }
    });

    watch(() => props.content, (newContent) => {
      if (code.value !== newContent) {
        code.value = newContent;
      }
    });

    watch(() => props.language, (newLang) => {
      editorRef.value?.updateOptions({ language: newLang });
    });

    return {
      MONACO_EDITOR_OPTIONS,
      handlePaste,
      handleBlur,
      handleMount,
      handleResize,
      editorRef,
      code,
      onChange,
      testMarkers
    };
  },
});
</script>

<style scoped>
.editor-container {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.test-markers {
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 100%;
  pointer-events: none;
}

.marker {
  position: absolute;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.marker.success {
  background-color: #4caf50;
}

.marker.error {
  background-color: #f44336;
}

:deep(.test-decoration.success) {
  background-color: rgba(76, 175, 80, 0.1);
}

:deep(.test-decoration.error) {
  background-color: rgba(244, 67, 54, 0.1);
}
</style>
