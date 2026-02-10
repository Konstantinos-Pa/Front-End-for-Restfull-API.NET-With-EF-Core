<template>
  <div class="page" v-if="certificate">
    <div class="card">
      <h1>{{ certificate.title }}</h1>

      <h3>{{ certificate.description }}</h3>
      <div class="content">
        <div class="left">
          <section>
            <h3>What’s included:</h3>
            <ul>
              <li>Level: Intermediate</li>
              <li>Duration: 90 minutes</li>
              <li>Format: Online, multiple-choice</li>
              <li>Questions: 60</li>
              <li>Language: English</li>
            </ul>
          </section>

          <section>
            <h3>Why choose this certification?</h3>
            <ul class="checklist">
              <li>Recognized proof of knowledge</li>
              <li>Helps stand out to employers</li>
              <li>Designed by industry professionals</li>
              <li>Used by 10,000+ learners worldwide</li>
            </ul>
          </section>

          <p class="help">
            Need help? Contact <strong>support@demo-cert.com</strong>
          </p>
        </div>

        <div class="right">
          <section>
            <h3>How it works</h3>
            <ol>
              <li>Buy exam access</li>
              <li>Take the online test</li>
              <li>Pass the exam</li>
              <li>Receive your certificate instantly</li>
            </ol>
          </section>

          <section class="price">
            <h3>Price: {{ certificate.price }}$</h3>
            <p>One-time access · No expiration</p>
          </section>

          <section>
            <h3>After passing the exam, you will receive:</h3>
            <ul>
              <li>A digital certificate (PDF)</li>
              <li>A shareable verification link</li>
            </ul>
          </section>
          <button @click="handleClick" class="cta">Buy Certification Exam</button>

        </div>
      </div>
    </div>
    <!-- PayPal Modal Overlay -->
    <div v-if="showModal" class="paypal-modal-overlay">
      <div class="paypal-modal-content">
        <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal Logo" class="paypal-logo" />
        <h2>Processing Payment...</h2>
        <p>Please wait while we confirm your purchase.</p>
        <div class="paypal-spinner"></div>
        <p>You will be redirected shortly.</p>
      </div>
    </div>


  </div>
</template>

<script>
import axiosService from '../service/axiosService';
import {authToken} from "../service/axiosService";

export default {
  name: 'PurchaseCertificate',
  data() {
    return {
      certificate: null,
      token: authToken.get(),
      parsed: null, // initialize parsed as null
      candidate: null,
      showModal: false, // controls PayPal modal visibility

    };
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const response = await axiosService.getSaleCertificatesById(id)
      this.certificate = response.data;
    } catch (error) {

    }
  },
  methods: {
    async handleClick(event) {
      this.showModal = true; // show PayPal modal
      await this.AddcertificatetoCandidate();

      // redirect after 5 seconds
      setTimeout(() => {
        this.$router.push('/mycertificates');
      }, 5000);
    },
    async AddcertificatetoCandidate() {
      try {
        const payload = this.token.split(".")[1];
        const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
        this.parsed = JSON.parse(decoded);
        try {
          const candidateRes = await axiosService.getCandidateByUserName(this.parsed.unique_name)
          this.candidate = candidateRes.data;
          await axiosService.postCandidateCertificate(this.candidate.id, this.certificate.id)
        }
        catch (error) {
          console.error("Failed to Add certificate:", error);
        }
      } catch (e) {
        console.error("Failed to parse token:", e);
        this.parsed = null;
      }
    },
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}

.page {
  min-height: 70vh;
  background: #dcdcdc;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.card {
  background: #ffffff;
  max-width: 1100px;
  width: 100%;
  border-radius: 10px;
  padding: 32px 40px 24px;
  /* tightened bottom padding */
}

h1 {
  margin-bottom: 24px;
  font-size: 28px;
}

.content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

section {
  margin-bottom: 24px;
}

.right section:last-of-type {
  margin-bottom: 0;
  /* removes extra gap above button */
}

h3 {
  margin-bottom: 10px;
  font-size: 16px;
}

ul,
ol {
  padding-left: 18px;
  line-height: 1.6;
}

.checklist li::marker {
  content: "✓ ";
  color: #2c7be5;
}

.price h3 {
  font-size: 18px;
}

.help {
  margin-top: 30px;
  font-size: 14px;
}

.cta {
  display: block;
  margin-top: 20px;
  width: 100%;
  padding: 20px 24px;
  /* bigger vertical padding */
  background: #ff5a1f;
  border: none;
  color: #ffffff;
  font-size: 18px;
  /* larger text */
  font-weight: 600;
  /* stronger emphasis */
  border-radius: 30px;
  /* smoother pill shape */
  cursor: pointer;
  text-align: center;
  letter-spacing: 0.5px;
  /* optional, improves CTA feel */
  text-decoration: none;
  box-shadow: 0 6px 16px rgba(255, 90, 31, 0.3);
}

.cta:hover {
  background: #e14c16;
  transform: translateY(-1px);
}

@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}

.paypal-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.paypal-modal-content {
  background-color: #fff;
  padding: 40px 60px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
}

.paypal-modal-content h2 {
  margin-bottom: 16px;
  color: #003087;
}

.paypal-modal-content p {
  margin-bottom: 16px;
  font-size: 14px;
  color: #333;
}

.paypal-spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #003087;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0 auto 16px auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
