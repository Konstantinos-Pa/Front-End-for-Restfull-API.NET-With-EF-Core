<template>
    <div class="grey-background">
        <div class="content-box">
            <div id="register">
                <div class="Register Container">
                    <div class="content">

                        <img class="logo" src="../icons/Logo-PC.png" alt="PeopleCert Logo">
                        <h2 class="mb-4">Register</h2>

                        <form @submit.prevent="Register">

                            <!-- Username -->
                            <div class="mb-3 text-start">
                                <label for="username" class="form-label">Your Username</label>
                                <input type="text" class="form-control" id="username" v-model="username" required>
                            </div>

                            <!-- Email -->
                            <div class="mb-3 text-start">
                                <label for="email" class="form-label">Your Email</label>
                                <input type="email" class="form-control" id="email" v-model="email" required>
                            </div>

                            <!-- First Name -->
                            <div class="mb-3 text-start">
                                <label for="firstName" class="form-label">First Name</label>
                                <input type="text" class="form-control" id="firstName" v-model="firstName"
                                    maxlength="20" required>
                            </div>

                            <!-- Middle Name -->
                            <div class="mb-3 text-start">
                                <label for="middleName" class="form-label">Middle Name</label>
                                <input type="text" class="form-control" id="middleName" v-model="middleName"
                                    maxlength="20">
                            </div>

                            <!-- Last Name -->
                            <div class="mb-3 text-start">
                                <label for="lastName" class="form-label">Last Name</label>
                                <input type="text" class="form-control" id="lastName" v-model="lastName" maxlength="20"
                                    required>
                            </div>

                            <!-- Gender -->
                            <div class="mb-3 text-start">
                                <label for="gender" class="form-label">Gender</label>
                                <select id="gender" class="form-select" v-model="gender" required>
                                    <option value="" disabled>Select Gender</option>
                                    <option :value="0">Male</option>
                                    <option :value="1">Female</option>
                                </select>
                            </div>

                            <!-- Date of Birth -->
                            <div class="mb-3 text-start">
                                <label for="dob" class="form-label">Date of Birth</label>
                                <input type="date" class="form-control" id="dob" v-model="dateOfBirth" required>
                            </div>

                            <!-- Native Language -->
                            <div class="mb-3 text-start">
                                <label for="nativeLanguage" class="form-label">Native Language</label>
                                <input type="text" class="form-control" id="nativeLanguage" v-model="nativeLanguage"
                                    maxlength="50" required>
                            </div>

                            <!-- Password -->
                            <div class="mb-3 text-start position-relative">
                                <label for="password" class="form-label">Your Password</label>
                                <input :type="showpassword ? 'text' : 'password'" class="form-control" id="password"
                                    v-model="password" required>
                                <button type="button" class="toggle-password" @click="togglePass">
                                    {{ showpassword ? 'Hide' : 'Show' }}
                                </button>
                            </div>

                            <!-- Confirm Password -->
                            <div class="mb-3 text-start position-relative">
                                <label for="confirmPassword" class="form-label">Confirm Password</label>
                                <input :type="showpasswordc ? 'text' : 'password'" class="form-control"
                                    id="confirmPassword" v-model="confirmPassword" required>
                                <button type="button" class="toggle-password" @click="togglePassc">
                                    {{ showpasswordc ? 'Hide' : 'Show' }}
                                </button>
                            </div>

                            <!-- Errors -->
                            <p class="text-danger mb-3 text-start position-relative" v-if="errors">
                            <ul v-for="(error, field) in errors" :key="field">
                                <li>{{ error }}</li>
                            </ul>
                            </p>

                            <!-- Submit -->
                            <button type="submit" class="btn w-100 login-btn" :disabled="!canRegister">Register</button>
                        </form>

                    </div>
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
            loading: false,
            showpassword: false,
            showpasswordc: false,
            firstName: '',
            middleName: '',
            lastName: '',
            gender: 0,
            dateOfBirth: '',
            username: '',
            email: '',
            nativeLanguage: '',
            password: '',
            confirmPassword: '',
            errors: {}
        };
    },
    computed: {
        canRegister() {
            return this.firstName && this.lastName && this.gender !== '' && this.dateOfBirth &&
                this.username && this.email && this.nativeLanguage && this.password && this.confirmPassword;
        },
    },
    methods: {
        togglePass() {
            this.showpassword = !this.showpassword;
        },
        togglePassc() {
            this.showpasswordc = !this.showpasswordc;
        },
        async Register() {
            this.loading = true;
            this.errors = {};

            if (this.password !== this.confirmPassword) {
                this.errors.confirmPassword = "Passwords do not match";
                this.loading = false;
                return;
            }

            const payload = {
                firstName: this.firstName,
                middleName: this.middleName,
                lastName: this.lastName,
                gender: this.gender,
                dateOfBirth: this.dateOfBirth,
                email: this.email,
                nativeLanguage:this.nativeLanguage,
                userName: this.username,
                password: this.password
            };

            try {
                const response = await axiosService.Register(payload);

                if (response.status === 200) {
                    this.$router.push('/login');
                }
            }
            catch (error) {
                if (error.response?.data) {
                    const errData = error.response.data;
                    this.errors = errData?.error || { general: "Registration failed" };
                }
            }
            finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.grey-background {
    background-color: #CBCBCB;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    /* TOP alignment */
    padding: 2rem 1rem;
}

.content-box {
    background-color: #ffffff;
    border-radius: 12px;
    width: clamp(320px, 34vw, 500px);
    padding: 2rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.content {
    text-align: center;
}

.logo {
    width: clamp(90px, 10vw, 120px);
    margin-bottom: 1rem;
}

.btn {
    border: none;
}

.btn:active {
    color: #FF3200;
}

.toggle-password {
    background: none;
    border: none;
    position: absolute;
    right: 12px;
    top: 75%;
    transform: translateY(-50%);
    color: #888;
    cursor: pointer;
    font-size: 0.9rem;
}

.login-btn {
    background-color: #FF3200;
    color: #fff;
    border-radius: 8px;
}

.login-btn:disabled {
    background-color: #e0e0e0;
}

.forgot-password {
    font-size: 0.85rem;
    text-decoration: none;
    display: block;
    text-align: right;
    margin-bottom: 1.5rem;
}
</style>
