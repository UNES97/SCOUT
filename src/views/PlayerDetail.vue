<template>
  <div class="min-h-screen pb-12">
    <!-- Back Button -->
    <div class="fixed top-6 left-6 z-50">
      <button
        @click="goBack"
        class="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-white font-bold transition-all duration-200 backdrop-blur-xl shadow-lg hover:scale-105"
      >
        <ArrowLeft :size="20" />
        BACK TO PLAYERS
      </button>
    </div>

    <!-- Main Content -->
    <div class="max-w-[1600px] mx-auto px-6 pt-24">
      <div class="flex gap-8">
        <!-- Left Side - FIFA Card Style -->
        <div class="w-[420px] sticky top-24 self-start space-y-4">
          <!-- Glass Header Above Card -->
          <div class="relative rounded-xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg p-4">
            <div class="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-accent-500/10"></div>
            <div class="relative flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/30 flex items-center justify-center">
                  <Target :size="20" class="text-primary-400" />
                </div>
                <div>
                  <div class="text-xs text-white/50 font-semibold uppercase tracking-wider mb-0.5">Player Profile</div>
                  <div class="text-sm font-bold text-white">Scouting Card</div>
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                <div class="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50"></div>
                <span class="text-xs text-white/60 font-medium">Active</span>
              </div>
            </div>
          </div>

          <!-- FIFA-Style Player Card -->
          <div class="relative h-[700px] rounded-2xl overflow-hidden shadow-2xl fifa-card">
            <!-- Subtle Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"></div>
            <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

            <!-- Card Content -->
            <div class="relative h-full flex flex-col">
              <!-- Player Image - Covers Top Half -->
              <div class="h-[400px] relative">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <img
                  :src="player.photoUrl"
                  :alt="player.name"
                  class="w-full h-full object-cover fifa-player-image"
                />

                <!-- Overall Rating Badge - Top Left -->
                <div class="absolute top-4 left-4 z-10">
                  <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 shadow-xl">
                    <div class="text-4xl font-black text-white drop-shadow-lg mb-0.5">
                      {{ getOverallRating(player) }}
                    </div>
                    <div class="text-xs font-bold text-white/80 uppercase tracking-wider">
                      {{ getPositionAbbr(player.position) }}
                    </div>
                  </div>
                </div>

                <!-- Country Flag & Club Badge - Top Right -->
                <div class="absolute top-4 right-4 flex flex-col gap-1.5 z-10">
                  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20 shadow-xl">
                    <CountryFlag :country-code="player.nationalityCode" :size="32" />
                  </div>
                  <div class="w-14 h-14 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-xl">
                    <span class="text-base font-black text-white">{{ getClubInitials(player.club) }}</span>
                  </div>
                </div>
              </div>

              <!-- Bottom Content -->
              <div class="flex-1 p-5 flex flex-col">

              <!-- Player Name & Details -->
              <div class="relative mb-2">
                <h1 class="text-2xl font-black text-white mb-1.5 uppercase tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-center leading-tight">
                  {{ player.name }}
                </h1>
                <div class="flex items-center justify-center gap-2 text-white/90 text-xs font-bold drop-shadow-lg">
                  <span>{{ player.age }} YRS</span>
                  <span>•</span>
                  <span>{{ player.height }}CM</span>
                  <span>•</span>
                  <span>{{ player.strongFoot }}</span>
                </div>
              </div>

              <!-- Quick Stats - FIFA Style -->
              <div class="grid grid-cols-3 gap-x-3 gap-y-1.5 mb-3">
                <div class="text-center">
                  <div class="text-xs font-bold text-white/70 uppercase tracking-wide mb-0.5">PAC</div>
                  <div class="text-xl font-black text-white drop-shadow-lg">{{ player.stats.pace }}</div>
                </div>
                <div class="text-center">
                  <div class="text-xs font-bold text-white/70 uppercase tracking-wide mb-0.5">SHO</div>
                  <div class="text-xl font-black text-white drop-shadow-lg">{{ player.stats.shooting }}</div>
                </div>
                <div class="text-center">
                  <div class="text-xs font-bold text-white/70 uppercase tracking-wide mb-0.5">PAS</div>
                  <div class="text-xl font-black text-white drop-shadow-lg">{{ player.stats.passing }}</div>
                </div>
                <div class="text-center">
                  <div class="text-xs font-bold text-white/70 uppercase tracking-wide mb-0.5">DRI</div>
                  <div class="text-xl font-black text-white drop-shadow-lg">{{ player.stats.dribbling }}</div>
                </div>
                <div class="text-center">
                  <div class="text-xs font-bold text-white/70 uppercase tracking-wide mb-0.5">DEF</div>
                  <div class="text-xl font-black text-white drop-shadow-lg">{{ player.stats.defending }}</div>
                </div>
                <div class="text-center">
                  <div class="text-xs font-bold text-white/70 uppercase tracking-wide mb-0.5">PHY</div>
                  <div class="text-xl font-black text-white drop-shadow-lg">{{ player.stats.physical }}</div>
                </div>
              </div>

              <!-- Action Button -->
              <button
                @click="toggleFavorite"
                class="w-full py-2 rounded-lg font-bold text-xs text-white transition-all duration-200 shadow-lg hover:scale-105"
                :class="isFavorite ? 'bg-red-500/30 border-2 border-red-400/50 backdrop-blur-xl' : 'bg-white/10 border-2 border-white/20 backdrop-blur-xl hover:bg-white/20'"
              >
                <Heart :size="16" :fill="isFavorite ? 'currentColor' : 'none'" class="inline mr-1.5" />
                {{ isFavorite ? 'FAVORITED' : 'ADD TO FAVORITES' }}
              </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side - Stats & Info -->
        <div class="flex-1 space-y-6">
          <!-- Header Stats Cards -->
          <div class="grid grid-cols-4 gap-4">
            <div class="glass-card-dark p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                  <Building2 :size="22" class="text-primary-400" />
                </div>
                <div>
                  <div class="text-xs text-white/40 uppercase font-semibold mb-1">Club</div>
                  <div class="text-sm font-bold text-white">{{ player.club }}</div>
                </div>
              </div>
            </div>
            <div class="glass-card-dark p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                  <User :size="22" class="text-primary-400" />
                </div>
                <div>
                  <div class="text-xs text-white/40 uppercase font-semibold mb-1">Age</div>
                  <div class="text-sm font-bold text-white">{{ player.age }} years</div>
                </div>
              </div>
            </div>
            <div class="glass-card-dark p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                  <Ruler :size="22" class="text-primary-400" />
                </div>
                <div>
                  <div class="text-xs text-white/40 uppercase font-semibold mb-1">Height</div>
                  <div class="text-sm font-bold text-white">{{ player.height }} cm</div>
                </div>
              </div>
            </div>
            <div class="glass-card-dark p-5 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                  <Footprints :size="22" class="text-primary-400" />
                </div>
                <div>
                  <div class="text-xs text-white/40 uppercase font-semibold mb-1">Foot</div>
                  <div class="text-sm font-bold text-white">{{ player.strongFoot }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="flex gap-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="px-6 py-3 rounded-lg font-bold text-sm transition-all duration-200"
              :class="activeTab === tab.id ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70 border border-white/10'"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Tab Content -->
          <div class="space-y-6">
            <!-- Stats Tab -->
            <div v-if="activeTab === 'stats'" class="space-y-5">
              <!-- Radar Chart -->
              <div class="glass-card-dark p-6 rounded-xl border border-primary-500/20">
                <h2 class="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Activity :size="20" class="text-primary-400" />
                  Performance Overview
                </h2>
                <div class="flex justify-center mb-6">
                  <PlayerRadarChart :stats="player.stats" :size="380" />
                </div>
              </div>

              <!-- Detailed Stats Grid -->
              <div class="grid grid-cols-2 gap-4">
                <!-- Pace Breakdown -->
                <div class="glass-card-dark p-5 rounded-xl border border-white/10">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                      <Zap :size="24" class="text-primary-400" />
                    </div>
                    <div>
                      <div class="text-2xl font-black text-white">{{ player.stats.pace }}</div>
                      <div class="text-xs text-white/50 uppercase font-semibold">Pace</div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-white/60">Sprint Speed</span>
                      <span class="text-white font-semibold">{{ player.stats.pace }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-white/60">Acceleration</span>
                      <span class="text-white font-semibold">{{ Math.max(player.stats.pace - 5, 50) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Shooting Breakdown -->
                <div class="glass-card-dark p-5 rounded-xl border border-white/10">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                      <Target :size="24" class="text-primary-400" />
                    </div>
                    <div>
                      <div class="text-2xl font-black text-white">{{ player.stats.shooting }}</div>
                      <div class="text-xs text-white/50 uppercase font-semibold">Shooting</div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-white/60">Finishing</span>
                      <span class="text-white font-semibold">{{ player.stats.shooting }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-white/60">Shot Power</span>
                      <span class="text-white font-semibold">{{ Math.max(player.stats.shooting - 3, 50) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Passing Breakdown -->
                <div class="glass-card-dark p-5 rounded-xl border border-white/10">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                      <Share2 :size="24" class="text-primary-400" />
                    </div>
                    <div>
                      <div class="text-2xl font-black text-white">{{ player.stats.passing }}</div>
                      <div class="text-xs text-white/50 uppercase font-semibold">Passing</div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-white/60">Vision</span>
                      <span class="text-white font-semibold">{{ player.stats.passing }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-white/60">Short Passing</span>
                      <span class="text-white font-semibold">{{ Math.max(player.stats.passing - 2, 50) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Dribbling Breakdown -->
                <div class="glass-card-dark p-5 rounded-xl border border-white/10">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                      <Move :size="24" class="text-primary-400" />
                    </div>
                    <div>
                      <div class="text-2xl font-black text-white">{{ player.stats.dribbling }}</div>
                      <div class="text-xs text-white/50 uppercase font-semibold">Dribbling</div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-white/60">Ball Control</span>
                      <span class="text-white font-semibold">{{ player.stats.dribbling }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-white/60">Agility</span>
                      <span class="text-white font-semibold">{{ Math.max(player.stats.dribbling - 4, 50) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Defending Breakdown -->
                <div class="glass-card-dark p-5 rounded-xl border border-white/10">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                      <Shield :size="24" class="text-primary-400" />
                    </div>
                    <div>
                      <div class="text-2xl font-black text-white">{{ player.stats.defending }}</div>
                      <div class="text-xs text-white/50 uppercase font-semibold">Defending</div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-white/60">Interceptions</span>
                      <span class="text-white font-semibold">{{ player.stats.defending }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-white/60">Tackling</span>
                      <span class="text-white font-semibold">{{ Math.max(player.stats.defending - 3, 50) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Physical Breakdown -->
                <div class="glass-card-dark p-5 rounded-xl border border-white/10">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                      <Dumbbell :size="24" class="text-primary-400" />
                    </div>
                    <div>
                      <div class="text-2xl font-black text-white">{{ player.stats.physical }}</div>
                      <div class="text-xs text-white/50 uppercase font-semibold">Physical</div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div class="flex justify-between text-sm">
                      <span class="text-white/60">Strength</span>
                      <span class="text-white font-semibold">{{ player.stats.physical }}</span>
                    </div>
                    <div class="flex justify-between text-sm">
                      <span class="text-white/60">Stamina</span>
                      <span class="text-white font-semibold">{{ Math.max(player.stats.physical - 2, 50) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Analysis Tab -->
            <div v-if="activeTab === 'analysis'" class="space-y-5">
              <!-- Scouting Report -->
              <div class="glass-card-dark p-6 rounded-xl border border-white/10">
                <h2 class="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <Target :size="20" class="text-primary-400" />
                  Scouting Assessment
                </h2>

                <div class="mb-6">
                  <h3 class="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide">Key Strengths</h3>
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
                  <h3 class="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wide">Development Areas</h3>
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
              <div class="glass-card-dark p-6 rounded-xl border border-white/10">
                <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles :size="20" class="text-primary-400" />
                  Playing Profile
                </h2>
                <p class="text-white/70 leading-relaxed text-sm">
                  {{ getPlayingStyleDescription(player) }}
                </p>
              </div>

              <!-- Physical Attributes -->
              <div class="glass-card-dark p-6 rounded-xl border border-white/10">
                <h2 class="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <Activity :size="20" class="text-primary-400" />
                  Physical Profile
                </h2>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Height</span>
                    <span class="text-base font-bold text-white">{{ player.height }} cm</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Strong Foot</span>
                    <span class="text-base font-bold text-white">{{ player.strongFoot }}</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Age</span>
                    <span class="text-base font-bold text-white">{{ player.age }} years</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Nationality</span>
                    <span class="text-base font-bold text-white">{{ player.nationality }}</span>
                  </div>
                </div>
              </div>

              <!-- Fitness Status -->
              <div class="glass-card-dark p-6 rounded-xl border border-white/10">
                <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Heart :size="20" class="text-primary-400" />
                  Fitness Status
                </h2>
                <div v-if="player.lastInjuryDate === null" class="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div class="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span class="text-white/80 font-medium text-sm">No recent injury history</span>
                </div>
                <div v-else class="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  <AlertCircle :size="18" class="text-yellow-400" />
                  <span class="text-white/80 font-medium text-sm">Last injury: {{ formatDate(player.lastInjuryDate) }}</span>
                </div>
              </div>
            </div>

            <!-- Career Tab -->
            <div v-if="activeTab === 'career'" class="space-y-5">
              <!-- Career Info -->
              <div class="glass-card-dark p-6 rounded-xl border border-white/10">
                <h2 class="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <Calendar :size="20" class="text-primary-400" />
                  Career Information
                </h2>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Current Club</span>
                    <span class="text-base font-bold text-white">{{ player.club }}</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Position</span>
                    <span class="text-base font-bold text-white">{{ player.position }}</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Preferred Role</span>
                    <span class="text-base font-bold text-white">{{ player.preferredRole }}</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Nationality</span>
                    <div class="flex items-center gap-2">
                      <CountryFlag :country-code="player.nationalityCode" :size="20" />
                      <span class="text-base font-bold text-white">{{ player.nationality }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contract Status -->
              <div class="glass-card-dark p-6 rounded-xl border border-white/10">
                <h2 class="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <FileText :size="20" class="text-primary-400" />
                  Contract Details
                </h2>
                <div class="space-y-3 mb-5">
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Contract Expires</span>
                    <span class="text-base font-bold text-white">{{ formatDate(player.contractExpires) }}</span>
                  </div>
                </div>
                <div class="flex flex-wrap gap-2">
                  <div v-if="player.isFreeAgent" class="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                    <Check :size="16" class="text-white/60" />
                    <span class="text-white/80 font-medium text-sm">Free Agent</span>
                  </div>
                  <div v-if="player.isLoanAvailable" class="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                    <ArrowRightLeft :size="16" class="text-white/60" />
                    <span class="text-white/80 font-medium text-sm">Loan Available</span>
                  </div>
                  <div v-if="player.contractExpiringSoon" class="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                    <Clock :size="16" class="text-white/60" />
                    <span class="text-white/80 font-medium text-sm">Contract Expiring</span>
                  </div>
                  <div v-if="!player.isFreeAgent && !player.isLoanAvailable && !player.contractExpiringSoon" class="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                    <Shield :size="16" class="text-white/60" />
                    <span class="text-white/80 font-medium text-sm">Under Contract</span>
                  </div>
                </div>
              </div>

              <!-- Additional Info -->
              <div class="glass-card-dark p-6 rounded-xl border border-white/10">
                <h2 class="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <Info :size="20" class="text-primary-400" />
                  Additional Details
                </h2>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Overall Rating</span>
                    <span class="text-base font-bold text-white">{{ getOverallRating(player) }}</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Height</span>
                    <span class="text-base font-bold text-white">{{ player.height }} cm</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Dominant Foot</span>
                    <span class="text-base font-bold text-white">{{ player.strongFoot }}</span>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Age</span>
                    <span class="text-base font-bold text-white">{{ player.age }} years old</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Tab -->
            <div v-if="activeTab === 'contact'" class="space-y-5">
              <!-- Player Contact -->
              <div class="glass-card-dark p-6 rounded-xl border border-white/10">
                <h2 class="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <UserCircle :size="20" class="text-primary-400" />
                  Player Contact
                </h2>
                <div class="space-y-3">
                  <div class="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                    <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Mail :size="18" class="text-primary-400" />
                    </div>
                    <div class="flex-1">
                      <span class="text-xs text-white/50 font-medium block mb-1">Email</span>
                      <a :href="'mailto:' + player.contact.email" class="text-sm font-bold text-white hover:text-primary-400 transition-colors">{{ player.contact.email }}</a>
                    </div>
                  </div>
                  <div class="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                    <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Phone :size="18" class="text-primary-400" />
                    </div>
                    <div class="flex-1">
                      <span class="text-xs text-white/50 font-medium block mb-1">Phone</span>
                      <a :href="'tel:' + player.contact.phone" class="text-sm font-bold text-white hover:text-primary-400 transition-colors">{{ player.contact.phone }}</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Agent Contact -->
              <div class="glass-card-dark p-6 rounded-xl border border-white/10">
                <h2 class="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <User :size="20" class="text-primary-400" />
                  Agent Information
                </h2>
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <span class="text-sm text-white/50 font-medium">Agent Name</span>
                    <span class="text-base font-bold text-white">{{ player.contact.agent.name }}</span>
                  </div>
                  <div class="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                    <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Mail :size="18" class="text-primary-400" />
                    </div>
                    <div class="flex-1">
                      <span class="text-xs text-white/50 font-medium block mb-1">Email</span>
                      <a :href="'mailto:' + player.contact.agent.email" class="text-sm font-bold text-white hover:text-primary-400 transition-colors">{{ player.contact.agent.email }}</a>
                    </div>
                  </div>
                  <div class="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                    <div class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Phone :size="18" class="text-primary-400" />
                    </div>
                    <div class="flex-1">
                      <span class="text-xs text-white/50 font-medium block mb-1">Phone</span>
                      <a :href="'tel:' + player.contact.agent.phone" class="text-sm font-bold text-white hover:text-primary-400 transition-colors">{{ player.contact.agent.phone }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFilterStore } from '../stores/filterStore'
import PlayerRadarChart from '../components/players/PlayerRadarChart.vue'
import CountryFlag from '../components/ui/CountryFlag.vue'
import StrengthBadge from '../components/players/StrengthBadge.vue'
import {
  ArrowLeft, Heart, Activity, TrendingUp, Calendar, Target, Sparkles,
  Check, ArrowRightLeft, Clock, AlertCircle, Shield,
  Building2, BarChart3, FileText, User, Ruler, Footprints, Info,
  Zap, Share2, Move, Dumbbell, Mail, Phone, UserCircle
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const store = useFilterStore()

// Get player ID from route params
const playerId = parseInt(route.params.id)
const player = computed(() => store.allPlayers.find(p => p.id === playerId))

// Redirect if player not found
if (!player.value) {
  router.push('/')
}

const activeTab = ref('stats')
const isFavorite = computed(() => store.isPlayerFavorited(playerId))

const tabs = [
  { id: 'stats', label: 'STATS' },
  { id: 'analysis', label: 'ANALYSIS' },
  { id: 'career', label: 'CAREER' },
  { id: 'contact', label: 'CONTACT' }
]

const goBack = () => {
  router.push('/')
}

const toggleFavorite = () => {
  store.toggleFavorite(playerId)
}

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
/* FIFA Card Styling */
.fifa-card {
  transform: perspective(2000px);
}

.fifa-player-image {
  filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.9));
}

/* Glass Card Dark */
.glass-card-dark {
  background: rgba(15, 20, 25, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
