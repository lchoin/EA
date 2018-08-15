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
    <!-- <div class="ea-title">
      每个EA 不同注释(comment)的收益明细
    </div> -->
    <div class="ea-item-title">
         
              
              <el-row :gutter="0">
                  <el-col :xs="24" :sm="12">{{$t('ea.p501')}}</el-col>
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
    <div class="ea-chats ea-border" >
      <div style="padding-bottom:10px" id="charts" ref="charts">
          <el-checkbox style="margin-right:30px;margin-bottom:10px" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{$t('ea.qx')}}</el-checkbox>
          <el-checkbox-group style="display:inline-block" v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox style="margin-bottom:10px"  v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
      </div>
      <div class="chatmy" :style="{width: '100%', height: device=='mobile'?'400px':'calc(100vh - 310px);'}">
        <!-- <div id="myChart"  :style="{width: '100%', height: device=='mobile'?'400px':'100%'}"></div> -->
        <div :style="{'display':myChart?'block':'none',width: '100%', height: device=='mobile'?'400px':'100%'}" id="myChart"  ></div>
        <div :style="{'display':myChart?'none':'block'}" style="text-align:center;color:#fff;margin-top:30px">{{$t('ea.nodata')}}</div>
      </div>
      
    </div>
    <div >

    </div>
    
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import {getYMDEaList } from '@/api/years_earnings'
const cityOptions = [];
export default {
  // mixins: [resize],
  data() {
    return {
      active:0,
      eaname:"年收益率",
      checkAll: true,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: false,
      eheight:"100%",
       radio:"1",
      start_y:'',
      start_m:'',
      end_time:'',
      year:2018,
      num:"",
      myChart:true
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
    this.getCommentEarnings();
    
    
  },
  methods: {
    checkedChange(val){
      console.log(val);
      this.radio=val;
      if(val=="1"){
        this.getCommentEarnings()
      }else{
        let end_day=this.getDaysInYearMonth(this.start_y,this.start_m);
        let start_time=this.start_y+"-"+this.start_m+"-1";
        let end_time=this.start_y+"-"+this.start_m+"-"+end_day;
        let obj={
          start_time,
          end_time
        }
        this.getCommentEarnings(obj);
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
      this.getCommentEarnings(obj)
      //this.getAllEarnings("all_earnings_to_time","myChart3","charts03","bar",obj);
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
      this.getCommentEarnings(obj)
      //this.getAllEarnings("all_earnings_to_time","myChart3","charts03","bar",obj);
    },
    handleCheckAllChange(val) {
        this.checkedCities = val ? this.cities : [];
        this.isIndeterminate = false;
        if(val){
          this.handleChecked(this.cities)
        }else{
          this.handleChecked([])
        }
      },
      handleCheckedCitiesChange(value) {
        console.log(value)
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        this.handleChecked(value)
        //this.res_y_data;
      },
    handleChecked(value){
      let ser_array=[];
        this.res_y_data.map((items,key)=>{
          let obj={};
          obj.ea_name=items.ea_name;
          let objArray=[];
          value.map((item)=>{
            let index=this.cities.indexOf(item);
            //console.log(item,this.cities)
            if(index>-1){
              objArray.push(items.values[index])
            }
          });
          obj.values=objArray;
          ser_array.push(obj)
        })
        let options={
            series:ser_array,
            leData:this.leData,
            xData:value
        }
        console.log(options)
        this.drawLine(options)
    },
    
    getCommentEarnings(obj){
      obj=obj||{}
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      getYMDEaList(obj,"comment_earnings").then((res)=>{
        //debugger
        console.log("comment_earnings",res);
        if(res.data.ea_name.length>0){
          this.myChart=true;
        }else{
          loading.close();
          this.myChart=false;
          return
        }
        res.data.x_axis.map((m,n)=>{
          if(m=="0"){
            res.data.x_axis[n]="空白"
          }
          if(m=="1"){
            res.data.x_axis[n]="数字"
          }
        })

        this.cities=res.data.x_axis;
        this.checkedCities=res.data.x_axis;
        let array=[];
        res.data.y_data.map((item,key)=>{
          let obj={
            ea_name:item.ea_name
          };
          let ea_val=[];
          for(key in item.values){
            ea_val.push(item.values[key])
          };
          obj.values=ea_val;
          array.push(obj);
        });
          let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; //浏览器高度 
          let height= this.$refs.charts.offsetHeight;
          this.eheight=h-240-height+"px";
          this.res_y_data=array;
          this.leData=res.data.ea_name||[];
          let options={
            series:array,
            leData:res.data.ea_name||[],
            xData:res.data.x_axis||[]
          }
        setTimeout(()=>{
          loading.close();
          
          this.drawLine(options)
        },500)
        console.log(height)
      }).catch(()=>{
        loading.close();
      })
    },
    drawLine(options) {
      console.log("options.leData",options.leData)
      // let optios={
      //     inData,openData,closeData,xData
      //   }
      //   this.drawLine(optios)
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
      let series=[];
      options.series.map((item,key)=>{
        console.log("item.name",item)
        let obj={
            name: item.ea_name||"",
            type: "bar",
            barGap:'5%',
            barWidth:"30%",
            // label: {
            //   normal:{ 
            //   show: true, 
            //   color:"#fff",
            //   position: 'top',
              
            //   },
              
            // },
            itemStyle : {
								normal : {
								
								}
						},       
            data: item.values||[]
          }
        series.push(obj)
      })
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
          data: options.leData||[],
          textStyle:{//图例文字的样式
              color:'#fff',
              //fontSize:16
          },
          show:true
        },
        xAxis: [
          {
            type: "category",
            data: options.xData||[],
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
            name: "",
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
          
        ],
        series:series
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.el-checkbox__input.is-checked+.el-checkbox__label {
  color:#fff
}
.chatmy {
  height: calc(100vh - 310px);;
}
.mobile {
  .ea-annual {
    padding: 10px;
  }
}
.ea-annual {
  padding: 30px;
  width: 100%;
  //height: calc(100vh - 70px);
   .ea-item-title {
    font-size: 18px;
    margin-bottom: 15px;
    color: #fff;
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
  .ea-chats {
    width: 100%;
    min-height: calc(100vh - 180px);

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

