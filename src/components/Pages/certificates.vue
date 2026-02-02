<template>
  <div class="grey-background">
    <div class="content-box">
      <h1>Certificates</h1>
      <div class="table-wrapper">
        <div v-if="loading" class="loader">Loading certificates...</div>
        <table v-else class="cert-table">
          <thead>
            <tr>
              <th class="title-col">Title</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="certificate in source" :key="certificate.title">
              <td class="title-col">{{ certificate.title }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axiosService from '../service/axiosService';

export default {
  data() {
    return {
      source: [],
      loading: true,
    };
  },
  methods: {
    getAllCertificates() {
      axiosService.getAllCertificates()
        .then((response) => {
          this.source = response.data;
        })
        .catch((error) => {
          console.error('Failed to fetch certificates:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  created() {
    this.getAllCertificates();
  },
};
</script>

<style scoped>
.grey-background {
  background-color: #CBCBCB;
  padding: 2rem;
}

.content-box {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
}

.table-wrapper {
  padding: 24px;
  overflow-x: auto; /* Makes table scrollable on small screens */
}

.loader {
  font-size: 14px;
  color: #333;
  padding: 16px 0;
}

/* Table styling */
.cert-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.cert-table thead th {
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  padding: 12px 10px;
  border-bottom: 2px solid #6f6f6f;
  vertical-align: bottom;
}

.cert-table tbody td {
  font-size: 14px;
  padding: 14px 10px;
  border-bottom: 1px solid #bdbdbd;
}

.cert-table tbody tr:last-child td {
  border-bottom: none;
}

/* Column sizing */
.title-col {
  width: 38%;
}

/* Responsive improvements */
@media (max-width: 900px) {
  .cert-table {
    font-size: 12px;
  }

  .title-col {
    width: 50%;
  }
}
</style>
