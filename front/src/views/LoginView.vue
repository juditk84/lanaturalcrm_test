<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk } from '@mdi/js'
import { useAuthStore } from '@/stores/authStore'
import { useMainStore } from '@/stores/main'
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
  login: 'Judit',
  pass: 'Judit',
  remember: true
})

const router = useRouter()
let authStore = useAuthStore()
let mainStore = useMainStore()

const submit = async (event) => {

  const credentials = {username: form.login, password: form.pass}

  // if(event.submitter.innerText === "Login"){
    try {
      // const { data } = await axios("api/inici/login", {
      //   method: "POST",
      //   body: credentials,
      // })
      // document.cookie = "Token=" + data.token + ";httponly";
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("username", form.login);
      authStore.login(credentials);
      // mainStore.fetchAllUserRelatedAssets();
      // router.push('/dashboard')
      // console.log("line 42")
    } catch (error) {
      console.log(error);
    }
  // }
  // else if(event.submitter.innerText === "Register"){
  //   try {
  //         const { data } = await axios("api/inici/register", {
  //           method: "POST",
  //           data: credentials,
  //         })
  //         console.log(data)
          
  //       } catch (err) {
  //         return err
  //       }
  // }
   
    
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
