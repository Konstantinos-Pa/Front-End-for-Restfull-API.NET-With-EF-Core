<template>
    <section class="results-page" v-if="certificate">
        <div class="results-card">
            <h2 class="certificate-title">{{ certificate.title }}</h2>

            <div class="results-info">
                <div class="info-item">
                    <strong>Assessment Test Code:</strong> {{ certificate.assessmentTestCode }}
                </div>
                <hr />
                <div class="info-item">
                    <strong>Examination Date:</strong> {{ certificate.examinationDate }}
                </div>
                <hr />
                <div class="info-item">
                    <strong>Candidate Score:</strong> {{ certificate.candidateScore }}/{{
                        this.$route.params.questionAmount }}
                </div>
                <hr />
                <div class="info-item">
                    <strong>Percentage:</strong> {{ certificate.percentageScore }}%
                </div>
                <hr />
                <div class="info-item">
                    <strong>Assessment Result:</strong> {{ certificate.assessmentResultLabel ? 'Passed' : 'Failed' }}
                </div>
            </div>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

            <RouterLink class="action-btn" to="/myCertificates">My Certificates</RouterLink>
        </div>
    </section>
</template>

<script>
import axiosService from '../service/axiosService';

export default {
    name: 'Results',
    data() {
        return {
            certificate: null,
            errorMessage: '',
        };
    },

    async created() {
        try {
            const response = await axiosService.getCertificatesById(
                this.$route.params.id
            );

            this.certificate = response.data;

            // Route params are strings → convert to numbers
            this.certificate.candidateScore = Number(this.$route.params.correctCount);
            this.certificate.maximumScore = Number(this.$route.params.questionAmount);
            this.certificate.percentageScore = Number(this.$route.params.averageScore);
            this.certificate.scoreReportDate = new Date().setHours(0, 0, 0, 0);;

            // Set result label correctly
            this.certificate.assessmentResultLabel =
                this.certificate.percentageScore >= 65;
            this.certificate.scoreReportDate = new Date().toISOString().split('T')[0];
            await axiosService.putCertificate(this.certificate.id, this.certificate);

        } catch (error) {
            this.errorMessage = 'Unable to load your certificate. Please try again later.';
            console.error(error);
        }
    },

    methods: {
        goToCertificates() {
            this.$router.push({ name: 'MyCertificates' });
        },
    },
};
</script>


<style scoped>
.results-page {
    background-color: #d9d9d9;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 40px;
}

.results-card {
    background-color: #fff;
    padding: 50px;
    border-radius: 14px;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.certificate-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
}

.results-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 32px;
}

.info-item {
    font-size: 16px;
    padding: 8px 0;
    text-align: left;
}

hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 0;
}

.action-btn {
    background-color: #ff3b00;
    color: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    margin-top: 12px;
}

.action-btn:hover {
    background-color: #e63400;
}
</style>
