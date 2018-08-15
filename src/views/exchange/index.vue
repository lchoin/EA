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
        <el-col :xs="24" :sm="12" class="ea-title-l">{{$t('ea.p401')}}</el-col>
        <el-col :xs="24" :sm="12" class="ea-title-r">
           <!-- <div class="ea-title-right" @click="getWhichEadata(item.login,index)"  v-for="(item, index) in ea_user_info" :key="index" :class="active==index?'btn-active':''" >{{item.nick_name}}</div>                              -->
            <el-date-picker
              v-model="value1"
              @change="dataChange"
              type="date"
              value-format="yyyy-MM-dd"
              :clearable="false"
              placeholder="选择日期">
            </el-date-picker>
          <span class="select-des">{{$t('ea.p202')}}</span>
          <el-dropdown trigger="click" @command="selectEa">
                  <el-button type="primary">
                    {{eaname}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item, index) in ea_user_info" :key="index" :command="item.login">{{item.nick_name}}</el-dropdown-item>
                   
                  </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
    
    <div class="ea-chats ea-border" :style="{height: device=='mobile'?'auto':''}" >
      <div id="myChart"  :style="{width: '100%',height: device=='mobile'?'400px':'100%'}"></div>
    </div>
    <div >

    </div>
    
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import {getYMDEaList } from '@/api/years_earnings'
export default {
  // mixins: [resize],
  data() {
    return {
      active:0,
      eaname:"",
      value1: [new Date()],
      day:"",
      login:""

    };
  },
  mounted() {
    //this.drawLine();
  },
   computed: {
    ...mapGetters([
    'ea_user_info',
    'device'
    ])
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  created() {
    var date=new Date;
    var year=date.getFullYear(); 
    var month=date.getMonth()+1;
    var strDate = date.getDate();
            
    this.day=year+"-"+month+'-'+strDate;
    this.getEaInfo()
  },
  methods: {
    dataChange(val){
      //alert(1)
      console.log(val);
      this.day=val;
      this.getWhichEadata(this.login,this.day)
    },
    getEaInfo(obj){
      obj=obj||{}
      let that=this;
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      
      this.$store.dispatch('GetUserInfo', obj).then((res) => {
            loading.close();
            console.log("GetUserInfo",res);

            //alert("active")
            if(res.length>0){
              that.login=res[0].login
              that.getWhichEadata(res[0].login,that.day);
              that.eaname=res[0].nick_name
            }
          }).catch(() => {
            loading.close();
      })
    },
    selectEa(value){
      console.log(value)
      //this.eaname=value;
      this.ea_user_info.map((item,key)=>{
        if(item.login==value){
          this.eaname=item.nick_name;
          this.login=value;
        }
      })
      this.getWhichEadata(value,this.day)
   },
    getWhichEadata(id,day){
     
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      
      
      let obj={
        login:id,
        day
      }
      getYMDEaList(obj,"real_time_heat").then((res)=>{
        loading.close();
        let inData,openData,closeData,xData;
        // res.data.close_warehouse&&res.data.close_warehouse.map((item,key)=>{
        //   xData.push(item.hours);
        //   inData.push(item.profit_money);
        //   closeData.push(item.sum_volume);
        // });
        // res.data.open_warehouse&&res.data.open_warehouse.map((item,key)=>{
        //   openData.push(item.sum_volume);
        // });
        inData=res.data.close_warehouse_profit_money.y_data||[];
        openData=res.data.open_warehouse_volume.y_data||[];
        closeData=res.data.close_warehouse_volume.y_data||[];
        xData=res.data.close_warehouse_volume.x_axis||[];
        let optios={
          inData,openData,closeData,xData
        }
        this.drawLine(optios)
      }).catch(() => {
            loading.close();
      })
      
    },
    drawLine(optios) {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById("myChart"));
      this.chart.clear();
      let that = this;
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
          left: "30px",
          right: "30px",
          bottom: "30px",
          containLabel: true,
          borderWidth: 1,
          borderColor: "#ccc"
        }
      }
      window.addEventListener("resize", () => {
        this.chart.resize();
      });
      // 绘制图表
      this.chart.setOption({
        // title: {
        //   text: 'EA在所有Brokers的年度收益率',
        //   textStyle:{color:"#fff"}
        // },
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
          data: ["开仓","平仓","收益金额"],
          textStyle:{//图例文字的样式
              color:'#fff',
              //fontSize:16
          },
          
        },
        xAxis: [
          {
            type: "category",
            data: optios.xData||[],
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
            name: "手数",
            nameTextStyle:{
              color:"#fff"
            },
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
          {
            type: "value",
            name: "收益金额",
            nameTextStyle:{
              color:"#fff"
            },
            // min: 0,
            // max: 25,
            // interval: 5,
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
            // axisLabel: {
            //   //formatter: "{value} °C"
            // }
          }
        ],
        series: [
          {
            name: "开仓",
            type: "bar",
            barGap:'2%',
            barWidth:"20",
            itemStyle : {
								normal : {
									color:function(params) {
                    console.log("params",params.value)
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
                            {offset: 1, color: '#00cdfd'},
                              
                          ]
                      )
                    }
                    
                  }
								}
						},       
            data: optios.openData||[]
          },
          {
            name: "平仓",
            type: "bar",
            barGap:'2%',
            barWidth:"20",
            itemStyle : {
								normal : {
									color:new this.$echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#7375e4'},
                            {offset: 1, color: '#202189'}
                        ]
                    )
								}
						},
            data: optios.closeData||[]
          },
          {
            name: "收益金额",
            type: "line",
            symbol:'none',
            yAxisIndex: 1,
            itemStyle : {
								normal : {
									lineStyle:{
										color:'#ff434a'
									}
								}
						},
            data: optios.inData||[]
          }
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
    overflow-y: scroll
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
    
    //margin-bottom: 16px;
    .ea-title-l,
    .ea-title-r {
      margin-bottom: 16px;
      height: 24px;
      line-height: 24px;
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width:140px;
      }
      .el-input__inner {
        color:#fff;
        background-color: #000;
        height: 30px;
        
      }
      .el-input__icon{
        line-height: 1
      }
    }
    .ea-title-r {
      text-align: right;
      .select-des {
      color:#00b9e4;
      font-size: 14px;
      margin-left:10px
      
      
      
    }
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
      .ea-title-right {
        margin-left: 10px;
        background-color: #979797;
        font-size: 14px;
        padding: 0 10px;
        border-radius: 4px;
        height: 24px;
        line-height: 24px;
        cursor: pointer;
        display: inline-block;
      }
      .btn-active {
        background-color: #00cfff;
        color: #fff;
      }
    }
  }
  .ea-chats {
    width: 100%;
    height: calc(100vh - 180px);

    padding: 30px;
    position: relative;

    .ea-chats-main {
      width: 100%;
      height: 100%;
      border-left: 1px solid #1a3236;
      border-bottom: 1px solid #1a3236;
    }
  }
}
</style>

