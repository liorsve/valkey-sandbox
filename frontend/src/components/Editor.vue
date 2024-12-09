<template>
  <div ref="editorContainer" class="editor-container">
    <vue-monaco-editor ref="editorRef" v-model="localModelValue" :language="language" theme="vs-dark"
      :options="MONACO_EDITOR_OPTIONS" @mounted="onEditorMounted" />
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch, nextTick } from 'vue';
import VueMonacoEditor from '@guolao/vue-monaco-editor';

export default defineComponent({
  name: 'CodeEditor',
  components: { VueMonacoEditor },
  props: {
    language: {
      type: String,
      default: 'javascript',
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editorRef = ref(null);
    const isEditorMounted = ref(false);

    const localModelValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    const MONACO_EDITOR_OPTIONS = {
      automaticLayout: true,
      formatOnType: true,
      formatOnPaste: true,
      fixedOverflowWidgets: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: "on",
      wrappingIndent: "indent",
      glyphMargin: false,
      scrollbar: {
        vertical: 'auto',
        horizontal: 'auto',
      },
      fontSize: 14,
      lineHeight: 20,
    };

    const handlePaste = () => {
      editorRef.value?.editor?.getAction('editor.action.formatDocument').run();
    };

    const handleBlur = () => {
      editorRef.value?.editor?.getAction('editor.action.formatDocument').run();
    };

    const onEditorMounted = () => {
      nextTick(() => {
        isEditorMounted.value = true;
        editorRef.value?.editor?.layout();
      });
    };

    watch(localModelValue, (newVal) => {
      if (isEditorMounted.value) {
        editorRef.value?.editor?.setValue(newVal);
      }
    });

    watch(() => props.language, (newLang) => {
      if (isEditorMounted.value) {
        monaco.editor.setModelLanguage(editorRef.value?.editor?.getModel(), newLang);
      }
    });

    return {
      MONACO_EDITOR_OPTIONS,
      handlePaste,
      handleBlur,
      onEditorMounted,
      editorRef,
      localModelValue,
    };
  },
});
</script>

<style scoped>
.editor-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.vue-monaco-editor {
  flex: 1;
  min-height: 0;
}
</style>
