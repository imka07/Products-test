<template>
  <div>
    <LoginForm v-if="!isAuthenticated" :key="loginFormKey" @login-success="onLoginSuccess" />
    <MainWindow v-else @logout="logout" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import MainWindow from './components/MainWindow.vue'

const isAuthenticated = ref(false)
const loginFormKey = ref(0)

function logout() {
  isAuthenticated.value = false
  loginFormKey.value++
}

function onLoginSuccess() {
  isAuthenticated.value = true
}
</script>
