import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
// import { useMainStore } from '@/stores/main.js'
import { useAuthStore } from '@/stores/authStore.js'
import { setupCalendar } from 'v-calendar';

import './css/main.css'

// Init Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Create Vue app
createApp(App).use(router).use(setupCalendar, {}).use(pinia).mount('#app')

// Init main store
// const mainStore = useMainStore(pinia)
const authStore = useAuthStore(pinia)

// Fetch sample data
// mainStore.fetchSampleClients()
// mainStore.fetchSampleHistory()


// Dark mode
// Uncomment, if you'd like to restore persisted darkMode setting, or use `prefers-color-scheme: dark`. Make sure to uncomment localStorage block in src/stores/darkMode.js
import { useDarkModeStore } from './stores/darkMode'

const darkModeStore = useDarkModeStore(pinia)

if (
  (!localStorage['darkMode'] && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
  localStorage['darkMode'] === '1'
) {
  darkModeStore.set(false)
}

// Default title tag
const defaultDocumentTitle = 'La Natural Coopmunicació'

// Set document title from route meta
// judit: not sure if we should use document.title as a global variable
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
