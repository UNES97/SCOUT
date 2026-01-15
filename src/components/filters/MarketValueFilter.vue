<template>
  <div class="filter-section">
    <label class="filter-label">Market Value</label>
    <RangeSlider
      v-model="marketValueRange"
      :min="0"
      :max="200000000"
      :step="1000000"
      label="€"
      :formatter="formatMarketValue"
      @update:modelValue="updateMarketValue"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useFilterStore } from '../../stores/filterStore'
import RangeSlider from '../ui/RangeSlider.vue'
import { useDebounceFn } from '@vueuse/core'

const store = useFilterStore()
const marketValueRange = ref([...store.filters.marketValueRange])

// Format market value as €5.2M, €850K, etc.
const formatMarketValue = (value) => {
  if (value === 0) return '€0'
  if (value >= 1000000) {
    const millions = value / 1000000
    return `€${millions.toFixed(1)}M`
  }
  if (value >= 1000) {
    const thousands = value / 1000
    return `€${thousands.toFixed(0)}K`
  }
  return `€${value}`
}

// Debounced update
const debouncedUpdate = useDebounceFn((value) => {
  store.updateFilter('marketValueRange', value)
}, 150)

const updateMarketValue = (value) => {
  marketValueRange.value = value
  debouncedUpdate(value)
}

// Watch store changes
watch(() => store.filters.marketValueRange, (newValue) => {
  marketValueRange.value = [...newValue]
}, { deep: true })
</script>
