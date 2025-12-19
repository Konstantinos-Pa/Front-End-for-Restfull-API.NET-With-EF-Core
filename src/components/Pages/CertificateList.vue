<template>
  <section v-if="most.length !== 0" class="certificates-page">
    <h3 class="empty-message" v-if="certificates.length === 0 && !loading">No certificates found</h3>
    <h2 v-else-if="certificates.length !== 0 && loading" class="page-title">Certificates</h2>

    <div class="certificates-grid">
      <div v-for="cert in certificates.filter(c => most.includes(c.id))" :key="cert.id" class="certificate-card">
        <div>

          <h3 class="card-title">{{ cert.title }}</h3>
          <p class="card-description">{{ cert.description }}</p>

          <div class="card-actions">
            <button class="learn-more-btn" @click="OpenModal(cert)">Learn More</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-else class="certificates-page">
    <h3 v-if="certificates.length === 0 && !loading">No certificates found</h3>
    <h2 v-else-if="certificates.length !== 0 && loading" class="page-title">Certificates</h2>

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
  props: {
    most: { type: Array, default: () => [] },
  },
  data() {
    return {
      certificates: [],
      loading: true,
      showModal: false,
      selectedCertificate: null,
    };
  },
  methods: {
    async getAllCertificates() {
      await axiosService.getAllCertificates()
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
  created() {
    this.getAllCertificates();
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
  background-color: #CBCBCB;
  padding: 32px;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #000;
}

.certificates-grid {
  display: flex;
  flex-wrap: wrap;
  /* allow multiple rows */
  justify-content: space-evenly;
  /* even spacing horizontally */
  gap: 24px;
  /* spacing between rows and columns */
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
  flex: 1 1 420px;
  /* grow:1, shrink:1, base width:420px */
  max-width: 420px;
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

.card-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 20px;
}

.learn-more-btn,
.buy-btn {
  padding: 8px 20px;
  border-radius: 20px;
  border: none;
  background-color: #ff3b00;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.learn-more-btn:hover,
.buy-btn:hover {
  background-color: #e63400;
  transform: translateY(-2px);
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
.empty-message {
  margin: 0 auto;
  padding: 20px 0;
  /* just some spacing */
  text-align: center;
  font-size: 18px;
  color: #555;
}
</style>