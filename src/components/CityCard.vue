<template>
  <div
    class="flex py-2 sm:py-6 px-3 shadow-md cursor-pointer rounded sm:rounded-xl my-2 bg-white dark:bg-[#161617]"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-xl sm:text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>

    <div class="flex flex-col gap-2">
      <p class="text-xl sm:text-3xl self-end">
        {{ Math.round(city.weather.main.temp) }}&deg;
      </p>
      <div class="flex gap-2">
        <span class="text-[10px] sm:text-xs">
          Д:
          {{ Math.round(city.weather.main.temp_max) }}&deg;
        </span>
        <span class="text-[10px] sm:text-xs">
          Н:
          {{ Math.round(city.weather.main.temp_min) }}&deg;
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {}
  }
})
</script>
