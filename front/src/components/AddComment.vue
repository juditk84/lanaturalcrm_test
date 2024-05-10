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
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const props = defineProps({
  commentableId : {
    type: String, 
    required: true
  },
})

const isModalActive = ref(false)

const userStore = useUserStore();

const message = ref("")

const form = ref({
  title: '',
  text: '',
  commentableId: props.id 
})


async function submit(){
  console.log(router)
  console.log(route)
    try {
      const response = await userStore.addComment("note", form.value)
      if (response.ok) message.value = "ha funcionat!"
    } catch (error) {
      message.value = "oops! algo ha anat malament.";
    }
}


</script>

<template>

        <CardBox form @submit.prevent="submit">
          <!-- <FormControl v-model="form.title" :icon="mdiAccount" placeholder="titól"/> -->
            <FormControl v-model="form.text" type="textarea" placeholder="escriu algo aqui oi" />
            {{ message }}
              <template #footer>
                <BaseButtons>
                  <BaseButton type="submit" rounded label="bip bip!" @click="submit"/>
              </BaseButtons>
            </template>
          </CardBox>
    
</template>
