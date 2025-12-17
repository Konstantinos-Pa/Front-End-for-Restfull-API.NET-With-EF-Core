import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/Pages/Main.vue'
import About from '@/components/Pages/about.vue'
import Certificates from '@/components/Pages/certificates.vue'
import ProfileDetailes from '@/components/Pages/profileDetailes.vue'
import Login from '@/components/Pages/login.vue'
import Register from '@/components/Pages/Register.vue'
import CandidateList from '../components/Pages/CandidateList.vue'
import NewCandidate from '@/components/Pages/NewCandidate.vue'


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
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/candidateList',
      component: CandidateList,
      name: 'CandidateList',
    },
    {
      path: '/candidatelist/newcandidate',
      component: NewCandidate,
      name: 'NewCandidate',
    },
  ],
})

export default router
