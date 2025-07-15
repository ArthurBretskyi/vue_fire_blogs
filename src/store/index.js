import { createStore } from 'vuex'
import { auth, db } from '@/firebase-config'
import { doc, getDoc, updateDoc, getDocs, query, where, collection, orderBy, deleteDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'

export default createStore({
    state: {
        blogPosts: [],
        postLoaded: null,
        blogHTML: 'Write your blog title here...',
        blogTitle: '',
        blogPhotoName: '',
        blogPhotoFileURL: null,
        blogPhotoPreview: null,
        editPost: null,
        user: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileUserName: null,
        profileId: null,
        profileInitials: null,
        profileRole: null,
    },
    getters: {
        blogPostsFeed(state) {
            return state.blogPosts.slice(0, 2)
        },
        blogPostsCards(state) {
            return state.blogPosts.slice(2, 6)
        },
    },
    mutations: {
        newBlogPost(state, newValue) {
            state.blogHTML = newValue
        },
        updateTitle(state, newValue) {
            state.blogTitle = newValue
        },
        fileNameChange(state, newValue) {
            state.blogPhotoName = newValue
        },
        createFileURL(state, newValue) {
            state.blogPhotoFileURL = newValue
        },
        openCoverPreview(state) {
            state.blogPhotoPreview = !state.blogPhotoPreview
        },
        toggleEditPost(state, payload) {
            state.editPost = payload
        },
        updateUser(state, payload) {
            state.user = payload
        },
        setProfileInfo(state, docSnap) {
            state.profileId = docSnap.id
            const data = docSnap.data()
            state.profileEmail = data.email
            state.profileFirstName = data.firstName
            state.profileLastName = data.lastName
            state.profileUserName = data.userName
            state.profileRole = data.role ?? 'user'
        },
        setProfileInitials(state) {
            const first = state.profileFirstName?.match(/^\w/)?.[0] ?? ''
            const last = state.profileLastName?.match(/^\w/)?.[0] ?? ''
            state.profileInitials = (first + last).toUpperCase()
        },
        changeFirstName(state, newValue) {
            state.profileFirstName = newValue
        },
        changeLastName(state, newValue) {
            state.profileLastName = newValue
        },
        changeUserName(state, newValue) {
            state.profileUserName = newValue
        },
        addBlogPost(state, post) {
            state.blogPosts.push(post)
        },
        setPostLoaded(state, value) {
            state.postLoaded = value
        },
        removePostFromState(state, blogID) {
            state.blogPosts = state.blogPosts.filter((post) => post.blogID !== blogID)
        },
        updateBlogPost(state, updatedPost) {
            const index = state.blogPosts.findIndex((post) => post.blogID === updatedPost.blogID)
            if (index !== -1) {
                state.blogPosts[index] = { ...state.blogPosts[index], ...updatedPost }
            }
        },
    },
    actions: {
        /** Завантажує профіль поточного користувача */
        async getCurrentUser({ commit }) {
            if (!auth.currentUser) {
                console.warn('⛔ auth.currentUser is null')
                return
            }

            try {
                const uid = auth.currentUser.uid
                const docRef = doc(db, 'users', uid)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    console.log('✅ docSnap data:', docSnap.data())
                    commit('setProfileInfo', docSnap)
                    commit('setProfileInitials')
                } else {
                    console.warn('⚠️ Документ користувача не існує')
                }
            } catch (err) {
                console.error('🔥 getCurrentUser error:', err)
            }
        },
        async getPost({ commit, state }) {
            try {
                const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'))
                const querySnapshot = await getDocs(q)

                querySnapshot.forEach((doc) => {
                    const data = doc.data()

                    if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
                        const post = {
                            blogID: doc.id,
                            title: data.title,
                            html: data.html,
                            coverPhoto: data.coverPhoto,
                            authorID: data.authorID,
                            createdAt: data.createdAt,
                        }

                        commit('addBlogPost', post)
                    }
                })

                commit('setPostLoaded', true)
            } catch (error) {
                console.error('🔥 getPost error:', error)
            }
        },
        async deletePost({ commit }, blogID) {
            try {
                // 1. Видалити документ з Firestore
                const postRef = doc(db, 'blogs', blogID)
                await deleteDoc(postRef)
                console.log('🗑️ Blog deleted from Firestore:', blogID)

                // 2. Видалити локально у Vuex
                commit('removePostFromState', blogID)
            } catch (error) {
                console.error('❌ deletePost error:', error)
                throw error
            }
        },
        async signOutUser({ commit }) {
            try {
                await signOut(auth)
                commit('updateUser', null)
                commit('setProfileInfo', {
                    id: null,
                    data: () => ({
                        email: null,
                        firstName: null,
                        lastName: null,
                        userName: null,
                    }),
                })
                commit('setProfileInitials')
                console.log('🚪 Користувач вийшов з акаунту')
            } catch (error) {
                console.error('❌ Помилка під час виходу:', error)
            }
        },
        async updateUserSettings({ commit, state }) {
            try {
                // 1) створюємо посилання на документ
                const docRef = doc(db, 'users', state.profileId) // doc() — синхронний!

                // 2) оновлюємо поля
                await updateDoc(docRef, {
                    firstName: state.profileFirstName,
                    lastName: state.profileLastName,
                    userName: state.profileUserName,
                })

                // 3) оновлюємо ініціали у Vuex
                commit('setProfileInitials')
                console.log('✅ Профіль оновлено')
            } catch (err) {
                console.error('⚠️  updateUserSettings error:', err)
            }
        },
        /** Робить іншого користувача адміністратором за email */
        async makeAdmin({ state }, email) {
            // перевіряємо, чи поточний користувач сам адмін
            if (state.profileRole !== 'admin') {
                throw new Error('Only admins can grant admin role')
            }

            // шукаємо користувача з таким email
            const q = query(collection(db, 'users'), where('email', '==', email))
            const snap = await getDocs(q)

            if (snap.empty) throw new Error('User with this email not found')

            // беремо перший збіг (звичайно email унікальний)
            const userDoc = snap.docs[0]
            const userRef = doc(db, 'users', userDoc.id)

            await updateDoc(userRef, { role: 'admin' })
            return userDoc.data().email // повернемо, щоб показати підтвердження
        },
    },
    modules: {},
})
