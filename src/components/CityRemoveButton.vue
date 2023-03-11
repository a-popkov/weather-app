<template>
  <!-- Удалить город -->
  <div
    @click="removeCity"
    class="flex items-center gap-2 py-2 text-black text-sm dark:text-white cursor-pointer duration-150 hover:text-[#d00] dark:hover:text-[#fc3f1d]"
  >
    <i class="fa-regular fa-trash-can"></i>
    <p class="hidden sm:inline-flex">Удалить город</p>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()

const router = useRouter()
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem('savedCities'))
  const updatedCities = cities.filter(city => city.id !== route.query.id)
  localStorage.setItem('savedCities', JSON.stringify(updatedCities))
  router.push({
    name: 'home'
  })
}
</script>
