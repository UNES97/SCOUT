<template>
  <div class="min-h-screen">
    <!-- Filter Drawer (Left Sidebar) -->
    <FilterDrawer />

    <!-- Main Content Area -->
    <main class="ml-80 min-h-screen p-6">
      <!-- Header -->
      <header class="mb-6">
        <div class="glass-card p-5">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h1 class="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                SCOUT
                <span class="text-sm font-normal text-white/40">Platform</span>
              </h1>
              <p class="text-white/50 text-sm">Professional Player Scouting System</p>
            </div>
            <div class="flex items-center gap-4">
              <button
                @click="goToFavorites"
                class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/30 rounded-lg text-white/70 hover:text-white transition-all duration-200 group"
              >
                <Heart :size="16" :class="store.favoritedCount > 0 ? 'text-red-400' : 'text-white/60'" :fill="store.favoritedCount > 0 ? 'currentColor' : 'none'" />
                <span class="text-sm font-semibold">Favorites</span>
                <span v-if="store.favoritedCount > 0" class="px-2 py-0.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-full text-xs font-bold">
                  {{ store.favoritedCount }}
                </span>
              </button>
              <div class="text-right">
                <div class="text-xs text-white/40 mb-1">Total Players</div>
                <div class="text-xl font-bold text-white">
                  {{ store.totalPlayers }}
                  <span class="text-sm text-white/30">/ {{ store.totalAllPlayers }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Controls Bar -->
          <div class="flex items-center justify-between pt-4 border-t border-white/5">
            <div class="flex items-center gap-4">
              <!-- View Toggle -->
              <ViewToggle :modelValue="store.viewMode" @update:modelValue="(value) => store.viewMode = value" />

              <!-- Active Filters Badge -->
              <div v-if="store.hasActiveFilters" class="flex items-center gap-2 text-xs">
                <span class="text-white/40">Active filters:</span>
                <span class="px-2 py-1 bg-primary-500/10 border border-primary-500/20 text-primary-400 rounded font-medium">
                  {{ store.activeFilterCount }}
                </span>
              </div>
            </div>

            <!-- Sort Options -->
            <div class="flex items-center gap-2">
              <span class="text-xs text-white/40">Sort:</span>
              <select
                v-model="sortBy"
                @change="handleSort"
                class="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-primary-500/50 transition-colors"
                style="font-size: 0.8125rem;"
              >
                <option value="name">Name</option>
                <option value="age">Age</option>
                <option value="marketValue">Market Value</option>
                <option value="position">Position</option>
              </select>
              <button
                @click="toggleSortDirection"
                class="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
              >
                <component :is="sortDirection === 'asc' ? ArrowUp : ArrowDown" :size="14" class="text-white/60" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Player Display Area -->
      <div class="animate-fade-in">
        <PlayerGrid v-if="store.viewMode === 'grid'" :players="sortedPlayers" @view-details="handlePlayerSelected" />
        <PlayerList v-else :players="sortedPlayers" @player-selected="handlePlayerSelected" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFilterStore } from '../stores/filterStore'
import FilterDrawer from '../components/filters/FilterDrawer.vue'
import PlayerGrid from '../components/players/PlayerGrid.vue'
import PlayerList from '../components/players/PlayerList.vue'
import ViewToggle from '../components/ui/ViewToggle.vue'
import { ArrowUp, ArrowDown, Heart } from 'lucide-vue-next'

const router = useRouter()
const store = useFilterStore()
const sortBy = ref('name')
const sortDirection = ref('asc')

// Initialize store on mount
onMounted(() => {
  store.initialize()
})

// Sorted players
const sortedPlayers = computed(() => {
  const players = [...store.displayedPlayers]

  players.sort((a, b) => {
    let aValue, bValue

    switch (sortBy.value) {
      case 'name':
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case 'age':
        aValue = a.age
        bValue = b.age
        break
      case 'marketValue':
        aValue = a.marketValue
        bValue = b.marketValue
        break
      case 'position':
        aValue = a.position.toLowerCase()
        bValue = b.position.toLowerCase()
        break
      default:
        return 0
    }

    if (sortDirection.value === 'asc') {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
    }
  })

  return players
})

const handleSort = () => {
  // Sorting is handled by the computed property
}

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}

const handlePlayerSelected = (player) => {
  router.push({ name: 'PlayerDetail', params: { id: player.id } })
}

const goToFavorites = () => {
  router.push({ name: 'Favorites' })
}
</script>
