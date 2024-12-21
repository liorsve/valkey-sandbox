<template>
    <div class="top-tabs">
        <button v-for="tab in tabs" :key="tab.name" :class="{ 'active-tab': tab.name === activeTab }"
            @click="$emit('change-tab', tab.name)">
            {{ tab.label }}
        </button>
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
                { name: 'commonUseCases', label: 'Common UseCases' },
                { name: 'watchInAction', label: 'Watch in Action' },
                { name: 'challenges', label: 'Challenge Yourself' },
                { name: 'community', label: 'Community' },
                { name: 'helpfulResources', label: 'Helpful Resources' },
            ],
        };
    },
};
</script>

<style scoped>
.top-tabs {
    display: flex;
    background-color: #333;
    height: 50px;
}

.top-tabs button {
    flex: 1;
    color: #fff;
    background-color: #444;
    border: none;
    cursor: pointer;
}

.top-tabs button.active-tab {
    background-color: #555;
    font-weight: bold;
}

.top-tabs button:hover {
    background-color: #666;
}
</style>
