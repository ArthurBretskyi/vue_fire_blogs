<template>
    <div class="app-wrapper">
        <div class="app">
            <navigation-menu v-if="!navigationDisabled" />
            <router-view />
            <footer-component v-if="!navigationDisabled" />
        </div>
    </div>
</template>

<script>
import NavigationMenu from './components/NavigationMenu.vue'
import FooterComponent from './components/FooterComponent.vue'
import { auth } from '@/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { mapActions } from "vuex"
export default {
    name: 'app',
    components: {
        NavigationMenu,
        FooterComponent
    },
    data() {
        return {
            navigationDisabled: null,
        }
    },
    created() {

        onAuthStateChanged(auth, (user) => {
            console.log('👤 onAuthStateChanged USER:', user);

            this.$store.commit("updateUser", user);

            if (user) {
                this.$store.dispatch("getCurrentUser").then(() => {
                    console.log('📬 Після getCurrentUser:');
                    console.log('📧 Email з store:', this.$store.state.profileEmail);
                });
            }
        });
        this.checkRoute()

        this.getPost()

    },
    mounted() { },

    methods: {
        ...mapActions(['getPost']),

        checkRoute() {
            if (this.$route.name === "Login" || this.$route.name === "Register" || this.$route.name === "ForgotPassword") {
                this.navigationDisabled = true
                return
            } this.navigationDisabled = false
        }
    },
    watch: {
        $route() {
            this.checkRoute()
        }
    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Quicksand', sans-serif;
}

.app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.container {
    max-width: 1440px;
    margin: 0 auto;
}

.link {
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
    color: black;
}

.link-light {
    color: #fff;
}

.arrow {
    font-size: 12px;
    margin-left: 8px;
    color: #000;
}

.arrow-light {
    color: #fff;
}

.blog-card-wrap {
    position: relative;
    padding: 80px 16px;
    background-color: #f1f1f1;

    @media (min-width: 500px) {
        padding: 100px 16px;
    }

    .blog-cards {
        display: grid;
        gap: 32px;
        grid-template-columns: 1fr;

        @media (min-width: 500px) {
            grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: 900px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (min-width: 1200px) {
            grid-template-columns: repeat(4, 1fr);
        }
    }

}
</style>
