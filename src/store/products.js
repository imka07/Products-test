import { reactive } from 'vue'

// Simple reactive store without external dependencies
const state = reactive({
  products: [
    {
      id: 1,
      name: 'Notebook Lenovo',
      description: 'Ноутбук ThinkPad T460 14"FHD',
      price: 100.0,
      qty: 2
    },
    {
      id: 2,
      name: 'Keyboard OKLICK',
      description: 'Клавиатура OKLICK 140M, USB',
      price: 50.0,
      qty: 8
    },
    {
      id: 3,
      name: 'Network adapter',
      description: 'Сетевой адаптер WiFi D-Link',
      price: 7.0,
      qty: 0
    }
  ]
})

export function useProductsStore() {
  function updateProduct(updated) {
    const index = state.products.findIndex(p => p.id === updated.id)
    if (index !== -1) {
      state.products[index] = { ...state.products[index], ...updated }
    }
  }

  return { state, updateProduct }
}


