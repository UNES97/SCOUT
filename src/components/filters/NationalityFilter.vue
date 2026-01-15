<template>
  <div class="filter-section">
    <label class="filter-label">Nationality</label>
    <div class="relative">
      <input
        v-model="searchQuery"
        @focus="showDropdown = true"
        @blur="handleBlur"
        type="text"
        placeholder="Search nationality..."
        class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 text-sm focus:outline-none focus:border-primary-500/50 transition-colors"
        style="font-size: 0.8125rem;"
      />
      <Search :size="14" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/30" />

      <!-- Dropdown -->
      <div
        v-if="showDropdown && filteredNations.length > 0"
        class="absolute z-20 w-full mt-2 glass-card p-0 max-h-60 overflow-y-auto scrollbar-custom"
      >
        <button
          v-for="nation in filteredNations"
          :key="nation.value"
          @mousedown.prevent="selectNation(nation)"
          class="w-full px-4 py-2.5 text-left text-white/80 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-3 text-sm"
        >
          <CountryFlag :country-code="nation.code" :size="16" />
          <span>{{ nation.label }}</span>
        </button>
      </div>

      <!-- Selected nationality -->
      <div v-if="store.filters.nationality" class="mt-3">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-lg">
          <CountryFlag :country-code="getSelectedNationCode()" :size="16" />
          <span class="text-sm text-white/90">{{ store.filters.nationality }}</span>
          <button
            @click="clearNationality"
            class="text-white/50 hover:text-white transition-colors ml-1"
          >
            <X :size="14" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFilterStore } from '../../stores/filterStore'
import CountryFlag from '../ui/CountryFlag.vue'
import { Search, X } from 'lucide-vue-next'

const store = useFilterStore()
const searchQuery = ref('')
const showDropdown = ref(false)

const filteredNations = computed(() => {
  if (!searchQuery.value) {
    return store.filterOptions.nations
  }
  return store.filterOptions.nations.filter(nation =>
    nation.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectNation = (nation) => {
  store.updateFilter('nationality', nation.value)
  searchQuery.value = ''
  showDropdown.value = false
}

const clearNationality = () => {
  store.updateFilter('nationality', null)
  searchQuery.value = ''
}

const getSelectedNationCode = () => {
  const nation = store.filterOptions.nations.find(n => n.value === store.filters.nationality)
  return nation ? nation.code : ''
}

const handleBlur = () => {
  // Delay to allow click event to fire
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}
</script>
