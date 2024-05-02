<script setup>
import { onMounted } from 'vue'
import { useMemberStore } from '@/stores/memberStore'
import Table from '@/components/Table.vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

// JUDIT: love how simple this component is ^^

const memberStore = useMemberStore()

onMounted(() => { grabAllMembersFromStore() })
async function grabAllMembersFromStore(){await memberStore.fetchMembers()}

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Xarxa" main />
        
      <Table table-category="xarxa" 
            :content="memberStore.allMembers?.content" 
            :table-content="memberStore.allMembers?.tableContent" 
            :table-headers="memberStore.allMembers?.tableHeaders" 
             table-title="Tots els membres"/>

    </CardBox>
    </SectionMain>

    <SectionTitle>Custom elements</SectionTitle>
    <CardBox class="mb-6" has-table>
       
      </CardBox>
    <SectionMain>

    </SectionMain>
  </LayoutAuthenticated>
</template>
