<template>
  <div>
    <!-- Loading State -->
    <div v-if="store.isLoading" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="n in 8" :key="n" class="glass-card p-6 animate-pulse">
        <div class="skeleton w-24 h-24 rounded-full mx-auto mb-4"></div>
        <div class="skeleton h-6 w-3/4 mx-auto mb-2"></div>
        <div class="skeleton h-4 w-1/2 mx-auto mb-4"></div>
        <div class="skeleton h-32 w-32 mx-auto mb-4"></div>
        <div class="skeleton h-10 w-full"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="players.length === 0"
      class="flex flex-col items-center justify-center py-20"
    >
      <div class="glass-card p-12 text-center max-w-md">
        <SearchX :size="64" class="mx-auto mb-4 text-white/30" />
        <h3 class="text-2xl font-bold text-white mb-2">No Players Found</h3>
        <p class="text-white/60 mb-6">
          Try adjusting your filters to see more results
        </p>
        <button
          @click="store.resetFilters()"
          class="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg text-white font-medium transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>

    <!-- Player Grid -->
    <div v-else>
      <transition-group
        name="list"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="(player, index) in players"
          :key="player.id"
          :style="{ animationDelay: `${index * 20}ms` }"
          class="animate-scale-in"
        >
          <PlayerCard :player="player" @view-details="$emit('view-details', player)" />
        </div>
      </transition-group>

      <!-- Load More Button -->
      <div v-if="store.hasMorePlayers" class="flex justify-center mt-8">
        <button
          @click="store.loadMore()"
          class="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/30 rounded-lg text-white font-medium transition-all duration-200 flex items-center gap-2"
        >
          Load More Players
          <span class="text-xs text-white/50">({{ store.filteredPlayers.length - store.displayedPlayers.length }} remaining)</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from '../../stores/filterStore'
import PlayerCard from './PlayerCard.vue'
import { SearchX } from 'lucide-vue-next'

const props = defineProps({
  players: {
    type: Array,
    required: true
  }
})

defineEmits(['view-details'])

const store = useFilterStore()
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
