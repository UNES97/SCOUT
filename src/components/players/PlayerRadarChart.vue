<template>
  <div :style="{ width: size + 'px', height: size + 'px' }" class="mx-auto">
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const props = defineProps({
  stats: {
    type: Object,
    required: true
  },
  size: {
    type: Number,
    default: 200
  }
})

const chartData = computed(() => ({
  labels: ['Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physical'],
  datasets: [
    {
      label: 'Stats',
      data: [
        props.stats.pace,
        props.stats.shooting,
        props.stats.passing,
        props.stats.dribbling,
        props.stats.defending,
        props.stats.physical
      ],
      backgroundColor: 'rgba(79, 172, 254, 0.25)',
      borderColor: 'rgba(79, 172, 254, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(79, 172, 254, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(79, 172, 254, 1)',
      pointRadius: 4,
      pointHoverRadius: 6
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(79, 172, 254, 0.3)',
      borderWidth: 1,
      padding: 8,
      displayColors: false,
      titleFont: {
        size: 11
      },
      bodyFont: {
        size: 11
      }
    }
  },
  scales: {
    r: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 20,
        color: 'rgba(255, 255, 255, 0.3)',
        backdropColor: 'transparent',
        font: {
          size: 8
        }
      },
      grid: {
        color: 'rgba(79, 172, 254, 0.15)'
      },
      angleLines: {
        color: 'rgba(79, 172, 254, 0.15)'
      },
      pointLabels: {
        color: 'rgba(255, 255, 255, 0.9)',
        font: {
          size: 11,
          weight: 'bold',
          family: 'Raleway'
        }
      }
    }
  },
  animation: {
    duration: 600,
    easing: 'easeOutCubic'
  }
}))
</script>
