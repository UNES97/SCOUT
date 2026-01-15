<template>
  <div>
    <!-- Loading State -->
    <div v-if="store.isLoading" class="space-y-3">
      <div v-for="n in 10" :key="n" class="glass-card p-4 animate-pulse flex items-center gap-4">
        <div class="skeleton w-14 h-14 rounded-full"></div>
        <div class="flex-1 space-y-2">
          <div class="skeleton h-4 w-1/4"></div>
          <div class="skeleton h-3 w-1/3"></div>
        </div>
        <div class="skeleton h-8 w-24"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="players.length === 0"
      class="flex flex-col items-center justify-center py-20"
    >
      <div class="glass-card p-12 text-center max-w-md">
        <SearchX :size="48" class="mx-auto mb-4 text-white/20" />
        <h3 class="text-xl font-semibold text-white mb-2">No Players Found</h3>
        <p class="text-white/50 text-sm mb-6">
          Try adjusting your filters to see more results
        </p>
        <button
          @click="store.resetFilters()"
          class="px-6 py-2.5 bg-primary-500/15 hover:bg-primary-500/25 border border-primary-500/30 rounded-lg text-primary-400 text-sm font-medium transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>

    <!-- Player List -->
    <div v-else>
      <transition-group
        name="list"
        tag="div"
        class="space-y-3"
      >
        <div
          v-for="(player, index) in players"
          :key="player.id"
          :style="{ animationDelay: `${index * 20}ms` }"
          class="glass-card p-4 hover:border-primary-500/20 transition-all duration-300 cursor-pointer animate-scale-in"
          @click="$emit('player-selected', player)"
        >
          <div class="flex items-center gap-4">
            <!-- Player Photo -->
            <img
              :src="player.photoUrl"
              :alt="player.name"
              class="w-16 h-16 rounded-full object-cover border-2 border-primary-500/20"
            />

            <!-- Player Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1.5">
                <h3 class="text-base font-bold text-white">{{ player.name }}</h3>
                <span class="text-xs px-2.5 py-0.5 bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20 text-primary-300 rounded-full font-semibold">
                  {{ player.position }}
                </span>
              </div>
              <div class="flex items-center gap-3 text-xs">
                <div class="flex items-center gap-1.5">
                  <CountryFlag :country-code="player.nationalityCode" :size="16" />
                  <span class="text-white/70 font-medium">{{ player.nationality }}</span>
                </div>
                <span class="text-white/30">•</span>
                <div class="flex items-center gap-1.5">
                  <div class="w-5 h-5 rounded-full bg-gradient-to-br from-white/15 to-white/5 flex items-center justify-center border border-white/20">
                    <span class="text-[8px] font-black text-white">{{ getClubInitials(player.club) }}</span>
                  </div>
                  <span class="text-white/70 font-medium truncate max-w-[120px]">{{ player.club }}</span>
                </div>
              </div>
            </div>

            <!-- Player Stats -->
            <div class="hidden lg:flex items-center gap-4">
              <div class="flex gap-2">
                <div class="text-center bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-lg px-3 py-1.5 min-w-[50px]">
                  <div class="text-[10px] text-white/50 mb-0.5 font-bold uppercase">PAC</div>
                  <div class="text-sm font-black text-white">{{ player.stats.pace }}</div>
                </div>
                <div class="text-center bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-lg px-3 py-1.5 min-w-[50px]">
                  <div class="text-[10px] text-white/50 mb-0.5 font-bold uppercase">DRI</div>
                  <div class="text-sm font-black text-white">{{ player.stats.dribbling }}</div>
                </div>
                <div class="text-center bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-lg px-3 py-1.5 min-w-[50px]">
                  <div class="text-[10px] text-white/50 mb-0.5 font-bold uppercase">DEF</div>
                  <div class="text-sm font-black text-white">{{ player.stats.defending }}</div>
                </div>
              </div>
              <div class="h-10 w-px bg-white/10"></div>
              <div class="flex gap-2">
                <div class="text-center bg-white/5 rounded-lg px-3 py-1.5 min-w-[45px]">
                  <div class="text-[10px] text-white/40 mb-0.5 font-medium">Age</div>
                  <div class="text-sm font-bold text-white">{{ player.age }}</div>
                </div>
                <div class="text-center bg-white/5 rounded-lg px-3 py-1.5 min-w-[45px]">
                  <div class="text-[10px] text-white/40 mb-0.5 font-medium">HT</div>
                  <div class="text-sm font-bold text-white">{{ player.height }}</div>
                </div>
                <div class="text-center bg-white/5 rounded-lg px-3 py-1.5 min-w-[45px]">
                  <div class="text-[10px] text-white/40 mb-0.5 font-medium">Foot</div>
                  <div class="text-[10px] font-bold text-white">{{ player.strongFoot }}</div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <button
                @click.stop="toggleFavorite(player.id)"
                class="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200"
                :class="{ 'bg-red-500/20 border-red-500/30 hover:bg-red-500/30': favorites.includes(player.id) }"
              >
                <Heart
                  :size="15"
                  :class="favorites.includes(player.id) ? 'text-red-400' : 'text-white/60'"
                  :fill="favorites.includes(player.id) ? 'currentColor' : 'none'"
                />
              </button>
              <button
                class="px-4 py-2 bg-white/5 hover:bg-primary-500/20 border border-white/10 hover:border-primary-500/40 rounded-lg text-white/80 hover:text-primary-300 text-xs font-semibold transition-all duration-200 flex items-center gap-1.5"
              >
                <Eye :size="14" />
                View Profile
              </button>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Load More Button -->
      <div v-if="store.hasMorePlayers" class="flex justify-center mt-6">
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
import { ref } from 'vue'
import { useFilterStore } from '../../stores/filterStore'
import CountryFlag from '../ui/CountryFlag.vue'
import { Heart, SearchX, Eye } from 'lucide-vue-next'

const props = defineProps({
  players: {
    type: Array,
    required: true
  }
})

defineEmits(['player-selected'])

const store = useFilterStore()
const favorites = ref([])

const toggleFavorite = (playerId) => {
  const index = favorites.value.indexOf(playerId)
  if (index > -1) {
    favorites.value.splice(index, 1)
  } else {
    favorites.value.push(playerId)
  }
}

const getClubInitials = (clubName) => {
  const words = clubName.split(' ')
  if (words.length === 1) {
    return clubName.substring(0, 2).toUpperCase()
  }
  return words
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase()
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
