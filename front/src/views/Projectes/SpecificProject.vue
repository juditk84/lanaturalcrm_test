<script setup>

import { onMounted, ref} from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { useProjectesStore } from '@/stores/projectesStore'

const projectesStore = useProjectesStore();

onMounted(() => { grabSpecificProjectFromStore() })
async function grabSpecificProjectFromStore(){await projectesStore.fetchSpecificProject()}

</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton title="Projectes" main>
        This is a title
        <div v-if="!projectesStore.specificProject">
            Loading...
        </div>
        <div v-else>
            {{projectesStore.specificProject}}
        </div>
      </SectionTitleLineWithButton>
    </SectionMain>

    <SectionTitle>Custom elements</SectionTitle>

    <SectionMain>

    </SectionMain>
  </LayoutAuthenticated>
</template>


