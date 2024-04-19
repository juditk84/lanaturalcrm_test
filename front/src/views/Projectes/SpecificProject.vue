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
    <SectionMain>
      <SectionTitleLineWithButton :title="projectesStore.specificProject?.name" main>
        {{ projectesStore.specificProject?.Member.commercialName1 }}
      </SectionTitleLineWithButton>
      <div v-if="!projectesStore.specificProject">
        Loading...
      </div>
      <div v-else>
        {{projectesStore.specificProject.description}}
      </div>
      
    </SectionMain>
    
    <SectionMain>
      <h3><b>Tasques</b></h3>
      <CardBox has-table>
        <TableProjectTasks />
      </CardBox>
    </SectionMain>
    
    <!-- <SectionMain>
      <SectionTitle>Balanç Econòmic</SectionTitle>
      <div class="grid grid-cols-2 gap-4">
        <CardBox  v-if="!projectExpenses"> loading... </CardBox>
        <CardBox  v-else>{{ projectExpenses }} </CardBox>
        <CardBox v-if="!projectIncome">loading...</CardBox>
        <CardBox v-else>{{ projectIncome }}</CardBox>
    </div> -->
    <!-- </SectionMain> -->
    <TableProjectTransactions title="Despeses" :expenses="projectExpenses"/>
    <TableProjectTransactions title= "Ingressos" :income="projectIncome"/>
  </LayoutAuthenticated>
</template>


