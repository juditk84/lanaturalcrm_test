<script setup>
import { mdiPlus } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import NumberDynamic from '@/components/NumberDynamic.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import PillTagTrend from '@/components/PillTagTrend.vue'
import BaseButton from '@/components/BaseButton.vue'

defineProps({
  number: {
    type: Number,
    default: 0
  },
  icon: {
    type: String,
    default: null
  },
  prefix: {
    type: String,
    default: null
  },
  suffix: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: null
  },
  trend: {
    type: String,
    default: null
  },
  trendType: {
    type: String,
    default: null
  }, 
  date: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: null
  }, 
  title: {
    type: String,
    default: null
  }
})


</script>

<template>
  <CardBox class="bg-yellow">
    <BaseLevel v-if="trend" class="mb-3" mobile>
      <PillTagTrend :trend="trend" :trend-type="trendType" small />
      <BaseButton :icon="mdiPlus" icon-w="w-4" icon-h="h-4" color="lightDark" small/>
    </BaseLevel>
    <!-- <BaseLevel mobile> -->
      <div>
        <h1> {{ title }}</h1>
        <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400 overflow-auto">
          {{ label }}
        </h3>
        <div class="bottom">
          <h6> {{ date }}</h6>
        </div>
       


      </div>
      <BaseIcon v-if="icon" :path="icon" size="48" w="" h="h-16" :class="color" />
    <!-- </BaseLevel> -->
  </CardBox>
</template>
