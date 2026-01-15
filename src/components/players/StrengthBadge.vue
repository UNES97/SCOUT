<template>
  <div
    class="strength-badge inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105"
    :class="badgeClass"
  >
    <div class="w-2 h-2 rounded-full" :class="dotClass"></div>
    {{ label }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'strength', // 'strength' or 'weakness'
    validator: (value) => ['strength', 'weakness'].includes(value)
  }
})

const badgeClass = computed(() => {
  return props.type === 'strength'
    ? 'bg-green-500/10 border border-green-500/30 text-green-400'
    : 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
})

const dotClass = computed(() => {
  return props.type === 'strength'
    ? 'bg-green-400 animate-pulse'
    : 'bg-orange-400'
})
</script>
