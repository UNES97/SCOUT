<template>
  <div class="segmented-control">
    <button
      @click="$emit('update:modelValue', 'grid')"
      class="segmented-button flex items-center gap-2"
      :class="{ active: modelValue === 'grid' }"
    >
      <Grid :size="16" />
      <span>Grid</span>
    </button>
    <button
      @click="$emit('update:modelValue', 'list')"
      class="segmented-button flex items-center gap-2"
      :class="{ active: modelValue === 'list' }"
    >
      <List :size="16" />
      <span>List</span>
    </button>
  </div>
</template>

<script setup>
import { Grid, List } from 'lucide-vue-next'

defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>
