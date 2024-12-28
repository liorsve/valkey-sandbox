<template>
    <div class="watch-container">
        <ActionSelect v-if="!selectedAction" @select="handleActionSelect" />

        <template v-else>
            <div class="visualization-layout">
                <div class="code-section">
                    <Editor :content="editorContent" :language="currentLanguage" @update:content="handleCodeUpdate" />
                    <AppTerminal ref="terminal" @ready="handleTerminalReady" />
                </div>

                <component :is="activeVisualization" :ws="ws" :isConnected="isConnected" :terminal="terminalInstance"
                    @terminal-write="handleTerminalWrite" class="visualization-section" />
            </div>

            <button class="replace-button" @click="handleReplace">
                <span class="icon">⟳</span> Replace
            </button>
        </template>
    </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted, provide } from 'vue';
import { useWebSocket } from '@/composables/useWebSocket';
import { store } from '@/store';
import Editor from '../Editor.vue';
import AppTerminal from '../AppTerminal.vue';
import ActionSelect from './ActionSelect.vue';
import LeaderboardVisual from './visualizations/LeaderboardVisualization.vue';
import TaskManagerVisual from './visualizations/TaskManagerVisualization.vue';

export default defineComponent( {
    name: 'WatchVisualization',
    components: {
        Editor,
        AppTerminal,
        ActionSelect,
        LeaderboardVisual,
        TaskManagerVisual
    },
    setup() {
        const { ws, isConnected } = useWebSocket( 'ws://localhost:3000/appws' );

        const selectedAction = ref( null );
        const terminalInstance = ref( null );
        const editorContent = ref( '' );

        const activeVisualization = computed( () =>
            selectedAction.value?.action === 'Leaderboard' ? LeaderboardVisual : TaskManagerVisual
        );

        const currentLanguage = computed( () => {
            return selectedAction.value?.language || '';
        } );

        const handleActionSelect = ( action ) => {
            selectedAction.value = action;
            const template = store.getTemplateCode( action.client, action.action );
            editorContent.value = template || '';

            // Notify terminal of selection
            if ( terminalInstance.value ) {
                terminalInstance.value.writeln( `\x1b[1;32m>>> Selected ${ action.action } with ${ action.client }\x1b[0m` );
            }

            ws.value?.send( JSON.stringify( {
                action: 'init',
                component: action.action,
                client: action.internalClient
            } ) );
        };

        const handleTerminalReady = ( terminal ) => {
            terminalInstance.value = terminal;
            terminal.writeln( '\x1b[1;34m=== Watch in Action Terminal ===\x1b[0m' );
        };

        const handleTerminalWrite = ( message ) => {
            terminalInstance.value?.writeln( message );
        };

        const handleCodeUpdate = ( content ) => {
            editorContent.value = content;
        };

        const handleReplace = () => {
            ws.value?.send( JSON.stringify( { action: 'cleanup' } ) );
            selectedAction.value = null;
        };

        provide( 'terminal', terminalInstance );

        const visualizeData = ( data ) => {
            const displayClient = store.currentClient;
            console.log( `[Visualization] Displaying data for ${ displayClient }` );
        };

        return {
            selectedAction,
            activeVisualization,
            currentLanguage,
            ws,
            isConnected,
            terminalInstance,
            editorContent,
            handleActionSelect,
            handleTerminalReady,
            handleTerminalWrite,
            handleCodeUpdate,
            handleReplace,
            visualizeData
        };
    }
} );
</script>

<style scoped>
.watch-container {
    height: 100%;
    background: var(--surface-darker);
    position: relative;
}

.visualization-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    height: 100%;
    padding: var(--spacing-md);
}

.code-section {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.code-section :deep(> *) {
    flex: 1;
}

.visualization-section {
    background: #292929;
    border-radius: var(--radius-md);
    overflow: hidden;
}

.replace-button {
    position: fixed;
    top: var(--spacing-md);
    left: var(--spacing-md);
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #4a148c, #7b1fa2);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 100;
    transition: transform 0.2s;
}

.replace-button:hover {
    transform: translateY(-1px);
}
</style>
