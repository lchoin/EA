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
              <el-col :xs="24" :sm="12">{{$t('ea.p801')}}</el-col>
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
    
    <div class="ea-chatss ea-border" style="padding:0 0px;overflow-x:auto;display:flex" v-if="ProfitOrder.length>0">
      <div class="mobile-header" v-if="device=='mobile'" >
        <div>{{$t('ea.p8001')}}</div>
        <div v-for="index in ProfitOrder.length" :key="index" :class="(index)%2==0?'even-num':''">{{index}}</div>
        
      </div>
      <div class="flex-1" style="padding:0;overflow-x:auto;">
        <div :style="{'width':device=='mobile'?'800px':'100%','padding-left':device=='mobile'?'0':'0'}" >
          <div class="data-item center-center">
            <div class="flex-1" v-if="device!='mobile'">{{$t('ea.p8001')}}</div>
            <div class="flex-1">{{$t('ea.p8002')}}</div>
            <div class="flex-1">{{$t('ea.p8003')}}</div>
            <div class="flex-1">{{$t('ea.p8004')}}</div>
            <div class="flex-1">{{$t('ea.p8005')}}</div>
            <div class="flex-1">{{$t('ea.p8006')}}</div>
            <div class="flex-1">{{$t('ea.p8007')}}</div>
            <div class="flex-1">{{$t('ea.p8008')}}</div>
            <!-- <div class="flex-1">盈亏点数</div> -->
            <div class="flex-1">{{$t('ea.p8009')}}</div>
            <div class="flex-1">Comment</div>
          </div>
          <div class="data-item center-center" v-for="(item,index) in ProfitOrder" :key="index" :class="(index+1)%2==0?'even-num':''">
            <div class="flex-1" v-if="device!='mobile'">{{index+1}}</div>
            <div class="flex-1">{{item.ticket}}</div>
            <div class="flex-1">{{item.login}}</div>
            <div class="flex-1">{{item.symbol}}</div>
            <div class="flex-1">{{item.cmd}}</div>
            <div class="flex-1">{{item.volume}}</div>
            <div class="flex-1">{{item.open_time}}</div>
            <div class="flex-1">{{item.close_time}}</div>
            <!-- <div class="flex-1">{{item.profit_money}}</div> -->
            <div class="flex-1">{{item.profit_money}}</div>
            <div class="flex-1">{{item.comment}}</div>
          </div>
        </div>
      </div>
      
      
    </div>
    <div class="ea-chatss ea-border" v-else>
      <div style="color:#fff;text-align: center;">{{$t('ea.nodata')}}</div>
    </div>
    
    <!-- 亏损 -->
    <div class="ea-title" style="height:auto;margin-top:10px">
      
      <el-row :gutter="0">
              <el-col :xs="24" :sm="12">{{$t('ea.p802')}}</el-col>
              <el-col :xs="24" :sm="12" style="text-align: right" class="time"> 
                <el-radio v-model="radio2" label="3"  @change="checkedChange2">{{$t('ea.qxall')}}</el-radio>
                <el-radio v-model="radio2" label="4"  @change="checkedChange2">
                  <el-dropdown trigger="click" @command="selectY2">
                  <el-button type="primary">
                    {{start_y2}} <span style="color:#00b9e4">{{$t('ea.year')}}</span><i class="el-icon-arrow-down el-icon--right" style="color:#00b9e4"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="year-(num+1)+y" v-for="y in num+1" :key="y">{{year-(num+1)+y}}{{$t('ea.year')}}</el-dropdown-item>
                    
                  </el-dropdown-menu>
                  </el-dropdown>
                  <el-dropdown trigger="click" @command="selectM2">
                    <el-button type="primary">
                      {{start_m2}} <span style="color:#00b9e4">{{$t('ea.mouth')}}</span><i class="el-icon-arrow-down el-icon--right" style="color:#00b9e4"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item :command="i" v-for="i in 12" :key="i">{{i}}{{$t('ea.mouth')}}</el-dropdown-item>
                      
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-radio>
                
              </el-col>
        </el-row>
    </div>
    
    <div class="ea-chatss ea-border" style="padding:0 0px;overflow-x:auto;display:flex" v-if="LoseOrder.length>0">
      <div class="mobile-header" v-if="device=='mobile'" >
        <div>{{$t('ea.p8001')}}</div>
        <div v-for="index in LoseOrder.length" :key="index" :class="(index)%2==0?'even-num':''">{{index}}</div>
        
      </div>
      <div class="flex-1" style="padding:0;overflow-x:auto;">
        <div :style="{'width':device=='mobile'?'800px':'100%','padding-left':device=='mobile'?'0':'0'}" >
          <div class="data-item center-center">
            <div class="flex-1" v-if="device!='mobile'">{{$t('ea.p8001')}}</div>
            <div class="flex-1">{{$t('ea.p8002')}}</div>
            <div class="flex-1">{{$t('ea.p8003')}}</div>
            <div class="flex-1">{{$t('ea.p8004')}}</div>
            <div class="flex-1">{{$t('ea.p8005')}}</div>
            <div class="flex-1">{{$t('ea.p8006')}}</div>
            <div class="flex-1">{{$t('ea.p8007')}}</div>
            <div class="flex-1">{{$t('ea.p8008')}}</div>
            <!-- <div class="flex-1">盈亏点数</div> -->
            <div class="flex-1">{{$t('ea.p8009')}}</div>
            <div class="flex-1">Comment</div>
          </div>
          <div class="data-item center-center" v-for="(item,index) in LoseOrder" :key="index" :class="(index+1)%2==0?'even-num':''">
            <div class="flex-1" v-if="device!='mobile'">{{index+1}}</div>
            <div class="flex-1">{{item.ticket}}</div>
            <div class="flex-1">{{item.login}}</div>
            <div class="flex-1">{{item.symbol}}</div>
            <div class="flex-1">{{item.cmd}}</div>
            <div class="flex-1">{{item.volume}}</div>
            <div class="flex-1">{{item.open_time}}</div>
            <div class="flex-1">{{item.close_time}}</div>
            <!-- <div class="flex-1">{{item.profit_money}}</div> -->
            <div class="flex-1">{{item.profit_money}}</div>
            <div class="flex-1">{{item.comment}}</div>
          </div>
        </div>
      </div>
      
      
    </div>
    <div class="ea-chatss ea-border" v-else>
      <div style="color:#fff;text-align: center;">{{$t('ea.nodata')}}</div>
    </div>

    
  </div>
  
</template>

<script>
import {getProfitOrder ,getLoseOrder} from '@/api/eauserinfo'
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

      radio2:"3",
      start_y2:'',
      start_m2:'',
      end_time2:'',

      ProfitOrder:[],
      LoseOrder:[]
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
    this.start_y=this.start_y2=year;
    this.start_m=this.start_m2=month;
    let end_day=this.getDaysInYearMonth(this.start_y,this.start_m);

    let start_time=this.start_y+"-"+this.start_m+"-1";
    let end_time=this.start_y+"-"+this.start_m+"-"+end_day;
    let obj={
       start_time,
       end_time
     }
    this.handleGetProfitOrder();
    this.handleGetLoseOrder()
  },
  beforeDestroy() {
  
  },
  methods: {
    checkedChange(val){
      console.log(val);
      this.radio=val;
      let obj;
      if(val=="1"){
        obj={
          start_time:"",
          end_time:""
        }
        
      }else{
        let end_day=this.getDaysInYearMonth(this.start_y,this.start_m);
        let start_time=this.start_y+"-"+this.start_m+"-1";
        let end_time=this.start_y+"-"+this.start_m+"-"+end_day;
        obj={
          start_time,
          end_time
        }
        
      }
      this.handleGetProfitOrder(obj)
     
    },
    checkedChange2(val){
      console.log(val);
      this.radio2=val;
      let obj;
      if(val=="3"){
        obj={
          start_time:"",
          end_time:""
        }
        
      }else{
        let end_day=this.getDaysInYearMonth(this.start_y2,this.start_m2);
        let start_time=this.start_y2+"-"+this.start_m2+"-1";
        let end_time=this.start_y2+"-"+this.start_m2+"-"+end_day;
        obj={
          start_time,
          end_time
        }
        
      }
      this.handleGetLoseOrder(obj)
     
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
     this.handleGetProfitOrder(obj)
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
     this.handleGetProfitOrder(obj)
    },

    handleGetProfitOrder(obj){
      obj=obj||{};
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      getProfitOrder(obj).then((res)=>{
        console.log(res)
        this.ProfitOrder=res.data;
        loading.close();
      })
    },

    handleGetLoseOrder(obj){
      obj=obj||{};
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      getLoseOrder(obj).then((res)=>{
        console.log(res)
        this.LoseOrder=res.data;
        loading.close();
      })
    },
    selectY2(value){
      this.start_y2=value;
      this.radio2="4";
      let end_day=this.getDaysInYearMonth(this.start_y2,this.start_m2);
      let start_time=this.start_y2+"-"+this.start_m2+"-1";
      let end_time=this.start_y2+"-"+this.start_m2+"-"+end_day;
      let obj={
        start_time,
        end_time
      }
     this.handleGetLoseOrder(obj)
    },
    selectM2(value){
      this.start_m2=value;
      this.radio2="4";
      let end_day=this.getDaysInYearMonth(this.start_y2,this.start_m2);
      let start_time=this.start_y2+"-"+this.start_m2+"-1";
      let end_time=this.start_y2+"-"+this.start_m2+"-"+end_day;
      let obj={
        start_time,
        end_time
      }
     this.handleGetLoseOrder(obj)
    },
   
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.mobile-header {
  div{
    height: 44px;
    color:#fff;
    line-height: 44px;
    width:50px;
    text-align: center;
    border-bottom: 1px solid #042d35;
  }
}
.flex-1 {
  flex: 1
}
.even-num {
      background-color: #001013
    }
.mobile {
  .ea-annual {
    padding: 10px;
  }
}
.ea-annual {
  padding: 30px;
  width: 100%;
  min-height: calc(100vh - 70px);
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
    min-height: calc((100vh - 250px)/2);
    padding: 30px;
    overflow: hidden;
    position: relative;
    font-size: 14px;
    .data-item{
      width: 100%;
      height: 44px;
      line-height: 14px;
      border-bottom: 1px solid #042d35;
      color:#fff;
      div{
        text-align: center
      }
    }
    
  }
}
</style>

