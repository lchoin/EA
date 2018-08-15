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
    <div class="ea-title">
      <el-row >
        <el-col :xs="12" :sm="12" class="ea-title-l">{{$t('ea.p201')}}</el-col>
        <el-col :xs="12" :sm="12" class="ea-title-r">
          <!-- <div class="ea-title-right btn-active">EA_LMAX</div>
          <div class="ea-title-right">EA_DOOFOREX</div>
          <div class="ea-title-right">EA_SAXO</div>                                -->
          <!-- ea_user_info -->
          <!-- <div class="ea-title-right" @click="getWhichEadata(item.login,index)"  v-for="(item, index) in ea_user_info" :key="index" :class="active==index?'btn-active':''" >{{item.nick_name}}</div> -->
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
    
    <div class="ea-chats ea-border">
      <div v-if="!hadData" style="text-align:center;color:#fff">{{$t('ea.nodata')}}</div>
      <div class="ea-chats-main" :style="{display:hadData?'block':'none'}">
        <div id="myChart"  :style="{width: device=='mobile'?'100%':'85%', height: device=='mobile'?'400px':'400px'}"></div>

        <div v-if="device!='mobile'" class="ea-data hor" >
          <div class="ea-data-title">{{$t('ea.years')}}</div>
          <div class="ea-data-items hor">
            <div class="ea-data-item text-overflow-1" v-for="(i,key) in 12" :key="key">{{i+'月'}}</div>
            
          </div>
          <div class="ea-data-sum text-overflow-1">{{$t('ea.sum')}}</div>
        </div>

        <div v-if="device!='mobile'" class="ea-data hor" @click="showEaByYear(item,index)" v-for="(item,index) in allRes" :key="index" :class="eactive==index?'eactive':''" >
          <div class="ea-data-title">{{item.year}}</div>
          <div class="ea-data-items hor">
            <div class="ea-data-item text-overflow-1" v-for="(i,key) in item.y_data" :key="key">{{i!=0?(i*100).toFixed(2)+"%":" "}}</div>
            
          </div>
          <div class="ea-data-sum text-overflow-1">{{item.year_rate}}</div>
        </div>

        <div v-if="device=='mobile'" class="ea-data ea-data-mobile ver-center " @click="showEaByYear(item,index)" v-for="(item,index) in allRes" :key="index" :class="eactive==index?'eactive':''" >
          <div class="ea-data-title">{{item.year}}</div>
          <div class="ea-data-items hor">
            <div class="ea-data-item text-overflow-1 center-center-column" v-for="(i,key) in item.y_data" :key="key">
              <span style="color:#fff">{{key+1}}月</span>
              <span style="min-height:15px">{{i!=0?(i*100).toFixed(2)+"%":" "}}</span>
            </div>
            
          </div>
          <div class="ea-data-sum text-overflow-1">{{item.year_rate}}</div>
        </div>

        
      </div>
    </div>
    <div >

    </div>
    
  </div>
  
</template>

<script>
//import echarts from 'echarts'
import resize from '@/components/Chats/mixins/resize'
import { mapGetters } from 'vuex'


export default {
  // mixins: [resize],
  data() {
    return {
      dataX : ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      dataY:[],
      active:0,
      allRes:[],
      eactive:0,
      hadData:true,
      eaname:""
    };
  },
  //
  created() {
     this.getEaInfo();
     console.log(this.device)
   
    
  },
  computed: {
    ...mapGetters([
    'years_earnings',
    'ea_user_info',
    'device'
    ])
  },
  mounted() {
    //this.drawLine();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getEaInfo(){
      //this.eactive=1
      let that=this;
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$store.dispatch('GetUserInfo', {}).then((res) => {
            loading.close();
            console.log("GetUserInfo",res);

            //alert("active")
            if(res.length>0){
              that.getWhichEadata(res[0].login,0);
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
        }
      })
      this.getWhichEadata(value)
   },
    getWhichEadata(id,index){
      this.active=index;
      let that=this;
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      let obj={
        login:id
      }
      this.$store.dispatch('GetYearsEaList', obj).then((res) => {
            loading.close();
            //console.log("drawLineIndex",res)
            //res=[];
            if(res.length>0){
              this.hadData=true;
              
              that.allRes=res;
              that.drawLineIndex(res[0])
            }else{
              this.hadData=false;
            }
          }).catch(() => {
            loading.close();
      })
    },
    showEaByYear(item,index){
      //let data=this.allRes[index];
      this.eactive=index;
      this.drawLineIndex(item)
    },
    drawLineIndex(data){
            //console.log("datadata1",options)
            let options={
              ydata:data.y_data||[]
            };
            this.drawLine(options)
    },
    drawLine(options) {
      console.log("datadata2",options)
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById("myChart"));
      this.chart.clear();
      // var yMax = 600;
      let data = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
      let data2=options.ydata||[]
     
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
          left: "40px",
          right: "20px",
          bottom: "20px",
          containLabel: true,
          borderWidth: 1,
          borderColor: "#ccc"
        }
      }

      window.addEventListener('resize', ()=> {  this.chart.resize();  });
      // 绘制图表
      this.chart.setOption({
        // title: {
        //   text: 'EA在所有Brokers的年度收益率',
        //   textStyle:{color:"#fff"}
        // },
        grid: gridm,
        dataZoom:dataz,
        tooltip: {},
        xAxis: {
          data: data,
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
        },
        yAxis: {
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

        series: [
         
          {
            type: "bar",
            data: data2,

            itemStyle: {
              normal: {
                // 随机显示
                //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}

                // 定制显示（按顺序）
                color: function(params) {
                  // var colorList = ['#C33531','#EFE42A','#64BD3D','#EE9201','#29AAE3', '#B74AE5' ];
                  // return colorList[params.dataIndex]
                  var colorList1 = [ "#75e4fe","#014c57"];
                  var colorList2 = [ "#ff3434","#fff9f9"];

                  //var index = params.dataIndex;
                  //console.log(index,data2[index]);
                  if(params.value>0){
                    return new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: colorList1[0] },
                      { offset: 1, color: colorList1[1] },
                
                    ]);
                  }else{
                    return new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: colorList2[0] },
                      { offset: 1, color: colorList2[1] },
                
                    ]);
                  }
                  
                  //debugger
                  
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.mobile {
  .ea-annual {
    padding: 10px;
  }
  .ea-data-mobile {
    height:auto !important;
    line-height:1.5 !important;
    padding:5px 0;
    .ea-data-items {
      .ea-data-item {
        flex:33%;
        text-align: center
      }
      
    }
    
  }
}
.ea-annual {
  padding: 30px;
  width: 100%;
  min-height: calc(100vh - 70px);
  overflow-y: auto;
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
    }
    .ea-title-r {
      text-align: right;
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
        color:#fff;
      }
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
    .ea-data {
      color:#fff;
      font-size: 16px;
      background-color: #001b1f;
      height: 80px;
      width: 100%;
      line-height: 80px;
      border-top:1px solid #1a3236;
      cursor: pointer;
      div {
        text-align: center;
      }
      .ea-data-title {
        width:80px;
      }
      .ea-data-sum {
        width: 15%;
      }
      .ea-data-items {
        width: calc(100% - 15% - 80px);
        color: #00cfff;
        .ea-data-item {
          width: calc(100% /12);
          text-align: center;
        }
      }
      
    }
    .eactive {
      background-color: #001619;
      position: relative;
      &:before{
        content:"";
        width:2px;
        height: 100%;
        background-color: #00cfff;
        position: absolute;
        left:0;
        top:0;
      }
    }
  }
}
</style>

