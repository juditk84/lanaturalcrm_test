<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import CardBox from '@/components/CardBox.vue'
import LandingTable from '@/components/LandingTable.vue'
import ModalForTechnicalNotes from '@/components/ModalForTechnicalNotes.vue'

const route = useRoute();
const userStore = useUserStore()

const tableContent = ref(null);

const modalIsVisible = ref(false)
const modalButtonName = ref("")

function showModal(event){
  if(event){
    modalButtonName.value = event.target.name
  }
  console.log(modalButtonName.value)
  modalIsVisible.value = !modalIsVisible.value
  console.log(modalIsVisible.value)
}

onMounted(() => { grabContentFromStoreBasedOnRoute()})
watch(route, () => { grabContentFromStoreBasedOnRoute() })

// this is for user related items only depending on the route and grabbed from the mainStore:
async function grabContentFromStoreBasedOnRoute(){
  
  if(route.params.asideMenuCategoria === "global"){
    // en funció de la ruta, fas fetch a un store o a un altre
    userStore.notDevelopedYetHahaha ? tableContent.value = userStore.notDevelopedYetHahaha : tableContent.value = userStore.emptyPlaceholder
  }
  else if(route.params.asideMenuCategoria === "user"){
    userStore.notDevelopedYetHahaha ? tableContent.value = userStore.notDevelopedYetHahaha : tableContent.value = userStore.emptyPlaceholder
  }
  else if(route.params.asideMenuCategoria === "xarxa"){
    userStore.notDevelopedYetHahaha ? tableContent.value = userStore.notDevelopedYetHahaha : tableContent.value = userStore.emptyPlaceholder
  }
  else if(route.params.asideMenuCategoria === "projectes"){  // this is the one that works for now jsjsjsj
    await userStore.fetchAllUserRelatedAssets() // hauria de ser a projectsStore.blablabla
    tableContent.value = userStore.allUserProjects
  }
  else if(route.params.asideMenuCategoria === "reunions"){
    userStore.notDevelopedYetHahaha ? tableContent.value = userStore.notDevelopedYetHahaha : tableContent.value = userStore.emptyPlaceholder
  }
}

</script>

<template>
  <LayoutAuthenticated>
    
    <SectionMain class="h-fit">
      <ModalForTechnicalNotes :modal-is-visible="modalIsVisible" :modal-button-name="modalButtonName" @show-modal="showModal"/>
      <h3 class="text-center">{{ route.params.asideMenuCategoria.toUpperCase() }} LANDING VIEW</h3>
      <CardBox class="h-1/3">
        <LandingTable :table-content="tableContent"/>
        <button name="landing_list" 
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                @click="showModal" >Technical Notes
        </button>
      </CardBox>

      <div class="grid grid-cols-2 gap-4 h-1/3">

        <CardBox><br><br><br>Temes pendents.<br><br><br></CardBox>
        <CardBox><br><br><br>Calendari/Timeline.<br><br><br></CardBox>

      </div>

      <div class="grid grid-cols-2 gap-4 h-1/3">

<CardBox><br><br><br>Llista resum amb els 3-5 items tancats més recentment.<br><br><br></CardBox>
<CardBox><br><br><br>Log d' activitat de usuaries.<br><br><br></CardBox>

</div>


    </SectionMain>


  </LayoutAuthenticated>
</template>
