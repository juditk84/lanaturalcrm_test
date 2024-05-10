<script setup>

import { onMounted, ref, computed} from 'vue'
import { mdiChartTimelineVariant, mdiPlus, mdiChartLineVariant } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxContact from '@/components/CardBoxContact.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentHeader from '@/components/CardBoxComponentHeader.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { useMemberStore } from '@/stores/memberStore'
import NoteBox from '@/components/NoteBox.vue'
import AddComment from '@/components/AddComment.vue'
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const isModalActive = ref(false)
const memberStore = useMemberStore();

onMounted(async () => await memberStore.fetchSpecificMember())

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
ß
<template>
  <LayoutAuthenticated>
    <CardBoxModal v-model="isModalActive" title="Afegeix una nova nota">
        <AddComment commentableType="member" :commentableId="memberStore?.specificMember?.content.id" />
      </CardBoxModal>

    <SectionTitle>Dades Bàsiques</SectionTitle>
        <SectionMain class=" rounded-2xl">
          <CardBox>
            
            <SectionTitleLineWithButton :title="memberStore?.specificMember?.content.name" main>
            </SectionTitleLineWithButton>
            <!-- hauríem de refactoritzar aquest llista bonica per si la volem en altres puestus -->

              <dl class="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                  <div v-if="memberStore.specificMember?.content?.pronouns !== null" class="flex flex-col pb-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Pronoms</dt>
                      <dd class="text-lg font-semibold">{{ memberStore.specificMember?.content?.pronouns }}</dd>
                  </div>
                  <div class="flex flex-col pb-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Correu electrònic</dt>
                      <dd class="text-lg font-semibold">{{ memberStore.specificMember?.content?.email }}</dd>
                  </div>
                  <div class="flex flex-col py-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Adreça</dt>
                      <dd class="text-lg font-semibold">{{memberStore.specificMember?.content?.address}}</dd>
                  </div>
                  <div class="flex flex-col pt-3">
                      <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Telèfon</dt>
                      <dd class="text-lg font-semibold">{{ memberStore.specificMember?.content?.phoneNumber }}</dd>
                  </div>
              </dl>
            
          </CardBox>
        </SectionMain>

        <SectionMain>
          <CardBox>
            <SectionTitleLineWithButton title="Contactes" main></SectionTitleLineWithButton>
            Contactes: 
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
            <CardBoxContact v-for="contact in memberStore.specificMember?.content.Child" 
                          :name="contact.firstname" 
                          :mail="contact.email" 
                          :phone-number="contact.phoneNumber"/>
            </div>
            </CardBox>
        </SectionMain>

    <SectionTitle>Balanç Econòmic</SectionTitle>

    <div>
      ....Afegir una nota: 
      <BaseButton :icon="mdiPlus" rounded-full big @click="isModalActive=true"></BaseButton>
    </div>
  </LayoutAuthenticated>
</template>


