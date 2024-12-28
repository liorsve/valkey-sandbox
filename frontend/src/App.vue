<template>
  <div class="app">
    <TopTabs :activeTab="store.currentTab" @change-tab="handleTabChange" />
    <main class="app-main">
      <Sidebar v-if="store.currentTab !== 'watchInAction'" :current-tab="store.currentTab"
        @content-update="handleContentUpdate" />
      <component :is="currentView" ref="mainComponent" :current-tab="store.currentTab" :content="editorContent"
        :language="currentLanguage" :terminal-visible="store.terminalVisible" class="main-content"
        :class="{ 'full-width': store.currentTab === 'watchInAction' }" />
    </main>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref, provide } from 'vue';
import { store } from './store';
import { wsInstance, ensureConnection } from './composables/useWebSocket';
import { useEventBus, EventTypes } from './composables/useEventBus';
import TopTabs from './components/layout/TopTabs.vue';
import Sidebar from './components/layout/Sidebar.vue';
import PlaygroundContainer from './components/playground/PlaygroundContainer.vue';
import WatchContainer from './components/watch/WatchContainer.vue';

export default defineComponent( {
  name: 'App',
  components: {
    TopTabs,
    Sidebar,
    PlaygroundContainer,
    WatchContainer,
  },
  setup() {
    const mainComponent = ref( null );
    const editorContent = ref( store.getInitialCode() || "// Initial code not available." );

    const getEditorContent = () => {
      return mainComponent.value?.getCurrentContent?.() || '';
    };

    provide( 'getEditorContent', getEditorContent );
    provide( 'editorContent', editorContent );

    const currentView = computed( () => {
      const tab = store.currentTab;
      if ( !tab ) return PlaygroundContainer;

      switch ( tab ) {
        case 'watchInAction':
          return WatchContainer;
        case 'playground':
        case 'commonUseCases':
        default:
          return PlaygroundContainer;
      }
    } );

    const currentLanguage = computed( () => {
      return store.getLanguage( store.currentClient );
    } );

    const editorLanguage = computed( () => {
      return store.getLanguage( selectedClient.value );
    } );

    const handleTabChange = async ( tab ) => {
      try {
        const { emit: emitEvent } = useEventBus();
        const prevTab = store.currentTab;

        // Clear terminal before tab switch
        emitEvent( EventTypes.TERMINAL_CLEAR );

        // Only cleanup if we're leaving watch-in-action
        if ( prevTab === 'watchInAction' && tab !== 'watchInAction' ) {
          await cleanupWatchComponents();
        }

        store.setTab( tab );

        // Reset watch state when entering watch-in-action
        if ( tab === 'watchInAction' ) {
          store.clearWatchState();
        } else if ( tab === 'commonUseCases' ) {
          if ( !store.currentClient.includes( 'glide' ) ) {
            store.setClient( 'glide-node' );
          }
          store.setUseCase( 'Session Cache' );
          editorContent.value = store.getTemplateCode(
            store.currentClient,
            store.currentUseCase
          ) || "// Template not available.";
        } else if ( tab === 'playground' ) {
          editorContent.value = store.getTemplateCode(
            store.currentClient,
            store.executionMode
          ) || "// Template not available.";
        }

      } catch ( error ) {
        console.error( '[App] Tab change error:', error );
        store.addNotification( 'Error switching tabs', 'error' );
      }
    };

    const cleanupWatchComponents = async () => {
      try {
        if ( wsInstance.isConnectionValid() ) {
          await wsInstance.send( {
            action: 'cleanup',
            data: { force: true }
          } );
        }
        store.clearWatchState();
      } catch ( error ) {
        console.error( '[App] Cleanup error:', error );
      }
    };

    const handleContentUpdate = ( content ) => {
      editorContent.value = content;
    };

    onMounted( async () => {
      console.log( '[App] onMounted - initializing global WebSocket...' );

      try {
        const ws = await ensureConnection();

        if ( ws ) {
          wsInstance.addMessageListener( ( event ) => {
            try {
              const data = JSON.parse( event.data );
              if ( data.action === 'connected' ) {
                store.setConnection( true );
                console.log( '[App] Connected with ID:', data.data.id );
              }
            } catch ( error ) {
              console.error( '[App] Message parse error:', error );
            }
          } );
        }

        // Connection health check
        const healthCheck = setInterval( async () => {
          if ( !wsInstance.isConnectionValid() ) {
            try {
              await ensureConnection();
            } catch ( err ) {
              console.warn( '[App] Reconnection attempt failed:', err );
            }
          }
        }, 30000 );

        // Cleanup on unmount
        return () => clearInterval( healthCheck );

      } catch ( error ) {
        console.error( '[App] WebSocket initialization error:', error );
        store.addNotification( 'WebSocket connection failed', 'error' );
      }

      // Ensure defaults are set
      store.initializeDefaults();

      // Then initialize with stored state or defaults
      const storedTab = localStorage.getItem( 'valkey-currentTab' ) || 'playground';
      store.setTab( storedTab );

      // Initialize content on mount with guaranteed defaults
      const initialCode = store.getTemplateCode(
        store.currentClient || store.getDefaultClient(),
        store.executionMode || store.currentUseCase || store.getDefaultMode()
      ) || "// Initial code not available.";
      editorContent.value = initialCode;

      console.log( 'App mounted, environment:', process.env.NODE_ENV );

      const { on: onEventBus } = useEventBus();
      onEventBus( EventTypes.CODE_EXECUTION, ( payload ) => {
        console.log( '[App] CODE_EXECUTION event received:', payload );
      } );
      onEventBus( EventTypes.CODE_RESULT, ( payload ) => {
        console.log( '[App] CODE_RESULT event received:', payload );
      } );
    } );

    return {
      store,
      currentView,
      currentLanguage,
      handleTabChange,
      handleContentUpdate,
      editorContent,
      editorLanguage,
      mainComponent,
      getEditorContent
    };
  }
} );
</script>

<style>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #121212;
  color: #ffffff;
  overflow: hidden;
  /* Prevent scrolling on main container */
}

.app-main {
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
}

.main-content {
  flex: 1;
}

.main-content.full-width {
  width: 100%;
}
</style>
