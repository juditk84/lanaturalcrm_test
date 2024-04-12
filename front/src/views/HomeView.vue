<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie
} from '@mdi/js'
import * as chartConfig from '@/components/Charts/chart.config.js'
import LineChart from '@/components/Charts/LineChart.vue'
import SectionMain from '@/components/SectionMain.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBox from '@/components/CardBox.vue'
import TableSampleClients from '@/components/TableSampleClients.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxTransaction from '@/components/CardBoxTransaction.vue'
import CardBoxClient from '@/components/CardBoxClient.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import SectionBannerStarOnGitHub from '@/components/SectionBannerStarOnGitHub.vue'
import { useUserStore } from '@/stores/userStore'
import { useMemberStore } from '@/stores/memberStore'
import { storeToRefs } from 'pinia'


const chartData = ref(null)

const userStore = useUserStore();


const fillData = () => {

}

onMounted(() => {
  fillData()
  // console.log(pinboard)
})

// onMounted(() => { console.log(userStore) })

// watch(() => userStore.fetchAllUserAssets, () => {
//   printUser()
// })
async function printUser() {
  console.log(userStore.user)
}
// const mainStore = useMainStore()
// const clientBarItems = computed(() => mainStore.clients.slice(0, 4))

// const transactionBarItems = computed(() => mainStore.history)

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <button @click="printUser">{{ `${userStore.user?.username}, fes-me clic i et diré qui ets...`}}</button>
      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Overview" main>
        
        <BaseButton
          to="TOBEDEFINED"
          target="_blank"
          :icon="mdiGithub"
          label="Veure més"
          color="contrast"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>
      
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget v-for="task in userStore.user?.Tasks"
          :trend= "task.status"
          trend-type="up"
          :color="text-emerald-500"
          :trendType="task.title"
          :date="task.deadline"
          :label="task.description"
          :title="task.title"
        />

      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <CardBoxTransaction
            v-for="(transaction, index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          />
        </div>
        <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div>
      </div>

      <!-- <SectionBannerStarOnGitHub class="mt-6 mb-6" /> -->

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Trends overview">
        <!-- <BaseButton :icon="mdiReload" color="whiteDark" @click="fillChartData" /> -->
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Clients" />

      <NotificationBar color="info" :icon="mdiMonitorCellphone">
        <b>Responsive table.</b> Collapses on mobile
      </NotificationBar>

      <CardBox has-table>
        <TableSampleClients />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
