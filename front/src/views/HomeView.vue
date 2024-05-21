<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { mdiChartTimelineVariant, mdiPlus, mdiChartLineVariant } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CommentsSection from '@/components/CommentsSection.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { useUserStore } from '@/stores/userStore'
import TaskCardBox from '@/components/TaskCardBox.vue'
// import NoteBox from '@/components/NoteBox.vue'
import AddComment from '@/components/AddComment.vue'

const isModalActive = ref(false)
const userStore = useUserStore();

onMounted(() => {
  userStore.fetchAllUserRelatedAssets()
})

const printUser = () => console.log(userStore.user.id)

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>

      <button @click="printUser"> click-eh me mario</button>

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

      <CommentsSection :commentableId="userStore?.user?.id" commentableType="worker">
        </CommentsSection>


      
    


      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">

        </div>

      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
