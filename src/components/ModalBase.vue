<template>
  <Transition>
    <div
      v-show="modalActive"
      class="absolute top-0 left-0 flex justify-center w-full h-screen py-8 bg-black bg-opacity-30 "
    >
      <Transition>
        <div
          v-if="modalActive"
          class="self-start mt-32 p-4 max-w-screen-md bg-white"
        >
          <slot />
          <button
            @click="$emit('close-modal')"
            class="mt-8 py-2 px-6 text-white mobile:bg-[#161617] tablet:bg-white"
          >
            <i class="fa-solid fa-xmark text-black"></i>
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
defineEmits(['close-modal'])
defineProps({
  modalActive: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped></style>
