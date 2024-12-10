<template>
    <div ref="terminalContainer" class="terminal-container"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

export default {
    name: 'AppTerminal',
    setup(props, { expose }) {
        const terminal = ref(null);
        const terminalContainer = ref(null);

        onMounted(() => {
            terminal.value = new Terminal({
                cursorBlink: true,
                fontSize: 14,
                theme: {
                    background: '#0d0d0d', // Darker background
                    foreground: '#dddddd', // Less bright text
                    cursor: '#ffffff',
                    selectionBackground: '#555555',
                },
            });
            terminal.value.open(terminalContainer.value);
            terminal.value.write('Welcome to ValKey SandBox!\r\n');
        });

        const write = (data) => {
            if (terminal.value) {
            // Sanitize the data by removing carriage returns
            const sanitizedData = data.replace(/\r/g, '');
            // Split the sanitized data by newlines and write each line to the terminal
            sanitizedData.split('\n').forEach(line => {
                terminal.value.writeln(line.trim());
            });
            }
        };

        onBeforeUnmount(() => {
            if (terminal.value) {
                terminal.value.dispose();
            }
        });

        expose({
            write,
        });

        return {
            terminalContainer,
        };
    },
};
</script>

<style scoped>
.terminal-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    padding: 10px 10px;
    background-color: #0d0d0d;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

:deep(.xterm .xterm-viewport),
:deep(.xterm .xterm-screen) {
    padding: 10px;
    box-sizing: border-box;
}

.terminal {
    flex: 1;
    max-height: 200px;
    overflow-y: auto;
}
</style>
