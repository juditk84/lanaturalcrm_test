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

const message = ref("")

const form = ref({
  title: null,
  text: null
})

const emit = defineEmits('submit')

const handleSubmit = () => {
  emit('submit', form.value)
}

</script>

<template>

        <CardBox form @submit.prevent="handleSubmit">
            <FormControl v-model="form.text" type="textarea" placeholder="escriu algo aqui oi" />
            {{ message }}
              <template #footer>
                <BaseButtons>
                  <BaseButton type="submit" rounded label="bip bip!" @click="handleSubmit"/>
              </BaseButtons>
            </template>
          </CardBox>
    
</template>
