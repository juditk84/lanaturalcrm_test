<script setup>

import { onMounted, ref, computed, watch} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { useProjectesStore } from '@/stores/projectesStore'
import Table from '@/components/Table.vue'
import shortUUID from 'short-uuid'

const projectesStore = useProjectesStore()

const route = useRoute();
const router = useRouter();
const minifier = shortUUID();

// is it good doing this here? Are we overusing this trick?
onMounted(async () => await projectesStore.fetchSpecificProject())
watch(route, async () => await projectesStore.fetchSpecificProject())

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

function navigateToProject(){
  router.push({ path: `/projectes/${minifier.fromUUID(projectesStore.specificProject?.id)}` })
}

</script>

<template>
<LayoutAuthenticated>
  
  <SectionTitle>Dades Bàsiques</SectionTitle>
  <SectionMain class=" rounded-2xl">
    <CardBox>
      
      <SectionTitleLineWithButton :title="projectesStore.specificTask?.content.title" main>
        <button class="col-span-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex content-center items-center" @click="navigateToProject"><b>{{ projectesStore.specificProject?.name }}</b></button>
      </SectionTitleLineWithButton>
      <div v-if="!projectesStore.specificTask">
        Loading...
       </div>
       <div v-else>
         {{projectesStore?.specificTask?.content.description}}
       </div>
       {{ projectesStore?.specificTask.content.tableContent }}
     </CardBox>
   </SectionMain>

 </LayoutAuthenticated>
</template>


