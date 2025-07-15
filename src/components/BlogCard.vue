<template>
    <div class="blog-card">
        <loading-comp v-if="isLoading" />
        <div v-show="editPost" class="icons">
            <div @click="editBlog" class="icon">
                <font-awesome-icon :icon="['far', 'pen-to-square']" />
            </div>
            <div @click="handleDelete(post.blogID)" class="icon">
                <font-awesome-icon :icon="['fas', 'trash-can']" />
            </div>
        </div>
        <img :src="post.coverPhoto" alt="" />
        <div class="info">
            <h4>{{ post.title }}</h4>
            <h5 v-if="post.createdAt">Posted on: {{ post.createdAt.toDate().toLocaleString("en-us", { dateStyle: "long" })
            }}</h5>
            <router-link class="link" :to="{ name: 'BlogView', params: { blogid: this.post.blogID } }">View the Post
                <font-awesome-icon class="arrow" :icon="['fas', 'arrow-right']" /></router-link>
        </div>
    </div>
</template>

<script>
import LoadingComp from "@/components/LoadingComp.vue"
import { mapActions } from 'vuex'
export default {
    name: 'BlogCard',
    components: {
        LoadingComp,
    },
    data() {
        return {
            isLoading: null,
        }
    },
    props: ['post'],
    computed: {
        editPost() {
            return this.$store.state.editPost
        },
    },
    methods: {
        ...mapActions(['deletePost']),
        editBlog() {
            this.$router.push({ name: 'BlogEdit', params: { blogid: this.post.blogID } })
        },

        async handleDelete(blogID) {
            const confirmDelete = confirm('Ви впевнені, що хочете видалити цей пост?')
            if (!confirmDelete) return
            this.isLoading = true
            try {
                await this.deletePost(blogID)
                alert('✅ Видалено')
            } catch (err) {
                alert(err.message)
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.blog-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 420px;
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.5s ease all;

    &:hover {
        transform: rotateZ(-1deg) scale(1.01);
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    }

    .icons {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 99;
        display: flex;
        gap: 5px;

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 35px;
            background-color: #fff;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.5s ease;

            &:hover {
                background-color: #303030;
                color: #fff;
            }
        }
    }

    img {
        display: block;
        border-radius: 8px 8px 0 0;
        z-index: 1;
        width: 100%;
        min-height: 200px;
        object-fit: cover;
        border-bottom: 1px solid #303030;
        box-shadow: 0 4px 6px -6px #222;
    }

    .info {
        display: flex;
        flex-direction: column;
        padding: 32px 16px;
        height: 100%;
        z-index: 3;

        h4 {
            font-weight: 300;
            font-size: 20px;
            padding-bottom: 8px;
        }

        h5 {
            font-weight: 400;
            font-size: 12px;
            padding-bottom: 16px;
        }

        .link {
            display: inline-flex;
            align-items: center;
            margin-top: auto;
            padding: 10px 0 4px 0;
            font-weight: 500;
            font-size: 12px;
            transition: all 0.5s ease;

            &:hover {
                color: rgba(48, 48, 48, 0.8);
            }
        }
    }
}
</style>
