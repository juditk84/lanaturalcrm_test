<script setup>
import AsideMenuItem from '@/components/AsideMenuItem.vue'
import { onMounted, ref } from 'vue';

const props = defineProps({
  isDropdownList: Boolean,
  activeItemLabel: String,
  menu: {
    type: Array,
    required: true
  },
})


const emit = defineEmits(['menu-click'])

const menuClick = (event, item) => {
  emit('menu-click', event, item)
}

</script>

<template>
  <ul>
    <AsideMenuItem
      v-for="(item, index) in menu"
      :key="index"
      :item="item"
      :is-dropdown-list="isDropdownList"
      :active-item-label="activeItemLabel"
      @menu-click="menuClick"

    />
  </ul>
</template>
