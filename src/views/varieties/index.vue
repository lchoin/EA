<template>
  <div class="ea-annual">
    <!-- <div class="ea-title space-between">
      <div>EA在所有Brokers的年度收益率</div>
      <div class="center-center">
        <div class="ea-title-right">EA_LMAX</div>
        <div class="ea-title-right">EA_LMAX</div>
        <div class="ea-title-right">EA_LMAX</div>
      </div>
    </div> -->
    <div class="ea-title" style="height:auto">
      
      <el-row :gutter="0">
              <el-col :xs="24" :sm="12">{{$t('ea.p301')}}</el-col>
              <el-col :xs="24" :sm="12" style="text-align: right" class="time"> 
                <el-radio v-model="radio" label="1"  @change="checkedChange">{{$t('ea.qxall')}}</el-radio>
                <el-radio v-model="radio" label="2"  @change="checkedChange">
                  <el-dropdown trigger="click" @command="selectY">
                  <el-button type="primary">
                    {{start_y}} <span style="color:#00b9e4">{{$t('ea.year')}}</span><i class="el-icon-arrow-down el-icon--right" style="color:#00b9e4"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="year-(num+1)+y" v-for="y in num+1" :key="y">{{year-(num+1)+y}}{{$t('ea.year')}}</el-dropdown-item>
                    
                  </el-dropdown-menu>
                  </el-dropdown>
                  <el-dropdown trigger="click" @command="selectM">
                    <el-button type="primary">
                      {{start_m}} <span style="color:#00b9e4">{{$t('ea.mouth')}}</span><i class="el-icon-arrow-down el-icon--right" style="color:#00b9e4"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="i" v-for="i in 12" :key="i">{{i}}{{$t('ea.mouth')}}</el-dropdown-item>
                      
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-radio>
                
              </el-col>
        </el-row>
    </div>
    <!-- :style="{width: device=='mobile'?'100%':'85%', height: device=='mobile'?'400px':'400px'}" -->
    <div class="ea-chatss ea-border" :style="{padding:device=='mobile'?'5px':'30px'}">
      <div :style="{'display':myChart1?'block':'none',width: '100%', height: '100%'}" id="myChart1"  ></div>
      <div :style="{'display':myChart1?'none':'block'}"  style="text-align:center;color:#fff">{{$t('ea.nodata')}}</div>
    </div>

    <div class="ea-title" style="margin-top:30px;">
      {{$t('ea.p302')}}
    </div>
    
    <div class="ea-chatss ea-border" :style="{padding:device=='mobile'?'5px':'30px'}">
      <div :style="{'display':myChart2?'block':'none',width: '100%', height: '100%'}" id="myChart2"  ></div>
      <div :style="{'display':myChart2?'none':'block'}" style="text-align:center;color:#fff">{{$t('ea.nodata')}}</div>
    </div>


    
  </div>
  
</template>

<script>
import {getYMDEaList } from '@/api/years_earnings'
import { mapGetters } from 'vuex'
export default {
  // mixins: [resize],
  data() {
    return {
      radio:"1",
      start_y:'',
      start_m:'',
      end_time:'',
      year:2018,
      myChart1:true,
      myChart2:true,
    };
  },
  computed: {
    ...mapGetters([
    'device'
    ])
  },
  mounted() {
    // this.drawLine1();
    // this.drawLine2();
  },
  created() {
    var date=new Date;
    var year=date.getFullYear(); 
    var month=date.getMonth()+1;
    this.year=year;
    this.num=year-2018;
    this.start_y=year;
    this.start_m=month;
    let end_day=this.getDaysInYearMonth(this.start_y,this.start_m);
    let start_time=this.start_y+"-"+this.start_m+"-1";
    let end_time=this.start_y+"-"+this.start_m+"-"+end_day;
    let obj={
       start_time,
       end_time
     }
    this.handleSelect("symbol_volume","myChart1","chart1","bar","sum_volume");
    this.handleSelect("symbol_earnings","myChart2","chart2","bar","sum_profit")
  },
  beforeDestroy() {
    if (!this.chart1||!this.chart2) {
      return;
    }
    this.chart1.dispose();
    this.chart1 = null;
    this.chart2.dispose();
    this.chart2 = null;
  },
  methods: {
    checkedChange(val){
      console.log(val);
      this.radio=val;
      if(val=="1"){
        let obj={
          start_time:"",
          end_time:""
        }
        this.handleSelect("symbol_volume","myChart1","chart1","bar","sum_volume",obj);
        this.handleSelect("symbol_earnings","myChart2","chart2","bar","sum_profit",obj)
      }else{
        let end_day=this.getDaysInYearMonth(this.start_y,this.start_m);
        let start_time=this.start_y+"-"+this.start_m+"-1";
        let end_time=this.start_y+"-"+this.start_m+"-"+end_day;
        let obj={
          start_time,
          end_time
        }
        this.handleSelect("symbol_volume","myChart1","chart1","bar","sum_volume",obj);
        this.handleSelect("symbol_earnings","myChart2","chart2","bar","sum_profit",obj)
      }
      
     
    },
    getDaysInYearMonth(year, month){
        month = parseInt(month, 10);
        var date = new Date(year, month, 0);
        return date.getDate();
    },
    selectY(value){
      this.start_y=value;
      this.radio="2";
      let end_day=this.getDaysInYearMonth(this.start_y,this.start_m);
      let start_time=this.start_y+"-"+this.start_m+"-1";
      let end_time=this.start_y+"-"+this.start_m+"-"+end_day;
      let obj={
        start_time,
        end_time
      }
      //this.getAllEarnings("all_earnings_to_time","myChart3","charts03","bar",obj);
      this.handleSelect("symbol_volume","myChart1","chart1","bar","sum_volume",obj);
      this.handleSelect("symbol_earnings","myChart2","chart2","bar","sum_profit",obj)
    },
    selectM(value){
      this.start_m=value;
      this.radio="2";
      let end_day=this.getDaysInYearMonth(this.start_y,this.start_m);
      let start_time=this.start_y+"-"+this.start_m+"-1";
      let end_time=this.start_y+"-"+this.start_m+"-"+end_day;
      let obj={
        start_time,
        end_time
      }
      this.handleSelect("symbol_volume","myChart1","chart1","bar","sum_volume",obj);
      this.handleSelect("symbol_earnings","myChart2","chart2","bar","sum_profit",obj)
      //this.getAllEarnings("all_earnings_to_time","myChart3","charts03","bar",obj);
    },
     handleSelect(value,dome,num,type,sum,obj){
     dome=dome||"myChart1";
     num=num||"charts01";
     type=type||"bar";
     obj=obj||{}
     let that=this;
     const loading = this.$loading({
          lock: true,
          text: 'Loading',
          // spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      getYMDEaList(obj,value).then((res)=>{
        loading.close();
        if(res.data.length>0){
          that[dome]=true;
        }else{
          that[dome]=false;
          //console.log(this.myChart1)
          return;
        }
        
        let leData=[];
        let xAxis=[];
        let s=res.data||[];
        let series=[];
        let obj={
          name:value,
          type,
          value:[]
        }
        s.map((i,j)=>{
          //let obj={name:i,type:type,value:[]}
          xAxis.push(i.symbol);
          obj.value.push(i[sum])
          
        });
        series.push(obj)
        console.log(series);
        let options={
          leData,
          xAxis,
          series
        };
        that.handleDrawEachats(dome,num,type,options)
      })
   },
    handleDrawEachats(domeId,chartNum,type,options){
     //options={leData:[],series:[{name:"",type:"",value:[]},]}
      let that = this;
      this[chartNum]=this.$echarts.init(document.getElementById(domeId));
      let series=[];
      let colorsList=[['#033d46','#adeffc'],['#1f2289','#7475e4'],['#586466','#fcfcfc']]
      options.series.map((item,key)=>{
        let obj={
            name: item.name,
            type: item.type,
            barGap:'5%',
            barWidth:"10",
            data:item.value,
            itemStyle : {
								normal : {
									color:function(params) {
                    //console.log("params",params.value)
                    //let index=key%3;
                    let index=0;
                    if(type=="bar"){
                      if(params.value>0){
                      return new that.$echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: colorsList[index][1]},
                                {offset: 1, color: colorsList[index][0]}
                            ]
                        )
                      }else{
                        return new that.$echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                              {offset: 0, color: colorsList[index][0]},
                              {offset: 1, color: colorsList[index][1]},
                                
                            ]
                        )
                      }
                    }else{
                      return colorsList[index][1]
                    }
                    
                    
                  }
								}
						}, 

        };
        series.push(obj);
      });
      window.addEventListener("resize", () => {
        this[chartNum].resize();
      });
     
      let dataz,gridm;

      if(that.device=='mobile'){
        dataz=[
          {
          type: 'inside',//slider inside
              start: 0,
              end: 50
          },
          {
                start: 0,
                end: 10,
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleSize: '80%',
                handleStyle: {
                    color: '#fff',
                    shadowBlur: 3,
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                }
            }
        ];
        gridm={
          top:"5",
          left: "5px",
          right: "5px",
          bottom: "50px",
          containLabel: true,
          borderWidth: 1,
          borderColor: "#ccc"
        }
      }else{
        dataz=[];
        gridm={
          top:"10",
          left: "10px",
          right: "10px",
          bottom: "0px",
          containLabel: true,
          borderWidth: 1,
          borderColor: "#ccc"
        }
      }
      this[chartNum].setOption({
        grid: gridm,
        dataZoom:dataz,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: options.leData||[],
          textStyle:{//图例文字的样式
              color:'#fff',
              //fontSize:16
          }
        },
        xAxis:[
          {
            type: "category",
            data: options.xAxis||[],
            axisPointer: {
              type: "shadow"
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
            lineStyle: {
                type: "solid",
                color: "#1a3236", //线的颜色
                width: "1" //坐标线的宽度
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
            lineStyle: {
                type: "solid",
                color: "#1a3236", //线的颜色
                width: "1" //坐标线的宽度
              }
            },
            splitLine: {
            // 分隔线
            show: true, // 默认显示，属性show控制显示与否
            // onGap: null,
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              color: ["#1a3236"],
              width: 1,
              type: "solid"
            }
          } 
          },
        ],
        series:series

      })
   },
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      this.chart1 = this.$echarts.init(document.getElementById("myChart1"));

      let that = this;

      window.addEventListener("resize", () => {
        this.chart1.resize();
      });
      // 绘制图表
      this.chart1.setOption({
        // title: {
        //   text: 'EA在所有Brokers的年度收益率',
        //   textStyle:{color:"#fff"}
        // },
        grid: {
          top:"10",
          left: "10px",
          right: "10px",
          bottom: "0px",
          containLabel: true,
          borderWidth: 1,
          borderColor: "#ccc"
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ["line", "bar"] },
            // restore: { show: true },
            // saveAsImage: { show: true }
          }
        },
       
        xAxis: [
          {
            type: "category",
            data: ["00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00"],
            axisPointer: {
              type: "shadow"
            },
            axisLabel: {
              textStyle: {
                color: "#00b9e4"
              },
            lineStyle: {
                type: "solid",
                color: "#1a3236", //线的颜色
                width: "1" //坐标线的宽度
              }
            }
          }
        ],
        yAxis: [
          
          {
            type: "value",
            // name: "手数",
            // nameTextStyle:{
            //   color:"#fff"
            // },
            // min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
              formatter: "{value}"
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
            lineStyle: {
                type: "solid",
                color: "#1a3236", //线的颜色
                width: "1" //坐标线的宽度
              }
            },
            splitLine: {
            // 分隔线
            show: true, // 默认显示，属性show控制显示与否
            // onGap: null,
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              color: ["#1a3236"],
              width: 1,
              type: "solid"
            }
          } 
          },
         
        ],
        series: [
          {
            name: "开仓",
            type: "bar",
            barGap:'2%',
            barWidth:"50",
            itemStyle : {
								normal : {
								color:function(params){
                    if(params.value>0){
                      return new that.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#00cdfd'},
                              {offset: 1, color: '#004c57'}
                          ]
                      )
                    }else{
                      return new that.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#004c57'},
                              {offset: 1, color: '#00cdfd'}
                          ]
                      )
                    }
                  }
								}
						},       
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              -25.6,
              76.7,
              135.6,
              162.2,
              -32.6,
              20.0,
              6.4,
              3.3
            ]
          },
         
          
        ]
      });
    },
     drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      this.chart2 = this.$echarts.init(document.getElementById("myChart2"));

      let that = this;

      window.addEventListener("resize", () => {
        this.chart2.resize();
      });
      // 绘制图表
      this.chart2.setOption({
        // title: {
        //   text: 'EA在所有Brokers的年度收益率',
        //   textStyle:{color:"#fff"}
        // },
        grid: {
          top:"10",
          left: "10px",
          right: "10px",
          bottom: "0px",
          containLabel: true,
          borderWidth: 1,
          borderColor: "#ccc"
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ["line", "bar"] },
            // restore: { show: true },
            // saveAsImage: { show: true }
          }
        },
       
        xAxis: [
          {
            type: "category",
            data: ["00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00"],
            axisPointer: {
              type: "shadow"
            },
            axisLabel: {
              textStyle: {
                color: "#00b9e4"
              },
            lineStyle: {
                type: "solid",
                color: "#1a3236", //线的颜色
                width: "1" //坐标线的宽度
              }
            }
          }
        ],
        yAxis: [
          
          {
            type: "value",
            // name: "手数",
            // nameTextStyle:{
            //   color:"#fff"
            // },
            // min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
              formatter: "{value}"
            },
            axisLabel: {
              textStyle: {
                color: "#fff"
              },
            lineStyle: {
                type: "solid",
                color: "#1a3236", //线的颜色
                width: "1" //坐标线的宽度
              }
            },
            splitLine: {
            // 分隔线
            show: true, // 默认显示，属性show控制显示与否
            // onGap: null,
            lineStyle: {
              // 属性lineStyle（详见lineStyle）控制线条样式
              color: ["#1a3236"],
              width: 1,
              type: "solid"
            }
          } 
          },
         
        ],
        series: [
          {
            name: "开仓",
            type: "bar",
            barGap:'2%',
            barWidth:"50",
            label:{ 
              normal:{ 
              show: true, 
              color:"#fff",
              position: "top"} 
            },
            itemStyle : {
								normal : {
									color:function(params){
                    if(params.value>0){
                      return new that.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#00cdfd'},
                              {offset: 1, color: '#004c57'}
                          ]
                      )
                    }else{
                      return new that.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#004c57'},
                              {offset: 1, color: '#00cdfd'}
                          ]
                      )
                    }
                  }
								}
						},       
            data: [
              12.0,
              14.9,
              37.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              46.4,
              33.3
            ]
          },
         
          
        ]
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.mobile {
  .ea-annual {
    padding: 10px;
  }
}
.ea-annual {
  padding: 30px;
  width: 100%;
  height: calc(100vh - 70px);
  .ea-title {
    color: #fff;
    font-size: 18px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    //margin-bottom: 16px;
    .el-button--primary {
      height: 24px;
      padding:0 10px;
      line-height: 24px;
      background-color: #00b9e4;
      font-size: 14px;
      display: inline-block;
      
    }
    .time{
      .el-button--primary {
        background-color: unset;
        border:unset;
      }
    }
   
    
  }
  .ea-chatss {
    width: 100%;
    height: calc((100vh - 250px)/2);
    padding: 30px;
    position: relative;

    
  }
}
</style>

