import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useMainStore = defineStore('main', () => {

  const allUserRelatedAssets = ref({})
  const allUserProjects = ref([])
  const allUserTasks = ref([])
  const allUserNotes = ref([])
  const allUserDocuments = ref([])
  const allUserLinks = ref([])
  const userName = ref('Jane Doe')
  const userEmail = ref('doe.doe.doe@example.com')

  const userAvatar = computed(  
    () =>
      `https://api.dicebear.com/8.x/adventurer/svg?seed=Salem`
  )

  const isFieldFocusRegistered = ref(false)

  const clients = ref([])
  const history = ref([])

const emptyPlaceholder = ref([
  {emptyyyyy: "al loro amiga, que això està buit"},
  {id: 2, nom: "Projecte 2", responsable: "Usuària 4", client: "Ajuntament de Terrassa"}
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
      console.log("the axiosGet data at the store level: ", axiosGet.data)
      console.log("the projects data at the store level: ", allUserProjects.value)

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
    isFieldFocusRegistered,
    clients,
    emptyPlaceholder,
    history,
    setUser,
    fetchSampleClients,
    fetchSampleHistory,
    fetchAllUserRelatedAssets
  }
},
{
  persist: true,
},)
