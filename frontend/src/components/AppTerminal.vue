<template>
    <BaseTerminal ref="terminal" :options="terminalOptions" @ready="handleReady" />
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import BaseTerminal from './base/BaseTerminal.vue';
import { useEventBus, EventTypes } from '../composables/useEventBus';

export default {
    name: 'AppTerminal',
    components: { BaseTerminal },
    props: {
        height: String
    },
    emits: [ 'ready' ],
    setup( props, { emit } ) {
        const terminal = ref( null );
        const terminalInstance = ref( null );
        const { on, off } = useEventBus();

        const terminalOptions = {
            cursorBlink: true,
            fontSize: 14,
            fontWeight: 500,
            scrollback: 5000,
            theme: {
                background: '#1a1b26',
                foreground: '#a9b1d6',
                cursor: '#f7768e',
                selection: '#28324a'
            }
        };

        const handleReady = ( term ) => {
            terminalInstance.value = term;
            term.writeln( '\x1b[1;34m=== Valkey SandBox Terminal ===\x1b[0m' );
            emit( 'ready', term );
        };

        const writeToTerminal = ( output ) => {
            console.log( `[Terminal] Writing output:`, output );
            if ( !output ) return;

            let text;
            if ( typeof output === 'string' ) {
                text = output;
            } else {
                // Remove quotes around string values and format nicely
                text = JSON.stringify( output, null, 2 )
                    .replace( /"([^"]+)":/g, '$1:' )
                    .replace( /["{}[\]]/g, '' )
                    .trim();
            }

            // Split by newlines and filter out empty lines
            const lines = text.split( '\n' ).filter( line => line.trim() );
            lines.forEach( line => {
                terminalInstance.value?.writeln( ` ${ line.trim() }` );
            } );
        };

        const clearTerminal = () => {
            if ( terminalInstance.value ) {
                terminalInstance.value.clear();
                handleReady( terminalInstance.value );
            }
        };

        onMounted( () => {
            on( EventTypes.TERMINAL_OUTPUT, writeToTerminal );
            on( EventTypes.TERMINAL_CLEAR, clearTerminal );
        } );

        onBeforeUnmount( () => {
            off( EventTypes.TERMINAL_OUTPUT, writeToTerminal );
            off( EventTypes.TERMINAL_CLEAR, clearTerminal );
        } );

        return {
            terminal,
            terminalOptions,
            handleReady
        };
    }
};
</script>

<style scoped>
/* Remove all styles as they're now handled in BaseTerminal */
</style>
