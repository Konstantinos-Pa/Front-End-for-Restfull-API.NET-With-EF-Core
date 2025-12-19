import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/Pages/Main.vue'
import About from '@/components/Pages/about.vue'
import ProfileDetailes from '@/components/Pages/profileDetailes.vue'
import Login from '@/components/Pages/login.vue'
import Register from '@/components/Pages/Register.vue'
import CandidateList from '../components/Pages/CandidateList.vue'
import NewCandidate from '@/components/Pages/NewCandidate.vue'
import CertificateList from '@/components/Pages/CertificateList.vue'
import MyCertificateList from '@/components/Pages/MyCertificateList.vue'
import Purchase from '@/components/Pages/purchase.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Scroll to top on every navigation
    return { top: 0 };
  },
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
      path: '/profile',
      name: 'ProfileDetails',
      component: ProfileDetailes,
      meta: { requiresAuth: true, roles: ['User', 'Administrator'] }
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
      meta: { requiresAuth: true, roles: ['Administrator'] }
    },
    {
      path: '/candidatelist/newcandidate',
      component: NewCandidate,
      name: 'NewCandidate',
      meta: { requiresAuth: true, roles: ['Administrator'] }
    },
    {
      path: '/certificateslist',
      component: CertificateList,
      name: 'CertificateList',
      meta: { requiresAuth: true, roles: ['User', 'Administrator'] }
    },
    {
      path: '/myCertificates',
      component: MyCertificateList,
      name: 'MyCertificateList',
      meta: { requiresAuth: true, roles: ['User', 'Administrator'] }
    },
    {
      path: '/aa',
      component: Purchase,
      name: 'aa',
    },
  ],
})


router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next(); // no protection needed
  }

  const token = localStorage.getItem('token');

  if (!token) {
    return next('/Login');
  }

  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    const parsed = JSON.parse(decoded);

    if (to.meta.roles && !to.meta.roles.includes(parsed.role)) {
      alert('Access denied: insufficient permissions');
      return next('/');
    }

    next(); // authorized
  } catch (error) {
    console.error('Invalid token', error);
    localStorage.removeItem('token');
    next('/Login');
  }
});



export default router
