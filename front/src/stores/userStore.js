import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import { useAuthStore } from './authStore'

export const useUserStore = defineStore('userStore', () => {
const userName = ref(null)
const authStore = useAuthStore()
  // const {isLoggedIn} = storeToRefs(authStore)

  watch(() => authStore.isLoggedIn, async () => {
    console.log("userStore fetching user stuff")
    await fetchAllUserRelatedAssets()
    userName.value = sessionStorage.username
  })

  // const notDevelopedYetHahaha = ref(null)

  const userAvatar = computed(  
    () =>
      `https://api.dicebear.com/8.x/adventurer/svg?seed=Salem`
  )


// const emptyPlaceholder = ref([
//   {emptyyyyy: "al loro amiga, que això està buit"}
// ])

  async function fetchAllUserRelatedAssets(){
    
    try {
      const response = await axios("api/workers", {
        headers: {
          Authorization: sessionStorage.refreshToken
        }
      }) 
      console.log(response.data)
      console.log("all ok!")
    } catch (error) {
      console.log(error);
    }
    
  }

  // function $reset(){
  //   user.value = null
  // }

  // function fetchSampleClients() {
  //   axios
  //     .get(`data-sources/clients.json?v=3`)
  //     .then((result) => {
  //       clients.value = result?.data?.data
  //     })
  //     .catch((error) => {
  //       alert(error.message)
  //     })
  // }

  // function fetchSampleHistory() {
  //   axios
  //     .get(`data-sources/history.json`)
  //     .then((result) => {
  //       history.value = result?.data?.data
  //     })
  //     .catch((error) => {
  //       alert(error.message)
  //     })
  // }

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
