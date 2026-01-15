<template>
  <div class="filter-section">
    <label class="filter-label">Strong Foot</label>
    <div class="segmented-control w-full">
      <button
        v-for="foot in footOptions"
        :key="foot.value"
        @click="selectFoot(foot.value)"
        class="segmented-button flex-1 flex items-center justify-center"
        :class="{ active: store.filters.strongFoot === foot.value }"
      >
        <span>{{ foot.label }}</span>
      </button>
    </div>
    <button
      v-if="store.filters.strongFoot"
      @click="clearFoot"
      class="mt-2 text-xs text-white/60 hover:text-white transition-colors"
    >
      Clear selection
    </button>
  </div>
</template>

<script setup>
import { useFilterStore } from '../../stores/filterStore'
import { MoveRight, MoveLeft, Shuffle } from 'lucide-vue-next'

const store = useFilterStore()

const footOptions = [
  { value: 'Right', label: 'Right', icon: MoveRight },
  { value: 'Left', label: 'Left', icon: MoveLeft },
  { value: 'Both', label: 'Both', icon: Shuffle }
]

const selectFoot = (foot) => {
  store.updateFilter('strongFoot', foot)
}

const clearFoot = () => {
  store.updateFilter('strongFoot', null)
}
</script>
