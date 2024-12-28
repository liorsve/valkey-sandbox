<template>
    <div class="watch-container">
        <button v-if="hasSelection" class="replace-button" @click="handleReplace">
            <span class="button-icon">⟲</span>
            <span class="button-text">Back to Select</span>
        </button>
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

.replace-button {
    position: fixed;
    top: 10px;
    left: calc(var(--sidebar-width) - 80px);
    width: 160px;
    height: 40px;
    padding: 0 var(--spacing-sm);
    background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
    color: var(--text-primary);
    border: none;
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);
    z-index: 1000;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: var(--font-tabs);
    font-size: var(--text-xs);
    font-weight: 500;
    box-shadow:
        0 2px 6px rgba(0, 0, 0, 0.15),
        0 0 0 1px rgba(var(--primary-rgb), 0.1),
        0 0 15px rgba(var(--primary-rgb), 0.2);
    backdrop-filter: blur(6px);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -20px;

        right: -20px;
        bottom: -1px;
        background: linear-gradient(135deg,
                rgba(var(--primary-rgb), 0.5),
                rgba(var(--accent-rgb), 0.5));
        border-radius: inherit;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
        filter: blur(6px);
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: -80px;

        width: calc(100% + 160px);

        height: 100%;
        background: linear-gradient(to right,
                var(--primary-hover),
                var(--primary-color) 50%,
                var(--primary-hover));
        z-index: -1;
    }
}

.replace-button:hover {
    transform: scale(1.05);
    box-shadow:
        0 4px 8px rgba(0, 0, 0, 0.2),
        0 0 20px rgba(var(--primary-rgb), 0.4),
        0 0 0 1px rgba(var(--primary-rgb), 0.2),
        -3px 0 10px rgba(0, 0, 0, 0.3);

    &::before {
        opacity: 1;
    }
}

.button-icon {
    font-size: 16px;
    animation: float 2s ease-in-out infinite paused;
}

.replace-button:hover .button-icon {
    animation-play-state: running;
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-3px) rotate(180deg);
    }
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
