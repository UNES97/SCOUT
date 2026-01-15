<template>
  <div class="filter-section">
    <label class="filter-label">Injury History</label>
    <div class="space-y-3">
      <label
        v-for="option in injuryOptions"
        :key="option.value"
        class="flex items-center justify-between cursor-pointer group"
      >
        <span class="text-sm text-white/80 group-hover:text-white transition-colors">
          {{ option.label }}
        </span>
        <button
          @click="toggleInjury(option.value)"
          class="relative w-11 h-6 rounded-full transition-colors"
          :class="store.filters.injuryHistory.includes(option.value) ? 'bg-primary-500' : 'bg-white/10'"
        >
          <span
            class="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200"
            :class="store.filters.injuryHistory.includes(option.value) ? 'translate-x-6' : 'translate-x-1'"
          ></span>
        </button>
      </label>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from '../../stores/filterStore'

const store = useFilterStore()

const injuryOptions = [
  { value: 'noMajorInjuries', label: 'No major injuries' },
  { value: 'lastInjury12Months', label: 'Last injury > 12 months' }
]

const toggleInjury = (option) => {
  store.toggleInjuryHistory(option)
}
</script>
