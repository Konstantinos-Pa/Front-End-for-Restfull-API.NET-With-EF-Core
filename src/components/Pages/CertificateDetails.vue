<template>
  <div class="exam-card">
    <h2 class="certificate-title">{{ certificate.title }}</h2>
    <p class="certificate-short-description">{{ certificate.description }}</p>

    <div class="exam-content-grid">
      <div class="column">
        <div class="info-group">
          <h3 class="section-header"><span class="orange-arrow">►</span>Purpose of the Exam</h3>
          <ul class="exam-list">
            <li>Assess understanding of key concepts and best practices in the relevant field.</li>
            <li>Evaluate ability to apply knowledge effectively in practical scenarios.</li>
            <li>Ensure readiness to perform tasks and make informed decisions within the domain</li>
          </ul>
        </div>

        <div class="info-group">
          <h3 class="section-header"><span class="orange-arrow">►</span>Rules & Regulations</h3>
          <ul class="exam-list">
            <li>The exam must be taken individually.</li>
            <li>Any form of cheating or misconduct will result in immediate disqualification.</li>
            <li>The exam authority reserves the right to cancel results if rules are violated.</li>
          </ul>
        </div>
        <div class="info-group">
          <h3 class="section-header"><span class="orange-arrow">►</span>Result & Certification</h3>
          <ul class="exam-list">
            <li>Results will be announced within 3–5 working days.</li>
            <li>Digital certificates will be issued to successful candidates (if applicable).</li>
          </ul>
        </div>

        <div class="support-box">
          <h3 class="section-header"><span class="orange-arrow">►</span>Contact & Support</h3>
          <p class="support-text">For any technical issues or queries, please contact:</p>
          <div class="contact-info">
            <p>📧 support@examplatform.com</p>
            <p>📞 +1 234 567 890</p>
          </div>
        </div>
      </div>
    </div>
    <router-link class="action-btn" :to="{ name: 'PurchaseCertificate', params: { certificate } }" >
          Purchase 
        </router-link>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'CertificateDetails',
  props: {
    certificate: { type: Object, required: true }
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>
/* MODAL OVERLAY */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(3px);
}

/* CARD CONTAINER */
.exam-card {
  background: #ffffff;
  width: 92%;
  max-width: 920px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 40px 44px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  animation: modalIn 0.25s ease-out;
}

/* TITLE */
.certificate-title {
  font-size: 26px;
  font-weight: 700;
  color: #111;
  margin-bottom: 6px;
}

.certificate-short-description {
  font-size: 15px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 32px;
}

/* CONTENT GRID */
.exam-content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px;
}

/* GROUP BOX */
.info-group,
.support-box {
  background: #fafafa;
  border-radius: 12px;
  padding: 20px 22px;
  border: 1px solid #eee;
}

/* SECTION HEADER */
.section-header {
  font-size: 16px;
  font-weight: 600;
  color: #222;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

/* ORANGE INDICATOR */
.orange-arrow {
  width: 8px;
  height: 8px;
  background: #ff6a00;
  border-radius: 50%;
  display: inline-block;
}

/* LIST STYLING */
.exam-list {
  padding-left: 18px;
  margin: 0;
}

.exam-list li {
  font-size: 14px;
  line-height: 1.6;
  color: #444;
  margin-bottom: 10px;
}

/* SUPPORT SECTION */
.support-text {
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
}

.contact-info p {
  font-size: 14px;
  margin: 4px 0;
  color: #333;
}

/* ANIMATION */
@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* SCROLLBAR (OPTIONAL NICE TOUCH) */
.exam-card::-webkit-scrollbar {
  width: 8px;
}

.exam-card::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 4px;
}

.action-btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff3b00;
  color: #fff;
  border-radius: 20px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s ease, transform 0.2s ease;
  margin-top: 12px;
}
.action-btn:hover {
  background-color: #e63400;
  transform: translateY(-2px);
}
</style>
