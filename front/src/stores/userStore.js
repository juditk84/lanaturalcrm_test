import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { useAuthStore } from './authStore'

export const useUserStore = defineStore('userStore', () => {
const userName = ref(null)
const user = ref({})
// const authStore = useAuthStore()
  // const {isLoggedIn} = storeToRefs(authStore)

  // watch(() => authStore.isLoggedIn, async () => {
  //   console.log("userStore fetching user stuff")
  //   await fetchAllUserRelatedAssets()
  //   userName.value = sessionStorage.username
  // })

  // const notDevelopedYetHahaha = ref(null)

  const userAvatar = computed(  
    () =>
      `https://api.dicebear.com/8.x/adventurer/svg?seed=Salem`
  )


// const emptyPlaceholder = ref([
//   {emptyyyyy: "al loro amiga, que això està buit"}
// ])

  async function fetchAllUserRelatedAssets(token){

    try {
      const response = await axios("api/workers", {
        headers: {
          Authorization: token
        }
      })
      user.value = await response?.data?.user
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
    
  }


  return {
    // userName,
    // userEmail,
    // allUserProjects,
    // allUserTasks,
    // allUserNotes,
    // allUserDocuments,
    // allUserLinks,
    // user,
    userName,
    user,
    userAvatar,
    // notDevelopedYetHahaha,
    // isFieldFocusRegistered,
    // clients,
    // emptyPlaceholder,
    history,
    // setUser,
    // $reset,
    // fetchSampleClients,
    // fetchSampleHistory,
    fetchAllUserRelatedAssets
  }
})
