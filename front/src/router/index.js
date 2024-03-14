import { createRouter, createWebHashHistory } from 'vue-router'
import Style from '@/views/StyleView.vue'
import Home from '@/views/HomeView.vue'
import LandingView from '@/views/LandingView.vue'
import RegisterView from '@/views/RegisterView.vue'
import AllMembers from '@/views/xarxa/AllMembers.vue'
import AddMember from '@/views/xarxa/AddMember.vue'
import AllProjects from '@/views/projectes/AllProjects.vue'


const routes = [
  {
    meta: {
      title: 'Select style'
    },
    path: '/',
    name: 'style',
    component: Style
  },
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/dashboard',
    name: 'dashboard',
    component: Home
  },
  {
    meta: {
      title: 'Landing Hub'
    },
    path: '/:asideMenuCategoria/landingview',
    name: 'Landing Hub',
    component: LandingView
  },
  {
    meta: {
      title: 'Xarxatotis'
    },
    path: '/xarxa/totis',
    name: 'Xarxatotis',
    component: AllMembers
  },
  {
    meta: {
      title: 'Afegirmembre'
    },
    path: '/xarxa/afegirmembre',
    name: 'Xarxa',
    component: AddMember
  },
  {
    meta: {
      title: 'Projectes'
    },
    path: '/projectes/tots',
    name: 'Projectes',
    component: AllProjects
  },
  {
    meta: {
      title: 'Reunions'
    },
    path: '/reunions/',
    name: 'Reunions',
    component: () => import('@/views/ReunionsView.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue')
  },
  {
    meta: {
      title: 'Visualització de Dades'
    },
    path: '/dades',
    name: 'Visualització de Dades',
    component: () => import('@/views/DadesView.vue')
  },
  {
    meta: {
      title: 'Balanç Social'
    },
    path: '/social',
    name: 'Balanç Social',
    component: () => import('@/views/SocialView.vue')
  },
  {
    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    meta: {
      title: 'Register'
    },
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/error',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

export default router
