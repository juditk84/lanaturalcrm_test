<script setup>
import { computed, ref, watch, watchEffect, onBeforeMount, onUpdated, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import axios from 'axios'

const props = defineProps({
  checkable: Boolean,
  tableContent: Object
})

const userStore = useUserStore()


//the "items" logic is deprecated, we're gonna use the above approach. We need to adapt the pagination logic to this.
// const items = computed(() => userStore.emptyPlaceholder). 

// JUDIT: I changed a few things in the template that make the pagination useless (no base button for example).
// If we want to go with pagination (I think we do) it needs to be fixed.

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

// const perPage = ref(5)

// const currentPage = ref(0)

// const checkedRows = ref([])

// const itemsPaginated = computed(() =>
//   items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
// )

// const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

// const currentPageHuman = computed(() => currentPage.value + 1)

// const pagesList = computed(() => {
//   const pagesList = []

//   for (let i = 0; i < numPages.value; i++) {
//     pagesList.push(i)
//   }

//   return pagesList
// })

// const remove = (arr, cb) => {
//   const newArr = []

//   arr.forEach((item) => {
//     if (!cb(item)) {
//       newArr.push(item)
//     }
//   })

//   return newArr
// }

function onRowClick(){
  console.log("row clicked!")
  isModalActive.value = true;
}

</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <b>Aquest modal hauria de mostrar dades bàsiques d'alló clicat.</b> <br>
      
    <p>MIND YOU potser ens cal refactor the modal content, sí? <br>
    Hi ha un slot al component pensat per conditionally rendering stuff.</p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>
  <div>

   Selecciona el tipus de membres que vols visualitzar: <select name="categoria_membre" id="">

      <option value="entitat">entitats</option>
      <option value="contacte">contactes</option>

    </select>

  </div>
  <table>
    <thead>
      <tr v-if="!props.tableContent">
        <th>Loading...</th>
      </tr>
      <tr v-else>
        <th v-for="(value, key) in props.tableContent[0]">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="element in props.tableContent" @click="onRowClick">
        <td v-for="value in element"> {{ value }}</td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">

  </div>
</template>