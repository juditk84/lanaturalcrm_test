<script setup>
import { reactive, ref, onMounted, computed, isProxy, toRaw } from 'vue'
import { useRoute } from 'vue-router'
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
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Projectes" main>
        
      </SectionTitleLineWithButton>
      <TableAllProjects />
    </SectionMain>

    <SectionTitle>Custom elements</SectionTitle>
    <CardBox class="mb-6" has-table>
       
      </CardBox>
    <SectionMain>

    </SectionMain>
  </LayoutAuthenticated>
</template>
