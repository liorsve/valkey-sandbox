<template>
    <div ref="terminalContainer" class="base-terminal">
        <div class="terminal-header">
            <span class="terminal-title">$ ~/sandbox</span>
            <div class="terminal-controls">
                <span class="control close"></span>
                <span class="control minimize"></span>
                <span class="control maximize"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import '@xterm/xterm/css/xterm.css';
import { useEventBus, EventTypes } from '@/composables/useEventBus';

export default defineComponent( {
    name: 'BaseTerminal',
    props: {
        options: {
            type: Object,
            default: () => ( {} )
        }
    },
    emits: [ 'ready' ],
    setup( props, { emit } ) {
        const terminalContainer = ref( null );
        let terminal = null;
        let fitAddon = null;
        let webLinksAddon = null;
        let resizeObserver = null;
        let resizeRAF;

        const { on, off } = useEventBus();

        const initializeTerminal = async () => {
            const { Terminal } = await import( '@xterm/xterm' );
            const { FitAddon } = await import( '@xterm/addon-fit' );
            const { WebLinksAddon } = await import( '@xterm/addon-web-links' );

            terminal = new Terminal( {
                fontFamily: 'JetBrains Mono, Consolas, monospace',
                fontSize: 14,
                lineHeight: 1.2,
                theme: {
                    background: '#1a1b26',
                    foreground: '#a9b1d6',
                    cursor: '#f7768e',
                    cursorAccent: '#1a1b26',
                    selection: '#28324a',
                    black: '#32344a',
                    red: '#f7768e',
                    green: '#9ece6a',
                    yellow: '#e0af68',
                    blue: '#7aa2f7',
                    magenta: '#ad8ee6',
                    cyan: '#449dab',
                    white: '#787c99',
                    brightBlack: '#444b6a',
                    brightRed: '#ff7a93',
                    brightGreen: '#b9f27c',
                    brightYellow: '#ff9e64',
                    brightBlue: '#7da6ff',
                    brightMagenta: '#bb9af7',
                    brightCyan: '#0db9d7',
                    brightWhite: '#acb0d0'
                },
                cursorBlink: true,
                cursorStyle: 'bar',
                scrollback: 5000,
                allowTransparency: true
            } );

            fitAddon = new FitAddon();
            webLinksAddon = new WebLinksAddon();
            terminal.loadAddon( fitAddon );
            terminal.loadAddon( webLinksAddon );

            terminal.open( terminalContainer.value );
            fitAddon.fit();

            resizeObserver = new ResizeObserver( ( entries ) => {
                if ( entries[ 0 ]?.contentRect ) {
                    handleResize();
                }
            } );

            if ( terminalContainer.value ) {
                resizeObserver.observe( terminalContainer.value );
            }

            emit( 'ready', terminal );
        };

        const handleResize = () => {
            if ( !fitAddon || !terminalContainer.value ) return;

            cancelAnimationFrame( resizeRAF );
            resizeRAF = requestAnimationFrame( () => {
                try {
                    const { width, height } = terminalContainer.value.getBoundingClientRect();
                    if ( width > 0 && height > 0 ) {
                        fitAddon.fit();
                    }
                } catch ( err ) {
                    console.warn( 'Terminal fit error:', err );
                }
            } );
        };

        onMounted( () => {
            initializeTerminal();
        } );

        onBeforeUnmount( () => {
            if ( resizeObserver ) {
                resizeObserver.disconnect();
            }
            if ( resizeRAF ) {
                cancelAnimationFrame( resizeRAF );
            }
            terminal?.dispose();
        } );

        return {
            terminalContainer
        };
    }
} );
</script>

<style scoped>
.base-terminal {
    height: 100%;
    background: var(--terminal-bg, #0d0d0d);
    border-radius: var(--radius-md);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid var(--border-color);
}

.terminal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--surface-darker);
    border-bottom: 1px solid var(--border-color);
}

.terminal-title {
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
}

.terminal-controls {
    display: flex;
    gap: 8px;
}

.control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
}

.close {
    background: #ff5f57;
}

.minimize {
    background: #febc2e;
}

.maximize {
    background: #28c840;
}

:deep(.xterm) {
    flex: 1;
    height: calc(100% - 40px) !important;
    /* Account for header height */
}

:deep(.xterm-viewport) {
    background-color: #0d0d0d !important;
    border-radius: var(--radius-sm);
}

:deep(.xterm-screen) {
    background-color: #0d0d0d !important;
}

:deep(.xterm-scroll-area) {
    background-color: #0d0d0d !important;
    margin-right: 12px;
}

:deep(.xterm-viewport::-webkit-scrollbar) {
    width: 12px !important;
    height: 12px !important;
}

:deep(.xterm-viewport::-webkit-scrollbar-track) {
    background: #1e1e1e !important;
    border: 4px solid #0d0d0d;
    border-radius: var(--radius-sm);
}

:deep(.xterm-viewport::-webkit-scrollbar-thumb) {
    background: #4a4a4a !important;
    border: 4px solid #0d0d0d;
    border-radius: var(--radius-sm);
}

:deep(.xterm-viewport::-webkit-scrollbar-thumb:hover) {
    background: #666666 !important;
}

:deep(.xterm-viewport::-webkit-scrollbar-corner) {
    background: #0d0d0d !important;
}
</style>
