<template>
  <div class="page">
    <!-- Toolbar -->
    <div class="toolbar">
      <router-link class="btn btn-primary" to="/candidatelist/newcandidate">
        New Candidate
      </router-link>

      <input
        class="search-input"
        type="text"
        placeholder="Search..."
        v-model="searchTerm"
      />
    </div>

    <!-- Header -->
    <div class="list-header">
      <span>First Name</span>
      <span>Last Name</span>
      <span>Email</span>
    </div>

    <!-- Rows -->
      <div v-if="candidatelist.length === 0" class="state">
        No candidate found.
      </div>
    <div v-else class="list">
      <div
        v-for="candidate in paginatedCandidates"
        :key="candidate.email"
        class="list-row"
        @click="openCandidate(candidate)"
      >
        <span>{{ candidate.firstName }}</span>
        <span>{{ candidate.lastName }}</span>
        <span>{{ candidate.email }}</span>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination" v-if="totalPages > 1">
      <button :disabled="currentPage === 1" @click="currentPage--">
        ‹ Prev
      </button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button :disabled="currentPage === totalPages" @click="currentPage++">
        Next ›
      </button>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">✕</button>
        <CandidateDetails v-if="selectedCandidate && address" :candidate="selectedCandidate" :address="address"/>
      </div>
    </div>
  </div>
</template>

<script>
import axiosService from "../service/axiosService";
import CandidateDetails from "./CandidateDetails.vue";

export default {
  components: { CandidateDetails },

  data() {
    return {
      candidatelist: [],
      address: {
        city: '',
        street: '',
        state: '',
        postalCode: '',
        country: '',
        country: '',
        landlineNumber: '',
        candidateId: ''
      },
      searchTerm: "",
      selectedCandidate: null,
      showModal: false,

      currentPage: 1,
      pageSize: 10,
    };
  },

  created() {
    this.getCandidateList();
  },

  computed: {
    filteredCandidates() {
      if (!this.searchTerm) return this.candidatelist;

      const term = this.searchTerm.toLowerCase();

      return this.candidatelist;
    },

    totalPages() {
      return Math.ceil(this.filteredCandidates.length / this.pageSize);
    },

    paginatedCandidates() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredCandidates.slice(start, end);
    },
  },

  watch: {
    searchTerm() {
      this.currentPage = 1;
    },
  },

  methods: {
    getCandidateList() {
      axiosService.getCandidateList().then((res) => {
        this.candidatelist = res.data;
      });
    },

    async openCandidate(candidate) {
      this.selectedCandidate = candidate;
      this.showModal = true;
      
        try {
          const addressRes = await axiosService.getaddressByCandidateId(candidate.id);
          this.address = addressRes.data;
          this.addressLoaded=true;
        }
        catch (err) {
          if (this.address.city === '') {
            this.addreCreate = true;
          }
        }
    },

    closeModal() {
      this.showModal = false;
      this.selectedCandidate = null;
      this.address = {
        city: '',
        street: '',
        state: '',
        postalCode: '',
        country: '',
        country: '',
        landlineNumber: '',
        candidateId: ''
      };
    },
  },
};
</script>

<style scoped>

/* ================= PAGE ================= */
.page {
  padding: 24px;
  background: #d9d9d9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
}

/* ================= TOOLBAR ================= */
.toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
  width: 100%;
  max-width: 900px;
  flex-wrap: wrap;
}

.btn-primary {
  background: #ff4d00;
  color: #fff;
  padding: 10px 20px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: background 0.2s ease, transform 0.15s ease;
}

.btn-primary:hover {
  background: #e84300;
  transform: translateY(-1px);
}

.search-input {
  width: 260px;
  max-width: 100%;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid #ccc;
  font-size: 14px;
}

/* ================= HEADER ================= */
.list-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
  background: #f3f4f6;
  border-radius: 12px;
  margin-bottom: 10px;
  width: 100%;
  max-width: 900px;
}

/* ================= LIST ================= */
.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 900px;
}

.list-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 14px 16px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}

.list-row:hover {
  background: #f9fafb;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.list-row span {
  font-size: 13.5px;
  word-break: break-word;
}

/* ================= PAGINATION ================= */
.pagination {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-top: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.pagination button {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}

.pagination button:hover:not(:disabled) {
  background: #f3f4f6;
  transform: translateY(-1px);
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ================= MODAL ================= */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 16px;
}

.modal-content {
  background: #fff;
  border-radius: 18px;
  padding: 32px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
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

/* ================= TABLET ================= */
@media (max-width: 768px) {
  .list-header {
    font-size: 13px;
  }
  .list-row span {
    font-size: 13px;
  }
}

/* ================= MOBILE ================= */
@media (max-width: 520px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .btn-primary,
  .search-input {
    width: 100%;
    text-align: center;
  }

  .list-header {
    display: none;
  }

  .list-row {
    grid-template-columns: 1fr;
    text-align: left;
    gap: 6px;
    padding: 12px 14px;
  }

  .list-row span {
    font-size: 14px;
  }

  .list-row span:nth-child(1)::before {
    content: "First Name: ";
    font-weight: 600;
  }

  .list-row span:nth-child(2)::before {
    content: "Last Name: ";
    font-weight: 600;
  }

  .list-row span:nth-child(3)::before {
    content: "Email: ";
    font-weight: 600;
  }
}

</style>
