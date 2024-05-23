<script setup>
import { mdiBallotOutline } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import AddMemberForm from '@/components/AddMemberForm.vue'


</script>

<template>
    <LayoutAuthenticated>
      <SectionMain>
        <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Xarxa" main>
          </SectionTitleLineWithButton>
        </SectionMain>  
      <SectionMain>
        <BaseDivider/>
          <AddMemberForm>
        </AddMemberForm>
      </SectionMain>
    </LayoutAuthenticated>
</template>
