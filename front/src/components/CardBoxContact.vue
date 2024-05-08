<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { mdiTrendingDown, mdiTrendingUp, mdiTrendingNeutral } from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import shortUUID from 'short-uuid'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: null
  },
  memberId: {
    type: String,
    default: null
  },
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

function navigateToMember(){
  router.push({ path: `/xarxa/${minifier.fromUUID(props.memberId)}` })
}
</script>

<template>
  <CardBox class="mb-6 last:mb-0 bg-blue-100 hover:bg-blue-200">
    <BaseLevel>
      <BaseLevel type="justify-start">
        <!-- <UserAvatar class="w-12 h-12 mr-6" :username="name" /> -->
        <div class="text-center md:text-left overflow-hidden">
          <h4 class="text-xl text-ellipsis">
            {{ name }}
          </h4>
          <p class="text-gray-500 dark:text-slate-400">{{ phoneNumber }}</p>
          <p class="text-gray-500 dark:text-slate-400">{{ mail }}</p>
        </div>
      </BaseLevel>
      <a v-bind:href="'mailto:' + mail">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
      </a>
      <button @click=navigateToMember>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
        </svg>
      </button>
    </BaseLevel>
  </CardBox>
</template>
