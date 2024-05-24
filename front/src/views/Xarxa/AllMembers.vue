<script setup>
import { onMounted, ref } from 'vue'
import { useMemberStore } from '@/stores/memberStore'
import Table from '@/components/Table.vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import AddMemberForm from '@/components/AddMemberForm.vue'
// JUDIT: love how simple this component is ^^

const memberStore = useMemberStore()

onMounted(() => { grabAllMembersFromStore() })
async function grabAllMembersFromStore(){await memberStore.fetchMembers()}

const isModalActive = ref(false)

</script>

<template>
  <LayoutAuthenticated>

    <CardBoxModal v-model="isModalActive" title="">
        <AddMemberForm></AddMemberForm>
    </CardBoxModal>

    <SectionMain>
      <CardBox>
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Xarxa" main />
        
      <Table table-category="xarxa" 
            :content="memberStore.allMembers?.content" 
            :table-content="memberStore.allMembers?.tableContent" 
            :table-headers="memberStore.allMembers?.tableHeaders" 
             table-title="Tots els membres"
            :items-per-page="10"/>

      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="isModalActive = true">Afegir Membre</button>
    </CardBox>
    </SectionMain>

  </LayoutAuthenticated>
</template>
