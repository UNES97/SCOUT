<template>
  <div class="filter-section">
    <label class="filter-label">Contract Status</label>
    <div class="space-y-3">
      <label
        v-for="option in contractOptions"
        :key="option.value"
        class="flex items-center gap-3 cursor-pointer group"
      >
        <div class="relative">
          <input
            type="checkbox"
            :checked="store.filters.contractStatus.includes(option.value)"
            @change="toggleStatus(option.value)"
            class="custom-checkbox"
          />
          <Check
            v-if="store.filters.contractStatus.includes(option.value)"
            :size="14"
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none"
          />
        </div>
        <span class="text-sm text-white/80 group-hover:text-white transition-colors">
          {{ option.label }}
        </span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from '../../stores/filterStore'
import { Check } from 'lucide-vue-next'

const store = useFilterStore()

const contractOptions = [
  { value: 'expiring', label: 'Contract expiring < 1 year' },
  { value: 'freeAgent', label: 'Free Agent' },
  { value: 'loanAvailable', label: 'Loan Available' }
]

const toggleStatus = (status) => {
  store.toggleContractStatus(status)
}
</script>
