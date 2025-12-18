<template>
  <div v-if="candidate" class="container">
    <h2>Candidate Profile</h2>

    <!-- TABS -->
    <div class="tabs">
      <button :class="{ active: activeTab === 'details' }" @click="switchTab('details')">
        Candidate Details
      </button>
      <button :class="{ active: activeTab === 'certificates' }" @click="switchTab('certificates')">
        Candidate Certificates
      </button>
    </div>

    <!-- ================= DETAILS TAB ================= -->
    <div v-if="activeTab === 'details'">
      <!-- VIEW MODE -->
      <div v-if="!isEditing" class="grid">
        <div class="row"><span>First Name</span><span>{{ candidate.firstName }}</span></div>
        <div class="row"><span>Middle Name</span><span>{{ candidate.middleName }}</span></div>
        <div class="row"><span>Last Name</span><span>{{ candidate.lastName }}</span></div>
        <div class="row"><span>Gender</span><span>{{ candidate.gender ? "Female" : "Male" }}</span></div>
        <div class="row"><span>Date of Birth</span><span>{{ candidate.dateOfBirth }}</span></div>
        <div class="row"><span>Email</span><span>{{ candidate.email }}</span></div>
        <div class="row"><span>Native Language</span><span>{{ candidate.nativeLanguage }}</span></div>
        <div class="row"><span>Phone Number</span><span>{{ candidate.phoneNumber }}</span></div>

        <div class="actions">
          <button class="btn edit" @click="startEdit">Edit Candidate</button>
        </div>
      </div>

      <!-- EDIT MODE -->
      <form v-else class="grid" @submit.prevent="saveChanges">
        <div class="row">
          <span>First Name</span>
          <input v-model="editableCandidate.firstName" required maxlength="20" />
        </div>

        <div class="row">
          <span>Middle Name</span>
          <input v-model="editableCandidate.middleName" maxlength="20" />
        </div>

        <div class="row">
          <span>Last Name</span>
          <input v-model="editableCandidate.lastName" required maxlength="20" />
        </div>

        <div class="row">
          <span>Gender</span>
          <select v-model="editableCandidate.gender" required>
            <option :value="0">Male</option>
            <option :value="1">Female</option>
          </select>
        </div>

        <div class="row">
          <span>Date of Birth</span>
          <input type="date" v-model="editableCandidate.dateOfBirth" required />
        </div>

        <div class="row">
          <span>Email</span>
          <input type="email" v-model="editableCandidate.email" required maxlength="100" />
        </div>

        <div class="row">
          <span>Native Language</span>
          <input type="text" class="form-control" id="nativeLanguage" v-model="editableCandidate.nativeLanguage"
            maxlength="50" required>
        </div>

        <div class="row">
          <span>Phone Number</span>
          <input type="tel" v-model="editableCandidate.phoneNumber" required />
        </div>

        <p class="text-danger mb-3 text-start position-relative" v-if="errors">
        <ul v-for="error in errors">
          <li>{{ error[0] }}</li>
        </ul>
        </p>

        <div class="actions">
          <button type="button" class="btn cancel" @click="cancelEdit">Cancel</button>
          <button type="submit" class="btn save">Save Changes</button>
        </div>
      </form>
    </div>

    <!-- ================= CERTIFICATES TAB ================= -->
    <div v-if="activeTab === 'certificates'">
      <div v-if="certificatesLoading" class="state">Loading certificates...</div>
      <div v-else-if="certificates.length === 0" class="state">No certificates found.</div>
      <div v-else class="cert-grid">
        <div v-for="cert in certificates" :key="cert.id" class="cert-card">
          <h3>{{ cert.Title }}</h3>
          <p><strong>Assessment Test Code:</strong> {{ cert.AssessmentTestCode }}</p>
          <p><strong>Examination Date:</strong> {{ cert.ExaminationDate }}</p>
          <p><strong>Score report date:</strong> {{ cert.ScoreReportDate }}</p>
          <p><strong>Candidate score:</strong> {{ cert.CandidateScore }}</p>
          <p><strong>Maximum score:</strong> {{ cert.MaximumScore }}</p>
          <p><strong>Percentage score:</strong> {{ cert.PercentageScore }}</p>
          <p><strong>Assessment result label:</strong> {{ cert.AssessmentResultLabel }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosService from "../service/axiosService";

export default {
  name: "CandidateDetails",
  props: {
    candidate: { type: Object, required: true },
  },
  data() {
    return {
      activeTab: "details",
      errors: {},
      isEditing: false,
      editableCandidate: null,
      certificates: [],
      certificatesLoaded: false,
      certificatesLoading: false,
    };
  },
  methods: {
    switchTab(tab) {
      this.activeTab = tab;
      if (tab === "certificates" && !this.certificatesLoaded) {
        axiosService.getCertificatesOfCandidate(this.candidate.id).then(res => {
          this.certificates = res.data;
          this.certificatesLoaded = true;
        });
      }
    },
    startEdit() {
      this.editableCandidate = { ...this.candidate };
      this.isEditing = true;
    },
    cancelEdit() {
      this.editableCandidate = null;
      this.isEditing = false;
    },
    async saveChanges() {
      try {
        // Ensure Certificates exists as an array
        if (!this.editableCandidate.Certificates) {
          this.editableCandidate.Certificates = [];
        }
        await axiosService.putCandidate(this.editableCandidate.id, this.editableCandidate);
        Object.assign(this.candidate, this.editableCandidate);
        this.isEditing = false;
        this.editableCandidate = null;
      } catch (error) {
        if (error.response?.data) {
          error = error.response.data;
          this.errors = error?.errors;
        }
      }
    },
  },
};
</script>


<style scoped>
/* ================= CONTAINER ================= */
.container {
  max-width: 900px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 18px;
  padding: 32px 36px 40px;
  max-height: 90vh;
  overflow-y: auto;
}

/* ================= HEADINGS ================= */
h2 {
  text-align: center;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 28px;
  color: #111827;
}

/* ================= TABS ================= */
.tabs {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.tabs button {
  padding: 12px 26px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.25s ease;
}

.tabs button:hover {
  background: #f3f4f6;
}

.tabs button.active {
  background: #ff4d00;
  color: #ffffff;
  border-color: #ff4d00;
  box-shadow: 0 8px 20px rgba(255, 77, 0, 0.35);
}

/* ================= GRID ================= */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px 22px;
  width: 100%;
}

/* full-width rows (native language, errors, actions) */
.center-row,
.errors,
.actions {
  grid-column: 1 / -1;
}

/* ================= ROW ================= */
.row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 18px;
  border-radius: 14px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}

.row span:first-child {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.row span:last-child {
  font-size: 15px;
  font-weight: 500;
  color: #111827;
}

/* ================= INPUTS ================= */
.row input,
.row select {
  padding: 11px 12px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  background: #ffffff;
}

.row input:focus,
.row select:focus {
  outline: none;
  border-color: #ff4d00;
  box-shadow: 0 0 0 3px rgba(255, 77, 0, 0.25);
}

/* ================= ERRORS ================= */
.errors {
  margin-top: 10px;
  padding: 14px 18px;
  border-radius: 12px;
  background: #fff5f5;
  border: 1px solid #fecaca;
}

.errors ul {
  margin: 0;
  padding-left: 18px;
}

.errors li {
  color: #dc2626;
  font-size: 14px;
  line-height: 1.4;
}

/* ================= ACTIONS ================= */
.actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 28px;
  flex-wrap: wrap;
}

.btn {
  padding: 12px 24px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

.edit {
  background: #ff4d00;
  color: #ffffff;
}

.save {
  background: #16a34a;
  color: #ffffff;
}

.cancel {
  background: #e5e7eb;
  color: #111827;
}

/* ================= CERTIFICATES ================= */
.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 22px;
}

.cert-card {
  padding: 20px;
  border-radius: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}

.cert-card h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}

.cert-card p {
  font-size: 14px;
  margin: 4px 0;
  color: #374151;
}

/* ================= STATES ================= */
.state {
  text-align: center;
  padding: 48px;
  font-size: 15px;
  color: #6b7280;
}

/* ================= MOBILE ================= */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 24px 18px 30px;
  }
}
</style>
