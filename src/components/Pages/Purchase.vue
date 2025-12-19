<template>
  <div class="page">
    <div class="card">
<h1>{{certificate.title}}</h1>

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
            <h3>Price: {{ certificate.price}}</h3>
            <p>One-time access · No expiration</p>
          </section>

          <section>
            <h3>After passing the exam, you will receive:</h3>
            <ul>
              <li>A digital certificate (PDF)</li>
              <li>A shareable verification link</li>
            </ul>
          </section>

          <button class="cta">Buy Certification Exam</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseCertificate',
  data() {
    return {
        certificate:null,
    };
  },
  methods: {
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
  padding: 32px 40px 24px; /* tightened bottom padding */
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
  margin-bottom: 0; /* removes extra gap above button */
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
  margin-top: 12px; /* reduced spacing */
  width: 100%;
  padding: 14px;
  background: #ff5a1f;
  border: none;
  color: #ffffff;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
}

.cta:hover {
  background: #e14c16;
}

@media (max-width: 900px) {
  .content {
    grid-template-columns: 1fr;
  }
}

</style>
