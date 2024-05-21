import { createFetch, useStorage } from '@vueuse/core'
import { useAuthStore } from '@/stores/authStore'

/// ara aixó es un fetch per comments

export const useMyFetch = createFetch({
    baseUrl: 'http://localhost:4000/api/comments',
    options: {
      async beforeFetch({ options }) {
        const myToken = useStorage("refreshToken", sessionStorage)
        options.headers.Authorization = `Bearer ${myToken}`
        // if (!myToken) cancel()
        return { options }
      },
    }, 
    fetchOptions: {
      mode: 'cors',
    },
  })
  
//   const { isFetching, error, data } = useMyFetch('users')