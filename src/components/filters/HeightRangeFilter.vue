<template>
  <div class="filter-section">
    <label class="filter-label">Height</label>
    <RangeSlider
      v-model="heightRange"
      :min="150"
      :max="210"
      :step="1"
      label="cm"
      :formatter="(value) => `${value}cm`"
      @update:modelValue="updateHeight"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useFilterStore } from '../../stores/filterStore'
import RangeSlider from '../ui/RangeSlider.vue'
import { useDebounceFn } from '@vueuse/core'

const store = useFilterStore()
const heightRange = ref([...store.filters.heightRange])

// Debounced update
const debouncedUpdate = useDebounceFn((value) => {
  store.updateFilter('heightRange', value)
}, 150)

const updateHeight = (value) => {
  heightRange.value = value
  debouncedUpdate(value)
}

// Watch store changes
watch(() => store.filters.heightRange, (newValue) => {
  heightRange.value = [...newValue]
}, { deep: true })
</script>
