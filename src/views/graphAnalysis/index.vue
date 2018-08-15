<template>
  <div class="ea-grap">
    <el-row :gutter="20">
        <el-col :xs="24" :sm="12" class="ea-grap-item">
          <div class="ea-item-title">
            <el-row :gutter="0">
              <el-col :xs="12" :sm="12">{{$t('ea.p101')}}</el-col>
              <el-col :xs="12" :sm="12" style="text-align: right">
                <span class="select-des">{{$t('ea.p1unit')}}</span>
                <el-dropdown trigger="click" @command="selectEa">
                  <el-button type="primary">
                    {{eaname}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="year_earnings">{{$t('ea.p1unity')}}</el-dropdown-item>
                    <el-dropdown-item command="month_earnings">{{$t('ea.p1unitm')}}</el-dropdown-item>
                    <el-dropdown-item command="day_earnings">{{$t('ea.p1unitd')}}</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
            
          </div>
          <div class="ea-item-main ea-border" >
            <div id="myChart1"  :style="{width: '100%', height: '100%'}"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" class="ea-grap-item">
          <!-- <div class="ea-item-title">EA在所有Brokers的盈利排行</div> -->
          <div class="ea-item-title">
            <el-row :gutter="0">
              <el-col :xs="12" :sm="12">{{$t('ea.p102')}}</el-col>
              <el-col :xs="12" :sm="12" style="text-align: right" class="time"> 
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
              </el-col>
            </el-row>
            
          </div>
          <div class="ea-item-main ea-border">
            <div class="mychart" v-if="!myChart3">{{$t('ea.nodata')}}</div>
            <div id="myChart3"  :style="{width: '100%', height: '100%',display:myChart3?'block':'none'}"></div>  
          </div>                      
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" class="ea-grap-item" >
          <div class="ea-item-title">{{$t('ea.p103')}}</div>
          <div class="ea-item-main ea-border" style="height:362px">
            <div id="myChart2"  :style="{width: '100%', height: '100%'}"></div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" class="ea-grap-item" >
          <div class="ea-item-title">{{$t('ea.p104')}}</div>
          <div class="ea-item-main ea-border" style="height:362px">
            <div class="mychart" v-if="!myChart4">{{$t('ea.nodata')}}</div>
            <div id="myChart4"  :style="{width: '100%', height: '100%',display:myChart4?'block':'none'}"></div>
          </div>                      
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="24">
          <div class="ea-item-title">{{$t('ea.p105')}}</div>
          <div class="ea-item-main2 ea-border">
            <el-row :gutter="0" v-for="(items,index) in group" :key="index">
              <el-col :xs="24" :sm="24/items.length" v-for="(item,i) in items" :key="i">
               <div class="ea-grap-item">
                 <div :id="item.ea_name"  :style="{width: '100%', height: '100%'}"></div>
               </div>
                
              </el-col>
              
            </el-row>
          </div>
        </el-col>
        
      </el-row>
  </div>
  
</template>

<script>
//import echarts from 'echarts'
//getYMDEaList
import { mapGetters } from 'vuex'
import {getYMDEaList } from '@/api/years_earnings'
export default {
  // mixins: [resize],
  data() {
    return {
      eaname:this.$t('ea.p1unitd'),
      group:[],
      value6: '',
      start_y:'',
      start_m:'',
      end_time:'',
      myChart3:true,
      year:2018,
      num:0,
      myChart4:true,
    };
  },
  //console.log(this.$store.getters.language)
  computed: {
    ...mapGetters([
    'years_earnings',
    'ea_user_info',
    'device',
    'language'
    ]),
    
  },
  created() {
    console.log("language",this.language)
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
     this.getGroudsList();
     this.handleSelect("day_earnings","myChart1","charts01","bar");
     this.getWeekEarnings();
     this.getAllEarnings("all_earnings_to_time","myChart3","charts03","bar",obj);
     this.getAllEarnings("all_earnings","myChart4","charts04","pie");
    //"myChart4","charts04","pie",
  },
  mounted() {
   //this.drawLine1();
   //this.handleDrawEachats("myChart1","charts01","bar",{leData:["test"],xAxis:["1","2","3"],series:[{name:"test",type:"bar",value:[1,2,3]},{name:"test",type:"bar",value:[1,2,3]}]})
  },
 beforeDestroy() {
    if (!this.chart01) {
      return;
    }
    this.chart01.dispose();
    this.chart01 = null;
  },
  methods: {
  getDaysInYearMonth(year, month){
      month = parseInt(month, 10);
      var date = new Date(year, month, 0);
      return date.getDate();
  },
  //去除数组中的空[]
	trimSpace(array){
			 for(var i = 0 ;i<array.length;i++)
			 {
	             if(array[i].values.length==0)
	             {
	                      array.splice(i,1);
	                      i= i-1;
	                  
	             }else{
                 array[i].values=this.trimMinus(array[i].values);
                 console.log("array[i].values",array[i].values)
               }
			 }
			 return array;
		},
  //去除数组中的负数
	trimMinus(array){
			 for(var k = 0 ;k<array.length;k++)
			 {
	             if(array[k].value<0||array[k].sum_profit<0)
	             { //debugger
	                      array.splice(k,1);
	                      k= k-1;
	                  
	             }
			 }
			 return array;
		},
   getGroudsList(){
     let that=this;
     getYMDEaList({},"symbol_earnings_group_login").then((res)=>{
       //this.createdGroundPie("myChart5","charts05",{leData:[],values:[{name:"",value:""}],colors:[]})
        console.log(res.data)
        let groud=that.trimSpace(res.data);
        if(groud.length>0){
          var result = [];
          
          for(var i=0,len=groud.length;i<len;i+=3){
              result.push(groud.slice(i,i+3));
          }
          that.group=result;
          
          console.log("result",result);
          let colorsList=[
            ["#1dadd5","#bde3f6","#91d1f0","#66beeb","#3aace5","#0f9ae0","#0d7fb8","#0a638f","#074666","#052a3e"],
            ["#5f61bc","#6a6cd1","#7476e5","#8082e7","#8d8ee9","#999bec","#a6a7ee","#b3b4f0","#bfc0f3","#cccdf5"],
            ["#2f2f2f","#464646","#5d5d5d","#747474","#8c8c8c","#a3a3a3","#bababa","#d1d1d1","#e8e8e8","#ffffff"]
          ]
          setTimeout(()=>{
            groud.map((item,key)=>{
              
              if(item.values.length>0){
                let leData=[];
                let colors=[];
                let id=item.ea_name;
                let num=item.ea_name+key;
                
                //let cl = [parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10), parseInt(Math.random() * 10)];
                let cl=colorsList[key%3]

                item.values.map((i,k)=>{
                  let m = 1.9 - 3 / 9;
                  // let clstring= "#" + parseInt(cl[0] / m) + parseInt(cl[1] / m) + parseInt(cl[2] / m) + parseInt(cl[3] / m) + parseInt(cl[4] / m) + parseInt(cl[5] / m);
                  
                  //colors.push(clstring);
                  leData.push(i.name);

                });
                let options={
                  leData,
                  values:item.values,
                  colors:cl
                }
                that.createdGroundPie(id,num,options)
              }
              
            })
          },1000)
        }
     })
   },
   createdGroundPie(domeId,chartNum,options){
     //debugger
     let that = this;
      this[chartNum]=this.$echarts.init(document.getElementById(domeId));
      this[chartNum].clear();
      window.addEventListener("resize", () => {
        this[chartNum].resize();
      });
      
      this[chartNum].setOption({
        title:{
          text:domeId,
          x: 'center',
          y: 'center',
          textStyle : {
              color : '#fff',
              fontSize : 14,
              fontWeight : 'normal'
          },
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            show:false,
            orient: 'horizontal',
            left: 'center',
            data: options.leData||[],
                textStyle: {
                  color: '#fff'
            }
        },
        series : [
            {
                name: domeId,
                type: 'pie',
                radius : ['35%','60%'],
                color:function(data){
                  //console.log(data,data.dataIndex%3)
                  //let op=1-data.dataIndex/100;
                  return options.colors[data.dataIndex%10]
                  
                },
                data:options.values,
                label:{

                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal:{ 
                            label:{ 
                                show: true, 
                                formatter: '{b} : {c} ({d}%)' 
                            }, 
                            labelLine :{show:true} 
                        } 
                }
            }
        ]
      })
   },
   getWeekEarnings(){
     this.handleSelect("day_earnings","myChart2","charts02","line");
   },
   selectEa(value){
      if(value=="year_earnings"){this.eaname=this.$t('ea.p1unity')}
      if(value=="month_earnings"){this.eaname=this.$t('ea.p1unitm')}
      if(value=="day_earnings"){this.eaname=this.$t('ea.p1unitd')}
      this.handleSelect(value);
   },
   selectY(value){
     this.start_y=value;
     let end_day=this.getDaysInYearMonth(this.start_y,this.start_m);
     let start_time=this.start_y+"-"+this.start_m+"-1";
     let end_time=this.start_y+"-"+this.start_m+"-"+end_day;
     let obj={
       start_time,
       end_time
     }
     this.getAllEarnings("all_earnings_to_time","myChart3","charts03","bar",obj);
   },
   selectM(value){
     this.start_m=value;
     let end_day=this.getDaysInYearMonth(this.start_y,this.start_m);
     let start_time=this.start_y+"-"+this.start_m+"-1";
     let end_time=this.start_y+"-"+this.start_m+"-"+end_day;
     let obj={
       start_time,
       end_time
     }
     this.getAllEarnings("all_earnings_to_time","myChart3","charts03","bar",obj);
   },
   getAllEarnings(value,dome,num,type,obj){
     let that=this;
     obj=obj||{};
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          // spinner: 'el-icon-loading',
          target: document.querySelector('body'),
          background: 'rgba(0, 0, 0, 0.7)'
        });
     getYMDEaList(obj,value).then((res)=>{
       loading.close();
       if(res.data.length==0){
         if(type=="bar"){
           that.myChart3=false;
            return
         }else{
           that.myChart4=false;
            return
         }
         
       }
       let leData=[],xAxis=[""],series=[],pie=[];
       let s=res.data||[];
       var labelRight = {
              normal: {
                  position: 'right'
              }
          };
         var labelRight2 = {
              normal: {
                  position: ''
              }
          };
       s.map((item,key)=>{
         leData.push(item.nick_name);
         //xAxis.push(item.nick_name);
         let obj={
           name:item.nick_name,
           type:"bar",
           value:[],
           sum_profit_rate:item.sum_profit_rate
         }
         obj.value.push(item.sum_profit);//item.sum_profit
         series.push(obj);
         let obj2={
           name:item.nick_name,
           value:item.sum_profit,
           label:item.sum_profit<0?labelRight:labelRight2
         }
         pie.push(obj2)
       });
      let options={
         leData,
         xAxis,
         series,
         barGap:"40%",
         barWidth:"15%",
         label:true
       };
       console.log("options",options);
       if(type=="bar"){
         that.handleDrawEachats(dome,num,type,options)
       }else{
         let options2={
          leData,
          values:pie

        }
        if(value=="all_earnings"){
          console.log("pie",pie)
          that.handleBar(dome,num,type,options2)
        }else{
          that.handlePie(dome,num,type,options2)
        }
         
       }
         
       
      
       
       
     
     })
   },
  //正负交错
  handleBar(domeId,chartNum,type,options){
      let that = this;
      let g=this.device=="mobile"?{top: 30,bottom: 10,left:10}:{top: 30,bottom: 30}
      this[chartNum]=this.$echarts.init(document.getElementById(domeId));
      this[chartNum].clear();
      window.addEventListener("resize", () => {
        this[chartNum].resize();
      });
      
      this[chartNum].setOption({
          
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: g,
        xAxis: {
            type : 'value',
            position: 'top',
            splitLine: {lineStyle:{type:'dashed'}},
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
        },
        yAxis: {
            type : 'category',
            axisLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
            data : options.leData
        },
        series : [
            {
                name:'总收益',
                type:'bar',
                stack: '收益',
                barWidth:options.values.length<3?"50":"",
                
                itemStyle : { normal: {
                    color: '#00cfff',
                    borderRadius: 0,
                    label : {
                        show: true,
                        
                        
                    }
                }},
                label: {
                    normal: {
                        show: true,
                        formatter: '{b}'
                    }
                },
                data:options.values
            }
        ]
      })
  },
  //环形
   handlePie(domeId,chartNum,type,options){
      let that = this;
      this[chartNum]=this.$echarts.init(document.getElementById(domeId));
      this[chartNum].clear();
      window.addEventListener("resize", () => {
        this[chartNum].resize();
      });
      let colors=["#1dadd5","#7476e5","#eeeeee"]
      this[chartNum].setOption({
        
        tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            left: 'center',
            data: options.leData||[],
                textStyle: {
                color: '#fff'
            }
        },
        series : [
            {
                name: 'EA',
                type: 'pie',
                radius : ['35%','60%'],
                color:function(data){
                  //console.log(data,data.dataIndex%3)
                  return colors[data.dataIndex%3]
                  
                },
                data:options.values,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal:{ 
                            label:{ 
                                show: true, 
                                formatter: '{b} : {c} ({d}%)' 
                            }, 
                            labelLine :{show:true} 
                        } 
                },
                
            }
        ]
      })
   },
   handleSelect(value,dome,num,type){
     
     //"myChart1","charts01","bar"
     dome=dome||"myChart1";
     num=num||"charts01";
     type=type||"bar";
     let that=this;
     const loading = this.$loading({
          lock: true,
          text: 'Loading',
          // spinner: 'el-icon-loading',
          target: document.querySelector('body'),
          background: 'rgba(0, 0, 0, 0.7)'
        });
     getYMDEaList({},value).then((res)=>{
       loading.close();
       let leData=res.data.ea_name||[];
       let xAxis=res.data.x_axis||[];
       let s=res.data.y_data;
       let series=[];
       leData.map((i,j)=>{
         let obj={name:i,type:type,value:[]}
         xAxis.map((item,key)=>{
            obj.value.push(s[item][i])
          });
          series.push(obj)
       });
       
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
      this[chartNum].clear();
      let series=[];
      let colorsList=[['#005360','#00ccfb'],['#1f2289','#7475e4'],['#586466','#fcfcfc'],["#052a3e","#8dcff3"],["#5f61bc","#b1b3ff"],["#0052c2","#4292ff"],["#7e0091","#f6b9ff"],["#820049","#ff9bd3"],["#7600ba","#e7beff"],["#007e6e","#abfff4"]];
      let colorsList2=['#00b9e4','#7476e5','#eeeeee',"#052a3e","#5f61bc","#0052c2","#7e0091","#820049","#7600ba","#007e6e",]
      options.series.map((item,key)=>{
        let obj={
            name: item.name,
            type: item.type,
            barGap:options.barGap||'5%',
            barWidth:options.barWidth||"10",
            data:item.value,
            label: options.label?{
              normal:{ 
              show: true, 
              color:"#fff",
              position: "top",//["110%",0],
              formatter: function(params) {
                //debugger
                //console.log("params.dataIndex",params);
                let rate=options.series[params.seriesIndex].sum_profit_rate;
                return params.seriesName+'\n'+params.value+'\n'+rate
              }
              },
              
            }:{},
            symbol: "none",
            smooth: true,
            itemStyle : {
								normal : {
                  lineStyle: {
                      color:colorsList2[key%10]
                  },
									color:function(params) {
                    //console.log("params",params.value)
                    let index=key%10;
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
                      return colorsList2[index]
                    }
                    
                    
                  },
                  
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
          left: "0px",
          right: "10px",
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
            // name: "手数",
            // nameTextStyle:{
            //   color:"#fff"
            // },
            // min: 0,
            // max: 250,
            // interval: 50,
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
   
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.mychart {
  text-align: center;
  margin-top:20px;
}
.ea-grap {
  width:100%;
  padding:30px;
  color:#fff;
  .ea-item-title {
    font-size: 18px;
    margin-bottom: 15px;
    .select-des {
      color:#00b9e4;
      font-size: 14px;
      
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
  }
  .ea-item-main {
    padding:10px;
    height: 420px;
    margin-bottom: 30px;
    
  }
  .ea-item-main2 {
    padding:10px;
    min-height: 500px;
    margin-bottom: 0px;
    .ea-grap-item{
        height: 480px;
      }
  }
}
</style>

