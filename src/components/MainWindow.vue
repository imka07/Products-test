<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Top bar -->
    <div class="w-full flex items-center justify-between px-4 py-3 shadow-sm" :style="{ backgroundColor: brandBlue, color: 'white' }">
      <div class="flex items-center gap-5">
        <h1 class="text-2xl font-semibold">Учет товаров</h1>
        <button
          class="px-4 py-2 rounded-md font-medium border transition-colors"
          :style="{ backgroundColor: 'white', color: brandBlue, borderColor: 'white' }"
          @click="openProductsTab"
        >
          Товары
        </button>
      </div>
      <button
        class="px-4 py-2 rounded-md font-medium border transition-colors"
        :style="{ backgroundColor: pink, color: 'white', borderColor: pink }"
        @click="onLogout"
      >
        Выход
      </button>
    </div>

    <!-- Tabs header -->
    <div class="px-4 pt-4">
      <div class="flex flex-wrap gap-2 border-b border-gray-200">
        <template v-for="tab in tabs" :key="tab.id">
          <button
            class="px-3 py-2 rounded-t-md text-sm font-medium"
            :class="tab.id === activeTabId ? 'shadow-sm' : ''"
            :style="tab.id === activeTabId ? activeTabStyle : inactiveTabStyle"
            @click="activeTabId = tab.id"
          >
            {{ tab.title }}
          </button>
        </template>
      </div>
    </div>

    <!-- Tabs content area -->
    <div class="flex-1 p-4">
      <div v-if="tabs.length === 0" class="text-gray-500 text-sm">
        Нажмите «Товары», чтобы открыть вкладку со списком товаров
      </div>
      <template v-for="tab in tabs" :key="'content-' + tab.id">
        <div v-show="tab.id === activeTabId" class="border border-gray-200 rounded-md overflow-hidden">
          <div class="px-4 py-3" :style="{ backgroundColor: brandBlue, color: 'white' }">
            <h2 class="text-lg font-semibold">Список товаров</h2>
          </div>
          <div class="p-0 bg-white">
            <ProductsTab />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ProductsTab from './ProductsTab.vue'

const emit = defineEmits(['logout'])

const brandBlue = '#6495ED'
const pink = '#DD80CC'

const tabs = ref([])
const activeTabId = ref(null)
let nextId = 1

const activeTabStyle = computed(() => ({
  backgroundColor: 'white',
  color: brandBlue,
  border: `1px solid ${brandBlue}`,
  borderBottomColor: 'white'
}))

const inactiveTabStyle = computed(() => ({
  backgroundColor: pink,
  color: 'white',
  border: `1px solid ${pink}`
}))

function openProductsTab() {
  const id = nextId++
  tabs.value.push({ id, title: `Товары ${id}` })
  activeTabId.value = id
}

function onLogout() {
  emit('logout')
}
</script>

<style scoped>
</style>


