<template>
  <div
    class="glass-card"
    :class="[hover ? 'glass-card-hover' : '', customClass]"
    :style="customStyle"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  hover: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },
  padding: {
    type: String,
    default: '1.5rem'
  }
})

const customStyle = computed(() => ({
  padding: props.padding
}))
</script>

<style scoped>
/* Additional card-specific styles if needed */
</style>
