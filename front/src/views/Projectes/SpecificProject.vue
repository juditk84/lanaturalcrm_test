<script setup>

import { onMounted, onUnmounted, ref} from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import TableProjectTasks from '@/components/TableProjectTasks.vue'
import { useProjectesStore } from '@/stores/projectesStore'

const projectesStore = useProjectesStore();

onMounted(() => { grabSpecificProjectFromStore() })
onUnmounted(() => projectesStore.specificProject.value = null)
async function grabSpecificProjectFromStore(){await projectesStore.fetchSpecificProject()}

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

    <SectionMain>
    <SectionTitle>Balanç Econòmic</SectionTitle>
    <div class="grid grid-cols-2 gap-4">
      <CardBox has-table>Despeses</CardBox>
      <CardBox has-table>Ingresos</CardBox>
    </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>


