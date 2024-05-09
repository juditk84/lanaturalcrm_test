<script setup>

import { onMounted, ref, computed, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxContact from '@/components/CardBoxContact.vue'
import CardBoxProject from '@/components/CardBoxProject.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

import shortUUID from 'short-uuid'


onMounted(() => console.log("specific task mounted!"))

const route = useRoute();
const router = useRouter();
const minifier = shortUUID();


const calendarActive = ref(false)

const titleForCalendarOrTableSection = computed(() => {
  if(calendarActive){
    return "Calendari"
  }
  return "Llista"
})

function calendarOrListSwitch(){
  calendarActive.value = !calendarActive.value
}

const taskDates = computed(() => {
  return projectesStore.specificProject.Tasks.map(task => {return {highlight: task.Workers[0].color, dates: [[task.startDate, task.deadline]]}})
})

const attributes = ref(taskDates);

function navigateToMember(){
  projectesStore.specificMember.value = null
  router.push({ path: `/xarxa/${minifier.fromUUID(projectesStore.specificMember?.content?.parent.id)}` })
}

</script>

<template>
 hola hola
</template>


