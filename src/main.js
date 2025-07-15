/* ---------- core ---------- */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* ---------- Font Awesome (залишаємо як було) ---------- */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fab, fas, far)

/* ---------- Firebase ---------- */
import { auth } from '@/firebase-config'
import { onAuthStateChanged } from 'firebase/auth'

/* ---------- VueQuill (Quill 2) ---------- */

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// 🔧 Глобальні опції для всіх редакторів:
const globalOptions = {
    theme: 'snow',
    modules: {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ['link', 'image', 'uploadImage'], // ← наша кастомна кнопка
                ['clean'],
            ],
            handlers: {
                uploadImage: function () {
                    const input = document.createElement('input')
                    input.setAttribute('type', 'file')
                    input.setAttribute('accept', 'image/*')
                    input.click()

                    input.onchange = async () => {
                        const file = input.files[0]
                        const formData = new FormData()
                        formData.append('file', file)
                        formData.append('upload_preset', 'vue_unsigned')
                        try {
                            const res = await fetch('https://api.cloudinary.com/v1_1/dnrvrs2vj/image/upload', {
                                method: 'POST',
                                body: formData,
                            })
                            const data = await res.json()
                            const range = this.quill.getSelection()
                            const transformedURL = data.secure_url.replace(
                                '/upload/',
                                '/upload/w_600,c_scale,q_auto,f_auto/'
                            )
                            this.quill.insertEmbed(range.index, 'image', transformedURL)

                            this.quill.setSelection(range.index + 1)
                            alert('✅ Зображення завантажено')
                        } catch (err) {
                            console.error('🔥 Помилка завантаження зображення:', err)
                            alert('❌ Помилка під час завантаження')
                        }
                    }
                },
            },
        },
    },
}

// 🧠 Встановлюємо глобальні опції один раз:
QuillEditor.props.globalOptions.default = () => globalOptions

/* ---------- створюємо Vue тільки один раз ---------- */
let app
onAuthStateChanged(auth, (user) => {
    if (!app) {
        app = createApp(App)
            .use(router)
            .use(store)
            .component('font-awesome-icon', FontAwesomeIcon)
            .component('QuillEditor', QuillEditor)
            .mount('#app')
    }
    console.log(user ? '🔐 Signed-in:' : '🚪 Signed-out', user?.email ?? '')
})

// createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).use(Vue2Editor).mount('#app')
