import { createFetch, useStorage } from '@vueuse/core'
import { useAuthStore } from '@/stores/authStore'



export const useMyFetch = createFetch({
    baseUrl: 'http://localhost:4000/api',
    options: {
      async beforeFetch({ options }) {
        const myToken = useStorage("refreshToken", sessionStorage)
        options.headers.Authorization = `Bearer ${myToken}`
        return { options }
      },
    }, 
    fetchOptions: {
      mode: 'cors',
    },
  })
  
//   const { isFetching, error, data } = useMyFetch('users')