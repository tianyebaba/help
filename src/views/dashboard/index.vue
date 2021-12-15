<template>
  <div class="chart-container">
    <chart height="80%" width="80%" />
  </div>
</template>

<script>
import Chart from '@/components/Charts/LineMarker'

export default {
  name: 'LineChart',
  components: { Chart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 98%;
  height: calc(100vh - 84px);
  margin: 1%;
}
</style>

