<script setup>
import { onMounted } from 'vue'
import { useProjectesStore } from '@/stores/projectesStore'
import { useUserStore } from '@/stores/userStore'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'

import Table from '@/components/Table.vue'

const projectesStore = useProjectesStore();
const userStore = useUserStore();

onMounted( async () => await projectesStore.fetchProjects())

</script>

<template>
  <LayoutAuthenticated>
   
    <SectionMain>
      <CardBox>
        <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Projectes" main>
          
        </SectionTitleLineWithButton>
        <Table table-category="projectes" 
              :content="projectesStore.allProjects?.content" 
              :table-content="projectesStore.allProjects?.tableContent" 
              :table-headers="projectesStore.allProjects?.tableHeaders" 
               table-title="Tots els projectes"
              :items-per-page="5"/>
      </CardBox>
    </SectionMain>

  </LayoutAuthenticated>
</template>
