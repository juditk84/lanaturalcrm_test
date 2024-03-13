<script setup>
import CardBox from './CardBox.vue';
import axios from 'axios'
import { useMemberStore } from '@/stores/memberStore'
import { computed, ref } from 'vue'

const members = ref([])


async function fetchMembers() {
   try {
     const results = await axios('api/xarxa')
     members.value = results?.data
    
   } catch(error) {
       alert(error.message)
   }
}

function doSomethin() {
    fetchMembers()
    console.log(members.value)
}
</script>

<template>
    <h1>Membros i membrillos</h1>
    <div v-for="member in members">
        {{ member.commercialName1 }}
    </div>
    <button @click="doSomethin"> click me</button>
</template>