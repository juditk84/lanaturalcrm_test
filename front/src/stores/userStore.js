import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from './authStore'

export const useUserStore = defineStore('userStore', () => {

  const authStore = useAuthStore()
  // const {isLoggedIn} = storeToRefs(authStore)

  watch(() => authStore.isLoggedIn, async () => {
    fetchAllUserRelatedAssets()
  })

  const user = ref({
    allUserRelatedAssets: null,
    allUserProjects: null,
    allUserTasks: [],
    allUserNotes: [],
    allUserDocuments: [],
    allUserLinks: [], 
    userName: '',
    userEmail: ''
  })
  // const allUserRelatedAssets = ref(null)
  // const allUserProjects = ref(null)
  // const allUserTasks = ref([])
  // const allUserNotes = ref([])
  // const allUserDocuments = ref([])
  // const allUserLinks = ref([])
  // const userName = ref('Jane Doe')
  // const userEmail = ref('doe.doe.doe@example.com')

  const notDevelopedYetHahaha = ref(null)

  const userAvatar = computed(  
    () =>
      `https://api.dicebear.com/8.x/adventurer/svg?seed=Salem`
  )

  // const isFieldFocusRegistered = ref(false)

  // const clients = ref([])
  // const history = ref([])

const emptyPlaceholder = ref([
  {emptyyyyy: "al loro amiga, que això està buit"}
])

  function setUser(payload) {
    if (payload.name) {
      userName.value = payload.name
    }
    if (payload.email) {
      userEmail.value = payload.email
    }
  }

  async function fetchAllUserRelatedAssets(){
    try {
      const response = await axios("api/workers", {
        headers: {
          Authorization: localStorage.token
        }
      }) 
      user.userName.value = response.data.user.username
      user.allUserRelatedAssets.value = response.data
      user.allUserProjects.value = response.data.user.Projects
      user.allUserTasks.value = response.data.user.Tasks
      user.allUserNotes.value = response.data.user.Notes
      user.allUserDocuments.value = response.data.user.Documents
      user.allUserLinks.value = response.data.user.Links
    } catch (error) {
      console.log(error);
    }
    
  }

  function $reset(){

  }

  function fetchSampleClients() {
    axios
      .get(`data-sources/clients.json?v=3`)
      .then((result) => {
        clients.value = result?.data?.data
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  function fetchSampleHistory() {
    axios
      .get(`data-sources/history.json`)
      .then((result) => {
        history.value = result?.data?.data
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return {
    // userName,
    // userEmail,
    // allUserProjects,
    // allUserTasks,
    // allUserNotes,
    // allUserDocuments,
    // allUserLinks,
    user,
    userAvatar,
    notDevelopedYetHahaha,
    isFieldFocusRegistered,
    // clients,
    emptyPlaceholder,
    history,
    setUser,
    // fetchSampleClients,
    // fetchSampleHistory,
    // fetchAllUserRelatedAssets
  }
})
