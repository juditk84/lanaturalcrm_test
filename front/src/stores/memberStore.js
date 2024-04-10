import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useMemberStore = defineStore('memberStore', () => {

  const allMembers = ref(null)
  const fetchedMember = ref(null);


 async function fetchMembers() {
    try {
      const results = await axios('api/xarxa/')
      allMembers.value = results?.data.map(member => { 
                                              return {nom: member.commercialName1,
                                                      adreça: member.address,
                                                      ciutat: member.city}
      })
      console.log(allMembers.value)
      // allMembers.value = results?.data
    } catch(error) {
        alert(error.message)
    }
  }

  return {
    allMembers,
    fetchedMember,
    fetchMembers
  }
})
