<template>
    <section class="exam-wrapper">
        <div class="exam-card">

            <div v-for="(question, qIndex) in questions" :key="qIndex" class="question-block">
                <h3 class="question-title">
                    Question {{ qIndex + 1 }}
                </h3>

                <p class="question-text">
                    {{ question.text }}
                </p>

                <div class="options">
                    <label v-for="(option, oIndex) in question.options" :key="oIndex" class="option">
                        <input type="radio" :name="'question-' + qIndex" :value="option" v-model="answers[qIndex]" />
                        {{ option }}
                    </label>
                </div>

                <hr v-if="qIndex !== questions.length - 1" />
            </div>

            <div class="actions">
                <button class="end-btn" @click="endExam">
                    END EXAM
                </button>
            </div>

        </div>
    </section>
</template>

<script>
export default {
    name: "ExamQuestions",
    props: {
        id: null,
    },
    data() {
        return {
            topics: {
                questions: [],
                answers: {},
            },
        };
    },
    methods: {
        endExam() {
            console.log("User answers:", this.answers);
            // emit / route / api call here
        }
    }
};
</script>

<style scoped>
.exam-wrapper {
    background: #d6d6d6;
    padding: 40px 0;
    min-height: 100vh;
}

.exam-card {
    background: #ffffff;
    max-width: 900px;
    margin: 0 auto;
    padding: 32px;
    border-radius: 10px;
}

.question-block {
    margin-bottom: 24px;
}

.question-title {
    font-weight: 700;
    margin-bottom: 6px;
}

.question-text {
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
}

.options {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.option {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
}

hr {
    margin: 24px 0;
    border: none;
    border-top: 1px solid #666;
}

.actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 32px;
}

.end-btn {
    background: #ff3b00;
    color: #fff;
    border: none;
    padding: 10px 18px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 18px;
    cursor: pointer;
}

.end-btn:hover {
    opacity: 0.9;
}
</style>
