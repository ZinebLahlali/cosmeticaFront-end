import { createRouter, createWebHistory } from "vue-router"
import HomeView from '../views/HomeView.vue'
// import RegistreView from '../views/RegistreView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/RegisterView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Loginview.vue')
        },
    ],
})

export default router