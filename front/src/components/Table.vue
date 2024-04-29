<script setup>
import { computed, ref } from 'vue'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import SectionMain from '@/components/SectionMain.vue'
import { useRouter } from 'vue-router'
import shortUUID from 'short-uuid'

const props = defineProps({
  checkable: Boolean,
  content: Object,
  tableCategory: String,
  tableContent: Object,
  tableHeaders: Array,
  tableTitle: String,
  hasFilter: Boolean
})

const router = useRouter()
const minifier = shortUUID()

const items = computed(() => props?.tableContent)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(5)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(() =>
  items.value && items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => items.value && Math.ceil(items.value.length / perPage.value))

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

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id)
  }
}

function onRowClick(event, index){
  router.push(`/${props.tableCategory}/${minifier.fromUUID(props.content[index].id)}`)
  }

const setClassIfTransactions = (element) => {

      if(element.import){
        if(element.import >= 0){
          return '!bg-lime-200 hover:!bg-lime-300'
        }
        return '!bg-rose-200 hover:!bg-rose-300'
      }
      return ''
}

const activeSortColumn = ref(null)

function sortTheList(event, headerBinder){

  // it needs styling to show the little arrow next to the word, marking what field we sortin'
  // de moment simplement apareix un cutre asterisco.

  if(activeSortColumn.value !== headerBinder){
    items.value.sort((item1, itemNext) => typeof item1[headerBinder] === 'string' 
                                          ? item1[headerBinder].localeCompare(itemNext[headerBinder]) 
                                          : itemNext[headerBinder] - item1[headerBinder])
                                          
    activeSortColumn.value = headerBinder;
  }
  else{
    items.value.reverse()
    console.log("reversing")
  }

  
}

</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <SectionMain v-if="props.content?.length !== 0">
    <b>{{ props.tableTitle }}</b>
  <table>
    <thead>
      <tr>
        <th v-for="header in props.tableHeaders" @click="(event) => sortTheList(event, header.binder)">{{ activeSortColumn === header.binder ? header.label + "*" : header.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="element, index in itemsPaginated" :key="index" :class="setClassIfTransactions(element)">
        
        <td v-for="subelement in element">{{ subelement }}</td>

        <td class="before:hidden lg:w-1 whitespace-nowrap">
          
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="info" :icon="mdiEye" small @click="(event) => onRowClick(event, index)" />
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
</SectionMain>
<SectionMain v-else>
  <div class="text-center text-xl font-light">Sense {{ props.tableTitle }}.</div>
</SectionMain>
</template>
