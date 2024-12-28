<template>
    <BaseEditor ref="editor" v-model="editorContent" :language="language" :read-only="readOnly" :options="editorOptions"
        @change="handleChange" @editor-ready="handleEditorReady" />
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import BaseEditor from './base/BaseEditor.vue';

export default defineComponent({
    name: 'AppEditor',
    components: { BaseEditor },
    props: {
        content: String,
        language: String,
        readOnly: Boolean
    },
    emits: ['update:content'],
    setup(props, { emit, expose }) {
        const monacoEditor = ref(null);
        const editorContent = ref(props.content || '');

        watch(() => props.content, (newContent) => {
            if (newContent !== editorContent.value) {
                editorContent.value = newContent;
            }
        }, { immediate: true });

        const editorOptions = {
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            folding: true,
            lineNumbers: true,
            automaticLayout: true,
            fontSize: 14
        };

        const handleChange = (value) => {
            emit('update:content', value);
        };

        const handleEditorReady = (editor) => {
            monacoEditor.value = editor;
        };

        const getCurrentContent = () => {
            return editorContent.value;
        };

        expose({
            getCurrentContent
        });

        return {
            monacoEditor,
            editorContent,
            editorOptions,
            handleChange,
            handleEditorReady
        };
    }
});
</script>

<style scoped>
/* Remove all styles as they're now handled in BaseEditor */
</style>
