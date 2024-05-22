<script setup>
import { ref } from 'vue'
import CardBox from '@/components/CardBox.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'


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
