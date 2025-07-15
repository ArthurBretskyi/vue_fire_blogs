<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{ name: 'home' }">VueFireBlogs</router-link>
            </div>
            <div class="nav-links">
                <ul v-show="!mobile">
                    <router-link class="link" :to="{ name: 'home' }">Home</router-link>
                    <router-link v-if="user" class="link" :to="{ name: 'blogs' }">Blogs</router-link>
                    <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }">Create Post</router-link>
                    <router-link v-if="!user" class="link" :to="{ name: 'Login' }">LogIn/Register</router-link>
                </ul>
                <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
                    <span>{{ this.$store.state.profileInitials }}</span>
                    <div v-if="profileMenu" class="profile-menu">
                        <div class="info">
                            <span class="initials">{{ this.$store.state.profileInitials }}</span>
                            <div class="right-side">
                                <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
                                <p>{{ this.$store.state.profileUserName }}</p>
                                <p>{{ this.$store.state.profileEmail }}</p>
                            </div>
                        </div>
                        <div class="options">
                            <div class="option">
                                <router-link class="option" :to="{ name: 'Profile' }">
                                    <font-awesome-icon :icon="['fas', 'user']" class="icon" />
                                    <p>Profile</p>
                                </router-link>
                            </div>
                            <div v-if="$store.state.profileRole === 'admin'" class="option">
                                <router-link class="option" :to="{ name: 'Admin' }">
                                    <font-awesome-icon :icon="['fas', 'user-tie']" class="icon" />
                                    <p>Admin</p>
                                </router-link>
                            </div>
                            <div @click="signOut" class="option">
                                <font-awesome-icon :icon="['fas', 'right-from-bracket']" class="icon" />
                                <p>Sign Out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div @click="toggleMobileNav" v-show="mobile" class="menu-icon">
            <font-awesome-icon :icon="['fas', 'bars']" />
        </div>
        <!-- <burgerMenu /> -->
        <transition name="mobile-nav">
            <ul v-show="mobileNav" class="mobile-nav">
                <router-link class="link" :to="{ name: 'home' }">Home</router-link>
                <router-link v-if="user" class="link" :to="{ name: 'blogs' }">Blogs</router-link>
                <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }">Create Post</router-link>
                <router-link v-if="!user" class="link" :to="{ name: 'Register' }">LogIn/Register</router-link>
            </ul>
        </transition>
    </header>
</template>

<script>

export default {
    name: 'NavigationMenu',
    components: {
    },
    data() {
        return {
            mobile: null,
            mobileNav: null,
            windowWidth: null,
            profileMenu: null,
        }
    },
    created() {
        window.addEventListener('resize', this.checkScreen)
        this.checkScreen()
    },
    methods: {
        checkScreen() {
            this.windowWidth = window.innerWidth
            if (this.windowWidth <= 750) {
                this.mobile = true
                return
            }
            this.mobile = false
            this.mobileNav = false
            return
        },
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav
        },
        toggleProfileMenu(e) {
            if (e.target === this.$refs.profile) {
                this.profileMenu = !this.profileMenu
            }
        },
        async signOut() {
            await this.$store.dispatch('signOutUser')
            window.location.reload()
            // this.$router.push({ name: 'Login' }) // 🔄 перенаправлення на сторінку входу
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        admin() {
            return this.$store.state.profileRole === 'admin'
        }
    },
}
</script>

<style lang="scss" scoped>
header {
    background-color: #fff;
    padding: 0 25px;
    // box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4 px -1px rgba(0, 0, 0, 0.06);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.6);

    z-index: 99;

    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: 0.3s color ease;

        &:hover {
            color: #1eb8b8
        }
    }

    nav {
        display: flex;
        padding: 30px 0;

        .branding {
            display: flex;
            align-items: center;
            padding-right: 15px;

            .header {
                font-weight: 600;
                font-size: 25px;
                color: #000;
                text-decoration: none;
            }
        }

        .nav-links {
            position: relative;
            display: flex;
            gap: 32px;
            align-items: center;
            justify-content: flex-end;
            flex: 1;

            ul {
                margin-right: 32px;

                .link {
                    &:not(:last-child) {
                        margin-right: 32px;
                    }
                }
            }

            .profile {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                color: #fff;
                background-color: #303030;
                cursor: pointer;
                border-radius: 50%;
                transition: all 0.5s ease;

                &:hover {
                    background-color: #1eb8b8;

                }

                span {
                    pointer-events: none;
                }

                .profile-menu {
                    position: absolute;
                    top: 60px;
                    right: 0;
                    width: 250px;
                    background-color: #303030;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.6);

                    .info {
                        display: flex;
                        column-gap: 20px;
                        align-items: center;
                        border-bottom: 1px solid #fff;
                        padding: 15px;

                        .initials {
                            position: initial;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 40px;
                            height: 40px;
                            color: #303030;
                            background-color: #fff;
                            border-radius: 50%;
                        }

                        .right-side {
                            flex: 1;

                            p:nth-child(1) {
                                font-size: 18px;
                            }

                            p:nth-child(2),
                            p:nth-child(3) {
                                font-size: 14px;
                            }
                        }
                    }

                    .options {
                        padding: 15px;
                        display: flex;
                        flex-direction: column;
                        row-gap: 12px;

                        .option {
                            display: flex;
                            column-gap: 12px;
                            text-decoration: none;
                            align-items: center;
                            color: #fff;
                            cursor: pointer;

                            .icon {
                                width: 18px;
                                height: auto;
                            }
                        }
                    }
                }
            }
        }
    }

    .menu-icon {
        position: absolute;
        cursor: pointer;
        top: 36px;
        right: 25px;
        font-size: 25px;
        width: auto;
    }

    .mobile-nav {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 70%;
        max-width: 250px;
        padding: 25px;
        background-color: #303030;
        color: #fff;
        position: fixed;
        top: 0;
        left: 0;

        .link {
            color: #fff;
            padding: 15px;
        }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
        transition: all 1s ease-in-out;
    }

    .mobile-nav-enter {
        transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
        transform: translateX(0);
    }

    .mobile-nav-leave-to {
        transform: translateX(-250px);
    }
}
</style>
