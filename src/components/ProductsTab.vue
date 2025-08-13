<template>
  <div class="p-4">
    <!-- Filters -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label for="filterId" class="block text-sm font-medium mb-1" :style="{ color: brandBlue }">ID:</label>
        <input
          id="filterId"
          v-model.trim="filterId"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2"
          :style="inputFocusStyle"
          placeholder="Введите фильтр..."
          @keydown.enter="applyFilters"
        />
      </div>
      <div>
        <label for="filterDesc" class="block text-sm font-medium mb-1" :style="{ color: brandBlue }">Описание:</label>
        <input
          id="filterDesc"
          v-model.trim="filterDesc"
          type="text"
          class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2"
          :style="inputFocusStyle"
          placeholder="Введите фильтр..."
          @keydown.enter="applyFilters"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200">
        <thead>
          <tr class="text-left bg-gray-50">
            <th class="px-3 py-2 border-b">ID</th>
            <th class="px-3 py-2 border-b">Имя</th>
            <th class="px-3 py-2 border-b">Описание</th>
            <th class="px-3 py-2 border-b">Цена</th>
            <th class="px-3 py-2 border-b">Кол-во</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filtered" :key="p.id">
            <td class="px-3 py-2 border-t">{{ p.id }}</td>
            <td class="px-3 py-2 border-t">
              <button class="underline" :style="{ color: brandBlue }" @click="openCard(p)">{{ p.name }}</button>
            </td>
            <td class="px-3 py-2 border-t">{{ p.description }}</td>
            <td class="px-3 py-2 border-t">{{ p.price }}</td>
            <td class="px-3 py-2 border-t" :style="p.qty === 0 ? zeroQtyStyle : {}">{{ p.qty }}</td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="5" class="px-3 py-4 text-center text-gray-500">Нет данных</td>
          </tr>
        </tbody>
      </table>
    </div>

    <ProductCard
      v-if="showCard && current"
      :product="current"
      @cancel="closeCard"
      @save="saveCard"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useProductsStore } from '../store/products'
import ProductCard from './ProductCard.vue'

const brandBlue = '#6495ED'

const { state, updateProduct } = useProductsStore()

const filterId = ref('')
const filterDesc = ref('')

const zeroQtyStyle = { backgroundColor: '#FF1744', color: 'white' }

const inputFocusStyle = computed(() => ({
  '--tw-ring-color': brandBlue
}))

const filtered = ref([...state.products])
const showCard = ref(false)
const current = ref(null)

function applyFilters() {
  const idValue = filterId.value
  const descValue = filterDesc.value.toLowerCase()

  filtered.value = state.products.filter(product => {
    const idMatches = idValue === '' ? true : String(product.id) === idValue
    const descMatches = descValue === '' ? true : product.description.toLowerCase().includes(descValue)
    return idMatches && descMatches
  })
}

function openCard(product) {
  current.value = { ...product }
  showCard.value = true
}

function closeCard() {
  showCard.value = false
  current.value = null
}

function saveCard(updated) {
  updateProduct(updated)
  applyFilters()
  closeCard()
}
</script>

<style scoped>
</style>


