<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute top-0 left-0 flex justify-center w-full h-screen py-8 bg-black bg-opacity-30 "
      >
        <Transition name="modal-inner">
          <div
            v-if="modalActive"
            class="relative self-start mt-32 p-4 pr-6 max-w-screen-md bg-white"
          >
            <slot />
            <button @click="$emit('close-modal')">
              <i
                class="fa-solid fa-xmark absolute top-2 right-2 text-black"
              ></i>
            </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
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

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}
.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}
.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}
.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}
.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
