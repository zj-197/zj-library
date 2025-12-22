<template>
    <div ref="chartRef" class="chart-container"></div>
</template>

<script setup lang="ts">
import { useAxisChart, usePieChart } from '@zj-library/vue-hooks'
import { ref } from 'vue'
const chartRef = ref<HTMLElement | null>(null)
const chart = useAxisChart(chartRef, [
    {
        seriesDataKey: 'count',
        seriesName: '数量',
        seriesType: 'line'
    }
])
chart.options.value.setDataZoom([{
    type: 'linear',
}])

console.log(chart.options.value.dataZoom, 'xxx')
</script>
