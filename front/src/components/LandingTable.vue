<script setup>
import { computed, ref, watch, watchEffect, onBeforeMount, onUpdated, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMainStore } from '@/stores/main'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import axios from 'axios'

defineProps({
  checkable: Boolean
})

const mainStore = useMainStore()

const tableContent = ref(null);

const route = useRoute();

onMounted(() => { grabContentFromStoreBasedOnRoute()})
watch(route, () => { grabContentFromStoreBasedOnRoute() })

// this is for user related items only depending on the route and grabbed from the mainStore:
async function grabContentFromStoreBasedOnRoute(){
  
  await mainStore.fetchAllUserRelatedAssets()

  if(route.params.asideMenuCategoria === "global"){
    mainStore.notDevelopedYetHahaha ? tableContent.value = mainStore.notDevelopedYetHahaha : tableContent.value = mainStore.emptyPlaceholder
  }
  else if(route.params.asideMenuCategoria === "user"){
    mainStore.notDevelopedYetHahaha ? tableContent.value = mainStore.notDevelopedYetHahaha : tableContent.value = mainStore.emptyPlaceholder
  }
  else if(route.params.asideMenuCategoria === "xarxa"){
    mainStore.notDevelopedYetHahaha ? tableContent.value = mainStore.notDevelopedYetHahaha : tableContent.value = mainStore.emptyPlaceholder
  }
  else if(route.params.asideMenuCategoria === "projectes"){  // this is the one that works for now jsjsjsj
    tableContent.value  = mainStore.allUserProjects 
  }
  else if(route.params.asideMenuCategoria === "reunions"){
    mainStore.notDevelopedYetHahaha ? tableContent.value = mainStore.notDevelopedYetHahaha : tableContent.value = mainStore.emptyPlaceholder
  }
}

//the "items" logic is deprecated, we're gonna use the above approach. We need to adapt the pagination logic to this.
const items = computed(() => mainStore.emptyPlaceholder)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(5)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(() =>
  items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

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
      <tr v-if="!tableContent">
        <th>Loading...</th>
      </tr>
      <tr v-else>
        <th v-for="(value, key) in tableContent[0]">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="element in tableContent" @click="onRowClick">
        <td v-for="value in element"> {{ value }}</td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>