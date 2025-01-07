<template>
    <div class="watch-terminal">
        <BaseTerminal ref="terminal" :options="terminalOptions" @ready="onTerminalReady" />
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseTerminal from '@/components/base/BaseTerminal.vue';
import { useEventBus, EventTypes } from '@/composables/useEventBus';

export default defineComponent({
    name: 'WatchTerminal',
    components: { BaseTerminal },
    emits: ['ready'],

    setup(_, { emit }) {
        const terminal = ref(null);
        const { on, off } = useEventBus();
        const cleanupHandlers = ref(() => {
            off(EventTypes.TERMINAL_OUTPUT, handleOutput);
        });

        const terminalOptions = {
            cursorBlink: true,
            fontSize: 14,
            theme: {
                background: '#1a1a1a',
                foreground: '#ffffff',
                cursor: '#ffffff',
            },
        };

        const handleOutput = (message) => {
            terminal.value?.writeln(message);
        };

        on(EventTypes.TERMINAL_OUTPUT, handleOutput);

        const onTerminalReady = (term) => {
            terminal.value = term;
            emit('ready', term);
        };

        return {
            terminal,
            terminalOptions,
            onTerminalReady,
            cleanupHandlers
        };
    },
    
    beforeUnmount() {
        this.cleanupHandlers?.();
    }
});
</script>

<style scoped>
.watch-terminal {
    height: 100%;
    border-radius: var(--radius-md);
    background-color: var(--surface-darker);
    overflow: hidden;
}
</style>
