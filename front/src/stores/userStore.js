import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { parse, format } from '@formkit/tempo'
import axios from 'axios'
import { useAuthStore } from './authStore'


export const useUserStore = defineStore('userStore', () => {
const user = ref(null)
const userTasks = ref(null)
const pinboard = ref(null)
const userLinks = ref(null)
const userDocs = ref(null)
const userNotes = ref(null)

const authStore = useAuthStore()

  const $reset = () => {user.value = null}
  
  const userAvatar = computed(  
    () =>
      `https://api.dicebear.com/8.x/adventurer/svg?seed=Salem`
  )
  async function addToPinboard(element, data) {
      try {
        const response = await axios.post(`api/comments/pinboard/${element}`,
       {data},
        {
          headers: {
            Authorization: sessionStorage.getItem("refreshToken")
          }
        })
      
      console.log("hello")
      console.log(user)
      return response.data
      } catch (error) {
        console.log(error);
      }
      console.log("submit button clicked")
  }
  
  async function fetchAllUserRelatedAssets(token){
    try {
      const response = await axios("api/workers", {
        headers: {
          Authorization: sessionStorage.getItem("refreshToken"),
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
