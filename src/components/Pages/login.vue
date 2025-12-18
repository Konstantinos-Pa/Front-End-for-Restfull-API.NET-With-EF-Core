<template>
    <div class="grey-background">
        <div class="content-box">
            <div id="login">
                <div class="Login Container">
                    <div class="content">

                        <img class="logo" src="../icons/Logo-PC.png" alt="PeopleCert Logo">
                        <h2 class="mb-4">Log in</h2>

                        <form @submit.prevent="Login">
                            <div class="mb-3 text-start">
                                <label for="username" class="form-label">Your Username</label>
                                <input type="text" class="form-control" id="username" v-model="username" required>
                            </div>

                            <div class="mb-3 text-start position-relative">
                                <label for="password" class="form-label">Your password</label>
                                <input :type="showpassword ? 'text' : 'password'" class="form-control" id="password"
                                    v-model="password" required>
                                <button type="button" class="toggle-password" @click="togglePass">
                                    {{ showpassword ? 'Hide' : 'Show' }}
                                </button>
                            </div>
                            <p class="text-danger">{{ errorResponce }}</p>
                            <a href="#" class="forgot-password">Forget your password</a>
                            <p>Not a member?  Register 
                                <RouterLink to="/Register">Here</RouterLink>
                            </p>

                            <button type="submit" class="btn w-100 login-btn" :disabled="!canLogin">Log in</button>
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
            password: '',
            username: '',
            token: '',
            errorResponce: ''
        }
    },
    computed: {
        canLogin() {
            return this.username && this.password;
        },
    },
    methods: {
        togglePass() {
            this.showpassword = !this.showpassword;
        },
        async Login() {
            this.loading = true;
            const payload = {
                username: this.username,
                password: this.password
            };
            try {
                const response = await axiosService.Login(payload);
                this.token = response.data.token.result;
                localStorage.setItem('token', this.token);
                if (this.token) {
                    this.$router.push('/').then(() => {
                        window.location.reload(); // reload the page if really needed
                    });
                }
            }
            catch (error) {
                this.errorResponce = Object.values(error.response.data)[0][0];
            }
            finally {
                this.loading = false;
            }
        }

    },
    created() {
    },
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
