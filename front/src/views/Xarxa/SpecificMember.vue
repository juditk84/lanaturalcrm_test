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
import { useMemberStore } from '@/stores/memberStore'
import shortUUID from 'short-uuid'

import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const memberStore = useMemberStore();

const route = useRoute();
const router = useRouter();
const minifier = shortUUID();

onMounted(async () => await memberStore.fetchSpecificMember())
watch(route, async () => await memberStore.fetchSpecificMember())

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
  memberStore.specificMember.value = null
  router.push({ path: `/xarxa/${minifier.fromUUID(memberStore.specificMember?.content?.parent.id)}` })
}

</script>

<template>
  <LayoutAuthenticated>
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
                  <dd class="text-lg font-semibold">
                    {{ memberStore.specificMember?.content?.email }}
                    <a v-bind:href="'mailto:' + memberStore.specificMember?.content?.email">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </a>
                  </dd>
              </div>
              <div class="flex flex-col py-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Adreça</dt>
                  <dd class="text-lg font-semibold">{{memberStore.specificMember?.content?.address}}</dd>
              </div>
              <div class="flex flex-col pt-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Telèfon</dt>
                  <dd class="text-lg font-semibold">{{ memberStore.specificMember?.content?.phoneNumber }}</dd>
              </div>
              <div v-if="memberStore.specificMember?.content.memberType === 'contact'" class="flex flex-col pt-3">
                  <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Entitat</dt>
                  <dd class="text-lg font-semibold">
                    {{ memberStore.specificMember?.content?.parent.commercialName1 }}
                    <button @click="navigateToMember()" class="px-8">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                    </button>
                  </dd>
              </div>
          </dl>
        
      </CardBox>
    </SectionMain>

    <SectionMain v-if="memberStore.specificMember?.content.memberType === 'entity'">
      <CardBox>
        <SectionTitleLineWithButton title="Contactes" main></SectionTitleLineWithButton>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
          <CardBoxContact v-for="contact in memberStore.specificMember?.content.children" 
                        :name="contact.firstname" 
                        :mail="contact.email" 
                        :phone-number="contact.phoneNumber"
                        :member-id="contact.id"/>
        </div>
        </CardBox>
    </SectionMain>

    <SectionMain v-if="memberStore.specificMember?.content.memberType === 'entity'">
      <CardBox>
        <SectionTitleLineWithButton title="Projectes" main></SectionTitleLineWithButton>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
          <CardBoxProject v-for="project in memberStore.specificMember?.content.projects" 
                        :name="project.name" 
                        :start-date="project.start_date" 
                        :project-type="project.projectType?.type"
                        :worker-name="project.Worker?.firstname"
                        :project-id="project.id"/>
        </div>
        </CardBox>
    </SectionMain>

  </LayoutAuthenticated>
</template>


