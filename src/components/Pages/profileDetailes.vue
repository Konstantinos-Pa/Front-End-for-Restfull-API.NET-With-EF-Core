<template>
  <div class="Grey-Background">
    <div class="Content-box">
      <h2 class="section-title">Candidate Details</h2>

      <div v-if="candidateDetails" class="details-layout">
        <!-- LEFT COLUMN -->
        <div class="column">
          <div class="row"><span>First Name</span><span>{{ candidateDetails.firstName || '-' }}</span></div>
          <div class="row"><span>Middle Name</span><span>{{ candidateDetails.middleName || '-' }}</span></div>
          <div class="row"><span>Last Name</span><span>{{ candidateDetails.lastName || '-' }}</span></div>
          <div class="row"><span>Gender</span><span>{{ candidateDetails.gender ? 'Female' : 'Male' }}</span></div>
          <div class="row"><span>Date of Birth</span><span>{{ formatDate(candidateDetails.dateOfBirth) }}</span></div>
          <div class="row"><span>Email</span><span>{{ candidateDetails.email || '-' }}</span></div>
          <div class="row"><span>Native Language</span><span>{{ candidateDetails.nativeLanguage || '-' }}</span></div>
          <div class="row"><span>Phone Number</span><span>{{ candidateDetails.phoneNumber || '-' }}</span></div>
        </div>

        <!-- RIGHT COLUMN -->
        <div class="column">
          <div class="sub-title">Address 1</div>
          <div class="row"><span>Street</span><span>{{ address.street || '-' }}</span></div>
          <div class="row"><span>City</span><span>{{ address.city || '-' }}</span></div>
          <div class="row"><span>Landline Number</span><span>{{ address.landlineNumber || '-' }}</span></div>
          <div class="row"><span>Postal Code</span><span>{{ address.postalCode || '-' }}</span></div>
          <div class="row"><span>State</span><span>{{ address.state || '-' }}</span></div>
          <div class="row"><span>Country</span><span>{{ address.country || '-' }}</span></div>
        </div>
      </div>

      <button class="edit-btn" @click="openModal">Edit</button>

      <!-- MODAL -->
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <h2>Edit Candidate Details</h2>
          <form @submit.prevent="saveChanges" class="modal-form">

            <!-- PERSONAL -->
            <div class="modal-grid">
              <div class="form-group">
                <label>First Name</label>
                <input v-model="editDetails.firstName" type="text" required />
              </div>

              <div class="form-group">
                <label>Middle Name</label>
                <input v-model="editDetails.middleName" type="text" />
              </div>

              <div class="form-group">
                <label>Last Name</label>
                <input v-model="editDetails.lastName" type="text" required />
              </div>

              <div class="form-group">
                <label>Gender</label>
                <select v-model="editDetails.gender" required>
                  <option :value="0">Male</option>
                  <option :value="1">Female</option>
                </select>
              </div>

              <div class="form-group">
                <label>Date of Birth</label>
                <input v-model="editDetails.dateOfBirth" type="date" required />
              </div>

              <div class="form-group">
                <label>Email</label>
                <input v-model="editDetails.email" type="email" required />
              </div>

              <div class="form-group">
                <label>Native Language</label>
                <input v-model="editDetails.nativeLanguage" type="text" required />
              </div>

              <div class="form-group">
                <label>Phone Number</label>
                <input v-model="editDetails.phoneNumber" type="text" />
              </div>
            </div>

            <!-- ADDRESS -->
            <div class="modal-section-title">Address</div>
            <div class="modal-grid">
              <div class="form-group">
                <label>Street</label>
                <input v-model="editaddress.street" type="text" />
              </div>

              <div class="form-group">
                <label>City</label>
                <input v-model="editaddress.city" type="text" />
              </div>

              <div class="form-group">
                <label>Landline Number</label>
                <input v-model="editaddress.landlineNumber" type="number" />
              </div>

              <div class="form-group">
                <label>Postal Code</label>
                <input v-model="editaddress.postalCode" type="text" />
              </div>

              <div class="form-group">
                <label>State</label>
                <input v-model="editaddress.state" type="text" />
              </div>

              <div class="form-group">
                <label>Country</label>
                <input v-model="editaddress.country" type="text" />
              </div>
            </div>

            <!-- ERRORS -->
            <div v-if="errors" class="text-danger full-width">
              <ul>
                <li v-for="(messages, field) in errors" :key="field">{{ messages[0] }}</li>
              </ul>
            </div>

            <div class="modal-buttons">
              <button type="submit" class="save">Save</button>
              <button type="button" class="cancel" @click="closeModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axiosService from '../service/axiosService';

export default {
  data() {
    return {
      token: localStorage.getItem('token') || '',
      parsed: null,
      candidateDetails: null,
      isModalOpen: false,
      editDetails: {},
      errors: {},
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
      editaddress: {
        city: '',
        street: '',
        state: '',
        postalCode: '',
        country: '',
        country: '',
        landlineNumber: '',
        candidateId: ''
      },
      addreCreate: false
    };
  },
  async created() {
    if (!this.token) return;

    const payload = this.token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    this.parsed = JSON.parse(decoded);

    try {
      const candidateRes = await axiosService.getCandidateByUserName(this.parsed.unique_name);
      this.candidateDetails = candidateRes.data;
      const addressRes = await axiosService.getaddressByCandidateId(this.candidateDetails.id);
      this.address = addressRes.data;
    } catch (error) {
      if (this.address.city === '') {
        this.addreCreate = true;
      }
      console.log(error);
    };
  },
  methods: {
    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toISOString().split('T')[0];
    },
    openModal() {
      this.editDetails = { ...this.candidateDetails };
      this.editaddress = { ...this.address };
      this.editaddress.candidateId = this.editDetails.id
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async saveChanges() {
      this.errors = {};

      try {
        const res = await axiosService.putCandidate(
          this.editDetails.id,
          this.editDetails
        );
        if (this.addreCreate === true) {
          const res = await axiosService.postAddress(
            this.editaddress
          )
          this.addreCreate = false;
        }
        else {
          const res = await axiosService.putAddress(
            this.editaddress.id,
            this.editaddress
          )
        }

        this.candidateDetails = { ...this.editDetails };
        this.address = { ...this.editaddress };
        this.closeModal();

      } catch (err) {
        const data = err.response?.data;

        // Case 1: ASP.NET validation errors
        if (data?.errors) {
          this.errors = data.errors;
          return;
        }

        // Case 2: plain string error (like "UserName already exists.")
        if (typeof data === 'string') {
          this.errors = {
            General: [data]
          };
          return;
        }

        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.Grey-Background {
  background: #cbcbcb;
  min-height: 100vh;
  padding: 40px;
}

.Content-box {
  background: #fff;
  border-radius: 12px;
  padding: 30px 40px 70px;
  max-width: 1100px;
  margin: auto;
  position: relative;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}

.details-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.column {
  display: flex;
  flex-direction: column;
}

.sub-title {
  font-weight: 600;
  margin-bottom: 10px;
}

.row {
  display: grid;
  grid-template-columns: 180px 1fr;
  padding: 6px 0;
  border-bottom: 1px solid #dcdcdc;
  font-size: 14px;
}

.edit-btn {
  position: absolute;
  bottom: 20px;
  right: 30px;
  background: #ff4d00;
  color: #fff;
  border: none;
  padding: 8px 22px;
  border-radius: 20px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  border-radius: 10px;
  width: 900px;
  max-width: 95vw;
  max-height: 90vh;
  padding: 24px 32px 28px;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
}

.modal-content h2 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 18px;
}

.modal-form {
  display: flex;
  flex-direction: column;
}

.modal-section-title {
  font-size: 14px;
  font-weight: 600;
  margin: 18px 0 10px;
  padding-bottom: 4px;
  border-bottom: 1px solid #e5e5e5;
}

.modal-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 28px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 12px;
  font-weight: 500;
  color: #333;
  margin-bottom: 4px;
}

.form-group input,
.form-group select {
  border: none;
  border-bottom: 1px solid #cfcfcf;
  border-radius: 0;
  padding: 6px 2px;
  font-size: 13px;
  background: transparent;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-bottom-color: #ff4d00;
}

.text-danger {
  margin-top: 12px;
  color: #c82333;
  font-size: 13px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e5e5e5;
}

.save {
  background: #ff4d00;
  color: #fff;
  border: none;
  padding: 8px 22px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
}

.cancel {
  background: transparent;
  color: #444;
  border: none;
  font-size: 13px;
  cursor: pointer;
}

@media (min-width: 1440px) {
  .Content-box {
    max-width: 1320px;
    padding: 36px 48px 72px;
  }

  .details-layout {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 72px;
  }

  .row {
    grid-template-columns: 200px 1fr;
    font-size: 14px;
    padding: 8px 0;
  }

  .section-title {
    font-size: 17px;
    margin-bottom: 24px;
  }

  .edit-btn {
    padding: 10px 26px;
    font-size: 14px;
  }
}

@media (max-width: 768px) {
  .Grey-Background {
    padding: 12px;
  }

  .Content-box {
    padding: 16px 14px 24px;
    border-radius: 10px;
  }

  .details-layout {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .row {
    grid-template-columns: 1fr;
    gap: 2px;
    padding: 6px 0;
    font-size: 13px;
  }

  .row span:first-child {
    font-size: 12px;
    font-weight: 600;
    color: #555;
  }

  .edit-btn {
    position: static;
    width: 100%;
    margin-top: 20px;
  }

  /* MODAL (BOTTOM SHEET STYLE) */
  .modal-overlay {
    align-items: flex-end;
  }

  .modal-content {
    width: 100%;
    max-width: 100%;
    max-height: 85vh;
    border-radius: 16px 16px 0 0;
    padding: 16px;
  }

  .modal-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .modal-buttons {
    position: sticky;
    bottom: 0;
    background: #fff;
    padding-top: 12px;
  }
}
</style>