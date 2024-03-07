import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useMemberStore = defineStore('member', () => {

  const members = ref([])


 async function fetchMembers() {
    try {
      const results = await axios('api/members/totis')
      members.value = results?.data
    } catch(error) {
        alert(error.message)
    }
  }

  return {
    members,
    fetchMembers
  }
})
