import { createRouter, createWebHashHistory } from 'vue-router';
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
    name: 'xarxa',
    children: [
      {path: 'totis', name: 'allMembers', component: () => import('@/views/Xarxa/AllMembers.vue')},
      {path: 'afegir', name: 'AddMember', component: () => import('@/views/Xarxa/AddMember.vue')},
      {path: ':member_id', name: 'specificMember', component: () => import('@/views/Xarxa/SpecificMember.vue')},
    ]
    
  },

  {
    meta: {
      title: 'projectes'
    },
    path: '/projectes',
    name: 'projectes',
    children: [
      {  path: 'tots', name: 'allProjects', component: () => import('@/views/Projectes/AllProjects.vue')},
      {  
        meta: {category: 'projectes'},
        path: ':project_id', 
        name: 'specificProject',
        component: () => import('@/views/Projectes/SpecificProject.vue'),
      }
    ]
  },
  {
    meta: {
      title: 'tasques'
    },
    path: '/tasques/gridtest', name: 'gridTasksCalendarTest', component: () => import('@/views/Tasques/GridTasksCalendar.vue')
  },
  {
    meta: {
      title: 'tasques'
    },
    path: '/projectes/:project_id/tasques/:tasca_id', name: 'specificTask', component: () => import('@/views/Tasques/SpecificTask.vue')
  },
  {
    meta: {
      title: 'treballadores per tasques'
    },
    path: '/projectes/:project_id/tasques/:tasca_id/treballadores/:worker_id', name: 'specificWorker', component: () => import('@/views/Xarxa/SpecificWorker.vue')
  },
  {
    meta: {
      title: 'Reunions'
    },
    path: '/reunions',
    children: [
      {  path: 'totes', name: 'allReunions', component: () => import('@/views/ReunionsView.vue')},
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

  const authStore = useAuthStore();

  const userStore = useUserStore()

  if (to.name !== 'login' && !sessionStorage.getItem("refreshToken")) next({ name: 'login' })
  else next()

})

export default router