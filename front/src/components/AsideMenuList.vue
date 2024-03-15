<script setup>
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import { onMounted, ref } from 'vue';

const props = defineProps({
  isDropdownList: Boolean,
  menu: {
    type: Array,
    required: true
  },
})


const emit = defineEmits(['menu-click'])

const menuClick = (event, item, isDropdownActive) => {
  emit('menu-click', event, item, isDropdownActive)
}

</script>

<template>
  <ul>
    <AsideMenuItem
      v-for="(item, index) in menu"
      :key="index"
      :item="item"
      :is-dropdown-list="isDropdownList"
      @menu-click="menuClick"

    />
  </ul>
</template>
