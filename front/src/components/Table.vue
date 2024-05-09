<script setup>
import { computed, onMounted, ref } from 'vue'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import SectionMain from '@/components/SectionMain.vue'
import { useRoute, useRouter } from 'vue-router'
import shortUUID from 'short-uuid'
import {format, parse} from '@formkit/tempo'

const props = defineProps({
  checkable: Boolean,
  content: Object,
  tableCategory: String,
  tableContent: Object,
  tableHeaders: Array,
  tableTitle: String,
  hasFilter: Boolean,
  itemsPerPage: Number,
  parentCategory: String
})

const router = useRouter()
const route = useRoute()
const minifier = shortUUID()

const items = computed(() => props?.tableContent)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const perPage = ref(props.itemsPerPage)

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

  // Judit:
  // tricky one... after a lot of different options, the most reliable way to do this without hardcoding anything is
  // to asume that """parent""" routes have no url params (like xarxa/totis or projectes/totis)
  // and therefore the route.params object will be empty. If there's a table in a route like xarxa/totis with no params,
  // the """parent""" route is not to be appended with the sub-route. 
  // If you're in a page that you reached with url params (like projectes/:project_id), then you have something in the
  // route.params object. Since objects are not iterable the way arrays are, to know if there's one or more key-value pairs in
  // an object I have to declare a count and loop through the object. Since projectes/:project_id route has 1 route.param,
  // the count will be higher than 0 and then the sub-route will be appended (or the main route kept if u prefer). 
  // it makes sense to do it like that for now because of our table structure so far, but we'll have to review this in the future.
  
  let count = 0;

  for(const key in route.params){
    count++
  }

  router.push(`${count > 0 ? route.path : ''}/${props.tableCategory}/${minifier.fromUUID(props.content[index].id)}`)
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

function sortTheList(headerBinder){

  // it needs styling to show the little arrow next to the word, marking what field we sortin'
  // de moment simplement apareix un cutre asterisco.

  if(activeSortColumn.value !== headerBinder){
    items.value.sort((item1, itemNext) => {if(typeof item1[headerBinder] === 'string'){
                                            return item1[headerBinder].localeCompare(itemNext[headerBinder])
                                          }
                                          else if(typeof item1[headerBinder] === 'object' && item1[headerBinder].isDate === true){
                                            return item1[headerBinder].content.localeCompare(itemNext[headerBinder].content)
                                          }
                                          else{
                                            return itemNext[headerBinder] - item1[headerBinder]
                                          }
                                        })
                                
    activeSortColumn.value = headerBinder;
    console.log("sorting")
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
        <th v-for="header in props.tableHeaders" @click="sortTheList(header.binder)">{{ activeSortColumn === header.binder ? header.label + "*" : header.label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tableRow, index in itemsPaginated" :key="index" :class="setClassIfTransactions(tableRow)">
        
      <td v-for="rowCell in tableRow">{{ typeof rowCell === "object" ? format(rowCell.content, "full", "ca") : rowCell }}</td>

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
