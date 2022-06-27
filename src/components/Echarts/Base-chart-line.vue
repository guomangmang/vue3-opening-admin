<template>
  <div :id="uuid" style="height:100%;width:100%"></div>
</template>

<script setup lang="ts">
import {merge} from 'lodash-es'
import { onMounted, watch, reactive } from 'vue'
import * as echarts from 'echarts'


const options = reactive({
        grid: {
          top: 25,
          right: 10,
          left: 30,
          bottom: 20
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: 'rgba(0,0,0,0.6)',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          textStyle: {
            color: "#d7e3ff",
            fontSize:12,
          },
          itemWidth: 16,
          itemHeight: 16,
          bottom:"bottom"
        },
        color: ['#387BFF'],
        xAxis: {
          type: 'category',
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.1)'
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255, 255, 255, 0.4)',  //更改坐标轴文字颜色
              }
            },
            axisTick: {
              show: false,
            },
            data: [],
        },
        yAxis: [
          {
            name: "",
            type: "value",
            nameTextStyle:{
              fontSize: (12),
              color: "#999",
            },
            axisLabel: {
              margin: 8,
              textStyle: {
                fontSize: 12,
                color: "#999",
              },
            },
            //设置轴线的属性
            axisLine: {
              show:false,
            },
            axisTick: {
              show:false
            },
            // 控制背景网格线是否显示
           splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          }
        ],
        series: [
          {
            data: [{
            value: 200,
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
const props = defineProps({
  options:{
    type:Object,
    default:{}
  }
})
const idGen = () => {
  return new Date().getTime()
}
let uuid = idGen()
let charts = null
const initEcharts = () => {
  if(!charts) {
    const dom = document.getElementById(uuid.toString())
    charts = echarts.init(dom)
    window.addEventListener("resize", () => {
      charts.resize();
    });
  }else {
    return
  }
  if(!props.options) return
  let option = merge({},options,props.options)
  // charts.setOption(props.options)
  charts.setOption(option)
};
watch(
  props.options,
  () => {
    if(charts) {
      charts.setOption(props.options)
    }
  },
  {deep:true}
)
onMounted(() => {
  initEcharts()
})
</script>

<style scoped>

</style>