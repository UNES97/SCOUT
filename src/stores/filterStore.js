import { defineStore } from 'pinia'
import { mockPlayers, filterOptions } from '../data/mockPlayers'

export const useFilterStore = defineStore('filters', {
  state: () => ({
    // Filter values
    filters: {
      positions: [],
      ageRange: [18, 28],
      strongFoot: null,
      heightRange: [150, 210],
      nationality: null,
      injuryHistory: []
    },

    // All players (unfiltered)
    allPlayers: mockPlayers,

    // Filtered players
    filteredPlayers: mockPlayers,

    // Pagination
    currentPage: 1,
    itemsPerPage: 15,

    // View mode
    viewMode: 'grid', // 'grid' or 'list'

    // Loading state
    isLoading: false,

    // Saved filter presets
    savedPresets: [],

    // Filter options from mock data
    filterOptions: filterOptions,

    // Favorited players (store player IDs)
    favoritedPlayerIds: []
  }),

  getters: {
    // Get total count of filtered players
    totalPlayers: (state) => state.filteredPlayers.length,

    // Get count of all players
    totalAllPlayers: (state) => state.allPlayers.length,

    // Check if any filters are active
    hasActiveFilters: (state) => {
      return (
        state.filters.positions.length > 0 ||
        state.filters.strongFoot !== null ||
        state.filters.nationality !== null ||
        state.filters.injuryHistory.length > 0 ||
        state.filters.ageRange[0] !== 18 ||
        state.filters.ageRange[1] !== 28 ||
        state.filters.heightRange[0] !== 150 ||
        state.filters.heightRange[1] !== 210
      )
    },

    // Get active filter count
    activeFilterCount: (state, getters) => {
      let count = 0
      if (state.filters.positions.length > 0) count++
      if (state.filters.strongFoot !== null) count++
      if (state.filters.nationality !== null) count++
      if (state.filters.injuryHistory.length > 0) count++
      if (state.filters.ageRange[0] !== 18 || state.filters.ageRange[1] !== 28) count++
      if (state.filters.heightRange[0] !== 150 || state.filters.heightRange[1] !== 210) count++
      return count
    },

    // Get paginated players to display
    displayedPlayers: (state) => {
      const endIndex = state.currentPage * state.itemsPerPage
      return state.filteredPlayers.slice(0, endIndex)
    },

    // Check if there are more players to load
    hasMorePlayers: (state) => {
      return state.filteredPlayers.length > state.currentPage * state.itemsPerPage
    },

    // Get favorited players
    favoritedPlayers: (state) => {
      return state.allPlayers.filter(player =>
        state.favoritedPlayerIds.includes(player.id)
      )
    },

    // Check if a player is favorited
    isPlayerFavorited: (state) => (playerId) => {
      return state.favoritedPlayerIds.includes(playerId)
    },

    // Get count of favorited players
    favoritedCount: (state) => {
      return state.favoritedPlayerIds.length
    }
  },

  actions: {
    // Apply all filters and update filtered players
    applyFilters() {
      this.isLoading = true
      this.currentPage = 1 // Reset pagination when filters change

      // Simulate slight delay for UX (remove in production with real API)
      setTimeout(() => {
        let filtered = [...this.allPlayers]

        // Filter by positions
        if (this.filters.positions.length > 0) {
          filtered = filtered.filter(player =>
            this.filters.positions.includes(player.position)
          )
        }

        // Filter by age range
        filtered = filtered.filter(player =>
          player.age >= this.filters.ageRange[0] &&
          player.age <= this.filters.ageRange[1]
        )

        // Filter by strong foot
        if (this.filters.strongFoot) {
          filtered = filtered.filter(player =>
            player.strongFoot === this.filters.strongFoot ||
            player.strongFoot === 'Both'
          )
        }

        // Filter by height range
        filtered = filtered.filter(player =>
          player.height >= this.filters.heightRange[0] &&
          player.height <= this.filters.heightRange[1]
        )

        // Filter by nationality
        if (this.filters.nationality) {
          filtered = filtered.filter(player =>
            player.nationality === this.filters.nationality
          )
        }

        // Filter by injury history
        if (this.filters.injuryHistory.length > 0) {
          filtered = filtered.filter(player => {
            if (this.filters.injuryHistory.includes('noMajorInjuries')) {
              return player.lastInjuryDate === null
            }
            if (this.filters.injuryHistory.includes('lastInjury12Months')) {
              if (player.lastInjuryDate === null) return true
              const monthsAgo = (new Date() - player.lastInjuryDate) / (1000 * 60 * 60 * 24 * 30)
              return monthsAgo >= 12
            }
            return true
          })
        }

        this.filteredPlayers = filtered
        this.isLoading = false
      }, 30) // Small delay for smooth UX
    },

    // Update a specific filter
    updateFilter(filterName, value) {
      this.filters[filterName] = value
      this.applyFilters()
    },

    // Toggle position filter
    togglePosition(position) {
      const index = this.filters.positions.indexOf(position)
      if (index > -1) {
        this.filters.positions.splice(index, 1)
      } else {
        this.filters.positions.push(position)
      }
      this.applyFilters()
    },

    // Toggle injury history filter
    toggleInjuryHistory(option) {
      const index = this.filters.injuryHistory.indexOf(option)
      if (index > -1) {
        this.filters.injuryHistory.splice(index, 1)
      } else {
        this.filters.injuryHistory.push(option)
      }
      this.applyFilters()
    },

    // Reset all filters to default
    resetFilters() {
      this.filters = {
        positions: [],
        ageRange: [18, 28],
        strongFoot: null,
        heightRange: [150, 210],
        nationality: null,
        injuryHistory: []
      }
      this.currentPage = 1
      this.applyFilters()
    },

    // Load more players (pagination)
    loadMore() {
      if (this.hasMorePlayers) {
        this.currentPage++
      }
    },

    // Toggle view mode between grid and list
    toggleViewMode() {
      this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid'
    },

    // Save current filter state as a preset
    savePreset(name) {
      const preset = {
        id: Date.now(),
        name,
        filters: JSON.parse(JSON.stringify(this.filters)),
        createdAt: new Date()
      }
      this.savedPresets.push(preset)

      // Save to localStorage
      localStorage.setItem('scout-presets', JSON.stringify(this.savedPresets))

      return preset
    },

    // Load a saved preset
    loadPreset(presetId) {
      const preset = this.savedPresets.find(p => p.id === presetId)
      if (preset) {
        this.filters = JSON.parse(JSON.stringify(preset.filters))
        this.applyFilters()
      }
    },

    // Delete a saved preset
    deletePreset(presetId) {
      const index = this.savedPresets.findIndex(p => p.id === presetId)
      if (index > -1) {
        this.savedPresets.splice(index, 1)
        localStorage.setItem('scout-presets', JSON.stringify(this.savedPresets))
      }
    },

    // Load saved presets from localStorage
    loadSavedPresets() {
      const saved = localStorage.getItem('scout-presets')
      if (saved) {
        try {
          this.savedPresets = JSON.parse(saved)
        } catch (e) {
          console.error('Error loading saved presets:', e)
        }
      }
    },

    // Toggle favorite player
    toggleFavorite(playerId) {
      const index = this.favoritedPlayerIds.indexOf(playerId)
      if (index > -1) {
        this.favoritedPlayerIds.splice(index, 1)
      } else {
        this.favoritedPlayerIds.push(playerId)
      }
      // Save to localStorage
      localStorage.setItem('scout-favorites', JSON.stringify(this.favoritedPlayerIds))
    },

    // Load favorited players from localStorage
    loadFavorites() {
      const saved = localStorage.getItem('scout-favorites')
      if (saved) {
        try {
          this.favoritedPlayerIds = JSON.parse(saved)
        } catch (e) {
          console.error('Error loading favorites:', e)
        }
      }
    },

    // Initialize store
    initialize() {
      this.loadSavedPresets()
      this.loadFavorites()
      this.applyFilters()
    }
  }
})
