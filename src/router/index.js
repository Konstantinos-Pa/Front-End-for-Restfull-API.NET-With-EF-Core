import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Pages/Main.vue'
import About from '../components/Pages/about.vue'
import Certificates from '../components/Pages/certificates.vue'
import ProfileDetailes from '@/components/Pages/profileDetailes.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/certificates',
      name: 'certificates',
      component: Certificates,
    },
    {
      path: '/profile',
      name: 'ProfileDetails',
      component: ProfileDetailes,
    },
  ],
})

export default router
