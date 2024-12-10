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
        <button @click="executeTasks">Run</button>
        <div class="visualization">
            <div ref="triangle" class="triangle"></div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    name: 'TaskManager',
    setup() {
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
                    // Implement confetti animation
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

        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        };

        const connectWebSocket = () => {
            const ws = new WebSocket('ws://localhost:3000/appws');
            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.action === 'taskUpdate') {
                    // Update visualization based on task execution
                }
            };
        };

        onMounted(() => {
            triangle.value = document.querySelector('.triangle');
            connectWebSocket();
        });

        return {
            tasks,
            selectedTask,
            taskQueue,
            addTask,
            executeTasks,
            triangle,
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
</style>
