import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useProjectesStore = defineStore('member', () => {

  // this store should handle the fetch logic and the relevant state regarding PROJECTS.
  // (all projects, individual project, user projects <maybe>...)

  const allProjects = ref(null)

 async function fetchProjects() {
    try {
      const results = await axios('api/projectes/')
      // allProjects.value = results?.data
      allProjects.value = results?.data.map(project => { 
                                              return {name: project.name,
                                                worker: project.Worker.firstname,
                                                member: project.Member.commercialName1}
                                            })
    } catch(error) {
        alert(error.message)
    }
  }

  return {
    allProjects,
    fetchProjects
  }
})
