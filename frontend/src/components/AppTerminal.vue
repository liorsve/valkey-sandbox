<template>
    <div class="terminal-container" :class="height">
        <div class="terminal" ref="terminalContainer"></div>
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
        const terminalContainer = ref(null);
        let resizeObserver = null;

        const handleResize = () => {
            if (terminal.value && terminalContainer.value) {
                const { width, height } = terminalContainer.value.getBoundingClientRect();
                const cols = Math.floor((width - 20) / 9);
                const rows = Math.floor((height - 10) / 21);
                terminal.value.resize(cols, rows);
            }
        };

        onMounted(() => {
            if (!terminalContainer.value) return;

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

            terminal.value.open(terminalContainer.value);

            resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(terminalContainer.value);

            writeWelcomeMessage('playground');
        });

        const scrollToBottom = () => {
            if (terminal.value) {
                terminal.value.scrollToBottom();
            }
        };

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
                    '👨‍💻 Welcome to Valkey Playground!',
                    '🔧 Experiment with different Valkey clients',
                    '💡 Try out commands and explore features freely'
                ],
                commonUseCases: [
                    '📚 Welcome to Valkey Common Use Cases!',
                    '🎯 Explore pre-built examples using Valkey-Glide',
                    '✨ Learn, modify, and enhance these patterns'
                ],
                watchInAction: [
                    '🎮 Welcome to Valkey Watch in Action!',
                    '🔍 See Valkey-Glide in real-world scenarios',
                    '🚀 Interactive demos of distributed features'
                ],
                leaderboard: [
                    '🏆 Leaderboard Demo with Valkey-Glide',
                    '📊 Watch real-time sorted sets in action',
                    '🔄 See live Valkey commands as they happen'
                ],
                taskmanager: [
                    '🔄 Task Manager Demo with Valkey-Glide',
                    '🔒 Watch distributed locks in action',
                    '📋 See how task queues are managed in real-time'
                ]
            };

            (messages[tab] || messages.playground).forEach(msg => {
                terminal.value.writeln(`\x1b[90m${msg}\x1b[0m`);
            });

            terminal.value.writeln('\x1b[90m═══════════════════════════════════════\x1b[0m\n');
            scrollToBottom();
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
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
            if (terminal.value) {
                terminal.value.dispose();
            }
        });

        expose({
            write,
            clear,
            writeWelcomeMessage,
            handleResize
        });

        return {
            terminalContainer,
        };
    },
};
</script>

<style scoped>
@import '../assets/styles/shared.css';

.terminal-container {
    background-color: #0f1113;
    padding: 8px;
    border-radius: 0 0 6px 6px;
    /* Round only bottom corners */
    transition: height 0.3s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    flex: 1;
    min-height: 0;
    height: auto !important;
}

.terminal {
    flex: 1;
    min-height: 0;
    overflow: hidden;
    position: sticky;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 3px;
}

.terminal-container.normal-height,
.terminal-container.double-height,
.terminal-container.full-height {
    height: auto !important;
    min-height: var(--terminal-height, 150px);
}

:deep(.xterm) {
    height: 100%;
    padding: 4px;
}

:deep(.xterm-viewport) {
    overflow-y: auto !important;
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #666 #1a1a1a;
    position: absolute !important;
    right: 0;
    width: calc(100% + 8px) !important;
}

:deep(.xterm-viewport),
:deep(.xterm-screen),
:deep(.xterm-scroll-area) {
    height: 100% !important;
    width: 100% !important;
}

:deep(.xterm-viewport) {
    overflow-y: scroll !important;
    overflow-x: hidden;
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

:deep(.xterm-viewport::-webkit-scrollbar-thumb:hover) {
    background: #888;
}
</style>
