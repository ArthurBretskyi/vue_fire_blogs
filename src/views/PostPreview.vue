<template>
    <div class="post-view">

        <div class="container quillWrapper">
            <h2>{{ this.blogTitle }}</h2>
            <img :src="blogCoverPhoto" alt="blog cover photo" />
            <div class="post-content ql-editor" v-html="blogHTML"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PostPreview",
    computed: {
        blogTitle() {
            return this.$store.state.blogTitle
        },
        blogHTML() {
            return this.$store.state.blogHTML
        },
        blogCoverPhoto() {
            return this.$store.state.blogPhotoFileURL
        },
    },
}
</script>

<style lang="scss" >
.post-view {
    min-height: 100%;

    .container {
        max-width: 1000px;
        padding: 60px 25px;

    }

    .ql-editor {
        padding: 0;
    }

    h2 {
        margin-block-start: 16px;
        font-weight: 300;
        font-size: 32px;
    }

    img {
        margin-block-end: 32px;
        width: 100%;
        height: auto;
    }
}
</style>