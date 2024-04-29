<script setup>

import { onMounted, onUnmounted, ref, computed} from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableProjectTasks from '@/components/TableProjectTasks.vue'
import Table from '@/components/Table.vue'
import TableProjectTransactions from '@/components/TableProjectTransactions.vue'
import { useProjectesStore } from '@/stores/projectesStore'
import { useDarkModeStore } from '@/stores/darkMode'

import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const darkModeStore = useDarkModeStore()
const projectesStore = useProjectesStore();

onMounted(() => { grabSpecificProjectFromStore() })
onUnmounted(() => projectesStore.specificProject.value = null)
async function grabSpecificProjectFromStore(){await projectesStore.fetchSpecificProject()}

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

</script>

<template>
  <LayoutAuthenticated>
   
  
    <SectionTitle>Dades Bàsiques</SectionTitle>
    <SectionMain class=" rounded-2xl">
      <CardBox>
        
      <SectionTitleLineWithButton :title="projectesStore?.specificProject?.name" main>
        {{ projectesStore.specificProject?.Member.commercialName1 }}
      </SectionTitleLineWithButton>
      <div v-if="!projectesStore.specificProject">
        Loading...
      </div>
      <div v-else>
        {{projectesStore.specificProject.description}}
      </div>
    </CardBox>
    </SectionMain>

    <SectionTitle>Tasques</SectionTitle>
    <SectionMain v-if="projectesStore.specificProjectTasks">
      <CardBox has-table>
        
        <div class="grid grid-cols-12 gap-4">

          <CardBoxComponentHeader class="col-span-11" :title="calendarActive === true ? 'Calendari' : 'Llista'"/>

          <button @click="calendarOrListSwitch" class="col-span-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex content-center items-center">

            <svg v-if="!calendarActive" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>

          </button>

        </div>
        
          <Calendar v-if="calendarActive" :attributes="attributes" class="hover:-translate-y-1 hover:scale-105 duration-300" expanded :is-dark="darkModeStore.isEnabled && true" />

          <Table 
                has-filter
                table-category="tasques"
               :content="projectesStore.specificProjectTasks.content"
               :table-content="projectesStore.specificProjectTasks.tableContent"
               :table-headers="projectesStore.specificProjectTasks.tableHeaders"
               table-title="Tasques"
               />
      
        </CardBox>
    </SectionMain>
    <SectionMain v-else>
      <div class="text-center text-xl font-light">Sense tasques.</div>
    </SectionMain>

   <SectionTitle>Balanç Econòmic</SectionTitle>
   <SectionMain v-if="projectesStore.specificProjectTransactions">
    <CardBox has-table>
      
        <Table 
                has-filter
                table-category="moviments"
               :content="projectesStore.specificProjectTransactions.content"
               :table-content="projectesStore.specificProjectTransactions.tableContent"
               :table-headers="projectesStore.specificProjectTransactions.tableHeaders"
               table-title="Moviments"
               />

    </CardBox>
   </SectionMain>
    <SectionMain v-else>
      <div class="text-center text-xl font-light">Sense moviments.</div>
  </SectionMain>
  </LayoutAuthenticated>
</template>


