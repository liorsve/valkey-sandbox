<template>
    <div class="base-editor">
        <vue-monaco-editor ref="editor" v-model:value="content" :language="language" theme="vs-dark"
            :options="editorOptions" :class="className" :width="'100%'" :height="'100%'" @mount="handleMount"
            @change="handleChange" @validate="handleValidation" />
    </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { VueMonacoEditor } from '@guolao/vue-monaco-editor';

export default defineComponent({
    name: 'BaseEditor',
    components: {
        VueMonacoEditor
    },
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        language: {
            type: String,
            default: 'javascript'
        },
        readOnly: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'change', 'editor-ready', 'validate'],
    setup(props, { emit, expose }) {
        const editor = ref(null);
        const className = computed(() => 'monaco-editor-instance');
        const content = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value)
        });

        const editorOptions = {
            fontFamily: 'JetBrains Mono, Consolas, monospace',
            fontSize: 14,
            lineHeight: 21,
            minimap: { enabled: false },
            scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                useShadows: false,
                verticalScrollbarSize: 12,
                horizontalScrollbarSize: 12
            },
            overviewRulerBorder: false,
            automaticLayout: true,
            padding: { top: 16 },
            lineNumbers: 'on',
            roundedSelection: true,
            renderLineHighlight: 'all',
            wordWrap: 'on',
            folding: true,
            bracketPairColorization: {
                enabled: true,
                independentColorPoolPerBracketType: true,
            },
            guides: {
                indentation: true,
                highlightActiveIndentation: true,
            },
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: true,
            smoothScrolling: true,
            contextmenu: true,
            mouseWheelZoom: true,
            renderWhitespace: 'selection',
            readOnly: props.readOnly,
            theme: 'vs-dark'
        };

        const handleMount = (editorInstance, monaco) => {
            editor.value = editorInstance;
            emit('editor-ready', editorInstance);
        };

        const handleChange = (value) => {
            emit('change', value);
        };

        const handleValidation = (markers) => {
            emit('validate', markers);
        };

        const getCurrentContent = () => {
            return content.value;
        };

        expose({
            getCurrentContent,
            getEditor: () => editor.value
        });

        return {
            content,
            editorOptions,
            handleMount,
            handleChange,
            handleValidation,
            editor,
            className
        };
    }
});
</script>

<style scoped>
.base-editor {
    height: 100%;
    background: var(--surface-dark);
    border-radius: var(--radius-md);
    overflow: hidden;
    display: flex;
    border: 2px solid rgba(0, 0, 0, 0.3);
    /* Added this line */
}

:deep(.monaco-editor) {
    padding-top: var(--spacing-sm);
}

:deep(.monaco-editor .overflow-guard) {
    border-radius: var(--radius-md);
}

:deep(.monaco-editor .scrollbar .slider) {
    background: var(--surface-light) !important;
    border: 4px solid var(--surface-dark);
    border-radius: var(--radius-sm);
}

:deep(.monaco-editor .scrollbar .slider:hover) {
    background: var(--text-secondary) !important;
}

:deep(.monaco-editor .margin) {
    background: transparent !important;
}

:deep(.monaco-editor .glyph-margin) {
    background: var(--surface-darker) !important;
}

:deep(.decorationsOverviewRuler) {
    display: none;
}

:deep(.monaco-editor .cursors-layer .cursor) {
    transition: all 0.1s ease;
}
</style>
