import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {
const userName = ref(null)
const user = ref(null)

  const $reset = () => {user.value = null}
  const userAvatar = computed(  
    () =>
      `https://api.dicebear.com/8.x/adventurer/svg?seed=Salem`
  )

  async function fetchAllUserRelatedAssets(token){
    try {
      const response = await axios("api/workers", {
        headers: {
          Authorization: token
        }
      })
      user.value = await response?.data?.user
      console.log(user.value)
    } catch (error) {
      console.log(error);
    }   
  }

  return {
    userName,
    user,
    userAvatar,
    history,
    $reset,
    fetchAllUserRelatedAssets
  }
}, {persist: true})
