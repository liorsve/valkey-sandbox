<template>
  <div id="editor" />
</template>

<script>
import * as monaco from 'monaco-editor';

export default {
  name: 'CodeEditor',
  props: {
    language: {
      type: String,
      default: 'javascript',
    },
  },
  watch: {
    language(newLang) {
      if (this.editor) {
        monaco.editor.setModelLanguage(this.editor.getModel(), newLang);
      }
    },
  },
  mounted() {
    this.setupEditor();
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.dispose();
    }
  },
  methods: {
    setValue(value) {
      if (this.editor) {
        this.editor.setValue(value);
      }
    },
    getValue() {
      return this.editor ? this.editor.getValue() : '';
    },
    setupEditor() {
      this.editor = monaco.editor.create(this.$el, {
        value: '',
        language: this.language,
        theme: 'vs-dark',
      });
    },
  },
};
</script>

<style scoped>
#editor {
  width: 100%;
  height: 100%;
  border: thick double #252424;
}
</style>
