<template>
  <aside class="w-80 h-full fixed left-0 top-0 overflow-y-auto scrollbar-custom">
    <GlassmorphicCard class="m-4 animate-slide-up">
      <!-- Header -->
      <div class="mb-6 pb-4 border-b border-white/10">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-white flex items-center gap-2">
            <SlidersHorizontal :size="24" />
            Filters
          </h2>
          <button
            v-if="store.hasActiveFilters"
            @click="resetAll"
            class="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1"
          >
            <RotateCcw :size="14" />
            Reset
          </button>
        </div>

        <!-- Results Counter -->
        <div class="flex items-center gap-2 text-sm">
          <div class="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
              :style="{ width: `${(store.totalPlayers / store.totalAllPlayers) * 100}%` }"
            ></div>
          </div>
          <span class="text-white/90 font-medium whitespace-nowrap">
            {{ store.totalPlayers }} / {{ store.totalAllPlayers }}
          </span>
        </div>
      </div>

      <!-- Saved Presets -->
      <div v-if="store.savedPresets.length > 0" class="mb-6">
        <label class="filter-label">Saved Presets</label>
        <div class="space-y-2">
          <div
            v-for="preset in store.savedPresets"
            :key="preset.id"
            class="flex items-center gap-2"
          >
            <button
              @click="store.loadPreset(preset.id)"
              class="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm text-left hover:bg-white/10 transition-colors"
            >
              {{ preset.name }}
            </button>
            <button
              @click="store.deletePreset(preset.id)"
              class="p-2 text-white/50 hover:text-red-400 transition-colors"
            >
              <Trash2 :size="16" />
            </button>
          </div>
        </div>
        <button
          v-if="store.hasActiveFilters"
          @click="showSavePresetDialog = true"
          class="mt-2 w-full px-3 py-2 bg-primary-500/20 border border-primary-500/30 rounded-lg text-primary-300 text-sm hover:bg-primary-500/30 transition-colors flex items-center justify-center gap-2"
        >
          <Save :size="16" />
          Save Current Filters
        </button>
      </div>

      <!-- Save Preset Button (if no presets yet) -->
      <div v-else-if="store.hasActiveFilters" class="mb-6">
        <button
          @click="showSavePresetDialog = true"
          class="w-full px-3 py-2 bg-primary-500/20 border border-primary-500/30 rounded-lg text-primary-300 text-sm hover:bg-primary-500/30 transition-colors flex items-center justify-center gap-2"
        >
          <Save :size="16" />
          Save as Preset
        </button>
      </div>

      <!-- All Filter Components -->
      <PositionFilter />
      <AgeRangeFilter />
      <StrongFootFilter />
      <HeightRangeFilter />
      <NationalityFilter />
      <InjuryHistoryFilter />
    </GlassmorphicCard>

    <!-- Save Preset Dialog -->
    <div
      v-if="showSavePresetDialog"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      @click.self="showSavePresetDialog = false"
    >
      <GlassmorphicCard class="w-96 m-4">
        <h3 class="text-lg font-bold text-white mb-4">Save Filter Preset</h3>
        <input
          v-model="presetName"
          type="text"
          placeholder="Enter preset name..."
          class="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
          @keyup.enter="savePreset"
        />
        <div class="flex gap-2">
          <button
            @click="showSavePresetDialog = false"
            class="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="savePreset"
            :disabled="!presetName.trim()"
            class="flex-1 px-4 py-2 bg-primary-500 rounded-lg text-white hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </GlassmorphicCard>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useFilterStore } from '../../stores/filterStore'
import GlassmorphicCard from '../ui/GlassmorphicCard.vue'
import PositionFilter from './PositionFilter.vue'
import AgeRangeFilter from './AgeRangeFilter.vue'
import StrongFootFilter from './StrongFootFilter.vue'
import HeightRangeFilter from './HeightRangeFilter.vue'
import NationalityFilter from './NationalityFilter.vue'
import InjuryHistoryFilter from './InjuryHistoryFilter.vue'
import { SlidersHorizontal, RotateCcw, Save, Trash2 } from 'lucide-vue-next'

const store = useFilterStore()
const showSavePresetDialog = ref(false)
const presetName = ref('')

const resetAll = () => {
  store.resetFilters()
}

const savePreset = () => {
  if (presetName.value.trim()) {
    store.savePreset(presetName.value.trim())
    presetName.value = ''
    showSavePresetDialog.value = false
  }
}
</script>
