<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <input
        v-model.number="localMin"
        @input="updateMin"
        type="number"
        :min="min"
        :max="max"
        class="w-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      <span class="text-white/60 text-sm">{{ label }}</span>
      <input
        v-model.number="localMax"
        @input="updateMax"
        type="number"
        :min="min"
        :max="max"
        class="w-20 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
    </div>

    <div class="relative pt-1">
      <div class="range-slider">
        <div
          class="range-slider-track"
          :style="{
            left: `${((localMin - min) / (max - min)) * 100}%`,
            width: `${((localMax - localMin) / (max - min)) * 100}%`
          }"
        ></div>
        <input
          v-model.number="localMin"
          @input="updateMin"
          type="range"
          :min="min"
          :max="max"
          :step="step"
          class="absolute w-full h-2 opacity-0 cursor-pointer z-10"
        />
        <input
          v-model.number="localMax"
          @input="updateMax"
          type="range"
          :min="min"
          :max="max"
          :step="step"
          class="absolute w-full h-2 opacity-0 cursor-pointer z-10"
        />
      </div>
    </div>

    <div class="flex justify-between text-xs text-white/50">
      <span>{{ formatValue(min) }}</span>
      <span>{{ formatValue(max) }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    validator: (value) => value.length === 2
  },
  min: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  step: {
    type: Number,
    default: 1
  },
  label: {
    type: String,
    default: ''
  },
  formatter: {
    type: Function,
    default: (value) => value.toString()
  }
})

const emit = defineEmits(['update:modelValue'])

const localMin = ref(props.modelValue[0])
const localMax = ref(props.modelValue[1])

watch(() => props.modelValue, (newValue) => {
  localMin.value = newValue[0]
  localMax.value = newValue[1]
}, { deep: true })

const updateMin = () => {
  if (localMin.value > localMax.value) {
    localMin.value = localMax.value
  }
  emit('update:modelValue', [localMin.value, localMax.value])
}

const updateMax = () => {
  if (localMax.value < localMin.value) {
    localMax.value = localMin.value
  }
  emit('update:modelValue', [localMin.value, localMax.value])
}

const formatValue = (value) => {
  return props.formatter(value)
}
</script>

<style scoped>
input[type="range"] {
  pointer-events: all;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 3;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: none;
  position: relative;
  z-index: 3;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.1);
}
</style>
