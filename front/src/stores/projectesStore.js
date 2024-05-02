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
  const specificProjectTasks        = ref(null) // ull! Same comment as transactions

  const minifier = shortUUID();

  const route = useRoute()

  async function fetchProjects() {
      try {
        const results = await axios('api/projectes/', {
          headers: {   
          Authorization: "Bearer " + sessionStorage.refreshToken,
          'If-None-Match': allProjects.value?.etag,
          'Cache-Control': 'private'
        }})
        allProjects.value = { content: results.data,
                              tableContent: results.data.map(project => {
                                return {
                                  Nom: project.name,
                                  Client: project.Member.commercialName1,
                                  Responsable: project.Worker.firstname,
                                  Progrés: "indefinit",
                                  DataFinalització: {content: project.end_date, isDate: true}
                                }
                              }),
                              tableHeaders:  [{binder: "Nom", label:"Nom"}, 
                                              {binder: "Client", label:"Client"},
                                              {binder: "Responsable",label: "Responsable"},
                                              {binder: "Progrés", label:"Progrés"},
                                              {binder: "DataFinalització", label:"Data finalitz."}
                                              ],
                              etag: results.headers.etag
                            }
                            
      } catch(error) {
        if(error.response.status !== 304){
          alert(error.message)
        }
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
                                            tableHeaders:  [{binder: "referència", label:"Referència"}, 
                                                            {binder: "import", label:"Import"},
                                                            {binder: "proveïdor",label: "Proveïdor"},
                                                            {binder: "tipus", label:"Tipus"}
                                                           ]},
      specificProjectTasks.value = {
                                      content: results.data.Tasks,
                                      tableContent: results.data.Tasks.map(task => {
                                        return {
                                          nom: task.title,
                                          descripció: task.description,
                                          workers: task.Workers.map(worker => worker.firstname).join(", "),
                                          progrés: "pendent de definir.",
                                          dataFinalització: {content: task.deadline, isDate: true}
                                        }
                                      }),
                                      tableHeaders: [{binder: "nom", label:"Nom"}, 
                                                     {binder: "descripció", label:"Descripció"},
                                                     {binder: "workers",label: "Assignada a"},
                                                     {binder: "progrés", label:"Progrés"},
                                                     {binder: "dataFinalització", label:"Data finalitz."}]
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
    specificProjectTasks,
    fetchProjects,
    fetchUserProjects,
    fetchSpecificProject
  }
})
