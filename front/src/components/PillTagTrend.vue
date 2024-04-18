<script setup>
import { computed } from 'vue'
import { mdiChevronUp, mdiChevronDown, mdiAlertCircleOutline } from '@mdi/js'
import PillTag from '@/components/PillTag.vue'

const props = defineProps({
  trend: {
    type: String,
    required: true
  },
  trendType: {
    type: String,
    default: null
  },
  small: Boolean
})

const trendStyle = computed(() => {
  if (props.trendType === 'futur') {
    return {
      icon: mdiChevronUp,
      style: 'light'
    }
  }

  if (props.trendType === 'tard') {
    return {
      icon: mdiChevronDown,
      style: 'warning'
    }
  }

  if (props.trendType === 'en curs') {
    return {
      icon: mdiAlertCircleOutline,
      style: 'info'
    }
  }

  if (props.trendType === 'tancat') {
    return {
      icon: mdiAlertCircleOutline,
      style: 'white'
    }
  }
  if (props.trendType === 'pendent') {
    return {
      icon: mdiAlertCircleOutline,
      style: 'contrast'
    }
  }  

  return {
    style: 'info'
  }
})
</script>

<template>
  <PillTag :label="trend" :color="trendStyle.style" :icon="trendStyle.icon" :small="small" />
</template>
