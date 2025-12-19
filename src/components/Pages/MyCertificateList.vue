<template>
  <section class="certificates-page">
    <h3 v-if="certificates.length === 0 && !loading">You have no certificates yet</h3>
    <h2 v-else-if="certificates.length !== 0 && loading" class="page-title">Your Certificates</h2>
    

    <div class="certificates-grid">
      <div v-for="cert in certificates" :key="cert.id" class="certificate-card">
        <h3 class="card-title">{{ cert.title }}</h3>
        <p class="card-description">{{ cert.description }}</p>

        <button class="learn-more-btn" @click="OpenModal(cert)">Learn More</button>

      </div>
    </div>
  </section>

  <!-- Modal -->
  <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">✕</button>
      <CertificateDetails :certificates="selectedCertificate" />
    </div>
  </div>

</template>

<script>
import axiosService from '../service/axiosService';
import CertificateDetails from './CertificateDetails.vue';

export default {
  components: { CertificateDetails },

  data() {
    return {
      certificates: [],
      loading: true,
      showModal: false,
      selectedCertificate: null,
      token: localStorage.getItem("token") || "",
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

        try {
          const candidateRes = await axiosService.getCandidateByUserName(this.parsed.unique_name);
          this.candidateDetails = candidateRes.data;
          if (this.candidateDetails && this.candidateDetails.id) {
            await this.getCandidateCertificates();
          }
        }
        catch (error) {
          console.log(error)
        }
      } catch (e) {
        console.error("Failed to parse token:", e);
        this.parsed = null;
      }
    }
  },
  methods: {
    getCandidateCertificates() {
      axiosService.getCandidateCertificates(this.candidateDetails.id)
        .then((response) => {
          this.certificates = response.data;
        })
        .catch((error) => {
          console.error('Failed to fetch certificates:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    closeModal() {
      this.showModal = false;
    },
    OpenModal(cert) {
      this.selectedCertificate = cert;
      this.showModal = true;
    }
  },
};
</script>



<style scoped>
.certificates-list {
  padding: 20px;
}

.certificate-item {
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
  padding-bottom: 10px;
}

.certificates-page {
  background-color: #d9d9d9;
  padding: 32px;
  min-height: 100vh;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #000;
}

.certificates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: 24px;
}

.certificate-card {
  background: #ffffff;
  border-radius: 14px;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 200px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.certificate-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #000;
}

.card-description {
  font-size: 14px;
  line-height: 1.5;
  color: #444;
  flex-grow: 1;
  max-height: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  /* horizontal center */
  align-items: center;
  /* vertical center */
  z-index: 1000;
  overflow-y: auto;
  /* scroll if content taller than screen */
}

.modal-content {
  position: relative;
  background: #fff;
  border-radius: 14px;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  /* remove extra internal padding effect */
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

.learn-more-btn {
  align-self: flex-start;
  margin-top: 20px;
  padding: 8px 18px;
  border-radius: 20px;
  border: none;
  background-color: #ff3b00;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.learn-more-btn:hover {
  background-color: #e63400;
  transform: translateY(-2px);
}

@media (max-width: 1024px) {
  .certificates-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {
  .certificates-grid {
    grid-template-columns: 1fr;
  }
}
</style>