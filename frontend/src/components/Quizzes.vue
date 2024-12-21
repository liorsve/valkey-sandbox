<template>
    <div class="quizzes">
        <h2>Quizzes</h2>
        <div v-for="(question, index) in questions" :key="index" class="quiz-question">
            <p>{{ index + 1 }}. {{ question.text }}</p>
            <ul>
                <li v-for="(option, idx) in question.options" :key="idx">
                    <label>
                        <input type="radio" :name="'question' + index" :value="option" v-model="userAnswers[index]" />
                        {{ option }}
                    </label>
                </li>
            </ul>
            <button v-if="!answered[index]" @click="checkAnswer(index)">Submit Answer</button>
            <div v-if="feedbacks[index]" class="quiz-feedback">
                <p>{{ feedbacks[index] }}</p>
                <a v-if="userAnswers[index] !== question.correctAnswer" :href="question.resourceLink"
                    target="_blank">Learn More</a>
            </div>
        </div>
        <div v-if="quizFinished" class="quiz-results">
            <h3>Quiz Completed!</h3>
            <p>Your Score: {{ score }} out of {{ questions.length }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuizManager',
    props: {
        ws: {
            type: WebSocket,
            required: true,
            validator: function (value) {
                return value instanceof WebSocket;
            }
        },
        isConnected: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            questions: [], // Load questions from a data source
            userAnswers: {},
            feedbacks: {},
            answered: {},
            quizFinished: false,
            score: 0,
        };
    },
    methods: {
        checkAnswer(index) {
            const question = this.questions[index];
            if (this.userAnswers[index] === question.correctAnswer) {
                this.feedbacks[index] = 'Correct!';
                this.score += 1;
            } else {
                this.feedbacks[index] = 'Incorrect.';
            }
            this.answered[index] = true;
            // Check if quiz is finished
            if (Object.keys(this.answered).length === this.questions.length) {
                this.quizFinished = true;
            }
        },
    },
    created() {
        // Fetch or import quizQuestions and set to this.questions
        // Example:
        // import { quizQuestions } from '../data/challenges';
        // this.questions = quizQuestions;
    },
};
</script>

<style scoped>
.quizzes {
    padding: 20px;
}

.quiz-question {
    margin-bottom: 20px;
}

.quiz-feedback {
    margin-top: 10px;
}

.quiz-results {
    margin-top: 20px;
}

.submit-btn {
    margin-top: 15px;
}
</style>
