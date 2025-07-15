<template>
    <div class="create-post">
        <toast-comp ref="toastRef" />
        <loading-comp v-if="isLoading" />
        <div v-if="uploadStatus === 'success'" class="upload-success">✅ Image successfully uploaded!</div>
        <div v-if="uploadStatus === 'error'" class="upload-error">❌ Error loading image</div>

        <div class="container">
            <div v-if="error" class="err-msg">
                <p><span>Error:</span>{{ errorMsg }}</p>
            </div>

            <div class="blog-info">
                <input type="text" v-model="blogTitle" placeholder="Enter Blog Title" />
                <div class="upload-file">
                    <label for="blog-photo">Upload Cover Photo</label>
                    <input type="file" id="blog-photo" ref="blogPhoto" @change="fileChange" accept=".png, .jpg, .jpeg" />
                    <span>File Chosen: {{ file?.name || fileName }}</span>
                </div>
            </div>

            <div class="editor">
                <QuillEditor theme="snow" v-model:content="blogHTML" contentType="html" />
            </div>

            <div class="blog-actions">
                <button @click="updatePost">💾 Update Blog</button>
                <router-link :to="{ name: 'BlogView', params: { blogid: blogID } }" class="router-btn">Cancel</router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase-config'
import LoadingComp from '@/components/LoadingComp.vue'
import { QuillEditor } from '@vueup/vue-quill'
import ToastComp from "@/components/ToastComp.vue"

export default {
    name: 'BlogEdit',
    components: { ToastComp, LoadingComp, QuillEditor },
    data() {
        return {
            blogID: this.$route.params.blogid,
            blogTitle: '',
            blogHTML: '',
            blogPhotoURL: '',
            fileName: '',
            file: null,
            isLoading: false,
            error: false,
            errorMsg: '',
            uploadStatus: null,
        }
    },
    async mounted() {
        try {
            const docRef = doc(db, 'blogs', this.blogID)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const blog = docSnap.data()
                this.blogTitle = blog.title
                this.blogHTML = blog.html
                this.blogPhotoURL = blog.coverPhoto
                this.fileName = blog.coverPhoto?.split('/').pop() || ''
            } else {
                this.error = true
                this.errorMsg = 'Блог не знайдено'
            }
        } catch (e) {
            this.error = true
            this.errorMsg = e.message
        }
    },
    methods: {
        async fileChange() {
            this.file = this.$refs.blogPhoto.files[0]
            if (!this.file) return

            const formData = new FormData()
            formData.append('file', this.file)
            formData.append('upload_preset', 'vue_unsigned')
            formData.append('folder', 'blogPhotos')

            try {
                const res = await fetch('https://api.cloudinary.com/v1_1/dnrvrs2vj/image/upload', {
                    method: 'POST',
                    body: formData,
                })

                const data = await res.json()
                if (data.secure_url) {
                    this.blogPhotoURL = data.secure_url
                    this.uploadStatus = 'success'
                    setTimeout(() => (this.uploadStatus = null), 3000)
                } else {
                    throw new Error('Cloudinary upload failed')
                }
            } catch (err) {
                this.uploadStatus = 'error'
                this.error = true
                this.errorMsg = err.message
                console.error('⛔ Cloudinary Error:', err)
            }
        },
        async updatePost() {
            if (!this.blogTitle || !this.blogHTML || !this.blogPhotoURL) {
                this.error = true
                this.errorMsg = 'Усі поля мають бути заповнені'
                return
            }

            try {
                this.isLoading = true
                const docRef = doc(db, 'blogs', this.blogID)
                await updateDoc(docRef, {
                    title: this.blogTitle,
                    html: this.blogHTML,
                    coverPhoto: this.blogPhotoURL,
                })



                this.$store.commit('updateBlogPost', {
                    blogID: this.blogID,
                    title: this.blogTitle,
                    html: this.blogHTML,
                    coverPhoto: this.blogPhotoURL,
                })
                this.$refs.toastRef.show()

                setTimeout(() => {
                    this.$router.push({
                        name: 'BlogView',
                        params: { blogid: this.blogID }
                    })
                }, 1500)

            } catch (e) {
                console.error('🔥 updatePost error:', e)
                this.error = true
                this.errorMsg = e.message
            } finally {
                this.isLoading = false
            }
        },
    },
}
</script>
  

<style lang="scss">
.create-post {
    position: relative;
    height: 100%;

    button {
        margin-block-start: 0;
    }

    // .router-btn {
    //     text-decoration: none;
    //     color: #fff;
    // }

    label,
    button,
    .router-btn {
        transition: all 0.5s ease-in-out;
        align-self: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 20px;
        padding: 12px 24px;
        color: #fff;
        background-color: #303030;
        text-decoration: none;
        border: none;

        &:hover {
            background-color: rgba(48, 48, 48, 0.7);
        }
    }

    .container {
        position: relative;
        height: 100%;
        padding: 10px 25px 60px;
    }

    // ================================

    .invisible {
        opacity: 0 !important;
    }

    .err-msg {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: #fff;
        margin-block-end: 10px;
        background-color: #303030;
        opacity: 1;
        transition: all 0.5s ease;

        p {
            font-size: 14px;
        }

        span {
            font-weight: 600;
        }
    }

    .blog-info {
        display: flex;
        column-gap: 16px;
        margin-block-end: 32px;

        input:nth-child(1) {
            min-width: 300px;
        }

        input {
            padding: 10px 4px;
            border: none;
            border-block-end: 1px solid #303030;
            transition: all 0.5s ease;

            &:focus {
                outline: none;
                box-shadow: 0 1px 0 0 #303030;
            }
        }

        .upload-file {
            display: flex;
            column-gap: 16px;
            flex: 1;
            position: relative;

            input {
                display: none;
            }

            span {
                align-self: center;
                margin-inline-start: 16px;
                font-size: 12px;
            }
        }

        .button-inactive {
            opacity: 0.6;
            cursor: not-allowed;
        }
    }

    .editor {
        display: flex;
        flex-direction: column;
        height: 60vh;
        margin-block-end: 20px;

        .ql-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: scroll;
        }

        .ql-editor {
            padding: 20px 16px 30px;
        }
    }

    .blog-actions {
        display: flex;
        column-gap: 16px;
    }

    //========================

    .upload-success {
        background-color: #303030;
        color: #fff;
        padding: 5px;
        font-size: 24px;
        font-weight: 300;
        border-radius: 8px;
    }

    .upload-error {
        background-color: #303030;
        color: #fff;
        padding: 5px;
        font-size: 24px;
        font-weight: 300;
        border-radius: 8px;

    }
}
</style>