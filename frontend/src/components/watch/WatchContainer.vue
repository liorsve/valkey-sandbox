<template>
    <div class="watch-container">
        <div v-if="hasError" class="error-state">
            <p>{{ hasError ? 'Failed to load the selected template.' : 'Initializing...' }}</p>
            <button v-if="hasError" @click="handleReload">Reload</button>
        </div>
        <template v-else>
            <ActionSelect v-if="!hasSelection" @select="handleActionSelect" />

            <div v-else class="visualization-layout">
                <div class="code-section">
                    <WatchEditor :content="editorContent" :language="currentLanguage" @ready="handleEditorReady"
                        @update:content="handleCodeUpdate" />
                    <WatchTerminal @ready="handleTerminalReady" />
                </div>

                <component v-if="currentVisualization" :is="currentVisualization" :ws="ws" :isConnected="isConnected"
                    :terminal="terminalInstance" @terminal-write="handleTerminalWrite" class="visualization-section" />
            </div>
        </template>
    </div>
</template>

<script>
import { defineComponent, onMounted, computed, toRefs, onBeforeUnmount, nextTick, watch, ref, provide } from 'vue';
import { useWatchInAction } from '@/composables/useWatchInAction';
import { store } from '@/store';
import WatchEditor from './components/WatchEditor.vue';
import WatchTerminal from './components/WatchTerminal.vue';
import ActionSelect from './ActionSelect.vue';
import LeaderboardVisualization from './visualizations/LeaderboardVisualization.vue';
import TaskManagerVisualization from './visualizations/TaskManagerVisualization.vue';
import { useEventBus } from '@/composables/useEventBus';
import { useWebSocket } from '@/composables/useWebSocket';

export default defineComponent( {
    name: 'WatchContainer',
    components: {
        WatchEditor,
        WatchTerminal,
        ActionSelect,
        LeaderboardVisualization,
        TaskManagerVisualization
    },
    setup() {
        const wsManager = useWebSocket();
        const terminalInstance = ref(null);

        provide('websocket', wsManager);
        provide('terminal', terminalInstance);

        const {
            isConnected,
            editorContent,
            currentVisualization,
            currentLanguage,
            isEditorReady,
            hasError,
            handleTerminalWrite,
            handleEditorReady,
            handleCodeUpdate,
            handleReplace
        } = useWatchInAction();

        const cleanup = async () => {
            if (currentVisualization.value?.__vueParent$?.exposed?.cleanup) {
                await currentVisualization.value.__vueParent$?.exposed?.cleanup();
            }
            if (wsManager.ws?.readyState === WebSocket.OPEN) {
                await wsManager.send({ action: 'cleanup', force: true });
            }
            store.clearWatchState();
        };

        const handleTabChange = () => {
            cleanup();
        };

        const handleTerminalReady = (term) => {
            terminalInstance.value = term;
            term.writeln('\x1b[1;34m=== Watch in Action Terminal ===\x1b[0m');
            term.writeln(' Ready to watch your actions in real-time...');
        };

        const selectedAction = computed( () => store.watchState?.selectedAction );
        const selectedTemplate = computed( () => store.currentUseCase );
        const selectedClient = computed( () => store.currentClient );

        const hasSelection = computed( () => {
            return Boolean( store.watchState?.selectedAction );
        } );

        const handleActionSelect = ( { action, client, language } ) => {
            try {
                store.setWatchState( client, action, language );
                currentLanguage.value = language;
                editorContent.value = store.getTemplateCode( client, action );

                currentVisualization.value = action === 'Leaderboard'
                    ? LeaderboardVisualization
                    : TaskManagerVisualization;
            } catch ( error ) {
                console.error( 'Error handling action select:', error );
                hasError.value = true;
            }
        };

        const currentVisualizationComponent = computed( () => {
            const template = selectedTemplate.value;
            if ( !template ) return null;

            switch ( template ) {
                case 'Leaderboard':
                    return 'LeaderboardVisualization';
                case 'Task Manager':
                    return 'TaskManagerVisualization';
                default:
                    return null;
            }
        } );

        const { on, off } = useEventBus();

        onMounted( () => {
            if ( !editorContent.value ) {
                editorContent.value = store.getInitialCode();
            }
            isEditorReady.value = true;

            window.requestAnimationFrame( () => {
                window.dispatchEvent( new Event( 'resize' ) );
            } );

            on( 'tab-changed', handleTabChange );

            const tabElement = document.querySelector( '[data-tab="watch-in-action"]' );
            if ( tabElement ) {
                tabElement.addEventListener( 'click', () => {
                    cleanup();
                    store.watchState = { selectedAction: null, selectedClient: null };
                    nextTick( () => {
                        window.location.hash = '#select-screen';
                    } );
                } );
            }

            watch(
                () => store.currentTab,
                async ( newTab, oldTab ) => {
                    if ( oldTab === 'watchInAction' || newTab === 'watchInAction' ) {
                        await cleanup();
                    }
                }
            );

            onBeforeUnmount( async () => {
                off( 'tab-changed' );
                await cleanup();
            } );

            useEventBus().on( 'tab-changed', ( newTab ) => {
                if ( newTab === 'watchInAction' && store.watchState?.selectedAction ) {
                    cleanup();
                }
            } );

            onBeforeUnmount( () => {
                useEventBus().off( 'tab-changed' );
                cleanup();
            } );
        } );

        onBeforeUnmount(() => {
            off('tab-changed');
            cleanup();
        });

        return {
            store,
            ws: wsManager.ws,
            isConnected,
            selectedAction,
            selectedTemplate,
            selectedClient,
            terminalInstance,
            editorContent,
            currentVisualization: currentVisualizationComponent,
            currentLanguage,
            isEditorReady,
            hasError,
            handleActionSelect,
            handleTerminalReady,
            handleTerminalWrite,
            handleEditorReady,
            handleCodeUpdate,
            handleReload: () => window.location.reload(),
            hasSelection,
            handleReplace
        };
    }
} );
</script>

<style scoped>
.watch-container {
    height: calc(100vh - var(--header-height));
    width: 100%;
    background: var(--surface-darker);
    position: relative;
    overflow: hidden;
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-top: 0;
}

.visualization-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    max-width: 100%;
    height: calc(100% - var(--top-tabs-height));
    flex: 1;
    min-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
    margin-top: var(--spacing-md);
}

.code-section {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    padding-bottom: 10px;
}

.visualization-section {
    background: linear-gradient(145deg, var(--surface-light), var(--surface-dark));
    border: 1px solid var(--accent-highlight);
    box-shadow: 0 0 15px rgba(0, 195, 255, 0.1);
    border-radius: var(--radius-md);
    overflow: hidden;
    height: inherit;
    display: flex;
    flex-direction: column;
}

.error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 1rem;
}

.error-state button {
    padding: 0.5rem 1rem;
    background: var(--primary-color);
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
}
</style>
