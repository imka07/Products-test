<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="w-full max-w-sm border border-gray-200 rounded-lg shadow-sm p-6 bg-white">
      <h1 class="text-2xl font-semibold text-center mb-6" style="color:#6495ED;">Вход</h1>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label for="login" class="block text-sm font-medium mb-1" style="color:#6495ED;">Логин</label>
          <input
            id="login"
            v-model.trim="login"
            type="text"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2"
            :style="inputFocusStyle"
            placeholder="Введите логин"
            autocomplete="username"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium mb-1" style="color:#6495ED;">Пароль</label>
          <input
            id="password"
            v-model.trim="password"
            type="password"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2"
            :style="inputFocusStyle"
            placeholder="Введите пароль"
            autocomplete="current-password"
          />
        </div>

        <button
          type="submit"
          class="w-full text-white font-medium rounded-md px-4 py-2 transition-colors"
          :style="buttonStyle"
        >
          Вход
        </button>

        <p v-if="errorMessage" class="text-red-600 text-sm text-center">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
  
</template>

<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['login-success'])

const login = ref('')
const password = ref('')
const errorMessage = ref('')

const brandBlue = '#6495ED'

const buttonStyle = computed(() => ({
  backgroundColor: brandBlue
}))

const inputFocusStyle = computed(() => ({
  '--tw-ring-color': brandBlue
}))

function onSubmit() {
  errorMessage.value = ''
  if (login.value === 'admin' && password.value === 'padmin') {
    emit('login-success')
  } else {
    errorMessage.value = 'Неверный логин или пароль'
  }
}
</script>

<style scoped>
</style>


