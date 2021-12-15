<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null,
      data: [
        { name: '拉萨', value: 24, phone: 12345678910, worker: '张三' },
        { name: '上海', value: 25, phone: 12345678910, worker: '张三' },
        { name: '威海', value: 25, phone: 12345678910, worker: '张三' },
        { name: '厦门', value: 26, phone: 12345678910, worker: '张三' },
        { name: '福州', value: 29, phone: 12345678910, worker: '张三' },
        { name: '广州', value: 38, phone: 12345678910, worker: '张三' },
        { name: '深圳', value: 41, phone: 12345678910, worker: '张三' },
        { name: '珠海', value: 42, phone: 12345678910, worker: '张三' },
        { name: '大连', value: 47, phone: 12345678910, worker: '张三' },
        { name: '苏州', value: 50, phone: 12345678910, worker: '张三' },
        { name: '三亚', value: 54, phone: 12345678910, worker: '张三' },
        { name: '吉林', value: 56, phone: 12345678910, worker: '张三' },
        { name: '杭州', value: 84, phone: 12345678910, worker: '张三' },
        { name: '武汉', value: 273, phone: 12345678910, worker: '张三' }
      ],
      geoCoordMap: {
        拉萨: [91.11, 29.57],
        上海: [121.48, 31.22],
        威海: [122.1, 37.5],
        厦门: [118.1, 24.46],
        福州: [119.3, 26.08],
        广州: [113.23, 23.16],
        深圳: [114.07, 22.62],
        珠海: [113.52, 22.3],
        大连: [121.62, 38.92],
        苏州: [120.62, 31.32],
        三亚: [109.511909, 18.252847],
        吉林: [126.57, 43.87],
        杭州: [120.19, 30.26],
        武汉: [114.31, 30.52]
      }
    }
  },
  mounted() {
    this.initChart()
  },
  // beforeDestroy() {
  //   if (!this.chart) {
  //     return
  //   }
  //   this.chart.dispose()
  //   this.chart = null
  // },
  methods: {
    convertData(data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        var geoCoord = this.geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value).concat(data[i].phone),
            phone: data[i].phone,
            worker: data[i].worker
          })
        }
      }
      return res
    },
    initChart() {
      console.log(this.convertData(this.data))
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        title: {
          text: '智能监测救援系统',
          textStyle: {
            // color: '#ccc',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontFamily: 'sans-serif',
            fontSize: 28
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: 'water',
                elementType: 'all',
                stylers: {
                  color: '#66ccff'
                }
              },
              {
                featureType: 'land',
                elementType: 'all',
                stylers: {
                  color: '#f3f3f3'
                }
              },
              {
                featureType: 'railway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'highway',
                elementType: 'all',
                stylers: {
                  color: '#fdfdfd'
                }
              },
              {
                featureType: 'highway',
                elementType: 'labels',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'poi',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'green',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'subway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'manmade',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'local',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'labels',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'boundary',
                elementType: 'all',
                stylers: {
                  color: '#fefefe'
                }
              },
              {
                featureType: 'building',
                elementType: 'all',
                stylers: {
                  color: '#d1d1d1'
                }
              },
              {
                featureType: 'label',
                elementType: 'labels.text.fill',
                stylers: {
                  color: '#999999'
                }
              }
            ]
          }
        },
        series: [
          {
            name: '在线节点',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: this.convertData(this.data),
            symbolSize: 14,
            encode: {
              value: 2
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            // label: {
            //   formatter: '{b}',
            //   position: 'right',
            //   show: true
            // },
            itemStyle: {
              color: '#33ff00',
              shadowBlur: 10,
              shadowColor: '#66ff66'
            },
            zlevel: 1
          }
        ]
      })
    }
  }
}
</script>
