<template>
  <div class="page">
    <h2>Purchase Certificates</h2>

    <!-- Certificates list -->
    <div class="card">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Assessment Code</th>
            <th>Price (€)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cert in certificateList" :key="cert.id">
            <td>
              <input
                type="checkbox"
                v-model="selectedCertificates"
                :value="cert"
              />
            </td>
            <td>{{ cert.title }}</td>
            <td>{{ cert.assessmentTestCode }}</td>
            <td>{{ cert.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Summary -->
    <div class="summary">
      <p><strong>Total:</strong> €{{ totalPrice }}</p>
      <button
        class="btn-primary"
        :disabled="selectedCertificates.length === 0"
        @click="purchase"
      >
        Buy Certificates
      </button>
    </div>
  </div>
</template>

<script>
import axiosService from "../service/axiosService";

export default {
  data() {
    return {
      certificateList: [],
      selectedCertificates: [],
    };
  },
  computed: {
    totalPrice() {
      return this.selectedCertificates.reduce(
        (sum, c) => sum + c.price,
        0
      );
    },
  },
  methods: {
    getCertificates() {
      axiosService.getCertificateList()
        .then(res => {
          this.certificateList = res.data;
        })
        .catch(err => {
          console.error("Failed to fetch certificates", err);
        });
    },
    purchase() {
      const payload = {
        certificateIds: this.selectedCertificates.map(c => c.id),
        totalPrice: this.totalPrice,
      };

      console.log("PURCHASE PAYLOAD:", payload);
      alert("Purchase completed (mock)");
    },
  },
  created() {
    this.getCertificates();
  },
};
</script>

<style scoped>
.page {
  padding: 24px;
  background: #f2f2f2;
}

h2 {
  margin-bottom: 16px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.summary {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-primary {
  background: #ff4d00;
  color: white;
  border: none;
  border-radius: 999px;
  padding: 10px 20px;
  font-weight: 600;
  cursor: pointer;
}
</style>