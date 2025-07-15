<template>
    <div class="home">
        <blog-post v-if="!user" :post="welcomeScreen" />
        <blog-post :post="post" v-for="(post, index) in blogPostsFeed" :key="index" />
        <div v-if="user" class="blog-card-wrap">
            <div class="container">
                <h3>View More Resent Blogs</h3>
                <div class="blog-cards">
                    <blog-card :post="post" v-for="(post, index) in blogPostsCards" :key="index"></blog-card>
                </div>
            </div>
        </div>
        <register-reminder v-if="!user" />
    </div>
</template>

<script>
import BlogPost from '@/components/BlogPost.vue'
import BlogCard from '@/components/BlogCard.vue'
import RegisterReminder from "@/components/RegisterReminder.vue"
import { mapGetters } from "vuex"
export default {
    name: "HomeView",
    components: {
        BlogPost,
        BlogCard,
        RegisterReminder,
    },
    data() {
        return {
            welcomeScreen: {
                title: 'Welcome',
                blogPost:
                    'Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!',
                welcomeScreen: true,
                photo: 'cover',
            },

        }
    },
    computed: {
        ...mapGetters(['blogPostsFeed', 'blogPostsCards']),
        sampleBlogCards() {
            return this.$store.state.sampleBlogCards
        },
        user() {
            return this.$store.state.user
        }
    },
}
</script>

<style lang="scss" scoped>
.blog-card-wrap {
    h3 {
        font-weight: 300;
        font-size: 28px;
        margin-bottom: 32px;
    }
}
</style>