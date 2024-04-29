<script setup>
import { mdiCog } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import BaseIcon from '@/components/BaseIcon.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import PillTagTrend from '@/components/PillTagTrend.vue'
import BaseButton from '@/components/BaseButton.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import SectionMain from '@/components/SectionMain.vue'

defineProps({
  title: {
    type: String,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  children: {
    type: Number,
    default: null
  },
  color: {
    type: String,
    default: null
  },
//   date: {
//     type: String,
//     default: null
//   },
})


</script>

<template>
  <CardBox>
    <BaseLevel v-if="trend" class="mb-3" mobile>
      <!-- <PillTagTrend :trend="trend" :trend-type="trendType" small /> -->
      <!-- <BaseButton :icon="mdiCog" icon-w="w-4" icon-h="h-4" color="lightDark" small /> -->
    </BaseLevel>
    <BaseLevel mobile>
      <div>
        <SectionTitle>
            {{ title }}
        </SectionTitle>
        <h3 class="text-lg leading-tight text-gray-500 dark:text-slate-400">
          {{ label }}
        </h3>
        <!-- <h6> {{ date  }}</h6> -->
        <!-- <h1 class="text-3xl leading-tight font-semibold">
          <NumberDynamic :value="number" :prefix="prefix" :suffix="suffix" />
         
        </h1> -->
      </div>
      <BaseIcon v-if="icon" :path="icon" size="48" w="" h="h-16" :class="color" />
    </BaseLevel>
  </CardBox>
</template>
