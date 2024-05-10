import { createRouter, createWebHashHistory, routeLocationKey, routerKey, useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'
import { useUserStore } from '@/stores/userStore'

const routes = [

  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/HomeView.vue'),
    children: [
      {path: 'projectes', name: 'dashboardProjectes', component: () => import('@/views/Dashboards/DashboardProjects.vue')},
      {path: 'reunions', name: 'dashboardReunions', component: () => import('@/views/Dashboards/DashboardReunions.vue')},
      {path: 'xarxa', name: 'dashboardXarxa', component: () => import('@/views/Dashboards/DashboardXarxa.vue')},
      {path: 'global', name: 'dashboardGlobal', component: () => import('@/views/HomeView.vue')},
    ]

  },
  {
    meta: {
      title: 'Membres de la Xarxa'
    },
    path: '/xarxa',
    name: 'Xarxa',
    children: [
      {path: 'totis', name: 'Totis', component: () => import('@/views/Xarxa/AllMembers.vue')},
      {path: 'afegir', name: 'AfegirMembre', component: () => import('@/views/Xarxa/AddMember.vue')},
      {path: ':member_id', name: 'un sol membre', component: () => import('@/views/Xarxa/SpecificMember.vue')},
    ]
    
  },

  {
    meta: {
      title: 'Projectes'
    },
    path: '/projectes',
    children: [
      {  path: 'tots', name: 'Projectes', component: () => import('@/views/Projectes/AllProjects.vue')},
      {  path: ':project_id', name: 'un sol projecte', component: () => import('@/views/Projectes/SpecificProject.vue')}
    ]

  },
  {
    meta: {
      title: 'Reunions'
    },
    path: '/reunions',
    children: [
      {  path: 'totes', name: 'Reunions', component: () => import('@/views/ReunionsView.vue')},
     // {  path: ':reunion_id', name: 'un sol projecte', component: () => import('@/views/Projectes/SpecificProject.vue')}
    ]
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
    component: () => import('@/views/RegisterView.vue')
  },
  {
    meta: {
      title: 'Error'
    },
    path: '/',
    name: 'error',
    component: () => import('@/views/ErrorView.vue')
  }
]

const authenticated = false;

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})


// guard preventing access to pages unless the user is logged in like a boss:

router.beforeEach((to, from, next) => {
  const route = useRoute()
  console.log(route.path)
  console.log(route.params)
  const authStore = useAuthStore();

  const userStore = useUserStore()

  if (to.name !== 'login' && !sessionStorage.getItem("refreshToken")) next({ name: 'login' })
  else next()

})

export default router