<script setup>
import { reactive } from 'vue'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import { useAuthStore } from '@/stores/authStore'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
// import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'

const form = reactive({
  login: 'Judit',
  pass: 'Judit',
  remember: true
})

let authStore = useAuthStore()

const submit = async (event) => {
  const credentials = {username: form.login, password: form.pass}
    try {
      authStore.handleLogin(credentials);
    } catch (error) {
      console.log(error);
    }
}

</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login" help="Please enter your login">
          <FormControl
            v-model="form.login"
            :icon="mdiAccount"
            name="login"
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
            <!-- <BaseButton type="submit" color="info" label="Register" /> -->
            <BaseButton to="/dashboard" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
