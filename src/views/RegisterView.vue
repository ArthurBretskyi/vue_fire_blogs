<template>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an account?
                <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
            </p>
            <h2>Create Your VueFireBlogs Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" v-model="firstName" placeholder="First Name" />
                    <font-awesome-icon class="icon" :icon="['fas', 'user']" />
                </div>
                <div class="input">
                    <input type="text" v-model="lastName" placeholder="Last Name" />
                    <font-awesome-icon class="icon" :icon="['fas', 'user']" />
                </div>
                <div class="input">
                    <input type="text" v-model="userName" placeholder="UserName" />
                    <font-awesome-icon class="icon" :icon="['fas', 'user']" />
                </div>
                <div class="input">
                    <input type="text" v-model="email" placeholder="Email" />
                    <font-awesome-icon class="icon" :icon="['fas', 'envelope']" />
                </div>
                <div class="input">
                    <input type="password" v-model="password" placeholder="Password" />
                    <font-awesome-icon class="icon" :icon="['fas', 'lock']" />
                </div>
                <div v-if="error" class="error">{{ errorMsg }}</div>
            </div>
            <button @click.prevent="register" class="router-button">Sign Up</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default {
    name: 'RegisterView',
    data() {
        return {
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
            email: "",
            error: null,
            errorMsg: null,
        }
    },
    methods: {
        async register() {
            if (
                this.firstName !== "" &&
                this.lastName !== "" &&
                this.userName !== "" &&
                this.password !== "" &&
                this.email !== ""
            ) {
                this.error = false
                this.errorMsg = ""
                const auth = getAuth();
                const db = getFirestore();
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    this.email,
                    this.password
                );
                const { uid } = userCredential.user;
                await setDoc(
                    doc(db, 'users', uid),
                    {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        userName: this.userName,
                        password: this.password,
                        email: this.email,
                        createdAt: serverTimestamp(),
                        role: 'user',
                    },
                    { merge: true }              // на випадок, якщо хочете "дописувати" в існуючий doc
                );
                this.$router.push({ name: 'home' });
                return
            }
            this.error = true
            this.errorMsg = "Please fill out all the fields!"
            return
        }
    },
}

</script>
<style lang="scss" scoped>
.register {
    h2 {
        max-width: 350px;
    }

    .error {
        text-align: center;
        font-size: 18px;
        color: red;
        margin-block-start: 10px;
        margin-block-end: 10px;
    }
}
</style>
