<script setup>

import { onMounted, onUnmounted, ref, computed} from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableProjectTasks from '@/components/TableProjectTasks.vue'
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

const projectExpenses = computed(() => {
  return projectesStore.specificProject?.Transactions.filter(transaction => transaction.base < 0)
})

const projectIncome = computed(() => {
return projectesStore.specificProject?.Transactions.filter(transaction => transaction.base > 0)
})

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
  return projectesStore.specificProject.Tasks.map(task => {return {highlight: task.color, dates: [[task.startDate, task.deadline]]}})
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
    <SectionMain v-if="projectesStore.specificProject?.Tasks[0]">
      <CardBox has-table>
        <div class="grid grid-cols-2 gap-4">
          {{ calendarActive === true ? "Calendari" : "Llista" }}
          <button @click="calendarOrListSwitch" 
          class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          {{ calendarActive ? "anar a Llista" : "anar a Calendari" }}
          </button>
        </div>
        
        <div  v-if="calendarActive">
          <!-- <Calendar expanded :is-dark="darkModeStore.isEnabled && true" /> -->
          <Calendar :attributes="attributes" class="hover:-translate-y-1 hover:scale-105 duration-300" expanded :is-dark="darkModeStore.isEnabled && true" />
        </div>
        <div v-else>

          <TableProjectTasks />
        </div>
      </CardBox>
    </SectionMain>
    <SectionMain v-else>
      <div class="text-center text-xl font-light">Sense tasques.</div>
    </SectionMain>

   <SectionTitle>Balanç Econòmic</SectionTitle>
   <SectionMain v-if="projectesStore.specificProject?.Transactions[0]">
    <CardBox has-table>
        <TableProjectTransactions title="Despeses" :expenses="projectExpenses"/>
        <TableProjectTransactions title= "Ingressos" :income="projectIncome"/>
      </CardBox>
   </SectionMain>
    <SectionMain v-else>
      <div class="text-center text-xl font-light">Sense moviments.</div>
  </SectionMain>
  </LayoutAuthenticated>
</template>


