import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { format } from '@formkit/tempo'
import axios from 'axios'




export const useUserStore = defineStore('userStore', () => {
const user = ref(null)
const userTasks = ref(null)
const pinboard = ref(null)
const $reset = () => {user.value = null}

const userAvatar = computed(  
  () =>
    `https://api.dicebear.com/8.x/adventurer/svg?seed=Salem`
)

async function getComments(type, id) {
    
  try { 
    // make all a query so we can filter?    
    const response = await axios.get(`api/comments/${type}/${id}/all`,
    {
      headers: {
        Authorization: sessionStorage.getItem("refreshToken"),
      },
    },
    )
  
  const notes = response?.data
          // .filter((note) => !note.parentId)
          //   .map((note) => {
          //   // const subNotes = note.subNotes.map((note) => note.id)
          //       return {
          //         id: note.id,
          //         text: note.text,
          //         creator: note.Worker.username,
          //         createdAt: note.createdAt,
          //         respostes: subNotes,
          //       }
          //     })
    console.log(notes)
  return notes

  } catch (error) {
    console.log(error);
  }
}

// això es tb reply, si es reply s'agafa el parentId in the AddComment component
async function addComment(element, data) {
    
    try {     
      const response = await axios.post(`api/comments/${element}/${data.commentableType}`,
      {data},
      {
        headers: {
          Authorization: sessionStorage.getItem("refreshToken"),
        },
      },
      )
    return response.data

    } catch (error) {
      console.log(error);
    }
    console.log("submit button clicked")
}

async function editComment(element, data) {

  try {
    const response = await axios.patch(`api/comments/${element}/${data.id}`,
    {data},
    {
      headers: {
        Authorization: sessionStorage.getItem("refreshToken"),
      }
    })
    return response.data
  } catch (error) {
    alert(error.message)
  }
}

async function deleteComment(id, element, data) {

  try {
    const response = await axios.delete(`api/comments/${element}/${id}`,
    {data},
    {
      headers: {
        Authorization: sessionStorage.getItem("refreshToken"),
      }
    })
    return response.data
  } catch (error) {
    alert(error.message)
  }
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
      
  } catch (error) {
    console.log(error);
  }   
}




  return {
    user,
    userAvatar,
    history,
    tasks: userTasks,
    pinboard,
    $reset,
    fetchAllUserRelatedAssets,
    getComments,
    addComment,
    editComment,
    deleteComment
  }

})
