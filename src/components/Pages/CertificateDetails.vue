<template>
  <div class="exam-card">
    <h2 class="certificate-title">{{ certificates.title }}</h2>
    <p class="certificate-short-description">{{ certificates.description }}</p>
    
    <div class="exam-content-grid">
        <div class="column">
          <div class="info-group">
            <h3 class="section-header"><span class="orange-arrow">►</span>Purpose of the Exam</h3>
            <ul class="exam-list">
              <li>Assess understanding of PRINCE2 Agile principles and practices.</li>
              <li>Evaluate ability to integrate agile techniques with structured project management.</li>
              <li>Ensure readiness to manage adaptive and iterative projects effectively.</li>
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
        </div>

        <div class="column">
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
          
  </div>
</template>

<script>
export default {
    name:'CertificateDetails',
    props:{
        certificates: { type: Object, required: true }
    },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style scoped>/* FULL MODAL SYSTEM */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* WHITE MODAL BOX */
.exam-card {
  background: #ffffff;
  width: 90%;
  max-width: 900px;
  padding: 50px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  animation: modalIn 0.25s ease-out;
}

/* TITLES */
.certificate-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.certificate-short-description {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;
  color: #333;
}


/* MODAL ANIMATION */
@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.exam-content-grid {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.column {
  flex: 1;
  min-width: 300px;
}
.info-group {
  margin-bottom: 24px;
}
.section-header {
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.orange-arrow {
  color: orange;
  margin-right: 8px;
  font-weight: bold;
}
.exam-list {
  padding-left: 20px;
  list-style-type: disc;
}
.exam-list li {
  margin-bottom: 8px;
  font-size: 14px;
}
.support-box {
  margin-top: 16px;
}
.support-text {
  font-size: 14px;
  margin-bottom: 8px;
}
.contact-info p {
  font-size: 14px;
  margin: 2px 0;
}

</style>
