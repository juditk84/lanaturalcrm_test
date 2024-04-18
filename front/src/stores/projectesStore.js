import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import shortUUID from 'short-uuid'

export const useProjectesStore = defineStore('projecteStore', () => {

  // this store should handle the fetch logic and the relevant state regarding PROJECTS.
  // (all projects, individual project, user projects <maybe>...)

  const allProjects = ref(null)
  const allUserProjects = ref(null)
  const specificProject = ref(null)
  const minifier = shortUUID();

  const route = useRoute()

 async function fetchProjects() {
    try {
      const results = await axios('api/projectes/')
      // allProjects.value = results?.data.map(project => { 
      //                                         return {
      //                                           id: project.id,
      //                                           name: project.name,
      //                                           worker: project.Worker.firstname,
      //                                           member: project.Member.commercialName1}
      //                                       })
      allProjects.value = results.data
    } catch(error) {
        alert(error.message)
    }
  }

  async function fetchUserProjects() {
    try {
      const results = await axios('api/projectes/userprojects', 
      {
        headers: {   
        Authorization: "Bearer " + sessionStorage.refreshToken
      }
      })
      allUserProjects.value = results.data
    } catch(error) {
        alert(error.message)
    }
  }

  async function fetchSpecificProject() {
    try {
      const results = await axios(`api/projectes/${minifier.toUUID(route.params.project_id)}`, 
      {
        headers: {   
        Authorization: "Bearer " + sessionStorage.refreshToken
      }
      })
      specificProject.value = results.data
    } catch(error) {
        alert(error.message)
    }
  }

  return {
    allProjects,
    allUserProjects,
    specificProject,
    fetchProjects,
    fetchUserProjects,
    fetchSpecificProject
  }
})
