<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import axios from 'axios'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'

const form = reactive({
  username: 'john.doe',
  pass: 'highly-secure-password-fYjUw-',
  remember: true
})

const router = useRouter()

const submit = async () => {
  const credentials = {username: form.username, password: form.pass}    
   
  try {
          const { data } = await axios("api/inici/register", {
            method: "POST",
            data: credentials,
          })
          console.log(data)
          
        } catch (err) {
          return err
        }
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        Add your username and password pleeeeeeeease
        <FormField label="User name" help="Please enter your login">
          <FormControl
            v-model="form.username"
            :icon="mdiAccount"
            name="username"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.pass"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
          
        </FormField>



        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Login" />
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
