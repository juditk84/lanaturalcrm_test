import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useMainStore = defineStore('main', () => {

  const allUserRelatedAssets = ref(null)
  const allUserProjects = ref(null)
  const allUserTasks = ref([])
  const allUserNotes = ref([])
  const allUserDocuments = ref([])
  const allUserLinks = ref([])
  const userName = ref('Jane Doe')
  const userEmail = ref('doe.doe.doe@example.com')

  const notDevelopedYetHahaha = ref(null)

  const activeAsideElement = ref()

  const userAvatar = computed(  
    () =>
      `https://api.dicebear.com/8.x/adventurer/svg?seed=Salem`
  )

  const isFieldFocusRegistered = ref(false)

  const clients = ref([])
  const history = ref([])

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
      const axiosGet = await axios("api/workers", {
        headers: {
          Authorization: localStorage.token
        }
      }) 
      userName.value = axiosGet.data.user.username
      allUserRelatedAssets.value = axiosGet.data
      allUserProjects.value = axiosGet.data.user.Projects
      allUserTasks.value = axiosGet.data.user.Tasks
      allUserNotes.value = axiosGet.data.user.Notes
      allUserDocuments.value = axiosGet.data.user.Documents
      allUserLinks.value = axiosGet.data.user.Links
    } catch (error) {
      console.log(error);
    }
    
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
    userName,
    userEmail,
    allUserProjects,
    allUserTasks,
    allUserNotes,
    allUserDocuments,
    allUserLinks,
    userAvatar,
    notDevelopedYetHahaha,
    isFieldFocusRegistered,
    clients,
    emptyPlaceholder,
    history,
    activeAsideElement,
    setUser,
    fetchSampleClients,
    fetchSampleHistory,
    fetchAllUserRelatedAssets
  }
})
