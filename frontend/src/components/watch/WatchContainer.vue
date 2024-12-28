<template>
    <div class="watch-container">
        <div v-if="hasError" class="error-state">
            <p>{{ hasError ? 'Failed to load the selected template.' : 'Initializing...' }}</p>
            <button v-if="hasError" @click="handleReload">Reload</button>
        </div>
        <template v-else>
            <ActionSelect v-if="!hasSelection" @select="handleActionSelect" />
            <template v-else-if="selectedTemplate && selectedClient">
                <div class="visualization-layout">
                    <div class="code-section">
                        <WatchEditor :content="editorContent || ''" :language="currentLanguage"
                            @ready="handleEditorReady" @update:content="handleCodeUpdate" />
                        <WatchTerminal @ready="handleTerminalReady" />
                    </div>

                    <component v-if="currentVisualization && ws" :is="currentVisualization" :ws="ws"
                        :isConnected="isConnected" :terminal="terminalInstance" @terminal-write="handleTerminalWrite"
                        class="visualization-section" />
                </div>
            </template>
        </template>
    </div>
</template>

<script>
import { defineComponent, onMounted, computed, toRefs, onBeforeUnmount, nextTick } from 'vue';
import { useWatchInAction } from '@/composables/useWatchInAction';
import { store } from '@/store';
import WatchEditor from './components/WatchEditor.vue';
import WatchTerminal from './components/WatchTerminal.vue';
import ActionSelect from './ActionSelect.vue';
import LeaderboardVisualization from './visualizations/LeaderboardVisualization.vue';
import TaskManagerVisualization from './visualizations/TaskManagerVisualization.vue';
import { useEventBus } from '@/composables/useEventBus';

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
        const {
            ws,
            isConnected,
            terminalInstance,
            editorContent,
            currentVisualization,
            currentLanguage,
            isEditorReady,
            hasError,
            handleTerminalReady,
            handleTerminalWrite,
            handleEditorReady,
            handleCodeUpdate,
            handleReplace
        } = useWatchInAction();

        const selectedAction = computed( () => store.watchState?.selectedAction );
        const selectedTemplate = computed( () => store.currentUseCase );
        const selectedClient = computed( () => store.currentClient );

        const hasSelection = computed( () => {
            return store.watchState.selectedAction && store.watchState.selectedClient;
        } );

        const handleActionSelect = ( { action, client, language } ) => {
            try {
                store.setWatchState( client, action, language );
                if ( editorContent.value ) {
                    editorContent.value = store.getTemplateCode( client, action );
                }

                currentLanguage.value = language;

                currentVisualization.value = action === 'Leaderboard'
                    ? LeaderboardVisualization
                    : TaskManagerVisualization;
            } catch ( error ) {
                console.error( 'Error handling action select:', error );
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

        const cleanupAndReset = () => {
            if ( ws.value?.readyState === WebSocket.OPEN ) {
                ws.value.send( JSON.stringify( {
                    action: 'cleanup',
                    data: { force: true }
                } ) );
            }
            store.clearWatchState();
        };

        onMounted( () => {
            if ( !editorContent.value ) {
                editorContent.value = store.getInitialCode();
            }
            isEditorReady.value = true;

            window.requestAnimationFrame( () => {
                window.dispatchEvent( new Event( 'resize' ) );
            } );

            on( 'tab-changed', ( newTab ) => {
                cleanupAndReset();
            } );

            const tabElement = document.querySelector( '[data-tab="watch-in-action"]' );
            if ( tabElement ) {
                tabElement.addEventListener( 'click', () => {
                    cleanupAndReset();
                    store.watchState = { selectedAction: null, selectedClient: null };
                    nextTick( () => {
                        window.location.hash = '#select-screen';
                    } );
                } );
            }

            onBeforeUnmount( () => {
                off( 'tab-changed' );
                cleanupAndReset();
            } );

            const handleTabChange = ( tab ) => {
                store.clearWatchState();

                if ( tab === 'watch-in-action' ) {
                    store.watchState.selectedAction = null;
                    store.watchState.selectedClient = null;
                }
            };

            useEventBus().on( 'tab-changed', handleTabChange );

            onBeforeUnmount( () => {
                useEventBus().off( 'tab-changed', handleTabChange );
            } );

            const cleanup = () => {
                if ( currentVisualization.value?.__vueParent$?.exposed?.cleanup ) {
                    currentVisualization.value.__vueParent$?.exposed?.cleanup();
                }
                store.clearWatchState();
            };

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
        return {
            store,
            ws,
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
