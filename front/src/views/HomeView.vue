<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { mdiChartTimelineVariant, mdiPlus, mdiChartLineVariant } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { useUserStore } from '@/stores/userStore'
import TaskCardBox from '@/components/TaskCardBox.vue'
import NoteBox from '@/components/NoteBox.vue'
import AddComment from '@/components/AddComment.vue'

const isModalActive = ref(false)
const userStore = useUserStore();

onMounted(() => {
  userStore.fetchAllUserRelatedAssets()
})

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>

      <CardBoxModal v-model="isModalActive" title="Afegeix una nova nota">
        <AddComment commentableId=null />
      </CardBoxModal>

      <br />
      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Les meves tasques" main>
          <BaseButton
            to="/projectes/tots"
            target="_blank"
            :icon="mdiChartLineVariant"
            label="Veure més"
            color="contrast"
            rounded-full
            small
          />
      </SectionTitleLineWithButton>

 
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">      
          <TaskCardBox v-for="task in userStore.tasks"
            :trend= "task.status"
            :trend-type="task.status"
            :trendType="task.status"
            :date="task.deadline"
            :label="task.description"
            :title="task.title"
          />
        </div>

     
      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="El meu pinboard" main>
           <BaseButton
          target="_blank"
          :icon="mdiChartLineVariant"
          label="Veure més"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6"> 
        <NoteBox v-for="note in userStore.notes" 
          :title="note.title"
          :label="note.text"
          :children="0"
        />
        <BaseButton :icon="mdiPlus" rounded-full big @click="isModalActive=true"></BaseButton>
      </div>
    


      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">

        </div>

      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
