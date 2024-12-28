<template>
    <div class="tabs-container">
        <div class="tabs">
            <button v-for="tab in tabs" :key="tab.name" :class="['tab', { active: tab.name === activeTab }]"
                @click="handleTabClick(tab.name)">
                {{ tab.label }}
            </button>
        </div>
        <div v-if="activeTab === 'watchInAction' && hasSelection" class="replace-button-container">
            <div class="connection-line"></div>
            <button class="replace-button" @click="handleReplace">
                <span class="button-icon">⟲</span>
                <span class="button-text">Back to Select</span>
            </button>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { store } from '../../store';

export default {
    name: 'TopTabs',
    props: {
        activeTab: {
            type: String,
            default: 'playground',
        },
    },
    emits: [ 'change-tab' ],
    setup( props, { emit } ) {
        const hasSelection = computed( () => {
            return store.watchState?.selectedAction && store.watchState?.selectedClient;
        } );

        const handleReplace = () => {
            const activeVisualization = document.querySelector( '.visualization-section' )?.__vueParent$?.exposed;
            if ( activeVisualization?.cleanup ) {
                activeVisualization.cleanup();
            }
            store.clearWatchState();
        };

        const handleTabClick = ( tabName ) => {
            if ( tabName === 'watchInAction' && props.activeTab === 'watchInAction' && hasSelection.value ) {
                handleReplace();
            }
            emit( 'change-tab', tabName );
        };

        return {
            hasSelection,
            handleReplace,
            handleTabClick,
            tabs: [
                { name: 'playground', label: 'Playground' },
                { name: 'commonUseCases', label: 'Common Use Cases' },
                { name: 'watchInAction', label: 'Watch in Action' },
                { name: 'challenges', label: 'Challenges' },
                { name: 'community', label: 'Community' },
                { name: 'helpfulResources', label: 'Resources' },
                { name: 'aboutUs', label: 'About Us' },
            ]
        };
    }
};
</script>

<style scoped>
.tabs-container {
    display: flex;
    align-items: center;
    background: var(--surface-darker);
    height: var(--top-tabs-height);
    padding: 0;

}

.tabs {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-xs);
    padding: 0 var(--spacing-lg);
    height: 100%;
    margin-left: var(--sidebar-width);
}

.tab {
    flex: 1;
    min-width: 120px;
    height: calc(100% - 4px);
    padding: 0 var(--spacing-xl);
    color: var(--text-secondary);
    background: var(--tab-inactive);
    border: none;
    border-radius: var(--radius-md);
    font-family: var(--font-tabs);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.tab::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--primary-color);
    transform: scaleX(0);
    transition: transform 0.2s ease;
}

.tab:hover::after {
    transform: scaleX(0.5);
}

.tab.active {
    color: var(--text-primary);
    background: var(--tab-active);
    flex: 1.2;
}

.tab.active::after {
    transform: scaleX(1);
}

.tab::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--text-secondary), transparent);
    opacity: 0.2;
}

.tab:hover {
    background: var(--tab-hover);
    transform: translateY(1px);
}

.tab:not(.active) {
    box-shadow: inset 0 -2px 3px -2px rgba(0, 0, 0, 0.3);
}

.replace-button-container {
    position: absolute;
    top: 0;
    left: 0;
    height: var(--top-tabs-height);
    width: 240px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 99;
}

.connection-line {
    position: absolute;
    top: 0;
    right: -30px;
    width: 18px;
    height: 100%;
    background: linear-gradient(to bottom,
            var(--primary-color) 0%,
            var(--tab-inactive) 70%,
            transparent 100%);
    opacity: 1;
    transform-origin: top;
    animation: pulseVertical 3s infinite;
    z-index: 98;
    clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
}

@keyframes pulseVertical {

    0%,
    100% {
        opacity: 1;
        height: 120%;
    }

    50% {
        opacity: 0.7;
        height: 100%;
    }
}

.replace-button {
    margin-top: 5px;
    width: 100%;
    height: calc(var(--top-tabs-height) - 10px);
    padding: 0 var(--spacing-sm);
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
    color: var(--text-primary);
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);
    z-index: 100;
    transition: all 0.3s ease;
    font-family: var(--font-tabs);
    font-size: var(--text-sm);
    font-weight: 500;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@keyframes pulse {

    0%,
    100% {
        opacity: 0.5;
    }

    50% {
        opacity: 0.2;
    }
}

.button-icon {
    font-size: 24px;
    transition: transform 0.3s ease;
}

.replace-button:hover {
    transform: translateY(1px);
}

.replace-button:hover .button-icon {
    transform: rotate(180deg);
}

.replace-button:hover::before {
    opacity: 1;
}
</style>
