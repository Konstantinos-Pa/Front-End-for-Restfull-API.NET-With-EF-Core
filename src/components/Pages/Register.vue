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

                            <p class="text-danger mb-3 text-start position-relative" v-if="errors">
                            <ul v-for="error in errors">
                                <li>{{ error }}</li>
                            </ul>
                            </p>
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
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {}
        };
    },
    computed: {
        canRegister() {
            return this.username && this.email && this.password && this.confirmPassword;
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

            // Check if passwords match
            if (this.password !== this.confirmPassword) {
                this.errors.confirmPassword = "Passwords do not match";
                this.loading = false;
                return;
            }


            const payload = {
                userName: this.username,
                email: this.email,
                password: this.password
            };

            try {
                const response = await axiosService.Register(payload); // Implement Register in axiosService

                if (response.status === 200) {
                    this.$router.push('/login');
                }
            }
            catch (error) {
                if (error.response?.data) {
                    error = error.response.data;
                    // Field-level errors (if any)
                    this.errors = error?.error;

                    // Global / model-level errors
                    this.errors.general = errors[""]?.[0] || '';
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
