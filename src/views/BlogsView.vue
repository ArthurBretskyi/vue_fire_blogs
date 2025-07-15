<template>
    <div class="blog-card-wrap">
        <div class="blog-cards container">
            <div v-if="$store.state.profileRole === 'admin'" class="toggle-edit">
                <span>Toggle Editing Post</span>
                <input type="checkbox" v-model="editPost" />
            </div>
            <blog-card :post="post" v-for="(post, index) in blogPosts" :key="index"></blog-card>
        </div>
    </div>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue'
export default {
    name: 'BlogsView',
    components: {
        BlogCard,
    },
    computed: {
        blogPosts() {
            return this.$store.state.blogPosts
        },
        editPost: {
            get() {
                return this.$store.state.editPost
            },
            set(payload) {
                this.$store.commit('toggleEditPost', payload)
            },
        },
    },
    beforeUnmount() {
        this.$store.commit('toggleEditPost', false)
    },
    admin() {
        return this.$store.state.profileRole === 'admin'
    }
}
</script>

<style lang="scss" scoped>
.blog-cards {
    position: relative;

    .toggle-edit {
        position: absolute;
        top: -76px;
        right: 0;
        display: flex;
        align-items: center;

        span {
            margin-right: 16px;
        }

        input[type='checkbox'] {
            position: relative;
            cursor: pointer;
            appearance: none;
            border: none;
            background: #fff;
            outline: none;
            width: 80px;
            height: 30px;
            border-radius: 20px;
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        }

        input[type='checkbox']:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 30px;
            border-radius: 20px;
            background: #303030;
            transform: scale(1.1);
            transition: all 0.5s ease;
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
        }

        input:checked[type='checkbox']:before {
            background: #fff;
            left: 52px;
        }
    }
}
</style>