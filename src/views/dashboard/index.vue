<template>
  <div class="charts">
    <!-- <img src="@/assets/layout/welcome.png" alt=""> -->
    <!-- <BaseLine :options = 'options'></BaseLine>
    <el-button @click="handleData">更换数据</el-button> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive} from 'vue'
import BaseLine from '@/components/Echarts/Base-chart-line.vue'

const options = reactive({
  series: [
          {
            data: [{
            value: 900,
            itemStyle: {
              color: '#A52DE6'
            }
          },100],
            type: "bar",
            barWidth : 90,
            itemStyle: {
              barBorderRadius: [5, 5, 0, 0]
            },
            label: {
              show: true,
              color: "#999",
              fontSize: 12,
              position: "top"
            }
          }
        ]
})
const handleData = () => {
  options.series[0].data[1] =300
  console.log(options.series[0].data[1])
}
</script>


<style scoped>
.charts {
  width: 100%;
  height: 100%;
  background: url('@/assets/layout/welcome.png') no-repeat transparent center center;
  background-size: 100% 100%;
  /* background-color: #000; */
}
</style>