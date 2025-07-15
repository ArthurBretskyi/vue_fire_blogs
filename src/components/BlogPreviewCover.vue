<template>
    <div class="modal" ref="modal">
        <div class="modal-content">
            <font-awesome-icon :icon="['fas', 'circle-xmark']" class="close-preview" @click="closePreview" />
            <div class="image">
                <img :src="this.blogCoverPhoto" alt="cover preview">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlogPreviewCover',
    props: ['modalMessage'],
    methods: {
        closePreview() {
            this.$store.commit('openCoverPreview')
        },
    },
    computed: {
        blogCoverPhoto() {
            return this.$store.state.blogPhotoFileURL
        }
    },
}
</script>

<style lang="scss" scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);

    .modal-content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 10px;
        align-items: center;
        padding: 30px 40px;
        border-radius: 8px;
        width: 600px;
        height: 400px;
        background-color: #fff;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

        .close-preview {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 24px;
            height: auto;
            font-size: 24px;
            cursor: pointer;
            color: #303030;
        }

        .image {
            padding: 20px;
            width: 500px;
            height: 100%;
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

        }
    }
}
</style>