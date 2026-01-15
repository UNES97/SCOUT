<template>
  <div class="stat-bar">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm font-semibold text-white">{{ label }}</span>
      <span class="text-sm font-bold text-white">{{ value }}</span>
    </div>
    <div class="relative h-3 bg-white/10 rounded-full overflow-hidden">
      <div
        class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r transition-all duration-1000 ease-out"
        :class="color"
        :style="{ width: barWidth }"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    default: 'from-primary-500 to-primary-600'
  }
})

const barWidth = ref('0%')

onMounted(() => {
  // Animate bar on mount
  setTimeout(() => {
    barWidth.value = `${props.value}%`
  }, 100)
})
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
