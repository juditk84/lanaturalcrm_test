<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiGithub,
  mdiChartPie,
mdiChartLineVariant
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
import { parse, format } from '@formkit/tempo'
import DashboardProjects from './DashboardProjects.vue'



const userStore = useUserStore();


const fillData = () => {

}

onMounted(() => {
  fillData()
})

async function printUser() {
  console.log(userStore.user)
  for (const el of userStore.user.Tasks) {
    console.log(format(el.deadline, "full", "ca"))
  }
}


</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      
      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Upcoming tasques" main>
        <button @click="printUser">{{ `${userStore.user?.username}, fes-me clic i et diré qui ets...`}}</button>
          <BaseButton
            to="/projectes/tots"
            target="_blank"
            :icon="mdiChartLineVariant"
            label="Veure més"
            color="contrast"
            rounded-full
            small
          />
      </SectionTitleLineWithButton>
      
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
        <CardBoxWidget v-for="task in userStore.user?.Tasks"
          :trend= "task.status"
          :trend-type="task.status"
          :trendType="task.status"
          :date="task.deadline"
          :label="task.description"
          :title="task.title"
        />

      </div>

      <div> 
        <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Els teus projectes" main>
          <!-- <BaseButton
          to="TOBEDEFINED"
          target="_blank"
          :icon="mdiChartLineVariant"
          label="Veure més"
          color="contrast"
          rounded-full
          small
        /> -->
        
        </SectionTitleLineWithButton>
        <DashboardProjects/>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col justify-between">
          <!-- <CardBoxTransaction
            v-for="(transaction, index) in transactionBarItems"
            :key="index"
            :amount="transaction.amount"
            :date="transaction.date"
            :business="transaction.business"
            :type="transaction.type"
            :name="transaction.name"
            :account="transaction.account"
          /> -->
        </div>
        <!-- <div class="flex flex-col justify-between">
          <CardBoxClient
            v-for="client in clientBarItems"
            :key="client.id"
            :name="client.name"
            :login="client.login"
            :date="client.created"
            :progress="client.progress"
          />
        </div> -->
      </div>

    </SectionMain>
  </LayoutAuthenticated>
</template>