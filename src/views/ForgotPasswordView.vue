<template>
    <div class="reset-password">
        <ModalComp v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
        <LoadingComp v-if="loading" />
        <div class="form-wrap">
            <form class="reset">
                <p class="login-register">
                    Back to
                    <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
                </p>
                <h2>Reset Password</h2>
                <p>Forgot your password? Enter your email to reset it</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email" />
                        <font-awesome-icon class="icon" :icon="['fas', 'envelope']" />
                    </div>
                </div>
                <button @click.prevent="resetPassword" class="router-button">Reset</button>
                <div class="angle"></div>
            </form>
            <div class="background"></div>
        </div>
    </div>
</template>

<script>
import ModalComp from '../components/ModalComp.vue'
import LoadingComp from '../components/LoadingComp.vue'
import { auth } from '@/firebase-config'
import { sendPasswordResetEmail } from "firebase/auth";

export default {
    name: 'ForgotPasswordView',
    components: {
        ModalComp,
        LoadingComp,
    },
    data() {
        return {
            email: "",
            modalActive: false,
            modalMessage: '',
            loading: false,
        }
    },
    methods: {
        resetPassword() {
            this.loading = true
            sendPasswordResetEmail(auth, this.email)
                .then(() => {
                    this.modalMessage = "If Your account exists, you will receive an email"
                    this.loading = false
                    this.modalActive = true
                })
                .catch((err) => {
                    this.modalMessage = err.message
                    this.loading = false
                    this.modalActive = true
                })
        },
        closeModal() {
            this.modalActive = !this.modalActive
            this.email = ''
        },

    },
}
</script>

<style lang="scss" scoped>
.reset-password {
    position: relative;

    .form-wrap {
        .reset {
            h2 {
                margin-bottom: 8px;
            }

            p {
                margin-bottom: 32px;
                text-align: center;
            }
        }
    }

    .inputs {
        margin-block-end: 15px;
    }
}
</style>