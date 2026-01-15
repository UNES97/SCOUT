<template>
  <div class="min-h-screen pb-12">
    <!-- Header -->
    <div class="sticky top-0 z-40 backdrop-blur-xl bg-[#0f1419]/95 border-b border-white/5">
      <div class="max-w-[1800px] mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              @click="goBack"
              class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white text-sm font-semibold transition-all duration-200"
            >
              <ArrowLeft :size="16" />
              Back
            </button>
            <div>
              <h1 class="text-2xl font-black text-white mb-1">Favorite Players</h1>
              <p class="text-sm text-white/60">{{ store.favoritedCount }} player{{ store.favoritedCount !== 1 ? 's' : '' }} saved</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <Heart :size="24" class="text-red-400" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-[1800px] mx-auto px-6 pt-8">
      <!-- Empty State -->
      <div v-if="store.favoritedCount === 0" class="flex flex-col items-center justify-center py-20">
        <div class="glass-card p-12 text-center max-w-md">
          <div class="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <Heart :size="40" class="text-red-400" />
          </div>
          <h3 class="text-2xl font-bold text-white mb-2">No Favorites Yet</h3>
          <p class="text-white/60 mb-6">
            Start adding players to your favorites by clicking the heart icon on player cards
          </p>
          <button
            @click="goBack"
            class="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg text-white font-medium transition-colors"
          >
            Browse Players
          </button>
        </div>
      </div>

      <!-- Favorites Grid -->
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="(player, index) in store.favoritedPlayers"
            :key="player.id"
            :style="{ animationDelay: `${index * 20}ms` }"
            class="animate-scale-in"
          >
            <PlayerCard :player="player" @view-details="handlePlayerSelected" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useFilterStore } from '../stores/filterStore'
import PlayerCard from '../components/players/PlayerCard.vue'
import { ArrowLeft, Heart } from 'lucide-vue-next'

const router = useRouter()
const store = useFilterStore()

const goBack = () => {
  router.push('/')
}

const handlePlayerSelected = (player) => {
  router.push({ name: 'PlayerDetail', params: { id: player.id } })
}
</script>
