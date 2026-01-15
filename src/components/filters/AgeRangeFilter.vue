<template>
  <div class="filter-section">
    <label class="filter-label">Age Range</label>
    <RangeSlider
      v-model="ageRange"
      :min="15"
      :max="40"
      :step="1"
      label="years"
      @update:modelValue="updateAge"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useFilterStore } from '../../stores/filterStore'
import RangeSlider from '../ui/RangeSlider.vue'
import { useDebounceFn } from '@vueuse/core'

const store = useFilterStore()
const ageRange = ref([...store.filters.ageRange])

// Debounced update to avoid too many filter operations
const debouncedUpdate = useDebounceFn((value) => {
  store.updateFilter('ageRange', value)
}, 150)

const updateAge = (value) => {
  ageRange.value = value
  debouncedUpdate(value)
}

// Watch store changes
watch(() => store.filters.ageRange, (newValue) => {
  ageRange.value = [...newValue]
}, { deep: true })
</script>
