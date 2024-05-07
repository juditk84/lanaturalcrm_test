import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import shortUUID from 'short-uuid'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
export const useMemberStore = defineStore('memberStore', () => {

  const minifier = shortUUID();
  const route = useRoute();

  const allMembers = ref(null)
  const fetchedMember = ref(null);
  const specificMember = ref(null)



  async function fetchMembers() {
    try {
      const results = await axios('api/xarxa/',
      {
        headers: {   
        Authorization: "Bearer " + sessionStorage.refreshToken
        }
      })
      allMembers.value = {content: results.data,
                          tableContent: results?.data.map(member => { 
                                          return {nom: member.name,
                                                  adreça: member.address,
                                                  ciutat: member.city}}),
                          tableHeaders: [
                            { binder: "nom", label: "nom"},
                            { binder: "adreça", label: "adreça"},
                            { binder: "ciutat", label: "ciutat"}
                          ],
                          etag: results.headers.etag
    }} catch(error) {
      if(error.response.status !== 304){
        alert(error.message)
      }
    }
  }

  async function fetchSpecificMember() {
    try {
      const results = await axios(`api/xarxa/${minifier.toUUID(route.params.member_id)}`, 
      {
        headers: {   
        Authorization: "Bearer " + sessionStorage.refreshToken
      }

      })
      specificMember.value = { 
                                            content: results.data }
                                            // tableContent: results.data.map(transaction => {
                                            //   return {
                                            //     referència: transaction.transactionRef,
                                            //     import: transaction.base,
                                            //     proveïdor: transaction.Member.commercialName1,
                                            //     tipus: transaction.transactionType
                                            //   }
                                            // }),
                                            // tableHeaders:  [{binder: "referència", label:"Referència"}, 
                                            //                 {binder: "import", label:"Import"},
                                            //                 {binder: "proveïdor",label: "Proveïdor"},
                                            //                 {binder: "tipus", label:"Tipus"}
                                            //                ]},
      
    } catch(error) {
        alert(error.message)
    }
  }

  async function addMember(data){
    try{
      const response = await axios.post('api/xarxa/',
      {data},
      {
        headers: {
          Authorization: sessionStorage.getItem("refreshToken"),
        }
      })
    return response.data
    
    } catch (error) {
      return error.message
    }
  }

  async function updateMember(data){
    try {
      const response = await axios.patch(`api/xarxa/${minifier.toUUID(route.params.member_id)}`,
      {data},
      {
        headers: {
          Authorization: sessionStorage.getItem("refreshToken")
        }
      })
      // maybe this?
      //specificMember.value = { content: results.data }
     
      return response.data
    } catch (error) {
      return error.message
    }
  }
  return {
    allMembers,
    fetchedMember,
    specificMember,
    fetchMembers,
    fetchSpecificMember,
    addMember,
    updateMember,
  }
})
