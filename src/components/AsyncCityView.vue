<template>
  <!-- Баннер "Просматриваете этот город" -->
  <div v-if="route.query.preview" class="flex justify-center px-4 pt-1">
    <p
      class="text-[10px] sm:text-[12px] text-black dark:text-[#dedede]/50 leading-3"
    >
      Вы&nbsp;сейчас просматриваете этот город, чтобы добавить его
      в&nbsp;избранное, нажмите на&nbsp;значок &laquo;+&raquo;.
    </p>
  </div>

  <div
    class="container flex items-center justify-center gap-5 rounded sm:rounded-xl my-4 bg-white dark:bg-[#161617]"
  >
    <CityAddButton />
    <CityRemoveButton />
  </div>

  <div
    class="container flex flex-col items-center justify-center rounded sm:rounded-xl my-4 bg-white dark:bg-[#161617]"
  >
    <!-- Обзор погоды -->
    <div class="flex flex-col items-center text-black py-12">
      <!-- Название города -->
      <h1 class="text-2xl mb-2 text-black dark:text-white">
        {{ route.params.city }}
      </h1>
      <!-- Определяем текущую дату и время -->
      <p class="text-sm mb-12 text-black dark:text-white">
        {{
          new Date(weatherData.currentTime).toLocaleDateString('ru', {
            weekday: 'short',
            day: '2-digit',
            month: 'long'
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString('ru', {
            timeStyle: 'short'
          })
        }}
      </p>
      <div class="flex items-center">
        <!-- Температура сейчас -->
        <p class="text-8xl mb-1 text-black dark:text-white">
          {{ Math.round(weatherData.current.temp) }}&deg;
        </p>
        <!-- Изображение текущей погоды -->
        <img
          class="w-[150px] h-auto"
          :src="
            `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
          "
          alt=""
        />
      </div>
      <!-- Описание погоды -->
      <p class="capitalize text-center text-black dark:text-white">
        {{ weatherData.current.weather[0].description }}
      </p>
      <!-- Температура по ощущениям -->
      <p class="text-center text-black dark:text-white">
        Ощущается как
        {{ Math.round(weatherData.current.feels_like) }}&deg;
      </p>
    </div>

    <hr class="border border-opacity-10 border-white w-full" />

    <!-- Погода по часам -->
    <div class="py-12 w-full max-w-screen-md">
      <div class="mx-4 sm:mx-8 text-black dark:text-white">
        <div
          class="flex gap-10 overflow-x-scroll pb-4 cursor-pointer custom-scrollbar custom-scrollbar-thumb"
        >
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col items-center"
          >
            <!-- Время -->
            <p class="text-md whitespace-nowrap">
              {{
                new Date(hourData.currentTime).toLocaleTimeString('ru', {
                  hour: 'numeric'
                })
              }}
            </p>
            <!-- Изображения погоды по часам -->
            <img
              class="w-auto h-[40px] object-cover"
              :src="
                `http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`
              "
              alt=""
            />
            <!-- Температура по часам -->
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Погода на неделю -->
  <div
    class="container flex flex-col items-center justify-center rounded sm:rounded-xl my-4 bg-white dark:bg-[#161617]"
  >
    <div class="py-12 w-full max-w-screen-md">
      <div class="mx-4 sm:mx-8 text-black dark:text-white">
        <h2 class="mb-1 sm:text-[24px] font-bold">Прогноз на 7 дней</h2>
        <!-- Дни недели -->
        <div
          class="flex flex-col sm:flex-row sm:gap-10 sm:overflow-x-scroll pb-4 cursor-pointer custom-scrollbar custom-scrollbar-thumb"
        >
          <div
            v-for="day in weatherData.daily"
            :key="day.dt"
            class="flex items-center sm:flex-col"
          >
            <p class="flex-1">
              {{
                new Date(day.dt * 1000).toLocaleDateString('ru', {
                  weekday: 'long'
                })
              }}
            </p>
            <!-- Изображения погоды на день -->
            <img
              class="w-[50px] h-[50px] object-cover"
              :src="
                `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
              "
              alt=""
            />
            <!-- Высокая и низкая температура -->
            <div class="flex gap-2 flex-1 justify-end sm:flex-col">
              <p>Д: {{ Math.round(day.temp.max) }}</p>
              <p>Н: {{ Math.round(day.temp.min) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { useRoute } from 'vue-router'
import CityAddButton from './CityAddButton.vue'
import CityRemoveButton from './CityRemoveButton.vue'
const route = useRoute()
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&lang=ru&units=metric`
    )
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = weatherData.data.current.dt * 1000 + localOffset
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset
    // cal hourly weather offset
    weatherData.data.hourly.forEach(hour => {
      const utc = hour.dt * 1000 + localOffset
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset
    })

    // Задержка загрузки
    await new Promise(res => setTimeout(res, 1000))

    return weatherData.data
  } catch (err) {
    console.log(err)
  }
}
const weatherData = await getWeatherData()
</script>
