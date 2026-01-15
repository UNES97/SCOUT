<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/90 backdrop-blur-2xl"></div>

        <!-- Modal Container - FIFA Card Style -->
        <div class="relative w-full max-w-[1400px] h-[95vh] flex gap-6 animate-scale-in-modal">
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute -top-4 -right-4 z-50 p-3 bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500/50 rounded-full transition-all duration-200 backdrop-blur-xl"
          >
            <X :size="24" class="text-red-400" />
          </button>

          <!-- Left Side - FIFA Card Style -->
          <div class="w-[480px] relative">
            <!-- FIFA-Style Player Card -->
            <div class="relative h-full rounded-3xl overflow-hidden shadow-2xl fifa-card">
              <!-- Dynamic Background -->
              <div class="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 animate-gradient-slow"></div>
              <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

              <!-- Card Content -->
              <div class="relative h-full p-8 flex flex-col">
                <!-- Top Section - Rating & Position -->
                <div class="flex items-start justify-between mb-6">
                  <div class="text-center">
                    <div class="text-7xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] mb-1">
                      {{ getOverallRating(player) }}
                    </div>
                    <div class="text-sm font-bold text-white/90 uppercase tracking-wider drop-shadow-lg">
                      {{ getPositionAbbr(player.position) }}
                    </div>
                  </div>
                  <div class="text-right">
                    <CountryFlag :country-code="player.nationalityCode" :size="48" class="mb-2 drop-shadow-xl" />
                    <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center shadow-xl">
                      <span class="text-xl font-black text-white">{{ getClubInitials(player.club) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Player Image -->
                <div class="flex-1 flex items-center justify-center relative mb-6">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <img
                    :src="player.photoUrl"
                    :alt="player.name"
                    class="relative w-80 h-80 object-cover drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)] fifa-player-image"
                  />
                </div>

                <!-- Player Name & Details -->
                <div class="relative">
                  <h2 class="text-4xl font-black text-white mb-2 uppercase tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-center">
                    {{ player.name }}
                  </h2>
                  <div class="flex items-center justify-center gap-3 text-white/90 text-sm font-bold drop-shadow-lg">
                    <span>{{ player.age }} YRS</span>
                    <span>•</span>
                    <span>{{ player.height }}CM</span>
                    <span>•</span>
                    <span>{{ player.strongFoot }}</span>
                  </div>
                </div>

                <!-- Quick Stats - FIFA Style -->
                <div class="mt-6 grid grid-cols-6 gap-2">
                  <div class="text-center">
                    <div class="text-2xl font-black text-white drop-shadow-lg">{{ player.stats.pace }}</div>
                    <div class="text-[10px] font-bold text-white/70 uppercase">PAC</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-black text-white drop-shadow-lg">{{ player.stats.shooting }}</div>
                    <div class="text-[10px] font-bold text-white/70 uppercase">SHO</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-black text-white drop-shadow-lg">{{ player.stats.passing }}</div>
                    <div class="text-[10px] font-bold text-white/70 uppercase">PAS</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-black text-white drop-shadow-lg">{{ player.stats.dribbling }}</div>
                    <div class="text-[10px] font-bold text-white/70 uppercase">DRI</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-black text-white drop-shadow-lg">{{ player.stats.defending }}</div>
                    <div class="text-[10px] font-bold text-white/70 uppercase">DEF</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-black text-white drop-shadow-lg">{{ player.stats.physical }}</div>
                    <div class="text-[10px] font-bold text-white/70 uppercase">PHY</div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex gap-3 mt-6">
                  <button
                    @click="toggleFavorite"
                    class="flex-1 py-4 rounded-xl font-bold text-white transition-all duration-200 shadow-lg transform hover:scale-105"
                    :class="isFavorite ? 'bg-red-500/30 border-2 border-red-400/50 backdrop-blur-xl' : 'bg-white/10 border-2 border-white/20 backdrop-blur-xl hover:bg-white/20'"
                  >
                    <Heart :size="20" :fill="isFavorite ? 'currentColor' : 'none'" class="inline mr-2" />
                    {{ isFavorite ? 'FAVORITED' : 'ADD TO FAVORITES' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Stats & Info -->
          <div class="flex-1 flex flex-col gap-4 overflow-hidden">
            <!-- Header Stats Cards -->
            <div class="grid grid-cols-3 gap-4">
              <div class="glass-card-dark p-4 rounded-xl border-2 border-primary-500/30 hover:border-primary-500/50 transition-all duration-300">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
                    <Building2 :size="24" class="text-primary-400" />
                  </div>
                  <div>
                    <div class="text-xs text-white/50 uppercase font-bold mb-0.5">Club</div>
                    <div class="text-sm font-black text-white truncate">{{ player.club }}</div>
                  </div>
                </div>
              </div>
              <div class="glass-card-dark p-4 rounded-xl border-2 border-green-500/30 hover:border-green-500/50 transition-all duration-300">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center">
                    <TrendingUp :size="24" class="text-green-400" />
                  </div>
                  <div>
                    <div class="text-xs text-white/50 uppercase font-bold mb-0.5">Value</div>
                    <div class="text-sm font-black text-white">{{ formatMarketValue(player.marketValue) }}</div>
                  </div>
                </div>
              </div>
              <div class="glass-card-dark p-4 rounded-xl border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 flex items-center justify-center">
                    <Crown :size="24" class="text-yellow-400" />
                  </div>
                  <div>
                    <div class="text-xs text-white/50 uppercase font-bold mb-0.5">Role</div>
                    <div class="text-xs font-black text-white truncate">{{ player.preferredRole }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tabs -->
            <div class="flex gap-2 px-1">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                class="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 transform hover:scale-105"
                :class="activeTab === tab.id ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white backdrop-blur-xl'"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- Tab Content -->
            <div class="flex-1 overflow-y-auto scrollbar-custom pr-2">
              <!-- Stats Tab -->
              <div v-if="activeTab === 'stats'" class="space-y-4">
                <!-- Radar Chart -->
                <div class="glass-card-dark p-6 rounded-xl">
                  <h3 class="text-lg font-black text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                    <Activity :size="20" class="text-primary-400" />
                    Performance Radar
                  </h3>
                  <div class="flex justify-center">
                    <PlayerRadarChart :stats="player.stats" :size="340" />
                  </div>
                </div>

                <!-- Detailed Stats -->
                <div class="glass-card-dark p-6 rounded-xl">
                  <h3 class="text-lg font-black text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                    <BarChart3 :size="20" class="text-primary-400" />
                    Attributes Breakdown
                  </h3>
                  <div class="space-y-3">
                    <StatBar label="Pace" :value="player.stats.pace" color="from-green-500 to-emerald-600" />
                    <StatBar label="Shooting" :value="player.stats.shooting" color="from-red-500 to-rose-600" />
                    <StatBar label="Passing" :value="player.stats.passing" color="from-blue-500 to-cyan-600" />
                    <StatBar label="Dribbling" :value="player.stats.dribbling" color="from-purple-500 to-violet-600" />
                    <StatBar label="Defending" :value="player.stats.defending" color="from-orange-500 to-amber-600" />
                    <StatBar label="Physical" :value="player.stats.physical" color="from-yellow-500 to-lime-600" />
                  </div>
                </div>
              </div>

              <!-- Analysis Tab -->
              <div v-if="activeTab === 'analysis'" class="space-y-4">
                <!-- Strengths & Weaknesses -->
                <div class="glass-card-dark p-6 rounded-xl">
                  <h3 class="text-lg font-black text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                    <Target :size="20" class="text-primary-400" />
                    Scouting Report
                  </h3>

                  <div class="mb-6">
                    <h4 class="text-base font-bold text-green-400 mb-3 flex items-center gap-2">
                      <TrendingUp :size="18" />
                      Key Strengths
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <StrengthBadge
                        v-for="strength in getPlayerStrengths(player)"
                        :key="strength"
                        :label="strength"
                        type="strength"
                      />
                    </div>
                  </div>

                  <div>
                    <h4 class="text-base font-bold text-orange-400 mb-3 flex items-center gap-2">
                      <AlertCircle :size="18" />
                      Development Areas
                    </h4>
                    <div class="flex flex-wrap gap-2">
                      <StrengthBadge
                        v-for="weakness in getPlayerWeaknesses(player)"
                        :key="weakness"
                        :label="weakness"
                        type="weakness"
                      />
                    </div>
                  </div>
                </div>

                <!-- Playing Style -->
                <div class="glass-card-dark p-6 rounded-xl">
                  <h3 class="text-lg font-black text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles :size="20" class="text-primary-400" />
                    Playing Style
                  </h3>
                  <p class="text-white/80 leading-relaxed">
                    {{ getPlayingStyleDescription(player) }}
                  </p>
                </div>

                <!-- Injury Status -->
                <div class="glass-card-dark p-6 rounded-xl">
                  <h3 class="text-lg font-black text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                    <Heart :size="20" class="text-primary-400" />
                    Fitness Status
                  </h3>
                  <div v-if="player.lastInjuryDate === null" class="flex items-center gap-3 p-4 bg-green-500/20 border-2 border-green-500/40 rounded-lg">
                    <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
                    <span class="text-green-300 font-bold">100% FIT - NO INJURY HISTORY</span>
                  </div>
                  <div v-else class="flex items-center gap-3 p-4 bg-yellow-500/20 border-2 border-yellow-500/40 rounded-lg">
                    <AlertCircle :size="20" class="text-yellow-400" />
                    <span class="text-yellow-300 font-bold">LAST INJURY: {{ formatDate(player.lastInjuryDate) }}</span>
                  </div>
                </div>
              </div>

              <!-- Career Tab -->
              <div v-if="activeTab === 'career'" class="space-y-4">
                <!-- Career Info -->
                <div class="glass-card-dark p-6 rounded-xl">
                  <h3 class="text-lg font-black text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                    <Calendar :size="20" class="text-primary-400" />
                    Career Timeline
                  </h3>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <span class="text-sm text-white/60 font-semibold uppercase">Current Club</span>
                      <span class="text-base font-black text-white">{{ player.club }}</span>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <span class="text-sm text-white/60 font-semibold uppercase">Position</span>
                      <span class="text-base font-black text-white">{{ player.position }}</span>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <span class="text-sm text-white/60 font-semibold uppercase">Preferred Role</span>
                      <span class="text-base font-black text-white">{{ player.preferredRole }}</span>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                      <span class="text-sm text-white/60 font-semibold uppercase">Contract Expires</span>
                      <span class="text-base font-black text-white">{{ formatDate(player.contractExpires) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Status Badges -->
                <div class="glass-card-dark p-6 rounded-xl">
                  <h3 class="text-lg font-black text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                    <FileText :size="20" class="text-primary-400" />
                    Contract Status
                  </h3>
                  <div class="flex flex-wrap gap-3">
                    <div v-if="player.isFreeAgent" class="flex items-center gap-2 px-4 py-3 bg-green-500/20 border-2 border-green-500/40 rounded-lg">
                      <Check :size="18" class="text-green-400" />
                      <span class="text-green-300 font-bold text-sm uppercase">Free Agent</span>
                    </div>
                    <div v-if="player.isLoanAvailable" class="flex items-center gap-2 px-4 py-3 bg-blue-500/20 border-2 border-blue-500/40 rounded-lg">
                      <ArrowRightLeft :size="18" class="text-blue-400" />
                      <span class="text-blue-300 font-bold text-sm uppercase">Available on Loan</span>
                    </div>
                    <div v-if="player.contractExpiringSoon" class="flex items-center gap-2 px-4 py-3 bg-orange-500/20 border-2 border-orange-500/40 rounded-lg">
                      <Clock :size="18" class="text-orange-400" />
                      <span class="text-orange-300 font-bold text-sm uppercase">Expiring Soon</span>
                    </div>
                    <div v-if="!player.isFreeAgent && !player.isLoanAvailable && !player.contractExpiringSoon" class="flex items-center gap-2 px-4 py-3 bg-primary-500/20 border-2 border-primary-500/40 rounded-lg">
                      <Shield :size="18" class="text-primary-400" />
                      <span class="text-primary-300 font-bold text-sm uppercase">Under Contract</span>
                    </div>
                  </div>
                </div>

                <!-- Market Value -->
                <div class="glass-card-dark p-6 rounded-xl border-2 border-green-500/30">
                  <h3 class="text-lg font-black text-white mb-2 uppercase tracking-wider flex items-center gap-2">
                    <DollarSign :size="20" class="text-green-400" />
                    Estimated Market Value
                  </h3>
                  <div class="text-5xl font-black mb-2">
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">
                      {{ formatMarketValue(player.marketValue) }}
                    </span>
                  </div>
                  <p class="text-sm text-white/60">Based on age, performance, and contract status</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import PlayerRadarChart from './PlayerRadarChart.vue'
import CountryFlag from '../ui/CountryFlag.vue'
import StatBar from './StatBar.vue'
import StrengthBadge from './StrengthBadge.vue'
import {
  X, Heart, Activity, TrendingUp, Calendar, Target, Sparkles,
  Check, ArrowRightLeft, Clock, AlertCircle, Shield,
  Building2, Crown, BarChart3, FileText, DollarSign
} from 'lucide-vue-next'

const props = defineProps({
  player: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const activeTab = ref('stats')
const isFavorite = ref(false)

const tabs = [
  { id: 'stats', label: 'STATS' },
  { id: 'analysis', label: 'ANALYSIS' },
  { id: 'career', label: 'CAREER' }
]

// Calculate overall rating like FIFA
const getOverallRating = (player) => {
  const stats = player.stats
  const avg = Math.round((stats.pace + stats.shooting + stats.passing + stats.dribbling + stats.defending + stats.physical) / 6)
  return avg
}

// Get position abbreviation
const getPositionAbbr = (position) => {
  const abbr = {
    'Goalkeeper': 'GK',
    'Right Back': 'RB',
    'Left Back': 'LB',
    'Center Back': 'CB',
    'Defensive Midfielder': 'CDM',
    'Central Midfielder': 'CM',
    'Attacking Midfielder': 'CAM',
    'Right Winger': 'RW',
    'Left Winger': 'LW',
    'Striker': 'ST'
  }
  return abbr[position] || position.substring(0, 3).toUpperCase()
}

const closeModal = () => {
  emit('close')
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const getPositionIcon = (position) => {
  if (position === 'Goalkeeper') return Shield
  if (position.includes('Midfielder')) return UserRound
  if (position.includes('Winger')) return ZapIcon
  if (position === 'Striker') return TargetIcon
  return Shield
}

const getClubInitials = (clubName) => {
  const words = clubName.split(' ')
  if (words.length === 1) {
    return clubName.substring(0, 2).toUpperCase()
  }
  return words.slice(0, 2).map(word => word[0]).join('').toUpperCase()
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const formatMarketValue = (value) => {
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)}M`
  }
  return `€${(value / 1000).toFixed(0)}K`
}

const getPlayerStrengths = (player) => {
  const stats = player.stats
  const strengths = []

  if (stats.pace >= 75) strengths.push('Exceptional Speed & Acceleration')
  if (stats.shooting >= 75) strengths.push('Clinical Finishing Ability')
  if (stats.passing >= 75) strengths.push('Excellent Vision & Distribution')
  if (stats.dribbling >= 75) strengths.push('Superior Ball Control & Dribbling')
  if (stats.defending >= 75) strengths.push('Strong Defensive Capabilities')
  if (stats.physical >= 75) strengths.push('Outstanding Physical Presence')

  if (strengths.length === 0) {
    const maxStat = Math.max(...Object.values(stats))
    const maxStatName = Object.keys(stats).find(key => stats[key] === maxStat)
    strengths.push(`Good ${maxStatName.charAt(0).toUpperCase() + maxStatName.slice(1)}`)
  }

  return strengths
}

const getPlayerWeaknesses = (player) => {
  const stats = player.stats
  const weaknesses = []

  if (stats.pace < 60) weaknesses.push('Needs Improvement in Speed')
  if (stats.shooting < 60) weaknesses.push('Finishing Could Be Enhanced')
  if (stats.passing < 60) weaknesses.push('Distribution Accuracy')
  if (stats.dribbling < 60) weaknesses.push('Ball Control Under Pressure')
  if (stats.defending < 60) weaknesses.push('Defensive Positioning')
  if (stats.physical < 60) weaknesses.push('Physical Conditioning')

  if (weaknesses.length === 0) {
    weaknesses.push('Well-rounded player with no significant weaknesses')
  }

  return weaknesses
}

const getPlayingStyleDescription = (player) => {
  const position = player.position
  const stats = player.stats
  const strongFoot = player.strongFoot

  let description = `A ${player.age}-year-old ${position.toLowerCase()} with ${strongFoot.toLowerCase()} foot preference. `

  if (stats.pace > 70 && stats.dribbling > 70) {
    description += 'Known for explosive pace and exceptional ball control, capable of beating defenders in 1v1 situations. '
  }

  if (stats.passing > 70) {
    description += 'Demonstrates excellent vision and distribution, often creating chances for teammates. '
  }

  if (stats.defending > 70) {
    description += 'Shows strong defensive awareness with solid tackling and positioning. '
  }

  if (stats.physical > 70) {
    description += 'Possesses great physical strength and stamina, dominating aerial duels. '
  }

  description += `Preferred role: ${player.preferredRole}. An excellent addition for teams looking for ${position.toLowerCase()} options.`

  return description
}
</script>

<style scoped>
/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* FIFA Card Animations */
@keyframes scale-in-modal {
  from {
    opacity: 0;
    transform: scale(0.85) rotateX(20deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotateX(0deg);
  }
}

.animate-scale-in-modal {
  animation: scale-in-modal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* FIFA Card Styling */
.fifa-card {
  transform: perspective(2000px);
  transition: transform 0.3s ease;
}

.fifa-card:hover {
  transform: perspective(2000px) translateY(-4px);
}

.fifa-player-image {
  filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.9));
  transition: transform 0.3s ease;
}

.fifa-card:hover .fifa-player-image {
  transform: scale(1.05);
}

/* Animated Gradient */
@keyframes gradient-slow {
  0%, 100% {
    filter: hue-rotate(0deg) brightness(1);
  }
  50% {
    filter: hue-rotate(20deg) brightness(1.1);
  }
}

.animate-gradient-slow {
  animation: gradient-slow 10s ease-in-out infinite;
}

/* Glass Card Dark */
.glass-card-dark {
  background: rgba(15, 20, 25, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.glass-card-dark:hover {
  background: rgba(20, 25, 30, 0.7);
  border-color: rgba(79, 172, 254, 0.2);
}

/* Custom Scrollbar */
.scrollbar-custom {
  scrollbar-width: thin;
  scrollbar-color: rgba(79, 172, 254, 0.3) transparent;
}

.scrollbar-custom::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background: rgba(79, 172, 254, 0.3);
  border-radius: 3px;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background: rgba(79, 172, 254, 0.5);
}

/* Glow Effects */
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(79, 172, 254, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(79, 172, 254, 0.6);
  }
}
</style>
