<template>
  <div class="filter-section">
    <label class="filter-label">Position</label>
    <div class="grid grid-cols-2 gap-2">
      <button
        v-for="position in positions"
        :key="position"
        @click="togglePosition(position)"
        class="badge-button flex items-center justify-center gap-2"
        :class="{ active: store.filters.positions.includes(position) }"
      >
        <component :is="getPositionIcon(position)" :size="16" />
        <span class="text-xs">{{ position }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from '../../stores/filterStore'
import { Shield, UserRound, Zap, Target } from 'lucide-vue-next'

const store = useFilterStore()

const positions = [
  'Goalkeeper',
  'Right Back',
  'Left Back',
  'Center Back',
  'Defensive Midfielder',
  'Central Midfielder',
  'Attacking Midfielder',
  'Right Winger',
  'Left Winger',
  'Striker'
]

const togglePosition = (position) => {
  store.togglePosition(position)
}

const getPositionIcon = (position) => {
  if (position === 'Goalkeeper') return Shield
  if (position.includes('Midfielder')) return UserRound
  if (position.includes('Winger')) return Zap
  if (position === 'Striker') return Target
  return Shield // Default for defenders
}
</script>
