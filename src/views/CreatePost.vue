<template>
    <div class="create-post">
        <blog-preview-cover v-if="this.$store.state.blogPhotoPreview" />
        <loading-comp v-if="isLoading" />
        <div v-if="uploadStatus === 'success'" class="upload-success">
            ✅ Image successfully uploaded!
        </div>
        <div v-if="uploadStatus === 'error'" class="upload-error">
            ❌ Error loading image
        </div>
        <div class="container">
            <div :class="{ 'invisible': !error }" class="err-msg">
                <p><span>Error:</span>{{ errorMsg }}</p>
            </div>
            <div class="blog-info">
                <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
                <div class="upload-file">
                    <label for="blog-photo">Upload Cover Photo</label>
                    <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, jpeg">
                    <button @click="openPreview" class="preview"
                        :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">Preview
                        Photo</button>
                    <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
                </div>
            </div>
            <div class="editor">
                <QuillEditor theme="snow" v-model:content="blogHTML" contentType="html" />
            </div>
            <div class="blog-actions">
                <button @click="publishPost">Piblish Blog</button>
                <router-link class="router-btn" :to="{ name: 'PostPreview' }">Post Preview</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import BlogPreviewCover from "@/components/BlogPreviewCover.vue"
import LoadingComp from "@/components/LoadingComp.vue"
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from '@/firebase-config'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase-config'
import { mapActions } from 'vuex'
export default {
    name: "CreatePost",
    components: {
        BlogPreviewCover,
        LoadingComp,
    },
    data() {
        return {
            file: null,
            error: null,
            errorMsg: null,
            uploadStatus: null,
            isLoading: null,
        }
    },
    methods: {
        ...mapActions(['getPost']),
        async uploadFileToFirebase() {
            try {
                const file = this.file
                if (!file) throw new Error("No file selected")

                const filePath = `blogPhotos/${Date.now()}_${file.name}`
                const imageRef = storageRef(storage, filePath)

                await uploadBytes(imageRef, file)
                const downloadURL = await getDownloadURL(imageRef)

                console.log("✅ File uploaded:", downloadURL)

                // Зберегти URL у Vuex
                this.$store.commit("createFileURL", downloadURL)

            } catch (err) {
                console.error("🔥 uploadFileToFirebase error:", err)
                this.error = true
                this.errorMsg = err.message
            }
        },
        async fileChange() {
            this.file = this.$refs.blogPhoto.files[0]
            const fileName = this.file.name
            this.$store.commit("fileNameChange", fileName)

            // Створюємо formData
            const formData = new FormData()
            formData.append("file", this.file)
            formData.append("upload_preset", "vue_unsigned") // твій preset
            formData.append("folder", "blogPhotos") // не обов’язково

            try {
                const res = await fetch("https://api.cloudinary.com/v1_1/dnrvrs2vj/image/upload", {
                    method: "POST",
                    body: formData,
                })

                const data = await res.json()

                if (data.secure_url) {
                    this.$store.commit("createFileURL", data.secure_url)
                    this.uploadStatus = 'success'
                    setTimeout(() => {
                        this.uploadStatus = null
                    }, 5000);
                } else {
                    throw new Error("Cloudinary upload failed")
                }
            } catch (err) {
                this.error = true
                this.uploadStatus = 'error'
                setTimeout(() => {
                    this.uploadStatus = null
                }, 5000);
                this.errorMsg = err.message
                console.error("⛔ Помилка Cloudinary:", err)
            }
        },
        openPreview() {
            this.$store.commit('openCoverPreview')
        },
        async publishPost() {
            const { blogTitle, blogHTML } = this
            const { blogPhotoFileURL, profileId } = this.$store.state

            if (!blogPhotoFileURL) {
                console.warn('⚠️ blogPhotoFileURL is undefined')
                this.error = true
                this.errorMsg = 'Будь ласка, завантажте обкладинку перед публікацією.'
                return
            }

            const postRef = doc(collection(db, 'blogs'))
            const blogID = postRef.id

            const post = {
                blogID,
                title: blogTitle,
                html: blogHTML,
                coverPhoto: blogPhotoFileURL,
                authorID: profileId,
                createdAt: new Date(),
            }

            try {
                this.isLoading = true
                await setDoc(postRef, post)
                console.log('✅ Blog added to Firestore with ID:', blogID)
                this.error = false
                this.isLoading = null

                await this.getPost() // опціонально, якщо потрібно оновити список
                this.$router.push({
                    name: 'BlogView',
                    params: { blogid: blogID }
                })
            } catch (e) {
                console.error('🔥 Firestore error:', e)
                this.error = true
                this.errorMsg = e.message
                this.isLoading = null
            }
        }
    },
    computed: {
        profileID() {
            return this.$store.state.profileID
        },
        blogPhotoName() {
            return this.$store.state.blogPhotoName
        },
        blogTitle: {
            get() {
                return this.$store.state.blogTitle
            },
            set(newValue) {
                this.$store.commit("updateTitle", newValue)
            }
        },
        blogHTML: {
            get() {
                return this.$store.state.blogHTML
            },
            set(newValue) {
                this.$store.commit("newBlogPost", newValue)
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