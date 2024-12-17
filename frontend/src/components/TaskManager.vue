<template>
    <div class="task-manager">
        <div class="task-panel">
            <div class="control-section">
                <button @click="addTask" :disabled="!isConnected" class="add-task-btn">Add Task</button>
                <select v-model="selectedTask" class="task-select">
                    <option v-for="task in tasks" :key="task.id" :value="task">
                        {{ task.action }}
                    </option>
                </select>
            </div>
            <div class="tasks-grid">
                <div v-for="(task, index) in taskQueue" :key="index" class="task-item">
                    {{ task.action }}
                </div>
            </div>
        </div>
        <div class="control-buttons">
            <button v-if="buttonState === 'set'" @click="setTasks" :disabled="!isConnected || taskQueue.length === 0"
                class="control-btn">
                Set Tasks Queue
            </button>
            <button v-else-if="buttonState === 'invoke'" @click="invokeTaskManager" :disabled="!isConnected"
                class="control-btn">
                Invoke Task Manager
            </button>
            <button v-else-if="buttonState === 'cancel'" @click="cancelTaskManager" class="control-btn cancel">
                Cancel
            </button>
            <button v-else-if="buttonState === 'tryAgain'" @click="resetTaskManager" class="control-btn reset">
                Try Again
            </button>
        </div>
        <div class="visualization">
            <div ref="triangle" class="triangle"></div>
            <div ref="lockIcon" class="lock-icon">🔒</div>
            <div ref="unlockIcon" class="unlock-icon">🔓</div>
        </div>
        <div v-if="showEmptyQueuePopup" class="modal-overlay">
            <div class="modal-content">
                <p>Please add tasks to the queue before setting it.</p>
                <button @click="closePopup">OK</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

export default {
    name: 'TaskManager',
    props: {
        ws: WebSocket,
        isConnected: Boolean
    },

    setup(props, { emit }) {
        const tasks = ref([
            { id: 1, action: 'Flip Right' },
            { id: 2, action: 'Flip Left' },
            { id: 3, action: 'Flip Up' },
            { id: 4, action: 'Flip Down' },
            { id: 5, action: 'Grow' },
            { id: 6, action: 'Shrink' },
            { id: 7, action: 'Change Random Color' },
        ]);

        const selectedTask = ref(tasks.value[0]);
        const taskQueue = ref([]);
        const triangle = ref(null);
        const lockIconRef = ref(null);
        const unlockIconRef = ref(null);
        const buttonState = ref('set');
        const showEmptyQueuePopup = ref(false);
        const taskStatus = ref('');

        const addTask = () => {
            if (taskQueue.value.length < 6) {
                taskQueue.value.push({
                    ...selectedTask.value,
                    uniqueId: Date.now() + Math.random().toString(36).substr(2, 9)
                });
            }
        };

        const setTasks = () => {
            if (!props.isConnected) return;

            if (taskQueue.value.length === 0) {
                showEmptyQueuePopup.value = true;
                return;
            }

            const taskData = taskQueue.value.map(task => ({
                action: task.action,
                uniqueId: task.uniqueId
            }));

            terminalWrite('🔧  Initializing distributed Task Queue in Valkey Cluster...');
            terminalWrite('📝  \x1b[1mSET task-queue\x1b[0m with distributed lock mechanism');

            props.ws.send(JSON.stringify({
                action: 'setTasks',
                data: taskData
            }));

            buttonState.value = 'invoke';
        };

        const invokeTaskManager = () => {
            if (props.ws && props.ws.readyState === WebSocket.OPEN) {
                console.log('Sending invokeTaskManager action');
                props.ws.send(JSON.stringify({
                    action: 'invokeTaskManager',
                }));
                terminalWrite('🚀 Invoking Task Manager...\n');
                buttonState.value = 'cancel';
            } else {
                console.log('[WS] Cannot send message: WebSocket not connected.');
                terminalWrite('Not connected to server. Retrying connection...\n');
            }
        };

        const cancelTaskManager = () => {
            props.ws.send(JSON.stringify({
                action: 'cancelTaskManager'
            }));
            terminalWrite('⛔ Task Manager cancelled.\n');
            buttonState.value = 'tryAgain';
        };

        const resetTaskManager = () => {
            taskQueue.value = [];
            buttonState.value = 'set';
            terminalWrite('🔄 Reset complete. Please add tasks.\n');
        };

        const handleWebSocketMessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.action === 'taskUpdate') {
                    if (message.data.clusterOperations) {
                        message.data.clusterOperations.forEach(op => {
                            terminalWrite(`📡 ${op}`);
                        });
                    }
                    terminalWrite(`🔄 Task Manager Status: ${message.data.status}`);
                    if (message.data.action) {
                        terminalWrite(`⚡ Executing task: ${message.data.action}`);
                        performTask(message.data.action);
                    }
                } else if (message.action === 'queueStatus') {
                    const queueData = Array.isArray(message.data) ? message.data.join(', ') : message.data;
                    terminalWrite(`📋 LRANGE task-queue 0 -1`);
                    terminalWrite(`📊 Current Tasks: ${queueData}`);
                } else if (message.action === 'gameCommand') {
                    handleCommand(message.data);
                }
            } catch (error) {
                console.error('[TaskManager] Error handling message:', error);
                terminalWrite('❌ Error processing Valkey response');
            }
        };

        const terminalWrite = (message) => {
            emit('terminal-write', message.trim() + '\n');
        };

        const performTask = (action) => {
            const el = triangle.value;
            const lockIcon = lockIconRef.value;
            const unlockIcon = unlockIconRef.value;
            if (!el || !lockIcon || !unlockIcon) return;

            el.style.borderBottomColor = '#6a11cb';

            const sequence = async () => {
                lockIcon.classList.add('show', 'grow');
                await new Promise(r => setTimeout(r, 1000));
                lockIcon.classList.add('fade-out');
                await new Promise(r => setTimeout(r, 800));
                lockIcon.classList.remove('show', 'grow', 'fade-out');

                await new Promise(r => setTimeout(r, 300));

                el.classList.add('move-to-center');
                await new Promise(r => setTimeout(r, 600));

                const baseTransform = 'translateX(-50%) translateY(-50%)';
                switch (action.action || action) {
                    case 'Flip Right':
                        el.style.transform = `${baseTransform} rotateY(180deg)`;
                        break;
                    case 'Flip Left':
                        el.style.transform = `${baseTransform} rotateY(-180deg)`;
                        break;
                    case 'Flip Up':
                        el.style.transform = `${baseTransform} rotateX(-180deg)`;
                        break;
                    case 'Flip Down':
                        el.style.transform = `${baseTransform} rotateX(180deg)`;
                        break;
                    case 'Grow':
                        el.style.transform = `${baseTransform} scale(1.5)`;
                        break;
                    case 'Shrink':
                        el.style.transform = `${baseTransform} scale(0.5)`;
                        break;
                    case 'Change Random Color':
                        el.style.borderBottomColor = getRandomColor();
                        break;
                }

                await new Promise(r => setTimeout(r, 1000));

                if ((action.action || action) !== 'Change Random Color') {
                    el.style.transform = baseTransform;
                } else {
                    el.style.borderBottomColor = '#6a11cb';
                }

                el.classList.remove(
                    'flip-right', 'flip-left', 'flip-up', 'flip-down',
                    'grow', 'shrink', 'move-to-center'
                );
                await new Promise(r => setTimeout(r, 600));

                await new Promise(r => setTimeout(r, 300));

                unlockIcon.classList.add('show', 'shrink');
                await new Promise(r => setTimeout(r, 1000));
                unlockIcon.classList.add('fade-out');
                await new Promise(r => setTimeout(r, 800));
                unlockIcon.classList.remove('show', 'shrink', 'fade-out');

                await new Promise(r => setTimeout(r, 300));

                props.ws.send(JSON.stringify({ action: 'taskCompleted' }));
            };

            sequence();
        };

        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        const animateLocking = (isLocked) => {
            const el = triangle.value;
            if (!el) return;
            if (isLocked) {
                el.classList.add('locked');
                terminalWrite('🔒 Lock acquired.\n');
            } else {
                el.classList.remove('locked');
                terminalWrite('🔓 Lock released.\n');
            }
        };

        const closePopup = () => {
            showEmptyQueuePopup.value = false;
        };

        const handleCommand = (command) => {
            if (!command || typeof command !== 'object') return;
            const { type, task, message, step } = command;

            switch (type) {
                case 'lockAcquired':
                    terminalWrite('🔒  \x1b[1mSET task-lock\x1b[0m "locked" EX 30 NX');
                    terminalWrite('✨  Lock acquired in Valkey Cluster - Ready to process tasks');
                    animateLocking(true);
                    break;

                case 'performTask':
                    terminalWrite(`⚡  \x1b[1mLPOP task-queue\x1b[0m // Processing task: ${task}`);
                    terminalWrite(`📍  Task execution progress: ${step}/total`);
                    performTask(task);
                    break;

                case 'lockReleased':
                    terminalWrite('🔓  \x1b[1mDEL task-lock\x1b[0m // Released distributed lock');
                    terminalWrite('🔄  Task Manager ready for next batch');
                    animateLocking(false);
                    break;

                case 'complete':
                    terminalWrite('✅  Queue processed successfully in Valkey Cluster!');
                    terminalWrite('📊  All distributed tasks executed and synchronized');
                    buttonState.value = 'tryAgain';
                    break;
            }

            if (props.ws && props.ws.readyState === WebSocket.OPEN) {
                props.ws.send(JSON.stringify({ action: 'gameCommand', data: command }));
            }
        };

        const handleTerminalWrite = (message) => {
            emit('terminal-write', message);
        };

        const handleWebSocket = (newWs) => {
            if (newWs) {
                newWs.onmessage = handleWebSocketMessage;
            }
        };

        const cleanup = () => {
            if (props.ws?.readyState === WebSocket.OPEN) {
                props.ws.send(JSON.stringify({
                    action: 'cancelTaskManager'
                }));
            }
            taskQueue.value = [];
            buttonState.value = 'set';

            // Reset visual state
            if (triangle.value) {
                triangle.value.style.transform = 'translateX(-50%) translateY(-50%)';
                triangle.value.style.borderBottomColor = '#6a11cb';
                triangle.value.classList.remove('locked');
            }
        };

        onBeforeUnmount(() => {
            cleanup();
            window.removeEventListener('beforeunload', cleanup);
            emit('terminal-resize', 'normal-height');
        });

        onMounted(() => {
            triangle.value = document.querySelector('.triangle');
            lockIconRef.value = document.querySelector('.lock-icon');
            unlockIconRef.value = document.querySelector('.unlock-icon');
            window.addEventListener('beforeunload', cleanup);
            emit('terminal-resize', 'full-height');
            handleWebSocket(props.ws);
        });

        watch(
            () => props.ws,
            handleWebSocket,
            { immediate: true }
        );

        return {
            tasks,
            selectedTask,
            taskQueue,
            addTask,
            setTasks,
            invokeTaskManager,
            cancelTaskManager,
            resetTaskManager,
            triangle,
            lockIcon: lockIconRef,
            unlockIcon: unlockIconRef,
            buttonState,
            showEmptyQueuePopup,
            closePopup,
            handleCommand,
            handleTerminalWrite,
            taskStatus,
            cleanup,
        };
    }
};
</script>

<style scoped>
.task-manager {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #121212;
    padding: 20px;
    overflow: hidden;
    gap: 15px;
    justify-content: space-between;
    min-height: auto;
    /* Remove 100vh */
}

/* Add this to ensure terminal can grow */
:deep(.terminal-container) {
    flex: 1;
    min-height: 350px;
}

/* Move terminal-related styles to shared.css */
.task-panel {
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
    /* Add margin to separate from visualization */
    background-color: #1e1e1e;
    border-radius: 6px;
    padding: 15px;
    height: auto;
    /* Remove fixed height */
    min-height: 80px;
    /* Set minimum height */
}

.control-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 150px;
}

.add-task-btn {
    background-color: #4a148c;
    padding: 12px;
    border-radius: 6px;
    transition: all 0.3s ease;
    border: 1px solid #6a1b9a;
}

.add-task-btn:hover {
    background-color: #6a1b9a;
    transform: translateY(-1px);
}

.task-select {
    background-color: #2a2a2a;
    padding: 10px;
    border-radius: 6px;
    width: 100%;
    color: #fff;
    border: 1px solid #4a148c;
}

.tasks-grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    overflow-y: auto;
    padding-right: 5px;
    align-content: center;
}

.task-item {
    background-color: #2a2a2a;
    padding: 12px;
    border-radius: 6px;
    color: #fff;
    border: 1px solid #7b1fa2;
    transition: all 0.3s ease;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}

.task-item:hover {
    background-color: #333;
    transform: translateY(-1px);
    border-color: #9c27b0;
}

.task-creation {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
}

.task-creation select,
.task-creation button {
    padding: 12px 20px;
    font-size: 16px;
    background-color: #1e1e1e;
    color: #fff;
    border: none;
    border-radius: 6px;
}

.task-creation select {
    flex: 1;
    min-width: 200px;
}

.task-creation button {
    background-color: #6a11cb;
    transition: background-color 0.3s;
}

.task-creation button:hover {
    background-color: #2575fc;
    transform: translateY(-1px);
}

.task-queue {
    list-style: none;
    padding: 0;
    margin-bottom: 10px;
    max-height: 300px;
    overflow-y: auto;
    flex: 5 !important;
    min-height: 400px !important;
    background-color: #1e1e1e;
    border-radius: 6px;
    padding: 15px;
    margin: 0;
}

.task-queue li {
    background-color: #2a2a2a;
    padding: 12px 20px;
    margin-bottom: 8px;
    border-radius: 6px;
    color: #fff;
    transition: background-color 0.3s ease;
}

.task-queue li:hover {
    background-color: #333;
}

button {
    background-color: #6a11cb;
    color: #fff;
    border: none;
    padding: 12px 20px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background-color: #2575fc;
    transform: translateY(-1px);
}

.visualization {
    position: relative;
    flex: 6 !important;
    min-height: 350px !important;
    /* Reduce minimum height */
    max-height: calc(100% - 150px);
    /* Account for task panel height */
    background-color: #0a0a0a;
    margin-top: 0;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 100%;
}

.triangle {
    position: absolute;
    left: 50%;
    top: 75%;
    transform: translateX(-50%) translateY(-50%);
    transition: all 0.6s ease-in-out;
    border-left: 150px solid transparent;
    border-right: 150px solid transparent;
    border-bottom: 300px solid #6a11cb;
}

.move-to-center {
    top: 50% !important;
}

.lock-icon,
.unlock-icon {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    font-size: 96px;
    opacity: 0;
    transition: all 0.8s ease-in-out;
    z-index: 2;
}

.show {
    opacity: 1;
}

.grow {
    transform: translate(-50%, -50%) scale(6);
}

.shrink {
    transform: translate(-50%, -50%) scale(6);
    animation: shrinkAnimation 1.2s ease-in-out forwards;
}

.fade-out {
    opacity: 0;
}

@keyframes shrinkAnimation {
    0% {
        transform: translate(-50%, -50%) scale(6);
        opacity: 1;
    }

    100% {
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
    }
}

.locked {
    opacity: 0.8;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background-color: #1e1e1e;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 90%;
}

.modal-content p {
    color: #fff;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
}

.modal-content button {
    background-color: #6a11cb;
    color: white;
    padding: 0.8rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.modal-content button:hover {
    background-color: #2575fc;
}

.tasks-grid::-webkit-scrollbar {
    width: 8px;
}

.tasks-grid::-webkit-scrollbar-track {
    background: #1e1e1e;
}

.tasks-grid::-webkit-scrollbar-thumb {
    background: #4a148c;
    border-radius: 4px;
}

.tasks-grid::-webkit-scrollbar-thumb:hover {
    background: #6a1b9a;
}

.control-buttons {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.control-btn {
    min-width: 200px;
    padding: 15px 30px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.control-btn.cancel {
    background-color: #f44336;
}

.control-btn.reset {
    background-color: #2196f3;
}
</style>
