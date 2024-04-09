import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useMemberStore = defineStore('member', () => {

  const allMembers = ref([])
  const fetchedMember = ref(null);


 async function fetchMembers() {
    try {
      const results = await axios('api/xarxa/')
      allMembers.value = results?.data
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
