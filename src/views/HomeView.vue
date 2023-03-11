<template>
  <main class="container text-black dark:text-white px-1 sm:px-4">
    <div class="flax flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import CityCardSkeleton from '../components/CityCardSkeleton.vue'
import CityList from '../components/CityList.vue'
</script>
