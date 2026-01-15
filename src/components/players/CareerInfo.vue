<template>
  <div class="career-info flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
    <span class="text-sm text-white/60 font-medium">{{ label }}</span>
    <span class="text-sm text-white font-bold">{{ value }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})
</script>
