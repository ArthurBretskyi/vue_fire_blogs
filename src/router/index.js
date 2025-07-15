import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BlogsView from '@/views/BlogsView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AdminView from '@/views/AdminView.vue'
import CreatePost from '@/views/CreatePost.vue'
import PostPreview from '@/views/PostPreview.vue'
import BlogView from '@/views/BlogView.vue'
import BlogEdit from '@/views/BlogEdit.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {
            title: 'Home',
        },
    },
    {
        path: '/blogs',
        name: 'blogs',
        component: BlogsView,
        meta: {
            title: 'Blogs',
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView,
        meta: {
            title: 'Login',
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: {
            title: 'Register',
        },
    },
    {
        path: '/forgotPassword',
        name: 'ForgotPassword',
        component: ForgotPasswordView,
        meta: {
            title: 'ForgotPassword',
        },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileView,
        meta: {
            title: 'Profile',
        },
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminView,
        meta: {
            title: 'Admin',
        },
    },
    {
        path: '/create-post',
        name: 'CreatePost',
        component: CreatePost,
        meta: {
            title: 'Create Post',
        },
    },
    {
        path: '/post-preview',
        name: 'PostPreview',
        component: PostPreview,
        meta: {
            title: 'Post Preview',
        },
    },
    {
        path: '/blog-view/:blogid',
        name: 'BlogView',
        component: BlogView,
        meta: {
            title: 'Blog View',
        },
    },
    {
        path: '/blog-edit/:blogid',
        name: 'BlogEdit',
        component: BlogEdit,
        meta: {
            title: 'Blog Edit',
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | VueFireBlogs`
    next()
})

export default router
