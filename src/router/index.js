import { createRouter, createWebHistory } from "vue-router"
//  import HomeView from '../views/HomeView.vue'
// import RegistreView from '../views/RegistreView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
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