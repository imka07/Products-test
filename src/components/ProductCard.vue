<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/40" @click="onCancel"></div>
    <div class="relative w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="px-6 py-4" :style="{ backgroundColor: brandBlue, color: 'white' }">
        <h3 class="text-xl font-semibold">Карточка товара: {{ product.name }}</h3>
      </div>

      <div class="p-6 space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-[200px_auto] gap-4 items-center">
          <div class="text-gray-600">ID:</div>
          <div>{{ product.id }}</div>

          <div class="text-gray-600">Наименование:</div>
          <div>{{ product.description }}</div>

          <div class="text-gray-600">Цена:</div>
          <div>
            <input
              v-model="priceInput"
              type="number"
              step="0.01"
              min="0"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2"
              :style="inputFocusStyle"
            />
            <p v-if="priceError" class="text-red-600 text-xs mt-1">{{ priceError }}</p>
          </div>

          <div class="text-gray-600">Кол-во:</div>
          <div>
            <input
              v-model="qtyInput"
              type="number"
              step="1"
              min="0"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2"
              :style="inputFocusStyle"
            />
            <p v-if="qtyError" class="text-red-600 text-xs mt-1">{{ qtyError }}</p>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 flex justify-end gap-3 border-t bg-gray-50">
        <button
          class="px-4 py-2 rounded-md text-white"
          :style="{ backgroundColor: brandBlue }"
          @click="onSave"
          :disabled="!isValid"
        >
          Сохранить
        </button>
        <button
          class="px-4 py-2 rounded-md text-white"
          :style="{ backgroundColor: pink }"
          @click="onCancel"
        >
          Отмена
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const brandBlue = '#6495ED'
const pink = '#DD80CC'

const props = defineProps({
  product: { type: Object, required: true }
})

const emit = defineEmits(['save', 'cancel'])

const priceInput = ref(String(props.product.price))
const qtyInput = ref(String(props.product.qty))

watch(
  () => props.product,
  (p) => {
    priceInput.value = String(p.price)
    qtyInput.value = String(p.qty)
  }
)

const inputFocusStyle = computed(() => ({ '--tw-ring-color': brandBlue }))

const priceError = ref('')
const qtyError = ref('')

const isValid = computed(() => {
  priceError.value = ''
  qtyError.value = ''
  const price = Number(priceInput.value)
  const qty = Number(qtyInput.value)
  const priceValid = !Number.isNaN(price) && price >= 0
  const qtyValid = Number.isInteger(qty) && qty >= 0
  if (!priceValid) priceError.value = 'Цена должна быть неотрицательным числом'
  if (!qtyValid) qtyError.value = 'Кол-во должно быть неотрицательным целым'
  return priceValid && qtyValid
})

function onCancel() {
  emit('cancel')
}

function onSave() {
  if (!isValid.value) return
  const price = Number(priceInput.value)
  const qty = Number(qtyInput.value)
  const changed = price !== props.product.price || qty !== props.product.qty
  if (changed) {
    // Simple message; could be replaced with a nicer UI toast
    alert('Есть изменённые данные. Сохраняем...')
  }
  emit('save', { ...props.product, price, qty })
}
</script>

<style scoped>
</style>


