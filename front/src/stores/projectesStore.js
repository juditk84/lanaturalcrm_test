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

  const specificProjectTransactions = ref(null) // ull! Aquí estem subdividint el fetch en més refs, queda per aclarir que és best practice.

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
      specificProjectTransactions.value = { // ojito amiga amb les factures, l'import ara mateix és NOMÉS LA BASE.
                                            content: results.data.Transactions,
                                            tableContent: results.data.Transactions.map(transaction => {
                                              return {
                                                referència: transaction.transactionRef,
                                                import: transaction.base,
                                                proveïdor: transaction.Member.commercialName1,
                                                tipus: transaction.transactionType
                                              }
                                            }),
                                            tableHeaders: ["Referència", "Import", "Proveïdor", "Tipus", ]
                                          }

    } catch(error) {
        alert(error.message)
    }
  }

  return {
    allProjects,
    allUserProjects,
    specificProject,
    specificProjectTransactions,
    fetchProjects,
    fetchUserProjects,
    fetchSpecificProject
  }
})
