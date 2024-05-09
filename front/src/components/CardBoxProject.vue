<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import shortUUID, { uuid } from 'short-uuid'
import { mdiTrendingDown, mdiTrendingUp, mdiTrendingNeutral } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import {format, parse} from '@formkit/tempo'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  workerName: {
    type: String,
    required: true
  },
  projectType: {
    type: String,
    default: null
  },
  progress: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    default: null
  },
  projectId: {
    type: String,
    default: null
  }
})

const router = useRouter();
const minifier = shortUUID();

const pillType = computed(() => {
  if (props.type) {
    return props.type
  }

  if (props.progress) {
    if (props.progress >= 60) {
      return 'success'
    }
    if (props.progress >= 40) {
      return 'warning'
    }

    return 'danger'
  }

  return 'info'
})

const pillIcon = computed(() => {
  return {
    success: mdiTrendingUp,
    warning: mdiTrendingNeutral,
    danger: mdiTrendingDown,
    info: null
  }[pillType.value]
})

const pillText = computed(() => props.text ?? `${props.progress}%`)

const formattedStartDate = computed(() => format(props.startDate, "medium", "ca"))

function navigateToProject(){
  router.push({ path: `/projectes/${minifier.fromUUID(props.projectId)}` })
}

</script>

<template>
  <CardBox background="bg-green-100 hover:bg-green-200">
    <BaseLevel>
      <BaseLevel type="justify-start">
        <!-- <UserAvatar class="w-12 h-12 mr-6" :username="name" /> -->
        <div class="text-center md:text-left overflow-hidden">
          <h4 class="text-xl text-ellipsis">
            {{ name }}
          </h4>
          <p class="text-gray-800 dark:text-slate-600">data creació</p>
          <p class="text-gray-500 dark:text-slate-400">{{ formattedStartDate }}</p>
          <p class="text-gray-800 dark:text-slate-400">creat per</p>
          <p class="text-gray-500 dark:text-slate-400">{{ workerName }}</p>
        </div>
      </BaseLevel>
      <button @click=navigateToProject>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
        </svg>
      </button>
    </BaseLevel>
  </CardBox>
</template>
