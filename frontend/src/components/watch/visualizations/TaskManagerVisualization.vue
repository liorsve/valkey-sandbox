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
            <div ref="logoContainer" class="logo-container">
                <img :src="logoSrc" alt="Valkey Logo" class="valkey-logo" ref="logo" />
            </div>
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
import { useEventBus, EventTypes } from '@/composables/useEventBus';
import ValkeyLogo from '@/assets/images/Valkey-logo.svg';

export default {
    name: 'TaskManagerVisualization',
    props: {
        ws: WebSocket,
        isConnected: Boolean,
        terminal: Object,
    },

    setup( props, { emit } ) {
        const { emit: emitEvent, on, off } = useEventBus();
        const logoSrc = ref( ValkeyLogo );

        const tasks = ref( [
            { id: 1, action: 'Flip Right' },
            { id: 2, action: 'Flip Left' },
            { id: 3, action: 'Flip Up' },
            { id: 4, action: 'Flip Down' },
            { id: 5, action: 'Grow' },
            { id: 6, action: 'Shrink' },
            { id: 7, action: 'Change Random Color' },
        ] );

        const selectedTask = ref( tasks.value[ 0 ] );
        const taskQueue = ref( [] );
        const logoContainer = ref( null );
        const triangle = ref( null );
        const lockIconRef = ref( null );
        const unlockIconRef = ref( null );
        const buttonState = ref( 'set' );
        const showEmptyQueuePopup = ref( false );
        const taskStatus = ref( '' );

        const addTask = () => {
            if ( taskQueue.value.length < 6 ) {
                taskQueue.value.push( {
                    ...selectedTask.value,
                    uniqueId: Date.now() + Math.random().toString( 36 ).substr( 2, 9 )
                } );
            }
        };

        const setTasks = () => {
            if ( !props.isConnected || !props.ws || props.ws.readyState !== WebSocket.OPEN ) {
                console.warn( '[TaskManager] WebSocket not ready. Current state:', props.ws?.readyState );
                terminalWrite( '⚠️ Connection not ready. Please wait...' );
                return;
            }

            if ( taskQueue.value.length === 0 ) {
                showEmptyQueuePopup.value = true;
                return;
            }

            try {
                const taskData = taskQueue.value.map( task => ( {
                    action: task.action,
                    uniqueId: task.uniqueId
                } ) );

                terminalWrite( '🔧  Initializing distributed Task Queue in Valkey Cluster...' );
                terminalWrite( '📝  \x1b[1mSET task-queue\x1b[0m with distributed lock mechanism' );

                props.ws.send( JSON.stringify( {
                    action: 'setTasks',
                    data: taskData
                } ) );

                buttonState.value = 'invoke';
            } catch ( error ) {
                console.error( '[TaskManager] Error sending tasks:', error );
                terminalWrite( `❌ Error: ${ error.message }` );
                emitEvent( EventTypes.ERROR, error.message );
            }
        };

        const invokeTaskManager = () => {
            if ( props.ws && props.ws.readyState === WebSocket.OPEN ) {
                console.log( 'Sending invokeTaskManager action' );
                props.ws.send( JSON.stringify( {
                    action: 'invokeTaskManager',
                } ) );
                terminalWrite( '🚀 Invoking Task Manager...\n' );
                buttonState.value = 'cancel';
            } else {
                console.log( '[WS] Cannot send message: WebSocket not connected.' );
                terminalWrite( 'Not connected to server. Retrying connection...\n' );
            }
        };

        const cancelTaskManager = () => {
            props.ws.send( JSON.stringify( {
                action: 'cancelTaskManager'
            } ) );
            terminalWrite( '⛔ Task Manager cancelled.\n' );
            buttonState.value = 'tryAgain';
        };

        const resetTaskManager = () => {
            taskQueue.value = [];
            buttonState.value = 'set';
            terminalWrite( '🔄 Reset complete. Please add tasks.\n' );
        };

        const handleWebSocketMessage = ( event ) => {
            try {
                const message = JSON.parse( event.data );
                switch ( message.action ) {
                    case 'taskUpdate':
                        emitTaskUpdate( message.data );
                        if ( message.data?.clusterOperations ) {
                            message.data.clusterOperations.forEach( op => {
                                terminalWrite( `🔷 ${ op }` );
                            } );
                        }
                        break;

                    case 'lockAcquired':
                        emitLockStatus( true );
                        terminalWrite( '🔒 Lock acquired in Valkey Cluster' );
                        animateLocking( true );
                        break;

                    case 'lockReleased':
                        emitLockStatus( false );
                        terminalWrite( '🔓 Lock released in Valkey Cluster' );
                        animateLocking( false );
                        break;

                    case 'taskCompleted':
                        terminalWrite( '✅ Task completed successfully' );
                        break;

                    case 'error':
                        terminalWrite( `❌ Error: ${ message.message }` );
                        emitEvent( EventTypes.ERROR, message.message );
                        break;

                    case 'gameCommand':
                        handleCommand( message.data );
                        break;
                }
            } catch ( error ) {
                console.error( '[TaskManager] Error handling message:', error );
                emitEvent( EventTypes.ERROR, 'Error processing server message' );
            }
        };

        const terminalWrite = ( message ) => {
            emit( 'terminal-write', message.trim() + '\n' );
        };

        const performTask = ( action ) => {
            const el = logoContainer.value?.querySelector( '.valkey-logo' );
            const lockIcon = lockIconRef.value;
            const unlockIcon = unlockIconRef.value;
            if ( !el || !lockIcon || !unlockIcon ) return;

            el.style.borderBottomColor = '#6a11cb';

            const sequence = async () => {
                lockIcon.classList.add( 'show', 'grow' );
                await new Promise( r => setTimeout( r, 1000 ) );
                lockIcon.classList.add( 'fade-out' );
                await new Promise( r => setTimeout( r, 800 ) );
                lockIcon.classList.remove( 'show', 'grow', 'fade-out' );

                await new Promise( r => setTimeout( r, 300 ) );

                el.classList.add( 'move-to-center' );
                await new Promise( r => setTimeout( r, 600 ) );

                const baseTransform = 'translateX(-50%) translateY(-50%)';
                switch ( action.action || action ) {
                    case 'Flip Right':
                        el.style.transform = `${ baseTransform } rotateY(180deg)`;
                        break;
                    case 'Flip Left':
                        el.style.transform = `${ baseTransform } rotateY(-180deg)`;
                        break;
                    case 'Flip Up':
                        el.style.transform = `${ baseTransform } rotateX(-180deg)`;
                        break;
                    case 'Flip Down':
                        el.style.transform = `${ baseTransform } rotateX(180deg)`;
                        break;
                    case 'Grow':
                        el.style.transform = `${ baseTransform } scale(1.5)`;
                        break;
                    case 'Shrink':
                        el.style.transform = `${ baseTransform } scale(0.5)`;
                        break;
                    case 'Change Random Color':
                        el.style.borderBottomColor = getRandomColor();
                        break;
                }

                await new Promise( r => setTimeout( r, 1000 ) );

                if ( ( action.action || action ) !== 'Change Random Color' ) {
                    el.style.transform = baseTransform;
                } else {
                    el.style.borderBottomColor = '#6a11cb';
                }

                el.classList.remove(
                    'flip-right', 'flip-left', 'flip-up', 'flip-down',
                    'grow', 'shrink', 'move-to-center'
                );
                await new Promise( r => setTimeout( r, 600 ) );

                await new Promise( r => setTimeout( r, 300 ) );

                unlockIcon.classList.add( 'show', 'shrink' );
                await new Promise( r => setTimeout( r, 1000 ) );
                unlockIcon.classList.add( 'fade-out' );
                await new Promise( r => setTimeout( r, 800 ) );
                unlockIcon.classList.remove( 'show', 'shrink', 'fade-out' );

                await new Promise( r => setTimeout( r, 300 ) );

                props.ws.send( JSON.stringify( { action: 'taskCompleted' } ) );
            };

            sequence();
        };

        const getRandomColor = () => {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for ( let i = 0; i < 6; i++ ) {
                color += letters[ Math.floor( Math.random() * 16 ) ];
            }
            return color;
        };

        const animateLocking = ( isLocked ) => {
            const el = triangle.value;
            if ( !el ) return;
            if ( isLocked ) {
                el.classList.add( 'locked' );
                terminalWrite( '🔒 Lock acquired.\n' );
            } else {
                el.classList.remove( 'locked' );
                terminalWrite( '🔓 Lock released.\n' );
            }
        };

        const closePopup = () => {
            showEmptyQueuePopup.value = false;
        };

        const handleCommand = ( command ) => {
            if ( !command || typeof command !== 'object' ) return;
            const { type, task, message, step } = command;

            switch ( type ) {
                case 'lockAcquired':
                    terminalWrite( '🔒  \x1b[1mSET task-lock\x1b[0m "locked" EX 30 NX' );
                    terminalWrite( '✨  Lock acquired in Valkey Cluster - Ready to process tasks' );
                    animateLocking( true );
                    break;

                case 'performTask':
                    terminalWrite( `⚡  \x1b[1mLPOP task-queue\x1b[0m // Processing task: ${ task }` );
                    terminalWrite( `📍  Task execution progress: ${ step }/total` );
                    performTask( task );
                    break;

                case 'lockReleased':
                    terminalWrite( '🔓  \x1b[1mDEL task-lock\x1b[0m // Released distributed lock' );
                    terminalWrite( '🔄  Task Manager ready for next batch' );
                    animateLocking( false );
                    break;

                case 'complete':
                    terminalWrite( '✅  Queue processed successfully in Valkey Cluster!' );
                    terminalWrite( '📊  All distributed tasks executed and synchronized' );
                    buttonState.value = 'tryAgain';
                    break;
            }

            if ( props.ws && props.ws.readyState === WebSocket.OPEN ) {
                props.ws.send( JSON.stringify( { action: 'gameCommand', data: command } ) );
            }
        };

        const handleTerminalWrite = ( message ) => {
            emit( 'terminal-write', message );
        };

        const handleWebSocket = ( newWs ) => {
            if ( newWs ) {
                newWs.onmessage = handleWebSocketMessage;
            }
        };

        const cleanup = () => {
            taskQueue.value = [];
            buttonState.value = 'set';
            if ( props.ws?.readyState === WebSocket.OPEN ) {
                try {
                    props.ws.send( JSON.stringify( {
                        action: 'cleanup',
                        data: { force: true }
                    } ) );
                } catch ( error ) {
                    console.error( '[TaskManager] Cleanup error:', error );
                }
            }
        };

        const handleWebSocketError = ( error ) => {
            console.error( '[TaskManager] WebSocket error:', error );
            terminalWrite( '❌ Connection error. Attempting to reconnect...' );
            buttonState.value = 'set';
        };

        onBeforeUnmount( () => {
            cleanup();
            if ( props.ws ) {
                props.ws.removeEventListener( 'message', handleWebSocketMessage );
                props.ws.removeEventListener( 'error', handleWebSocketError );
            }
        } );

        onMounted( () => {
            window.addEventListener( 'beforeunload', cleanup );
            emit( 'terminal-resize', 'full-height' );

            if ( props.ws ) {
                props.ws.addEventListener( 'error', handleWebSocketError );
                handleWebSocket( props.ws );
            }

            terminalWrite( '\n🔄  Task Manager Demo with Valkey-Glide' );
            terminalWrite( '🔒  Watch distributed locks in action' );
            terminalWrite( '📋  See how task queues are' );
        } );

        watch(
            () => props.ws,
            handleWebSocket,
            { immediate: true }
        );

        watch( () => props.isConnected, ( newState ) => {
            if ( newState ) {
                terminalWrite( '🔗 Connection established' );
            } else {
                terminalWrite( '⚠️ Connection lost' );
                buttonState.value = 'set';
            }
        } );

        watch( () => props.ws, ( newWs, oldWs ) => {
            if ( oldWs ) {
                oldWs.removeEventListener( 'message', handleWebSocketMessage );
            }
            if ( newWs ) {
                newWs.addEventListener( 'message', handleWebSocketMessage );
                console.log( '[TaskManager] WebSocket connection updated' );
            }
        }, { immediate: true } );

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
            logoSrc,
            logoContainer,
        };
    }
};
</script>

<style scoped>
.task-manager {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: var(--surface-dark);
    padding: 20px;
    overflow: hidden;
    gap: 15px;
    justify-content: flex-start;
    min-height: auto;
}

:deep(.terminal-container) {
    flex: 1;
    min-height: 350px;
    margin-top: 20px;

    height: calc(100% - 350px) !important;

    min-height: unset !important;
}

.task-panel {
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
    background-color: var(--surface-lighter);

    border: 1px solid var(--accent-highlight);
    box-shadow: 0 0 10px rgba(0, 195, 255, 0.1);
    border-radius: 6px;
    padding: 15px;
    height: auto;
    min-height: 80px;
}

.control-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 150px;
}

.add-task-btn {
    background: linear-gradient(135deg, var(--accent-1), var(--accent-3));
    border: 1px solid var(--accent-highlight);
    padding: 12px;
    border-radius: 6px;
    transition: all 0.3s ease;
    border: none;
    color: var(--text-primary);
}

.add-task-btn:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--fun-shadow);
}

.task-select {
    background-color: var(--surface-lighter);
    border: 1px solid var(--accent-highlight);
    padding: 10px;
    border-radius: 6px;
    width: 100%;
    color: var(--text-primary);
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
    background: linear-gradient(145deg, var(--surface-light), var(--surface-lighter));
    border: 1px solid var(--accent-cyan);
    padding: 12px;
    border-radius: 6px;
    color: var(--text-primary);
    transition: all 0.3s ease;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}

.task-item:hover {
    border-color: var(--accent-highlight);
    box-shadow: 0 0 10px rgba(0, 195, 255, 0.2);
    background: linear-gradient(145deg, var(--surface-lighter), var(--surface-light));
    transform: translateY(-1px);
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
    position: sticky;
    flex: 1;
    min-height: 0%;
    background: linear-gradient(145deg, var(--surface-light), var(--surface-dark));
    border: 1px solid var(--accent-highlight);
    box-shadow: 0 0 15px rgba(0, 195, 255, 0.1);
    border: 1px solid var(--border-color);
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.logo-container {
    position: absolute;
    left: 50%;
    top: 75%;
    transform: translateX(-50%) translateY(-50%);
    transition: all 0.6s ease-in-out;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.valkey-logo {
    width: 100%;
    height: 100%;
    transition: all 0.6s ease-in-out;
    filter: drop-shadow(0 0 15px var(--accent-highlight)) brightness(1.3);

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

.locked .valkey-logo {
    opacity: 0.9;

    filter: drop-shadow(0 0 20px var(--primary-color)) brightness(1.3);

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
    background-color: var(--surface-light);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: var(--fun-shadow);
    border: 1px solid var(--border-color);
    text-align: center;
    max-width: 400px;
    width: 90%;
}

.modal-content p {
    color: var(--text-primary);
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
    margin: 10px 0;

}

.control-btn {
    min-width: 200px;
    padding: 15px 30px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    background: linear-gradient(135deg, var(--accent-1), var(--accent-3));
    border: 1px solid var(--accent-highlight);
    box-shadow: 0 0 10px rgba(0, 195, 255, 0.1);
    color: var(--text-primary);
    border: none;
    box-shadow: var(--fun-shadow);
}

.control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.control-btn:hover {
    box-shadow: 0 0 15px rgba(0, 195, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: var(--glow-effect);
}

.control-btn.cancel {
    background: linear-gradient(135deg, var(--error-color), var(--error-hover));
}

.control-btn.reset {
    background: linear-gradient(135deg, var(--success-color), var(--success-hover));
}
</style>
