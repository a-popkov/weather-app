<template>
  <header
    class="sticky top-0 dark:shadow-lg tablet:drop-shadow-[0_1px_0_rgba(0,0,0,0.08)] dark:bg-[#161617] bg-white"
  >
    <nav
      class="container flex flex-row items-center gap-4 py-4 dark:text-white text-black mobile:justify-between"
    >
      <RouterLink :to="{ name: 'home' }">
        <div
          class="flex items-center gap-3 w-[105px] h-[26px] bg-[url('/src/assets/weather.svg')] bg-[length:105px_26px] bg-no-repeat bg-left"
        >
          <p class="pl-8 font-bold text-2xl">Погода</p>
        </div>
      </RouterLink>

      <ul class="hidden items-center justify-between gap-4 mx-6 lg:flex">
        <li>
          <a
            class="font-semibold text-[16px] transition-colors duration-150 hover:text-[#d00] dark:hover:text-[#fc3f1d]"
            href="#"
            >На неделю</a
          >
        </li>
        <li>
          <a
            class="font-semibold text-[16px] transition-colors duration-150 hover:text-[#d00] dark:hover:text-[#fc3f1d]"
            href="#"
            >На месяц</a
          >
        </li>
        <li>
          <a
            class="font-semibold text-[16px] transition-colors duration-150 hover:text-[#d00] dark:hover:text-[#fc3f1d]"
            href="#"
            >На карте</a
          >
        </li>
      </ul>

      <SearchQuery />

      <div class="flex items-center justify-end gap-3">
        <i
          @click="toggleModal"
          class="fa-sharp fa-solid fa-circle-info text-md tablet:hover:text-[#d00] dark:hover:text-[#fc3f1d] duration-150 cursor-pointer"
        ></i>
      </div>

      <ModalBase :modalActive="modalActive" @close-modal="toggleModal">
        <h1>
          Далеко-далеко за словесными горами в стране гласных и согласных живут
          рыбные тексты. Точках, языком грустный речью оксмокс языкового пор
          алфавит инициал переписывается о приставка ведущими семантика
          единственное родного знаках использовало, предложения семь?
        </h1>
      </ModalBase>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ModalBase from './ModalBase.vue'
import SearchQuery from './SearchQuery.vue'

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}
</script>
