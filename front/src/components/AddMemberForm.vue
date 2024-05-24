<script setup>
import { reactive, ref } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub, mdiHome, mdiPhoneClassic, mdiPhone, mdiHandshakeOutline } from '@mdi/js'
import { useMemberStore } from '@/stores/memberStore'
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

let message = ref("hello")

const selectOptions = ["entity", "contact"]

const memberStore = useMemberStore();



const form = ref({
  firstname: null,
  lastname1: null,
  lastname2: null,
  commercialName1: null,
  commercialName2: null,
  pronouns: null,
  role: null,
  officialId: null,
  email: null,
  address: null,
  city: null,
  postcode: null,
  authorizationImg: false,
  phoneNumber: null,
  memberType: 'contact', 
})




const customElementsForm = reactive({
  checkbox: ['0'],
  radio: 'one',
  switch: ['one'],
  file: null
})

async function submit() {

    try {
      const response = await memberStore.addMember(form.value)
      if (response.created) message.value = `S'ha creat un nou membre: ${response.data.name}`
    } catch (error) {
      console.log(error);
    }
    console.log("submit button clicked")
}

const formStatusWithHeader = ref(true)

const formStatusCurrent = ref(0)

const formStatusOptions = ['info', 'success', 'danger', 'warning']

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0
}


</script>

<template>

    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiHandshakeOutline" title="Afegir un nou membre" main>
       
      </SectionTitleLineWithButton>
      <CardBox form @submit.prevent="submit">
        <div class="grid grid-cols-4">
          <FormField label="Selecciona el tipus de membre:">
            <FormControl v-model="form.memberType" :options="selectOptions" />
          </FormField>
        </div>

          <BaseDivider />
        <FormField v-if="form.memberType === 'contact'" label="noms, cognoms">
          <FormControl v-model="form.firstname" :icon="mdiAccount" placeholder="monti"/>
          <FormControl v-model="form.lastname1" :icon="mdiAccount" placeholder="buli"/>
          <FormControl v-model="form.lastname2" :icon="mdiAccount" placeholder="de la cruz"/>

            <FormField label="Pronoms" help="els que siguin">
                <FormControl v-model="form.pronouns"/>
            </FormField>

            <FormField label="Encárrec:" help="que fas?">
                <FormControl v-model="form.role"/>
            </FormField>

            <FormField label="dni/nie" >
                <FormControl v-model="form.officialId"/>
            </FormField>
        </FormField>
        <BaseDivider />

        <FormField v-if="form.memberType === 'entity'" label="nom">
          <FormControl v-model="form.commercialName1" :icon="mdiAccount" />
          <!-- add option to add one more name -->
            <FormField label="NIF">
                <FormControl v-model="form.officialId"/>
                </FormField>
        </FormField>
        
        <BaseDivider />
        
        <FormField label="Email">
            <FormControl v-model="form.email" type="email" :icon="mdiMail" />
        </FormField>

        <FormField label="Núm de télefon" help="Si no estàs a Spanya, no ens contactis. No pusis el codi de pais aqui, es trancara tot">
          <FormControl v-model="form.phone" type="tel" placeholder="123 456 789" :icon="mdiPhone" />
        </FormField>

        <FormField label="Adreça">
            <FormControl v-model="form.address" :icon="mdiHome" placeholder="3 carrer dels Tres Gats"/>
            <FormControl v-model="form.city" :icon="mdiHome" placeholder="Cat City"/>
            <FormControl v-model="form.postcode"  :icon="mdiHome" placeholder="80085"/>
        </FormField>

        <BaseDivider />

        <FormField label="Notes" help="que l'hi passa a aquest membre? tothom s'ho pregunta!">
          <FormControl type="textarea" placeholder="no posis res aquí. això es un agüanta places" />
        </FormField>

        <BaseDivider />
        <FormField label="Autorizatció de compartir imatges? ">
          <FormCheckRadioGroup
            v-model="form.authorizationImg"
            name="sample-radio"
            type="radio"
            :options="{ false: 'no', true: 'sí'}"
          />
        </FormField>

        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" @click="submit"/>
            <BaseButton type="reset" color="info" outline label="Reset" />
          </BaseButtons>
        </template>
      </CardBox>
  
    </SectionMain>
</template>
