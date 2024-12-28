<template>
    <div class="challenge-content">
        <ChallengeNavigation :current-section="currentChallengeSection" :sections="challengeSections"
            @section-change="changeSection" />
        <div class="challenge-main">
            <keep-alive>
                <component :is="currentChallengeComponent" v-if="currentChallengeComponent" :ws="ws"
                    :is-connected="wsConnected" :key="currentChallengeSection" class="challenge-component" />
            </keep-alive>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import ChallengeNavigation from './ChallengeNavigation.vue';
import CodingChallenges from './CodingChallenges.vue';
import Quizzes from './Quizzes.vue';
import { useChallenges } from '../../composables/useChallenges';

export default defineComponent({
    name: 'ChallengeLayout',
    components: {
        ChallengeNavigation,
        CodingChallenges,
        Quizzes,
    },
    props: {
        ws: Object,
        wsConnected: Boolean
    },
    setup() {
        const {
            currentChallengeSection,
            challengeSections,
            currentChallengeComponent,
            changeSection
        } = useChallenges();

        return {
            currentChallengeSection,
            challengeSections,
            currentChallengeComponent,
            changeSection
        };
    }
});
</script>

<style scoped>
.challenge-content {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.challenge-main {
    flex: 1;
    padding: 1rem;
}
</style>
