<template>
  <div
    class="relative hidden items-center justify-end gap-3 ml-auto w-full max-w-[400px] sm:flex"
  >
    <i
      class="fa-sharp fa-solid fa-magnifying-glass absolute right-4 text-gray-400"
    ></i>

    <input
      v-model="searchQuery"
      @input="getSearchResults"
      type="text"
      placeholder="Город или район"
      class="py-2 pl-3 pr-12 w-full bg-[#eceef2] rounded-md focus:outline-none dark:text-black"
    />
    <ul
      v-if="mapboxSearchResults"
      class="absolute mobile:bg-[#161617] bg-white dark:bg-[#eceef2] text-black w-full py-2 px-1 top-[56px]"
    >
      <p
        v-if="searchError"
        class="py-2 pl-3 text-[14px] leading-4 text-red-500"
      >
        Извините, что-то пошло не&nbsp;так, пожалуйста попробуйте еще раз.
      </p>
      <p
        v-if="!serverError && mapboxSearchResults.length === 0"
        class="py-2 pl-3 text-[14px] leading-4 text-red-500"
      >
        Результаты не&nbsp;соответствуют запросу, попробуйте другой термин.
      </p>
      <template v-else>
        <li
          v-for="searchResult in mapboxSearchResults"
          :key="searchResult.id"
          class="py-2 pl-3 cursor-pointer"
          @click="previewCity(searchResult)"
        >
          {{ searchResult.place_name }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const previewCity = searchResult => {
  console.log(searchResult)
  const [city, state] = searchResult.place_name.split(',')
  router.push({
    name: 'cityView',
    params: { state: state.replaceAll(' ', ''), city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true
    }
  })
}

const mapboxAPIKey =
  'pk.eyJ1Ijoiam9obmtvbWFybmlja2kiLCJhIjoiY2t5NjFzODZvMHJkaDJ1bWx6OGVieGxreSJ9.IpojdT3U3NENknF6_WhR2Q'
const searchQuery = ref('')
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)
const searchError = ref(null)

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(`
          https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place
        `)
        mapboxSearchResults.value = result.data.features
      } catch {
        searchError.value = true
      }
      return
    }
    mapboxSearchResults.value = null
  }, 300)
}
</script>
