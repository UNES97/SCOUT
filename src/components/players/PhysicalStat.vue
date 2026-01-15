<template>
  <div class="physical-stat p-4 bg-white/5 rounded-lg border border-white/10 hover:border-primary-500/30 transition-all duration-200">
    <div class="text-xs text-white/50 uppercase font-semibold mb-1">{{ label }}</div>
    <div class="text-2xl font-black text-white">
      {{ value }}<span v-if="unit" class="text-sm text-white/60 ml-1">{{ unit }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  unit: {
    type: String,
    default: ''
  }
})
</script>
