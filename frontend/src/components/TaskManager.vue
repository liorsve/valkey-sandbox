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
            <!-- Triangle visualization with animations -->
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

        const addTask = () => {
            if (taskQueue.value.length < 8) {
                taskQueue.value.push(selectedTask.value);
            }
        };

        const executeTasks = () => {
            // Send tasks to backend and handle lock-and-queue logic
        };

        const connectWebSocket = () => {
            const ws = new WebSocket('ws://localhost:3000');
            ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.action === 'taskUpdate') {
                    // Update visualization based on task execution
                }
            };
        };

        onMounted(() => {
            connectWebSocket();
        });

        return {
            tasks,
            selectedTask,
            taskQueue,
            addTask,
            executeTasks,
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
}

.task-queue {
    list-style: none;
    padding: 0;
    margin-bottom: 10px;
    flex: 1;
    overflow-y: auto;
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
    /* Add your visualization styles here */
}
</style>
