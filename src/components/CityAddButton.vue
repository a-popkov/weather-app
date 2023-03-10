<template>
  <div
    @click="addCity"
    v-if="route.query.preview"
    class="flex items-center gap-2 py-2 text-black text-sm dark:text-white cursor-pointer duration-150 hover:text-[#d00] dark:hover:text-[#fc3f1d]"
  >
    <i class="fa-solid fa-plus"></i>
    <p class="hidden sm:inline-flex">Добавить в избранное</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { uid } from 'uid'
import { useRoute, useRouter } from 'vue-router'

const savedCities = ref([])
const route = useRoute()
const router = useRouter()
const addCity = () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
  }
  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng
    }
  }

  savedCities.value.push(locationObj)
  localStorage.setItem('savedCities', JSON.stringify(savedCities.value))
  let query = Object.assign({}, route.query)
  delete query.preview
  query.id = locationObj.id
  router.replace({ query })
}
</script>
