<script setup>
import { computed, onMounted, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { useProjectesStore } from '@/stores/projectesStore'
import { useMemberStore } from '@/stores/memberStore'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'

// IMPORTANT: En aquest exemple, estem fent que tota la fila sigui clicable, just to play around and see
// what option suits us better. 

const mainStore = useMainStore();
const memberStore = useMemberStore();

const activeMember = ref();

const items = computed(() => mainStore.sampleProjectes)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

// I erased all the pagination logic; it's in TableAllProjectes si volem. 

function onRowClick(member){
  console.log("row clicked!")
  isModalActive.value = true;
  activeMember.value = member
  console.log(activeMember.value)
}

</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Projecte">
    <div v-if="activeMember">
      <b>Nom: {{ activeMember.nom }}</b> <br>
      <b>Adreça: {{ activeMember.adreça }}</b> <br>
      <b>Ciutat: {{ activeMember.ciutat }}</b> <br>
    </div>
    <div v-else>
      empty modal.
    </div>
   
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <table class="table-auto">
    <thead>
      <tr v-if="!memberStore.allMembers">
        <th>Loading...</th>
      </tr>
      <tr v-else>
        <th>Nom</th>
        <th>Adreça</th>
        <th>Ciutat</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="member in memberStore.allMembers" @click="() => onRowClick(member)" >
        <td v-for="value in member">{{ value }}</td>
      </tr>
    </tbody>
  </table>

  <!-- <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>Nom</th>
        <th>Responsable</th>
        <th>Client</th>
        <th>Progress</th>
        <th>Created</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="projecte in itemsPaginated" :key="projecte.id">
        <TableCheckboxCell v-if="checkable" @checked="checked($event, projecte)" />
        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar :username="projecte.nom" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
        </td>
        <td data-label="Name">
          {{ projecte.nom }}
        </td>
        <td data-label="Company">
          {{ projecte.responsable }}
        </td>
        <td data-label="Client">
          {{ projecte.client }}
        </td>
        <td data-label="Progress" class="lg:w-32">
          <progress class="flex w-2/5 self-center lg:w-full" max="100" :value="projecte.progress">
            {{ projecte.progress }}
          </progress>
        </td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400" :title="projecte.created">{{
            projecte.created
          }}</small>
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="info" :icon="mdiEye" small @click="isModalActive = true" />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="isModalDangerActive = true"
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table> -->
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <!-- <BaseButtons> -->
        <!-- <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons> -->
      <!-- <small>Page {{ currentPageHuman }} of {{ numPages }}</small> -->
    </BaseLevel>
  </div>
</template>
