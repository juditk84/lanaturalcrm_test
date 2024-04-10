<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { mdiConsoleNetworkOutline, mdiMinus, mdiPlus } from '@mdi/js'
import { getButtonColor } from '@/colors.js'
import BaseIcon from '@/components/BaseIcon.vue'
import AsideMenuList from '@/components/AsideMenuList.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  activeItemLabel: String
})

const route = useRoute();

const isDropdownActive = computed(() => {

  if(hasDropdown && props.item.label && route.params.asideMenuCategoria){
    if(route.params.asideMenuCategoria.toUpperCase() === props.item.label.toUpperCase() ){
      return true
    }
    return false
  }

})

const emit = defineEmits(['menu-click'])

const hasColor = computed(() => props.item && props.item.color)

const asideMenuItemActiveStyle = computed(() =>
  hasColor.value ? '' : 'aside-menu-item-active font-bold'
)

const componentClass = computed(() => [
  props.isDropdownList ? 'py-3 px-6 text-sm' : 'py-3',
  hasColor.value
    ? getButtonColor(props.item.color, false, true)
    : `aside-menu-item dark:text-slate-300 dark:hover:text-white`
])

const hasDropdown = computed(() => !!props.item.menu)

const menuClick = (event) => {
  emit('menu-click', event, props.item)
}
</script>

<template>
  <li>
    <component
      :is="item.to ? RouterLink : 'a'"
      v-slot="vSlot"
      :to="item.to ?? null"
      :href="item.href ?? null"
      :target="item.target ?? null"
      class="flex cursor-pointer"
      :class="componentClass"
      :menu-click="menuClick"
      @click="menuClick"
    >
      <BaseIcon
        v-if="item.icon"
        :path="item.icon"
        class="flex-none"
        :class="[vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : '']"
        w="w-16"
        :size="18"
      />
      <span
        class="grow text-ellipsis line-clamp-1"
        :class="[
          { 'pr-12': !hasDropdown },
          vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : ''
        ]"
        >{{ item.label }}</span
      >
      <BaseIcon
        v-if="hasDropdown"
        :path="isDropdownActive ? mdiMinus : mdiPlus"
        class="flex-none"
        :class="[vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : '']"
        w="w-12"
      />
    </component>
    <AsideMenuList
      v-if="hasDropdown"
      :menu="item.menu"
      :class="['aside-menu-dropdown', isDropdownActive ? 'block dark:bg-slate-800/50' : 'hidden']"
    />
  </li>
</template>
