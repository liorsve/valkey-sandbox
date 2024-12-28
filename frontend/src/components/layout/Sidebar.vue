<template>
  <aside class="sidebar">
    <div class="sidebar__selects">
      <div class="select-container">
        <select v-model="selectedClient" class="sidebar__select">
          <option v-for="client in availableClients" :key="client.id" :value="client.id">
            {{ client.name }}
          </option>
        </select>
      </div>

      <div v-if="currentTab === 'playground'" class="select-container">
        <select v-model="selectedMode" class="sidebar__select">
          <option v-for="mode in modes" :key="mode.id" :value="mode.id">
            {{ mode.name }}
          </option>
        </select>
      </div>
    </div>

    <div class="sidebar__content">
      <div class="sidebar__sections">
        <div v-if="currentTab === 'commonUseCases'" class="use-cases">
          <div class="use-cases__grid">
            <button v-for="useCase in useCases" :key="useCase.id"
              :class="['use-case-button', { active: selectedUseCase === useCase.id }]"
              @click="handleUseCaseChange(useCase.id)">
              <div class="use-case-content">
                <span class="use-case-title">{{ useCase.name }}</span>
                <span class="use-case-indicator"></span>
              </div>
              <div class="use-case-glow"></div>
            </button>
          </div>
        </div>
      </div>

      <div class="sidebar__actions">
        <button class="sidebar__action-button sidebar__action-button--primary" @click="handleAction('run')">
          Run Code
        </button>
        <button class="sidebar__action-button sidebar__action-button--secondary" @click="handleAction('clear')">
          Clear Output
        </button>
      </div>
    </div>
    <div class="sidebar__bottom-logo">
      <img src="@/assets/images/logo.png" alt="sandbox-logo" />
    </div>
  </aside>
</template>

<script>
import { ref, computed, watch, onMounted, inject } from 'vue';
import { store } from '../../store';
import { useEventBus, EventTypes } from '../../composables/useEventBus';
import { useWebSocket } from '../../composables/useWebSocket';

export default {
  name: 'AppSidebar',
  props: {
    currentTab: {
      type: String,
      required: true,
    },
  },
  emits: [ 'content-update' ],
  setup( props, { emit } ) {
    const getEditorContent = inject( 'getEditorContent' );
    const eventBus = useEventBus();
    const wsManager = useWebSocket();

    const selectedClient = ref( store.currentClient || store.getDefaultClient() );
    const selectedMode = ref( store.executionMode || store.getDefaultMode() );
    const selectedUseCase = ref( store.currentUseCase );

    const clients = computed( () => store.getAllClients() );
    const modes = computed( () => store.getAllModes() );
    const useCases = computed( () => store.getAllUseCases() );

    const availableClients = computed( () => {
      if ( props.currentTab === 'commonUseCases' || props.currentTab === 'challenges' ) {
        return store.getGlideClients();
      }
      return store.getAllClients();
    } );

    const updateContent = ( clientId, templateName ) => {
      try {
        if ( !clientId || !templateName ) {
          throw new Error( 'Client ID or Template Name is undefined.' );
        }
        const content = store.getTemplateCode( clientId, templateName );
        emit( 'content-update', content );
      } catch ( error ) {
        console.error( 'Error updating content:', error );
        emit( 'content-update', "// Error loading template." );
      }
    };

    const handleUseCaseChange = ( newUseCase ) => {
      store.setUseCase( newUseCase );
      updateContent( store.currentClient, newUseCase );
    };

    const handleAction = ( action ) => {
      try {
        switch ( action ) {
          case 'run': {
            eventBus.emit( EventTypes.TERMINAL_CLEAR );
            if ( store.getLanguage( selectedClient.value ) === 'java' || store.getLanguage( selectedClient.value ) === 'go' ) {
              eventBus.emit( EventTypes.TERMINAL_OUTPUT, "⚠️  This language is not supported yet" );
              return;
            }
            const codeToRun = getEditorContent();
            if ( !codeToRun ) {
              store.addNotification( 'No code to run', 'error' );
              return;
            }

            if ( !wsManager.isConnectionValid() ) {
              store.addNotification( 'WebSocket connection not ready', 'error' );
              return;
            }

            const message = {
              action: 'runCode',
              data: {
                code: codeToRun,
                language: store.getLanguage( selectedClient.value ),
                mode: props.currentTab === 'playground' ? selectedMode.value : 'Cluster',
                useCase: props.currentTab === 'commonUseCases' ? selectedUseCase.value : null,
              },
            };

            wsManager.send( message );
            console.log( '[Sidebar] Sending CODE_EXECUTION event...' );
            eventBus.emit( EventTypes.CODE_EXECUTION, { status: 'started' } );
            break;
          }
          case 'clear':
            eventBus.emit( EventTypes.TERMINAL_CLEAR );
            break;
        }
      } catch ( error ) {
        console.error( '[Action] Error:', error );
        store.addNotification( error.message, 'error' );
        eventBus.emit( EventTypes.ERROR, error.message );
      }
    };

    const handleWebSocketMessage = ( normalizedMessage ) => {
      try {
        const { action, payload } = normalizedMessage;
        if ( !action ) return;

        let successMessage, errorMessage;

        switch ( action ) {
          case 'terminalOutput':
            eventBus.emit( EventTypes.TERMINAL_OUTPUT, payload );
            break;

          case 'executionResult':
            successMessage = payload?.success ? `✅ Execution Successful: ${ payload.message }` : null;
            errorMessage = !payload?.success ? `❌ Execution Failed: ${ payload.error }` : null;
            eventBus.emit(
              EventTypes.TERMINAL_OUTPUT,
              successMessage || errorMessage
            );
            break;

          case 'output':
            if ( payload?.output ) {
              eventBus.emit( EventTypes.TERMINAL_OUTPUT, payload.output );
            }
            break;

          case 'connected':
            console.debug( '[Sidebar] Connected with ID:', payload?.id );
            break;

          default:
            console.debug( '[Sidebar] Unhandled message action:', action );
        }
      } catch ( error ) {
        console.error( '[Sidebar] Error handling WebSocket message:', error );
      }
    };

    onMounted( () => {
      // Add WebSocket message listener just once
      wsManager.addMessageListener( handleWebSocketMessage );

      // Initialize client, mode, and use case
      if ( !selectedClient.value ) {
        selectedClient.value = store.getDefaultClient();
        store.setClient( selectedClient.value );
      }
      if ( !selectedMode.value ) {
        selectedMode.value = store.getDefaultMode();
        store.setMode( selectedMode.value );
      }
      if ( !selectedUseCase.value && props.currentTab === 'commonUseCases' ) {
        selectedUseCase.value = 'Session Cache';
        handleUseCaseChange( 'Session Cache' );
      }
      const template = props.currentTab === 'playground' ? selectedMode.value : selectedUseCase.value;
      updateContent( store.currentClient, template );
    } );

    watch( () => props.currentTab, ( newTab ) => {
      if ( newTab === 'commonUseCases' ) {
        if ( !selectedClient.value.includes( 'glide' ) ) {
          selectedClient.value = 'glide-node';
          store.setClient( selectedClient.value );
        }
        if ( !selectedUseCase.value ) {
          selectedUseCase.value = 'Session Cache';
          handleUseCaseChange( 'Session Cache' );
        } else {
          updateContent( store.currentClient, store.currentUseCase );
        }
      } else if ( newTab === 'playground' ) {
        updateContent( store.currentClient, store.executionMode );
      }
    } );

    watch( selectedClient, ( newClient ) => {
      store.setClient( newClient );
      if ( props.currentTab === 'playground' ) {
        updateContent( newClient, selectedMode.value );
      } else {
        updateContent( newClient, selectedUseCase.value );
      }
    } );

    watch( selectedMode, ( newMode ) => {
      store.setMode( newMode );
      updateContent( store.currentClient, newMode );
    } );

    return {
      selectedMode,
      selectedClient,
      selectedUseCase,
      clients,
      modes,
      useCases,
      handleUseCaseChange,
      availableClients,
      handleAction,
    };
  },
};
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  min-width: var(--sidebar-width);
  max-width: var(--sidebar-width);
  background: var(--surface-dark);
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: var(--z-sidebar);
  border-right: 1px solid var(--border-color);
}

/* Updated select styles */
.sidebar__selects {
  padding: 20px var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  background: var(--surface-dark);
}

.select-container {
  position: relative;
}

.sidebar__select {
  height: 42px;
  width: 100%;
  padding: 0 var(--spacing-xl);
  background: var(--surface-darker);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: var(--font-tabs);
  font-size: var(--text-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238793b2' d='M2 4l4 4 4-4'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
}

.sidebar__select:hover {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 1px var(--primary-color);
  transform: translateY(-1px);
}

/* Updated content padding to account for new select position */
.sidebar__content {
  padding: var(--spacing-xl) var(--spacing-lg) 0;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.sidebar__sections {
  margin-top: var(--spacing-xl);
}

.select-wrapper {
  margin-top: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
}

.select-wrapper label {
  display: block;
  color: var(--text-secondary);
  font-size: var(--text-sm);
  margin-bottom: var(--spacing-xs);
}

.sidebar__button {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--surface-darker);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  text-align: left;
  cursor: pointer;
  transition: var(--transition-normal);
}

.sidebar__button:hover {
  background: var(--surface-light);
  border-color: var (--primary-color);
}

.sidebar__button.active {
  background: var(--primary-color);
  border-color: var(--primary-hover);
  color: var(--surface-darker);
}

.sidebar__actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-top: auto;
  padding-top: var(--spacing-xl);
}

.sidebar__action-button {
  width: 100%;
  padding: var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  cursor: pointer;
  transition: var(--transition-normal);
}

.sidebar__action-button--primary {
  background: var(--button-gradient);
  color: white;
}

.sidebar__action-button--secondary {
  background: var(--surface-darker);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.sidebar__logo {
  display: flex;
  justify-content: center;
  padding-top: var(--spacing-xl);
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.sidebar__logo:hover {
  opacity: 1;
}

.sidebar__logo img {
  width: 40px;
  height: auto;
}

.sidebar__bottom-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-xl) 0;
  margin-top: auto;
  margin-bottom: var(--spacing-xl);
}

.sidebar__bottom-logo img {
  width: 80%;
  height: auto;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.sidebar__bottom-logo img:hover {
  opacity: 1;
}

.sidebar__section {
  margin-bottom: var(--spacing-lg);
}

.sidebar__label {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  margin-bottom: var(--spacing-sm);
  font-weight: var(--font-medium);
}

.use-cases {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.use-cases label {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  margin-bottom: var(--spacing-md);
}

.use-cases__grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-sm);
  flex: 1;
  overflow-y: auto;
  max-width: calc(var(--sidebar-width) - 24px);
}

.use-case-button {
  position: relative;
  width: calc(100% - 8px);
  margin: 0 4px;
  padding: var(--spacing-lg);
  background: var(--surface-darker);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.use-case-content {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.use-case-title {
  font-family: var(--font-tabs);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(var(--sidebar-width) - 80px);
}

.use-case-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-secondary);
  transition: all 0.3s ease;
}

.use-case-button:hover {
  transform: translateX(4px);
  background: var(--surface-light);
  border-color: var(--primary-color);
}

.use-case-button.active {
  background: var(--primary-color);
  border-color: var(--primary-hover);
  color: white;
}

.use-case-button.active .use-case-indicator {
  background: white;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.use-case-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(0, 154, 222, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.use-case-button:hover::before {
  opacity: 1;
}

.select-container {
  position: relative;
}

.select-decorative-top {
  position: absolute;
  top: -10px;
  left: 10px;
  right: 10px;
  height: 2px;
  background: var(--primary-color);
  opacity: 0.5;
  border-radius: 2px;
}

.select-glow {
  position: absolute;
  top: -5px;
  left: 0;
  right: 0;
  height: 10px;
  background: var(--primary-color);
  filter: blur(8px);
  opacity: 0.1;
  pointer-events: none;
}

.use-case-glow {
  position: absolute;
  inset: 0;
  border-radius: var(--radius-md);
  border: 1px solid var(--primary-color);
  opacity: 0.1;
  transition: opacity 0.3s ease;
}

.use-case-button:hover .use-case-glow {
  opacity: 0.3;
  box-shadow: 0 0 15px var(--primary-color);
}

.use-case-button.active .use-case-glow {
  opacity: 1;
  background: var(--primary-color);
}
</style>
