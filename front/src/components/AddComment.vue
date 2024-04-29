<script setup>
import { reactive, ref } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub, mdiHome, mdiPhoneClassic, mdiPhone, mdiHandshakeOutline } from '@mdi/js'
import { useUserStore } from '@/stores/userStore'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import NotificationBarInCard from '@/components/NotificationBarInCard.vue'
import axios from 'axios'

defineProps({
  element: {
    type: String,
    required: true
  }
})

const userStore = useUserStore();

const form = ref({
  title: '',
  text: '',
})

async function submit(){
  console.log("submit button clicked")
    try {
      const response = await userStore.addToPinboard("note", form.value)
      console.log(response)
    } catch (error) {
      console.log(error);
    }   
}


</script>

<template>
  <LayoutAuthenticated>
    
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiHandshakeOutline" title="Afegir una nota" main>
      </SectionTitleLineWithButton>

        
        <BaseDivider />
      <CardBox form @submit.prevent="submit">
          <FormControl v-model="form.title" :icon="mdiAccount" placeholder="titól"/>
          <FormControl v-model="form.text" type="textarea" placeholder="escriu algo aqui oi" />
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" @click="submit"/>
          </BaseButtons>
        </template>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
