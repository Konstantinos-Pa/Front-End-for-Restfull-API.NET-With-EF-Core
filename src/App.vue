<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Layout/Header.vue'
import Footer from './components/Layout/Footer.vue'
import AiChatBubble from './components/Layout/AiChatBubble.vue'
</script>

<template>
  <Header/>
  <AiChatBubble />
  <RouterView/>
  <Footer />
</template>

<style scoped>
</style>
