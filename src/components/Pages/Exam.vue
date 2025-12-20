<template>
    <section class="exam-wrapper">
        <div class="exam-card">

            <div v-for="(question, qIndex) in questions" :key="question.id" class="question-block">
                <h3 class="question-title">
                    Question {{ qIndex + 1 }}
                </h3>

                <p class="question-text">
                    {{ question.question }}
                </p>

                <div class="options">
                    <label v-for="(option, oIndex) in question.options" :key="oIndex" class="option">
                        <input type="radio" :name="'question-' + qIndex" :value="oIndex + 1"
                            v-model="answers[qIndex]" />
                        {{ option }}
                    </label>
                </div>

                <hr v-if="qIndex !== questions.length - 1" />
            </div>

            <div class="actions">
                <div class="actions">
                    <button class="end-btn" @click="endExam" :disabled="!isExamComplete">
                        END EXAM
                    </button>

                </div>

            </div>
        </div>
    </section>
</template>

<script>
import axiosService from '../service/axiosService';

export default {
    name: "ExamQuestions",

    data() {
        return {
            questions: [],
            answers: [],
            correctCount: 0,
            averageScore: 0,
        };
    },
    computed: {
        isExamComplete() {
            return !this.answers.includes(null);
        },
    },

    async created() {
        const response = await axiosService.getRandomquestions(5);

        this.questions = response.data.map(q => ({
            id: q.id,
            question: q.question,
            correct: q.correct, // assumed 1–4
            options: [q.answer1, q.answer2, q.answer3, q.answer4],
        }));

        // Pre-fill answers array
        this.answers = new Array(this.questions.length).fill(null);
    },

    methods: {
        endExam() {
            // ❗ Check if all questions are answered
            if (this.answers.includes(null)) {
                alert("Please answer all questions before ending the exam.");
                return;
            }

            let correct = 0;

            this.questions.forEach((q, index) => {
                if (this.answers[index] === q.correct) {
                    correct++;
                }
            });

            this.correctCount = correct;
            this.averageScore = Math.round(
                (correct / this.questions.length) * 100
            );

            this.$router.replace({
                name: 'Results',
                params: {
                    id: this.$route.params.id,
                    averageScore: this.averageScore,
                    correctCount: this.correctCount,
                    questionAmount: this.questions.length,
                },
            });
        },
    },
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
.end-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.7;
}

</style>
