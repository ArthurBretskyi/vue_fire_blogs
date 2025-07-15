<template>
    <div class="post-view" v-if="currentBlog">
        <div class="container quillWrapper">
            <h2>{{ currentBlog.title }}</h2>
            <h5 v-if="currentBlog.createdAt">
                Posted on: {{ currentBlog.createdAt.toDate().toLocaleString("en-us", { dateStyle: "long" }) }}
            </h5>
            <img :src="currentBlog.coverPhoto" alt="blog cover photo" />
            <div class="post-content ql-editor" v-html="currentBlog.html"></div>
        </div>
    </div>

    <loading-comp v-if="loaded" />
    <!-- <div v-else class="loading">Loading blog post...</div> -->
</template>


<script>
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase-config'
import LoadingComp from '@/components/LoadingComp.vue'
export default {
    name: "BlogView",
    components: {
        LoadingComp,
    },
    data() {
        return {
            currentBlog: null,
            loaded: null,
        }
    },
    async mounted() {
        const blogID = this.$route.params.blogid
        let blog = this.$store.state.blogPosts.find(post => post.blogID === blogID)

        if (!blog) {
            this.loaded = true
            try {
                const docRef = doc(db, 'blogs', blogID)
                const docSnap = await getDoc(docRef)
                if (docSnap.exists()) {
                    blog = { blogID: docSnap.id, ...docSnap.data() }
                    this.loaded = null
                } else {
                    console.warn('⚠️ Blog not found in Firestore')
                    this.loaded = null
                }
            } catch (e) {
                console.error('🔥 Error loading blog from Firestore:', e)
            }
        }

        this.currentBlog = blog
        this.loaded = null
    }
}

</script>

<style lang="scss" scoped>
.post-view {
    h5 {
        font-weight: 400;
        font-size: 14px;
        margin-block-end: 24px;
    }
}
</style>