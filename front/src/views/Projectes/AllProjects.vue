<script setup>
import { onMounted } from 'vue'
import { useProjectesStore } from '@/stores/projectesStore'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import TableAllProjects from '@/components/TableAllProjects.vue'

const projectesStore = useProjectesStore();

onMounted(() => { grabAllProjectsFromStore() })
async function grabAllProjectsFromStore(){await projectesStore.fetchProjects()}

</script>

<template>
  <LayoutAuthenticated>
   
    <SectionMain>
      <CardBox>
        <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Projectes" main>
          
        </SectionTitleLineWithButton>
        <TableAllProjects />
      </CardBox>
    </SectionMain>

  </LayoutAuthenticated>
</template>
