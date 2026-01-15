<template>
  <img
    :src="`https://flagcdn.com/w20/${countryCode}.png`"
    :srcset="`https://flagcdn.com/w40/${countryCode}.png 2x`"
    :alt="alt || `${countryCode} flag`"
    :width="size"
    :class="['inline-block', 'rounded-sm', customClass]"
    loading="lazy"
  />
</template>

<script setup>
const props = defineProps({
  countryCode: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 20
  },
  alt: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>
