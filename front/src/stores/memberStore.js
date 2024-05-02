import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useMemberStore = defineStore('memberStore', () => {

  const allMembers = ref(null)
  const fetchedMember = ref(null);


 async function fetchMembers() {
    try {
      const results = await axios('api/xarxa/', {
        headers: {   
          Authorization: "Bearer " + sessionStorage.refreshToken,
          'If-None-Match': allMembers.value?.etag,
          'Cache-Control': 'private'
        }
      })
      allMembers.value = {content: results.data,
                          tableContent: results?.data.map(member => { 
                                          return {nom: member.commercialName1,
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

  return {
    allMembers,
    fetchedMember,
    fetchMembers
  }
})
