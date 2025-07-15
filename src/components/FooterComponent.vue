<template>
    <footer>
        <div class="container">
            <div class="left">
                <div class="col-1">
                    <router-link class="header" :to="{ name: 'home' }">VueFireBlogs</router-link>
                    <ul>
                        <li>
                            <a href="#"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
                        </li>
                        <li>
                            <a href="#"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
                        </li>
                        <li>
                            <a href="#"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
                        </li>
                        <li>
                            <a href="#"><font-awesome-icon :icon="['fab', 'linkedin']" /></a>
                        </li>
                    </ul>
                </div>
                <div class="col-2">
                    <ul>
                        <router-link class="link" :to="{ name: 'home' }">Home</router-link>
                        <router-link v-if="user" class="link" :to="{ name: 'blogs' }">Blogs</router-link>
                        <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }">Create Post</router-link>
                        <router-link v-if="!user" class="link" :to="{ name: 'Register' }">LogIn/Register</router-link>
                    </ul>
                </div>
            </div>
            <div class="right">
                <p>Copyright 2024 All Rights Reserved</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent',
    components: {
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        admin() {
            return this.$store.state.profileRole === 'admin'
        },
    },
}
</script>

<style lang="scss" scoped>
footer {
    margin-top: auto;
    padding: 100px 25px;
    background-color: #303030;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

    .container {
        display: flex;
        flex-direction: column;
        gap: 32px;

        @media (min-width: 800px) {
            flex-direction: row;
            gap: 0;
        }

        >div {
            display: flex;
            flex: 1;
        }

        .left {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 32px;
            color: #fff;

            @media (min-width: 800px) {
                flex-direction: row;
                align-items: initial;
                gap: 0;
            }
        }

        .header {
            font-weight: 600;
            font-size: 25px;
            color: #fff;
            text-decoration: none;

            @media (max-width: 800px) {
                text-align: center;
            }
        }

        ul {
            display: flex;
            gap: 16px;
        }

        .col-1,
        .col-2 {
            display: flex;
            flex: 1;
            gap: 32px;

            @media (min-width: 800px) {
                gap: 0;
            }
        }

        .col-1 {
            flex-direction: column;

            ul {
                margin-top: auto;

                li {
                    display: flex;
                    align-items: center;
                    text-decoration: none;

                    a {
                        color: #fff;
                        font-size: 24px;
                        transition: all 0.5s ease;

                        &:hover {
                            color: #1eb8b8;
                        }
                    }
                }
            }
        }

        .col-2 {
            ul {
                flex-direction: row;
                justify-content: center;
                flex-wrap: wrap;
                height: 100%;

                @media (min-width: 800px) {
                    flex-direction: column;
                }

                .link {
                    color: #fff;
                    font-size: 16px;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 0.5s ease;

                    &:hover {
                        color: #1eb8b8;
                    }
                }
            }
        }

        .right {
            color: #fff;
            align-items: center;
            gap: 32px;
            flex-direction: column;

            @media (min-width: 800px) {
                gap: 0;
                align-items: flex-end;
            }
        }

        p {
            margin-top: auto;
        }
    }
}
</style>
