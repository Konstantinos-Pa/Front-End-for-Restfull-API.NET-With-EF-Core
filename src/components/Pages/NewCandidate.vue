<template>
  <div class="new-candidate">
    <div class="card">
    <h2><strong> New Candidate </strong></h2>
    <form @submit.prevent="saveCandidate">
      <div class="candidate-details">
        <div class="left">
          <label>First Name</label>
          <input v-model="formData.firstName" type="text" />

          <label>Middle Name</label>
          <input v-model="formData.middleName" type="text" />

          <label>Last Name</label>
          <input v-model="formData.lastName" type="text" />

          <label>Gender</label>
          <select v-model="formData.gender">
            <option :value="0">Male</option>
            <option :value="1">Female</option>
          </select>

          <label>Date Of Birth</label>
          <input v-model="formData.dob" type="date" />

          <label>Email</label>
          <input v-model="formData.email" type="email" />

          <label>Native Language</label>
          <input v-model="formData.nativeLanguage" type="text" />

          <label>Home Phone</label>
          <input v-model="formData.homePhone" type="text" />

          <label>Mobile Phone</label>
          <input v-model="formData.mobilePhone" type="text" />
        </div>

        <div class="right">
          <h3>Address 1</h3>
          <input
            v-model="formData.address1.street"
            placeholder="Street"
            type="text"
          />
          <input
            v-model="formData.address1.city"
            placeholder="City"
            type="text"
          />
          <input
            v-model="formData.address1.postalCode"
            placeholder="Postal Code"
            type="text"
          />
          <input
            v-model="formData.address1.state"
            placeholder="State"
            type="text"
          />
          <input
            v-model="formData.address1.country"
            placeholder="Country"
            type="text"
          />
          <input
            v-model="formData.address1.landline"
            placeholder="Landline"
            type="text"
          />
        </div>
      </div>

      <div class="buttons">
        <router-link to="/candidatelist">
          <button type="button">Cancel</button>
        </router-link>
        <button type="submit">Save Changes</button>
      </div>
    </form>
  </div>
  </div>
</template>

<script>
import axiosService from "../service/axiosService";

export default {
  name: "NewCandidate",
  data() {
    return {
      formData: {
        firstName: "",
        middleName: "",
        lastName: "",
        gender: 0,
        dob: "",
        email: "",
        nativeLanguage: "English",
        homePhone: "",
        mobilePhone: "",
        address1: {
          street: "",
          city: "",
          postalCode: "",
          state: "",
          country: "Greece",
          landline: "+30",
        },
      },
    };
  },
  methods: {
    cancel() {
      this.$router.push("/");
    },
    async saveCandidate() {
      try {
        const result = await axiosService.createCandidate(this.formData);
        this.$router.push("/candidateList"); // επιστροφή στη λίστα
      } catch (error) {
        console.error("Failed to save candidate:", error);
      }
    },
  },
};
</script>

<style scoped>
  /* ================= GLOBAL FIX ================= */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* ================= PAGE ================= */
.new-candidate {
  min-height: 100vh;
  background-color: #cbcbcb;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px;
}

/* ================= CARD ================= */
.card {
  width: 100%;
  max-width: 1000px;
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: Arial, sans-serif;
}

/* ================= LAYOUT ================= */
.candidate-details {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.left,
.right {
  flex: 1;
  min-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ================= TYPOGRAPHY ================= */
h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
}

h3 {
  font-size: 18px;
  margin-top: 1rem;
  color: #333;
}

label {
  font-weight: 600;
  font-size: 14px;
  color: #374151;
}

/* ================= INPUTS ================= */
input,
select {
  width: 100%;
  max-width: 100%;
  padding: 12px 14px;
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  outline: none;
  box-sizing: border-box;
  appearance: none;
  transition: border-color 0.25s, box-shadow 0.25s;
}

input:focus,
select:focus {
  border-color: #ff4d00;
  box-shadow: 0 0 0 3px rgba(255, 77, 0, 0.25);
}

/* ================= SELECT ARROW ================= */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath fill='%236b7280' d='M5.5 7.5L10 12l4.5-4.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 16px;
  padding-right: 38px;
}

/* ================= BUTTONS ================= */
.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

button {
  padding: 10px 26px;
  font-size: 15px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.3s, transform 0.15s;
}

button[type="submit"] {
  background-color: #ff4d00;
  color: #ffffff;
}

button[type="button"] {
  background-color: #e5e7eb;
  color: #374151;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* ================= TABLET ================= */
@media (max-width: 768px) {
  .candidate-details {
    flex-direction: column;
  }
}

/* ================= MOBILE ================= */
@media (max-width: 480px) {
  .card {
    padding: 20px 16px;
  }

  h2 {
    font-size: 20px;
  }

  input,
  select {
    padding: 11px 12px;
    font-size: 14px;
  }

  button {
    width: 100%;
  }
}

</style>
