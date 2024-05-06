import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { parse, format } from '@formkit/tempo'
import axios from 'axios'
import { useAuthStore } from './authStore'
import { useRouter, useRoute } from 'vue-router'



export const useUserStore = defineStore('userStore', () => {
const authStore = useAuthStore()
const user = ref(null)
const userTasks = ref(null)
const pinboard = ref(null)
const userLinks = ref(null)
const userDocs = ref(null)
const userNotes = ref(null)



// watch(() => authStore.isLoggedIn, fetchAllUserRelatedAssets, { immediate: true })
// watchEffect(async () => {
//   fetchAllUserRelatedAssets()
// })
// watch(
//   pinia.state,
//   (state) => {
//     // persist the whole state to the local storage whenever it changes
//     localStorage.setItem('piniaState', JSON.stringify(state))
//   },
//   { deep: true }
// )

const $reset = () => {user.value = null}

const userAvatar = computed(  
  () =>
    `https://api.dicebear.com/8.x/adventurer/svg?seed=Salem`
)
async function addToPinboard(element, data) {
    try {

      // const { data } = useMyFetch("workers", { data}).post().text()
      const response = await axios.post(`api/workers/pinboard/${element}`,
      {data},
      {
        headers: {
          Authorization: sessionStorage.getItem("refreshToken"),
        }
      })
      console.log(response)
    return response.data
    } catch (error) {
      console.log(error);
    }
    console.log("submit button clicked")
}

async function fetchAllUserRelatedAssets(){
  try {

    // const { isFetching, error, data } = await useMyFetch("/workers", { refetch: true }).get().json()
    const response = await axios("api/workers", {
      headers: {
        Authorization: sessionStorage.getItem("refreshToken")
      }
    })
    user.value = await response?.data?.user
    
    userTasks.value = response.data.user.Tasks
      .filter((task) => task.status !== "tancat" && !task.parentId)
        .map((task) => {
        const children = task.subTasks.map((subtask) => subtask.id)
        return {
          status: task.status,
          deadline: format(task.deadline, "full", "ca"),
          description: task.description,
          title: task.title,
          subTasks : children,
        }
    })
    userNotes.value = response?.data.user.Notes
      .filter((note) => !note.parentId)
        .map((note) => {
          return {
            id: note.id,
            text: note.text,
            title: note.title
          }
        }) 
    userDocs.value += response?.data.user.Documents
        .map((doc) => {
          return {
            id: doc.id,
            title: doc.title, 
            description: doc.description,
            url: doc.url
          }
        }) 
      userLinks.value += response?.data.user.Links
        .map((link) => {
          return {
            id: link.id,
            title: link.title, 
            description: link.description,
            url: link.url
          }
        })

      
  } catch (error) {
    console.log(error);
  }   
}




  return {
    user,
    userAvatar,
    history,
    links: userLinks,
    tasks: userTasks,
    docs: userDocs,
    notes: userNotes,
    pinboard,
    $reset,
    fetchAllUserRelatedAssets,
    addToPinboard
  }

})

