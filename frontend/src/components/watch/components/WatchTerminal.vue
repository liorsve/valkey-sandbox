<template>
    <div class="watch-terminal">
        <BaseTerminal ref="terminal" :options="terminalOptions" @ready="onTerminalReady" />
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseTerminal from '@/components/base/BaseTerminal.vue';
import { useEventBus, EventTypes } from '@/composables/useEventBus';

export default defineComponent( {
    name: 'WatchTerminal',
    components: { BaseTerminal },
    emits: [ 'ready' ],

    setup( _, { emit } ) {
        const terminal = ref( null );
        const { on, off } = useEventBus();

        const terminalOptions = {
            cursorBlink: true,
            fontSize: 14,
            theme: {
                background: '#1a1a1a',
                foreground: '#ffffff',
                cursor: '#ffffff'
            }
        };

        const onTerminalReady = ( term ) => {
            terminal.value = term;
            term.writeln( '\x1b[1;34m=== Valkey Watch Terminal ===\x1b[0m' );
            term.writeln( ' Ready to watch your actions in real-time...' );
            term.writeln( '' );

            emit( 'ready', term );

            on( EventTypes.TERMINAL_OUTPUT, ( message ) => {
                term.writeln( message );
            } );

            on( EventTypes.TERMINAL_CLEAR, () => {
                term.clear();
            } );
        };

        return {
            terminal,
            terminalOptions,
            onTerminalReady
        };
    }
} );
</script>

<style scoped>
.watch-terminal {
    height: 100%;
    border-radius: var(--radius-md);
    background-color: var(--surface-darker);
    overflow: hidden;
}
</style>
