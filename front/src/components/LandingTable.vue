<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useProjectesStore } from '@/stores/projectesStore'
import CardBoxModal from '@/components/CardBoxModal.vue'

// IMPORTANT: El que ens interessa rebre a la taula és únicament la versió "ordenada" (only a few fields,
// que sigui bonic i clicable i ya). Però volem conservar la resta de metadades perque cada row de la table
// sigui el més navegable possible. Still working on that, but it's a messy shit.

// Idealment passaria tot el jaleo a la taula i després faria MAP al template per mostrar només el que vull.
// Haven't been able to do that yet tho.

const props = defineProps({
  checkable: Boolean,
  benOrdenadet: Object
})

const userStore = useUserStore();
const projectesStore = useProjectesStore();



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

// JUDIT: this is gonna be  difficult one: whatever the row is, when you click a specific cell it should
// open a Modal with information related to the specific cell you clicked.

function onRowClick(value, element){
  console.log("row clicked!")
  console.log(`${value} in ${element.name} clicked`)
  console.log(element)
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
      <tr v-if="!props.benOrdenadet">
        <th>Loading...</th>
      </tr>
      <tr v-else>
        
        <th v-for="(value, key) in props.benOrdenadet[0]">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="element in props.benOrdenadet">
        <td v-for="value in element"><button @click="() => onRowClick(value, element)">{{ value }}</button></td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">

  </div>
</template>