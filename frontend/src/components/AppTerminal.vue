<template>
    <div class="terminal-container" :class="height">
        <div ref="terminalOutput" class="terminal"></div>
    </div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

export default {
    name: 'AppTerminal',
    props: {
        height: {
            type: String,
            default: 'normal-height'
        }
    },
    setup(props, { expose }) {
        const terminal = ref(null);
        const terminalOutput = ref(null);
        let isInitialized = false;

        const initializeTerminal = () => {
            if (isInitialized || !terminalOutput.value) return;

            terminal.value = new Terminal({
                cursorBlink: true,
                fontSize: 16,
                fontFamily: 'Consolas, "Courier New", monospace',
                theme: {
                    background: '#0d0d0d',
                    foreground: '#dddddd',
                    cursor: '#ffffff',
                    selectionBackground: '#555555',
                },
                scrollback: 1000,
                convertEol: true,
                rows: 16,
                allowTransparency: true,
                screenReaderMode: true,
                tabStopWidth: 4,
                scrollOnUserInput: true,
                smoothScrollDuration: 150,
                rightClickSelectsWord: true,
            });

            terminal.value.open(terminalOutput.value);
            terminal.value.focus();
            isInitialized = true;
        };

        onMounted(() => {
            initializeTerminal();
        });

        const clear = () => {
            if (terminal.value) {
                terminal.value.clear();
            }
        };

        const writeWelcomeMessage = (tab) => {
            if (!terminal.value) return;

            clear();
            terminal.value.writeln('\x1b[1;34m=== Valkey SandBox Terminal ===\x1b[0m');

            const messages = {
                playground: [
                    '👨‍💻  Welcome to Valkey Playground!',
                    'Experiment with different Valkey clients',
                    'Try out commands and explore features freely'
                ],
                commonusecases: [
                    '📋  Welcome to Valkey Common Use Cases!',
                    'Explore pre-built examples using Valkey-Glide',
                    'Learn, modify, and enhance these patterns'
                ],
                leaderboard: [
                    '🏆  Leaderboard Live with Valkey-Glide',
                    'Watch real-time sorted sets in action',
                    '⚡ See how Valkey handles concurrent updates'
                ],
                taskmanager: [
                    'Task Manager with Valkey-Glide',
                    'Watch distributed locks in action',
                    'See how tasks are managed across instances'
                ],
                challenges: [
                    '💻  Welcome to Challenges!',
                    'Test your Valkey skills',
                    '✨ Complete tasks and earn points'
                ]
            };

            (messages[tab.toLowerCase()] || messages.playground).forEach(msg => {
                terminal.value.writeln(`\x1b[90m${msg}\x1b[0m`);
            });

            terminal.value.writeln('\x1b[90m═══════════════════════════════════════\x1b[0m\n');
            terminal.value.scrollToBottom();
        };

        const write = (data) => {
            if (terminal.value) {
                const lines = data.replace(/\r/g, '').split('\n');
                lines.forEach(line => {
                    if (line.trim()) {
                        terminal.value.writeln(line.trim());
                        const viewport = terminal.value._core.viewport;
                        if (viewport.scrollBarHeight - viewport.scrollTop < 50) {
                            terminal.value.scrollToBottom();
                        }
                    }
                });
            }
        };

        onBeforeUnmount(() => {
            if (terminal.value) {
                terminal.value.dispose();
            }
            terminal.value = null;
            isInitialized = false;
        });

        expose({
            write,
            clear,
            writeWelcomeMessage,
        });

        return {
            terminalOutput
        };
    }
};
</script>

<style scoped>
.terminal-container {
    background-color: #0f1113;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #2a2f35;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
}

.terminal {
    flex: 1;
    min-height: 0;
    background-color: #0f1113;
}

:deep(.xterm) {
    height: 100%;
    padding: 4px;
}

:deep(.xterm-viewport) {
    overflow-y: auto !important;
    scrollbar-width: thin;
    scrollbar-color: #666 #1a1a1a;
}

:deep(.xterm-viewport::-webkit-scrollbar) {
    width: 8px;
}

:deep(.xterm-viewport::-webkit-scrollbar-track) {
    background: #1a1a1a;
}

:deep(.xterm-viewport::-webkit-scrollbar-thumb) {
    background: #666;
    border-radius: 4px;
}
</style>
