<template>
  <div
    class="flex flex-col min-h-screen font-sans dark:bg-[#434343] bg-[#eceef2]"
  >
    <TheNavigation />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import TheNavigation from './components/TheNavigation.vue'
</script>

<style lang="scss" scoped></style>
