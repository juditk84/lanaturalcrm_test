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
    <SectionMain v-if="projectesStore.specificProject?.Tasks">
      <CardBox has-table>
        <TableProjectTasks />
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


