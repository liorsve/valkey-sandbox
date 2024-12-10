<template>
    <div class="task-manager">
        <div class="task-creation">
            <select v-model="selectedTask">
                <option v-for="task in tasks" :key="task.id" :value="task">
                    {{ task.action }}
                </option>
            </select>
            <button @click="addTask">Add Task</button>
        </div>
        <ul class="task-queue">
            <li v-for="(task, index) in taskQueue" :key="index">
                {{ task.action }}
            </li>
        </ul>
        <button v-if="buttonState === 'set'" @click="setTasks">Set Tasks Queue</button>
        <button v-else-if="buttonState === 'invoke'" @click="invokeTaskManager">Invoke Task Manager</button>
        <button v-else-if="buttonState === 'cancel'" @click="cancelTaskManager">Cancel</button>
        <button v-else-if="buttonState === 'tryAgain'" @click="resetTaskManager">Try Again</button>
        <div class="visualization">
            <div ref="triangle" class="triangle"></div>
        </div>
        <!-- Add Modal -->
        <div v-if="showEmptyQueuePopup" class="modal-overlay">
            <div class="modal-content">
                <p>Please add tasks to the queue before setting it.</p>
                <button @click="closePopup">OK</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
    name: 'TaskManager',
    setup(props, { emit }) {
        const tasks = ref([
            { id: 1, action: 'Flip Right' },
            { id: 2, action: 'Flip Left' },
            { id: 3, action: 'Flip Up' },
            { id: 4, action: 'Flip Down' },
            { id: 5, action: 'Grow' },
            { id: 6, action: 'Shrink' },
            { id: 7, action: 'Confetti' },
            { id: 8, action: 'Change Random Color' },
        ]);

        const selectedTask = ref(tasks.value[0]);
        const taskQueue = ref([]);
        const triangle = ref(null);
        let ws;
        const buttonState = ref('set');
        const showEmptyQueuePopup = ref(false);

        const addTask = () => {
            if (taskQueue.value.length < 8) {
                taskQueue.value.push(selectedTask.value);
            }
        };

        const executeTasks = () => {
            if (taskQueue.value.length === 0) return;
            const task = taskQueue.value.shift();
            performTask(task.action);
        };

        const setTasks = () => {
            if (taskQueue.value.length === 0) {
                showEmptyQueuePopup.value = true;
                return;
            }
            ws.send(JSON.stringify({
                action: 'setTasks',
                data: taskQueue.value.map(task => task.action)
            }));
            terminalWrite('📝 Task Queue has been set!\n');
            buttonState.value = 'invoke';
        };

        const invokeTaskManager = () => {
            ws.send(JSON.stringify({
                action: 'invokeTaskManager'
            }));
            terminalWrite('🚀 Invoking Task Manager...\n');
            buttonState.value = 'cancel';
        };

        const cancelTaskManager = () => {
            ws.send(JSON.stringify({
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
            const message = JSON.parse(event.data);
            if (message.action === 'taskUpdate') {
                terminalWrite(`🔔 ${message.data.status}`);
                if (message.data.action) {
                    performTask(message.data.action);
                }
            } else if (message.action === 'queueStatus') {
                const queueData = typeof message.data === 'string' ? message.data : message.data.join('\n');
                terminalWrite(`📋 Current Queue:\n${queueData}`);
            } else if (message.action === 'lockStatus') {
                animateLocking(message.data.locked);
            } else if (message.action === 'processCompleted') {
                terminalWrite('✅ All tasks completed!');
                buttonState.value = 'tryAgain';
            }
        };

        const terminalWrite = (message) => {
            emit('terminal-write', message.trim() + '\n');
        };

        const performTask = (action) => {
            const el = triangle.value;
            if (!el) return;
            switch (action) {
                case 'Flip Right':
                    el.classList.add('flip-right');
                    break;
                case 'Flip Left':
                    el.classList.add('flip-left');
                    break;
                case 'Flip Up':
                    el.classList.add('flip-up');
                    break;
                case 'Flip Down':
                    el.classList.add('flip-down');
                    break;
                case 'Grow':
                    el.classList.add('grow');
                    break;
                case 'Shrink':
                    el.classList.add('shrink');
                    break;
                case 'Confetti':
                    createConfetti(el);
                    break;
                case 'Change Random Color':
                    el.style.backgroundColor = getRandomColor();
                    break;
                default:
                    break;
            }
            setTimeout(() => {
                el.classList.remove(
                    'flip-right',
                    'flip-left',
                    'flip-up',
                    'flip-down',
                    'grow',
                    'shrink'
                );
                if (taskQueue.value.length > 0) {
                    executeTasks();
                }
            }, 1000);
        };

        function createConfetti(parent) {
            const colors = ['#FFD700', '#FF69B4', '#00CED1', '#FF4500', '#9370DB'];
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 1000 + 'ms';
                confetti.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
                confetti.style.filter = 'brightness(1.5) contrast(1.2)';
                parent.appendChild(confetti);
                setTimeout(() => parent.removeChild(confetti), 2000);
            }
        }

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

        const connectWebSocket = () => {
            ws = new WebSocket('ws://localhost:3000/appws');
            ws.onmessage = handleWebSocketMessage;
        };

        const closePopup = () => {
            showEmptyQueuePopup.value = false;
        };

        onMounted(() => {
            triangle.value = document.querySelector('.triangle');
            connectWebSocket();
            ws.addEventListener('message', handleWebSocketMessage);
            window.addEventListener('beforeunload', () => {
                ws.send(JSON.stringify({ action: 'cancelTaskManager' }));
            });
        });

        onBeforeUnmount(() => {
            window.removeEventListener('beforeunload', () => {
                ws.send(JSON.stringify({ action: 'cancelTaskManager' }));
            });
        });

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
            buttonState,
            showEmptyQueuePopup,
            closePopup,
        };
    },
};
</script>

<style scoped>
.task-manager {
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 100%;
    background-color: #121212;
    overflow: hidden;
}

.task-creation {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.task-creation select,
.task-creation button {
    padding: 10px;
    font-size: 16px;
    background-color: #1e1e1e;
    color: #fff;
    border: none;
    border-radius: 5px;
}

.task-creation button {
    background-color: #6a11cb;
    transition: background-color 0.3s;
}

.task-creation button:hover {
    background-color: #2575fc;
}

.task-queue {
    list-style: none;
    padding: 0;
    margin-bottom: 10px;
    flex: 1;
}

.task-queue li {
    background-color: #333;
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    color: #fff;
}

button {
    background-color: #444;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #555;
}

.visualization {
    flex: 2;
    background-color: #1e1e1e;
    margin-top: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.triangle {
    width: 0;
    height: 0;
    border-left: 60px solid transparent;
    border-right: 60px solid transparent;
    border-bottom: 120px solid #6a11cb;
    transition: transform 1s, background-color 1s;
}

.flip-right {
    transform: rotateY(180deg);
}

.flip-left {
    transform: rotateY(-180deg);
}

.flip-up {
    transform: rotateX(-180deg);
}

.flip-down {
    transform: rotateX(180deg);
}

.grow {
    transform: scale(1.5);
}

.shrink {
    transform: scale(0.5);
}

/* Add styles for lock animations */
.locked {
    animation: lockAnimation 2s;
}

@keyframes lockAnimation {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.2);
        background-color: red;
    }

    100% {
        transform: scale(1);
    }
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
</style>
