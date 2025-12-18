<template>
  <div class="new-candidate">
    <div class="card">
      <h2><strong>New Candidate</strong></h2>
      <form @submit.prevent="saveCandidate">
        <div class="candidate-details">
          <!-- LEFT SIDE: User & Personal Info -->
          <div class="left">
            <!-- Username -->
            <div class="mb-3 text-start">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" v-model="formData.username" required />
            </div>

            <!-- Email -->
            <div class="mb-3 text-start">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" id="email" v-model="formData.email" required />
            </div>

            <!-- Password -->
            <div class="mb-3 text-start position-relative">
              <label for="password" class="form-label">Password</label>
              <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password"
                v-model="formData.password" required />
              <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>

            <!-- Confirm Password -->
            <div class="mb-3 text-start position-relative">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input :type="showConfirmPassword ? 'text' : 'password'" class="form-control" id="confirmPassword"
                v-model="formData.confirmPassword" required />
              <button type="button" class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
                {{ showConfirmPassword ? 'Hide' : 'Show' }}
              </button>
            </div>

            <!-- First Name -->
            <div class="mb-3 text-start">
              <label for="firstName" class="form-label">First Name</label>
              <input type="text" class="form-control" id="firstName" v-model="formData.firstName" maxlength="50"
                required />
            </div>

            <!-- Middle Name -->
            <div class="mb-3 text-start">
              <label for="middleName" class="form-label">Middle Name</label>
              <input type="text" class="form-control" id="middleName" v-model="formData.middleName" maxlength="50" />
            </div>

            <!-- Last Name -->
            <div class="mb-3 text-start">
              <label for="lastName" class="form-label">Last Name</label>
              <input type="text" class="form-control" id="lastName" v-model="formData.lastName" maxlength="50"
                required />
            </div>

            <!-- Gender -->
            <div class="mb-3 text-start">
              <label for="gender" class="form-label">Gender</label>
              <select id="gender" class="form-select" v-model="formData.gender" required>
                <option value="" disabled>Select Gender</option>
                <option :value="0">Male</option>
                <option :value="1">Female</option>
              </select>
            </div>

            <!-- Date of Birth -->
            <div class="mb-3 text-start">
              <label for="dob" class="form-label">Date of Birth</label>
              <input type="date" class="form-control" id="dob" v-model="formData.dob" required />
            </div>

            <!-- Native Language -->
            <div class="mb-3 text-start">
              <label for="nativeLanguage" class="form-label">Native Language</label>
              <input type="text" class="form-control" id="nativeLanguage" v-model="formData.nativeLanguage"
                maxlength="50" required />
            </div>

            <!-- Display Errors -->
            <div class="text-danger mb-3 text-start" v-if="errors">
            <ul>
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </div>
          </div>

          <!-- RIGHT SIDE: Address -->
          <div class="right">
            <h3>Address 1</h3>
            <div class="mb-3 text-start">
              <input type="text" class="form-control" placeholder="Street" v-model="address1.street" />
            </div>
            <div class="mb-3 text-start">
              <input type="text" class="form-control" placeholder="City" v-model="address1.city" />
            </div>
            <div class="mb-3 text-start">
              <input type="text" class="form-control" placeholder="Postal Code" v-model="address1.postalCode" />
            </div>
            <div class="mb-3 text-start">
              <input type="text" class="form-control" placeholder="State" v-model="address1.state" />
            </div>
            <div class="mb-3 text-start">
              <input type="text" class="form-control" placeholder="Country" v-model="address1.country" />
            </div>
            <div class="mb-3 text-start">
              <input type="text" class="form-control" placeholder="Landline" v-model="address1.landline" />
            </div>
          </div>
        </div>

        <!-- Buttons -->
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
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: 0,
        dob: "",
        email: "",
        nativeLanguage: "",
      },
      address1: {
        street: "",
        city: "",
        postalCode: "",
        state: "",
        country: "Greece",
        landline: "+30",
      },
      showPassword: false,
      showConfirmPassword: false,
      errors: null,
    };
  },
  methods: {
    async saveCandidate() {
      this.errors = null;

      // Basic password match validation
      if (this.formData.password !== this.formData.confirmPassword) {
        this.errors = ["Password and Confirm Password do not match."];
        return;
      }

      try {
        await axiosService.Register(this.formData);
        this.$router.push("/candidateList");
      }
      catch (error) {
        if (error.response?.data) {
          const errData = error.response.data;
          this.errors = errData?.error || { general: "Registration failed" };
        }
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
