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

        {
            path: '/ajouter-commande',
            name: 'ajouterCommande',
            component: () => import('../views/CreateCommandeView.vue'),
            meta: { requiresAuth: true}
        }
    ],
})
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.meta.requiresAuth && !token){
        next('/login')
    } else {
        next()
    }
})

export default router