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
        allProjects.value = { content: results.data,
                              tableContent: results.data.map(project => {
                                return {
                                  Nom: project.name,
                                  Client: project.Member.commercialName1,
                                  Responsable: project.Worker.firstname,
                                  Progrés: "indefinit",
                                  DataFinalització: project.end_date
                                }
                              }),
                              tableHeaders: ["Nom", "Client", "Responsable", "Progrés", "Data finalitz."]
                            }
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
