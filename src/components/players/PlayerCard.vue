<template>
  <div class="player-card relative">
    <!-- Player Header with Photo and Stats -->
    <div class="flex items-start gap-3 mb-3">
      <!-- Stats Section - Left Side -->
      <div class="flex flex-col gap-2">
        <div class="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-lg py-2 px-2 text-center min-w-[50px]">
          <div class="text-xs text-white/50 mb-0.5 font-bold uppercase">PAC</div>
          <div class="text-lg font-black text-white">{{ player.stats.pace }}</div>
        </div>
        <div class="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-lg py-2 px-2 text-center min-w-[50px]">
          <div class="text-xs text-white/50 mb-0.5 font-bold uppercase">DRI</div>
          <div class="text-lg font-black text-white">{{ player.stats.dribbling }}</div>
        </div>
        <div class="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-lg py-2 px-2 text-center min-w-[50px]">
          <div class="text-xs text-white/50 mb-0.5 font-bold uppercase">DEF</div>
          <div class="text-lg font-black text-white">{{ player.stats.defending }}</div>
        </div>
      </div>

      <!-- Player Photo & Info - Center -->
      <div class="flex flex-col items-center mx-auto">
        <div class="relative w-24 h-24 mb-2">
          <img
            :src="player.photoUrl"
            :alt="player.name"
            class="w-full h-full rounded-full object-cover shadow-lg"
          />
          <div class="absolute -bottom-1.5 -right-1.5 rounded-full p-2 border-2 border-white/30 shadow-xl" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);">
            <component :is="getPositionIcon(player.position)" :size="14" class="text-primary-400 drop-shadow-lg" />
          </div>
        </div>
        <h3 class="text-base font-bold text-white mb-1 leading-tight text-center">{{ player.name }}</h3>
        <div class="inline-block px-2.5 py-0.5 bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/20 rounded-full text-xs text-primary-300 font-semibold">
          {{ player.position }}
        </div>
      </div>

      <!-- Age, Height & Foot - Right Side -->
      <div class="flex flex-col gap-2">
        <div class="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-lg py-2 px-2 text-center min-w-[50px]">
          <div class="text-xs text-white/50 mb-0.5 font-bold uppercase">Age</div>
          <div class="text-lg font-black text-white">{{ player.age }}</div>
        </div>
        <div class="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-lg py-2 px-2 text-center min-w-[50px]">
          <div class="text-xs text-white/50 mb-0.5 font-bold uppercase">HT</div>
          <div class="text-lg font-black text-white">{{ player.height }}</div>
        </div>
        <div class="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-lg py-2 px-2 text-center min-w-[50px]">
          <div class="text-xs text-white/50 mb-0.5 font-bold uppercase">Foot</div>
          <div class="text-lg font-black text-white">{{ player.strongFoot }}</div>
        </div>
      </div>
    </div>

    <!-- Club & Nationality - Compact Creative Style -->
    <div class="flex items-center justify-between gap-3 mb-3 px-3 py-2.5 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 rounded-lg border border-white/5">
      <!-- Nationality -->
      <div class="flex items-center gap-2">
        <div class="w-8 h-6 rounded shadow-md overflow-hidden flex-shrink-0 flex items-center justify-center">
          <CountryFlag :country-code="player.nationalityCode" :size="24" class="object-cover" />
        </div>
        <span class="text-xs text-white/70 font-medium">{{ player.nationality }}</span>
      </div>

      <!-- Separator -->
      <div class="h-6 w-px bg-white/10"></div>

      <!-- Club -->
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-full bg-gradient-to-br from-white/15 to-white/5 flex items-center justify-center border border-white/20 flex-shrink-0">
          <span class="text-xs font-black text-white">{{ getClubInitials(player.club) }}</span>
        </div>
        <span class="text-xs text-white/70 font-medium truncate max-w-[110px]">{{ player.club }}</span>
      </div>
    </div>

    <!-- Footer Actions (Always Visible and Clickable) -->
    <div class="flex items-center gap-2 relative z-10">
      <button
        class="flex-1 py-2 px-4 bg-white/5 border border-white/10 rounded-lg text-white/80 text-xs font-semibold flex items-center justify-center gap-1.5"
        @click.stop="$emit('view-details', player)"
      >
        <Eye :size="14" />
        View Profile
      </button>
      <button
        class="p-2 bg-white/5 border border-white/10 rounded-lg"
        :class="{ 'bg-red-500/20 border-red-500/30': isFavorite }"
        @click.stop="toggleFavorite"
      >
        <Heart :size="15" :class="isFavorite ? 'text-red-400' : 'text-white/60'" :fill="isFavorite ? 'currentColor' : 'none'" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFilterStore } from '../../stores/filterStore'
import CountryFlag from '../ui/CountryFlag.vue'
import { Heart, Shield, UserRound, Zap, Target, Eye } from 'lucide-vue-next'

const props = defineProps({
  player: {
    type: Object,
    required: true
  }
})

defineEmits(['view-details'])

const store = useFilterStore()

const isFavorite = computed(() => store.isPlayerFavorited(props.player.id))

const toggleFavorite = () => {
  store.toggleFavorite(props.player.id)
}

const getPositionIcon = (position) => {
  if (position === 'Goalkeeper') return Shield
  if (position.includes('Midfielder')) return UserRound
  if (position.includes('Winger')) return Zap
  if (position === 'Striker') return Target
  return Shield
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
</style>
