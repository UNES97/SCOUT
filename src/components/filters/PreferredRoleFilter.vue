<template>
  <div class="filter-section">
    <label class="filter-label">Preferred Role</label>
    <div class="grid grid-cols-1 gap-2">
      <button
        v-for="role in roles"
        :key="role"
        @click="toggleRole(role)"
        class="badge-button text-left"
        :class="{ active: store.filters.preferredRoles.includes(role) }"
      >
        {{ role }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useFilterStore } from '../../stores/filterStore'

const store = useFilterStore()

const roles = [
  'Box-to-Box',
  'Playmaker',
  'Target Man',
  'Inverted Winger',
  'Ball Playing Defender',
  'Sweeper Keeper',
  'Deep Lying Playmaker',
  'Ball Winner',
  'False Nine',
  'Complete Forward'
]

const toggleRole = (role) => {
  store.toggleRole(role)
}
</script>
