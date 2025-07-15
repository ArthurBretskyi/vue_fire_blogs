<template>
    <div class="form-wrap">
        <form class="login">
            <p class="login-register">
                Don't have an account?
                <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
            </p>
            <h2>Login to VueFireBlogs</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" v-model="email" placeholder="Enter Your Email" />
                    <font-awesome-icon class="icon" :icon="['fas', 'envelope']" />
                </div>
                <div class="input">
                    <input type="password" v-model="password" placeholder="Enter Your Password" />
                    <font-awesome-icon class="icon" :icon="['fas', 'lock']" />
                </div>
                <div v-if="error" class="error">{{ errorMsg }}</div>
            </div>
            <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">Forgot Your Password?</router-link>
            <button @click.prevent="signIn" class="router-button">Sign In</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>
import { auth } from '@/firebase-config'
import { signInWithEmailAndPassword } from "firebase/auth";
export default {
    name: 'LoginView',
    data() {
        return {
            email: null,
            password: null,
            error: null,
            errorMsg: null,
        }
    },
    methods: {
        async signIn() {
            this.error = null;
            this.errorMsg = ''

            try {
                // 1) Авторизація користувача
                await signInWithEmailAndPassword(auth, this.email, this.password);
                console.log(auth.currentUser.uid);
                // 2) (необов’язково) Перенаправлення або інша логіка після успіху
                this.$router.push({ name: 'home' });
            } catch (err) {
                // Обробка помилки (наприклад, неправильний пароль)
                this.error = true;
                this.errorMsg = 'Firebase sign-in error:';
                console.error('Firebase sign-in error:', err);
            }
        },
    },
    // async signIn() {
    //     const auth = getAuth();
    //     await signInWithEmailAndPassword(auth, this.email, this.password)
    //         .then(() => {
    //             this.$router.push({
    //                 name: 'home'
    //             })
    //             this.error = false
    //             this.errMsg = ''
    //             console.log(auth.currentUser.uid);
    //             // ...
    //         })
    //         .catch((err) => {
    //             this.error = true;
    //             this.errorMsg = err.message;
    //         });
    // }
    // },
}
</script>

<style lang="scss">
.form-wrap {
    display: flex;
    justify-content: center;
    align-self: center;
    overflow: hidden;
    height: 100vh;
    width: 90%;
    margin: 0 auto;

    @media (min-width: 900px) {
        width: 100%;
    }

    .login-register {
        margin-bottom: 32px;

        .router-link {
            color: black;
        }
    }

    form {
        position: relative;
        padding: 0 10px;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        @media (min-width: 900px) {
            padding: 0 50px;
        }

        h2 {
            font-size: 32px;
            color: #303030;
            margin-bottom: 40px;
            text-align: center;

            @media (min-width: 900px) {
                font-size: 40px;
            }
        }

        .inputs {
            width: 100%;
            max-width: 350px;

            .input {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 8px;

                input {
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 4px 4px 4px 30px;
                    height: 50px;


                    &:focus {
                        outline: none;
                    }
                }

                .icon {
                    position: absolute;
                    left: 6px;
                    // width: 12px;
                    // font-size: 36px;
                }
            }
        }

        .forgot-password {
            text-decoration: none;
            color: #000;
            cursor: pointer;
            font-size: 14px;
            margin: 16px 0 32px 0;
            border-bottom: 1px solid transparent;
            transition: 0.5s ease all;

            &:hover {
                border-color: #303030;
            }
        }

        .angle {
            display: none;
            position: absolute;
            background-color: #fff;
            transform: rotateZ(3deg);
            width: 60px;
            height: 101%;
            right: -30px;

            @media (min-width: 900px) {
                display: initial;
            }
        }

        .router-button {
            display: flex;
            align-items: center;
            padding: 10px;
            background-color: #303030;
            color: #fff;
            text-decoration: none;
            text-transform: uppercase;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.5s ease;

            &:hover {
                background-color: #464545;
            }
        }
    }

    .background {
        display: none;
        flex: 2;
        background-size: cover;
        background-image: url('../assets/background.jpg');
        width: 100%;
        height: 100%;

        @media (min-width: 900px) {
            display: initial;
        }
    }
}
</style>