<template>
  <section class="certificates-page">

    <h3 v-if="!loading && certificates.length === 0 && nextcertificates.length === 0 && !flag" class="empty-message">
      You have no certificates yet
    </h3>

    <h2 v-if="(nextcertificates.length && !loading && flag || !flag) && nextcertificates.length !== 0"
      class="page-title">
      Your Next Exam
    </h2>

    <div class="certificates-grid" v-if="nextcertificates.length && flag || !flag">
      <div v-for="cert in nextcertificates" :key="cert.id" class="certificate-card">
        <div class="card-info">
          <h3 class="card-title">{{ cert.title }}</h3>
          <p class="card-meta">Description: {{ cert.description }}</p>
          <p class="card-meta">Your examination date is: {{ cert.examinationDate }}</p>
        </div>
        <div class="card-actions">
          <router-link class="btn" :class="{ disabled: !isExamAvailable(cert.examinationDate) }" :to="{ name: 'ExamQuestions', params: { id: cert.id } }"
            @click.native.prevent="!isExamAvailable(cert.examinationDate)">
            <span>Take exam</span>
          </router-link>
          <button class="btn" @click="OpenModal(cert)">Learn More</button>
        </div>
      </div>
    </div>

    <h2 v-if="certificates.length && !loading && !flag" class="page-title ">
      My Certificates
    </h2>

    <div class="certificates-grid" v-if="certificates.length && !flag">
      <div v-for="cert in certificates" :key="cert.id" class="certificate-card">
        <div class="card-info">
          <h3 class="card-title">{{ cert.title }}</h3>
          <p class="card-meta">Description: {{ cert.description }}</p>
          <p class="card-meta">Your examination date was: {{ cert.examinationDate }}</p>
          <p class="card-meta">Your score date {{ new Date(cert.scoreReportDate) >= new Date() ? 'will be' : 'was' }}
            on:
            {{ cert.scoreReportDate }}</p>
          <div v-if="new Date(cert.scoreReportDate) < new Date()">
            <p class="card-meta">You {{ cert.assessmentResultLabel ? 'Passed' : 'Failed' }}</p>
            <p class="card-meta">You scored: {{ cert.candidateScore }} out of {{ cert.maximumScore }}</p>
            <p class="card-meta">In summary you scored: {{ cert.percentageScore }}% </p>
          </div>
        </div>
        <div class="card-actions">
          <button class="btn" @click="OpenModal(cert)">Learn More</button>
          <button class="btn" disabled>See Certification</button>
        </div>
      </div>
    </div>

  </section>

  <!-- Modal -->
  <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">✕</button>
      <CertificateDetails :certificate="selectedCertificate" :my="true" />
    </div>
  </div>
</template>

<script>
import axiosService from '../service/axiosService';
import {authToken} from "../service/axiosService";
import CertificateDetails from './CertificateDetails.vue';

export default {
  components: { CertificateDetails },
  props: {
    flag: { type: Boolean, default: false },
  },
  data() {
    return {
      certificates: [],
      nextcertificates: [],
      loading: true,
      showModal: false,
      selectedCertificate: null,
      token: authToken.get(),
      parsed: null,
      candidateDetails: null
    };
  },

  async created() {
    if (this.token) {
      try {
        const payload = this.token.split(".")[1];
        const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        this.parsed = JSON.parse(decoded);

        const candidateRes = await axiosService.getCandidateByUserName(this.parsed.unique_name);
        this.candidateDetails = candidateRes.data;

        if (this.candidateDetails && this.candidateDetails.id) {
          await this.getCandidateCertificates();
        }
      } catch (e) {
        console.error("Failed to parse token or fetch data:", e);
        this.parsed = null;
      }
    }
  },

  methods: {
    isExamAvailable(examDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const examDay = new Date(examDate);
      examDay.setHours(0, 0, 0, 0);

      return today.getTime() === examDay.getTime();
    },
    isToday(dateString) {
      const today = new Date();
      const date = new Date(dateString);

      return date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();
    },
    async getCandidateCertificates() {
      try {
        const response = await axiosService.getCertificatesOfCandidate(this.candidateDetails.id);
        const allCertificates = response.data;
        const now = new Date();
        now.setHours(0, 0, 0, 0); // reset time to 00:00:00

        this.nextcertificates = allCertificates.filter(cert => {
          const examDate = new Date(cert.examinationDate);
          examDate.setHours(0, 0, 0, 0); // reset time to 00:00:00
          return (examDate >= now) && (cert.maximumScore == 0);
          console.log(cert.candidateScore);
        });

        this.certificates = allCertificates.filter(cert => {
          const examDate = new Date(cert.examinationDate);
          examDate.setHours(0, 0, 0, 0); // reset time to 00:00:00
          return (examDate < now) || (cert.candidateScore != 0);
        });

      } catch (error) {
        console.error('Failed to fetch certificates:', error);
      } finally {
        this.loading = false;
      }
    },

    closeModal() {
      this.showModal = false;
    },

    OpenModal(cert) {
      this.selectedCertificate = cert;
      this.showModal = true;
    },
  }
};
</script>

<style scoped>
.certificates-page {
  background-color: #CBCBCB;
}

.page-title {
  padding: 32px;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #000;
}

.certificates-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.certificate-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 1vw;
}

.certificate-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.card-info {
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #000;
}

.card-meta {
  font-size: 14px;
  color: #555;
  margin: 2px 0;
}

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
}

.btn {
  background-color: #ff3b00;
}

.btn:hover {
  background-color: #e63400;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
}

.modal-content {
  position: relative;
  background: #fff;
  border-radius: 14px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 22px;
  background: none;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .certificate-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .card-actions {
    flex-direction: row;
  }
}

.empty-message {
  margin: 0 auto;
  padding: 20px 0;
  /* just some spacing */
  text-align: center;
  font-size: 18px;
  color: #555;
}
</style>
