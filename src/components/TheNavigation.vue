<template>
  <header
    class="sticky top-0 mobile:shadow-lg tablet:drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] mobile:bg-[#161617] tablet:bg-white"
  >
    <nav
      class="container flex flex-row items-center gap-4 py-6 mobile:text-white tablet:text-black"
    >
      <RouterLink :to="{ name: 'home' }">
        <div
          class="flex items-center gap-3 w-[105px] h-[26px] bg-[url('/src/assets/weather.svg')] bg-[length:105px_26px] bg-no-repeat bg-left"
        >
          <p class="pl-8 text-semibold text-xl">Погода</p>
        </div>
      </RouterLink>

      <div class="flex items-center justify-end flex-1 gap-3">
        <i
          @click="toggleModal"
          class="fa-sharp fa-solid fa-circle-info text-md tablet:hover:text-[#d00] duration-150 cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-plus text-md tablet:hover:text-[#d00] duration-150 cursor-pointer"
        ></i>
      </div>

      <ModalBase :modalActive="modalActive" @close-modal="toggleModal">
        <h1>привет</h1>
      </ModalBase>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ModalBase from './ModalBase.vue'

const modalActive = ref(null)
const toggleModal = () => {
  modalActive.value = !modalActive.value
}
</script>
