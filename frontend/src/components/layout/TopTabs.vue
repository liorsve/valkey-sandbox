<template>
    <div class="tabs-container">
        <div class="tabs">
            <button v-for="tab in tabs" :key="tab.name" :class="['tab', { active: tab.name === activeTab }]"
                @click="$emit('change-tab', tab.name)">
                {{ tab.label }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopTabs',
    props: {
        activeTab: {
            type: String,
            default: 'playground',
        },
    },
    emits: ['change-tab'],
    data() {
        return {
            tabs: [
                { name: 'playground', label: 'Playground' },
                { name: 'commonUseCases', label: 'Common Use Cases' },
                { name: 'watchInAction', label: 'Watch in Action' },
                { name: 'challenges', label: 'Challenges' },
                { name: 'community', label: 'Community' },
                { name: 'helpfulResources', label: 'Resources' },
                { name: 'aboutUs', label: 'About Us' },
            ],
        };
    },
};
</script>

<style scoped>
.tabs-container {
    display: flex;
    align-items: center;
    background: var(--surface-darker);
    height: var(--top-tabs-height);
    padding: 0;
    margin-left: var(--sidebar-width);
}

.tabs {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-xs);
    padding: 0 var(--spacing-lg);
    height: 100%;
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
</style>
