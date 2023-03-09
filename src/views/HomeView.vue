<template>
  <main class="container text-black dark:text-white">
    <div class="flax flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <p>Загрузка...</p>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import CityList from '../components/CityList.vue'
</script>
