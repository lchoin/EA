<template>
  <div class="ea-list">
    <div class="add-ea">
      <div class="ea-title-right btn-active" @click="gotoPrList" >{{$t('ea.p608')}}</div>
      <!-- <div class="ea-title-right btn-active" @click="showEdit('pr')">{{$t('ea.p606')}}</div> -->
      <div class="ea-title-right btn-active" @click="showEdit('ea')">{{$t('ea.p605')}}</div>
    </div>
    
    <div class="ea-list-main">
      <div class="fixed-table" v-if="device=='mobile'">
        <div class="center-center" style="height:44px;border-bottom:1px solid #042d35">{{$t('ea.p601')}}</div>
        <div class="ea-list-items center-center" v-for="(item, index) in ea_user_list" :key="index" :class="(index+1)%2==0?'even-num':''">
              <div class="flex-1">{{item.login}}</div>
             
          </div>
      </div>
      <div style="width:100%;overflow-x:auto" v-if="ea_user_list.length>0">
          <div class="ea-list-title hor" :style="{'min-width':'680px',paddingLeft:device=='mobile'?'80px':'0'}">
            <div v-if="device!='mobile'">{{$t('ea.p601')}}</div>
            <!-- <div>{{$t('ea.p601')}}</div> -->
            <div>{{$t('ea.p602')}}</div>
            <div>Brokers</div>
            <div>{{$t('ea.p604')}}</div>
            
            <div style="min-width:90px">{{$t('ea.p603')}}</div>
          </div>
        <div  :style="{'min-width':'680px',paddingLeft:device=='mobile'?'80px':'0'}">
          <div class="ea-list-items center-center" v-for="(item, index) in ea_user_list" :key="index" :class="(index+1)%2==0?'even-num':''">
              <div class="flex-1" v-if="device!='mobile'">{{item.login}}</div>
              <!-- <div class="flex-1">{{item.login}}</div> -->
              <div class="flex-1">{{item.nick_name}}</div>
              <div class="flex-1">{{item.brokers}}</div>
              <div class="flex-1">{{item.create_time}}</div>
              
              <div class="ea-list-btn center-center" style="min-width:90px">
                <span class="btn-edit" @click="handleEdit(item)"><i class="iconfont">&#xe729;</i></span>
                <span class="btn-delete" @click="handleDelete(item.id)"><i class="iconfont">&#xe613;</i></span>
              </div>
          </div>
        </div>
        
      </div>
      
      
      <div class="no-data" v-else>{{$t('ea.nodata')}}</div>
      <div v-if="device=='mobile'&&ea_user_list.length>0" style="text-align: right;padding: 10px 10px 0 10px;color:#666">--左右滑动查看更多--</div>
      <el-pagination
        v-if="ea_user_total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="size"
        layout="prev, pager, next"
        :total="ea_user_total">
      </el-pagination>
    </div>

    <div class="ea-mask" v-if="showedit"></div>
    <div class="ea-add-user center-center-column" v-if="showedit">
      <div class="ea-edit">
        <el-input v-if="!showPr" v-model="eaInfo.login" placeholder="请输入账号"></el-input>
        <el-input v-if="!showPr" v-model="eaInfo.nick_name" placeholder="请输入昵称"></el-input>
        <el-input v-if="!showPr" v-model="eaInfo.brokers" placeholder="请输入brokers"></el-input>
        <!-- <el-select v-if="!showPr" v-model="eaInfo.group_id" placeholder="请选择项目" @change="changeSelect">
        <el-option
          v-for="item in prList"
          :key="item.id"
          :label="item.group_name"
          :value="item.id"
          
          
          >
        </el-option>
      </el-select> -->


        <el-input v-if="showPr" v-model="pr" placeholder="请输入新添加分析项目名称"></el-input>

        <div class="ea-mask-btns">
          <el-button @click="hideEdit">取消</el-button>
          <el-button type="primary" v-if="!showPr" @click="handleEditEa">确定</el-button>
          <el-button type="primary" v-else @click="handleEditPr">确定</el-button>
        </div>
        
      </div>
    </div>
    
    
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import {delEaUser,addEaUser,editEaUser,addEaPr,getPrList } from '@/api/eauserinfo'
export default {
  // mixins: [resize],
  data() {
    return {
       page:1,
       size:10,
       total:0,
       eaInfo:{
         login:'',
         nick_name:'',
         brokers:'',
         //group_id:"",
         
         
       },
       id:"",
       showedit:false,
       edit:false,
       showPr:false,
       pr:"",
       value:"",
       size:15,
       prList:[]
    };
  },
  created () {
    //
    this.getUsersList(this.page);
    //this.haneleGetPrList(1)
  },
  mounted() {},
  computed: {
    ...mapGetters([
    'ea_user_list',
    'ea_user_total',
    'device',
    'ea_pr'
    ])
  },
  methods: {
    haneleGetPrList(page){
        let that=this;
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          // spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let obj={
          page,
          size:that.size
        }
        getPrList(obj).then((res)=>{
          loading.close();
          console.log("haneleGetPrList",res)
          that.prList=res.data.data;
         
        })
    },
    gotoPrList(){
      this.$router.push('/prlist')
    },
    changeSelect(val){
      
      //this.eaInfo.group_id=val
      console.log(this.eaInfo)
    },
      hideEdit(){
        this.showedit=false
      },
      showEdit(type){
        this.showedit=true;
        this.edit=false;
        if(type=="pr"){
          this.showPr=true;
        }else{
          this.showPr=false;
        }
        this.eaInfo={
              login:'',
              nick_name:'',
              brokers:'',
              //group_id:"",
              
        }
        
      },
      handleEditPr(){
        let that=this;
        if(this.pr==""){
          this.$message({
            message: '请输入项目名称',
            type: 'warning'
          });
          return
        }
        let obj={
          group_name:this.pr
        }
        addEaPr(obj).then((res)=>{
            //console.log("addEaUser",res);
            that.showedit=false;
            that.getUsersList(that.page)
            that.$message({
              message: '添加成功',
              type: 'success'
            });
          })
      },
      handleEditEa(){
        let that=this;
        if(this.eaInfo.login==""||this.eaInfo.nick_name==""){//||this.eaInfo.group_id==""
          this.$message({
            message: '请输入账号或昵称或项目',
            type: 'warning'
          });
          return
        }
        
        if(this.edit){//编辑
          let obj=this.eaInfo;
          obj.id=this.id;
          editEaUser(obj).then(()=>{
            that.showedit=false;
            that.getUsersList(that.page)
            that.$message({
              message: '修改成功',
              type: 'success'
            });
          })
        }else{//添加
          //console.log(this.eaInfo.group_id)
          //debugger
          let obj={
              login:this.eaInfo.login,
              nick_name:this.eaInfo.nick_name,
              brokers:this.eaInfo.brokers,
              //group_id:this.eaInfo.group_id,
          }
          addEaUser(obj).then((res)=>{
            //console.log("addEaUser",res);
            that.showedit=false;
            that.getUsersList(that.page)
            that.$message({
              message: '添加成功',
              type: 'success'
            });
          })
        }
      },
      handleEdit(item) {
        console.log(item)
        this.eaInfo={
            login:item.login,
            nick_name:item.nick_name,
            brokers:item.brokers,
            //group_id:item.user_group&&item.user_group.id||""
        }
        this.id=item.id;
        this.showedit=true;
        this.edit=true;
        this.showPr=false;
        //console.log(item);
      },
      handleDelete(id) {
        this.$confirm('删除该EA, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleConfirmDelete(id)
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleConfirmDelete(id){
        let that=this;
        let page=this.page;
        delEaUser({id}).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          that.getUsersList(page)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page=val;
        this.getUsersList(val)
      },
      getUsersList(page){
        let that=this;
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          // spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        let obj={
          page,
          size:that.size
        }
        that.$store.dispatch('GetUserList', obj).then((res) => {
                loading.close();
              }).catch(() => {
                loading.close();
              })
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.ea-mask {
  position: fixed;
  width:100%;
  height: 100%;
  top:0;
  left:0;
  z-index: 100;
  background-color: rgba($color: #000000, $alpha: 0.5)
}
.ea-add-user {
  position: fixed;
  width:100%;
  height: 100%;
  top:0;
  left:0;
  z-index: 110;
  .ea-edit {
    width: 80%;
    padding:30px;
    background-color: #fff;
    border-radius: 4px;
    max-width:400px;
    input {
      margin-bottom: 15px;
      
    }
    .el-select {
      width:100%;
      input{
        margin-bottom: 0;
      }
    }
    
    
    .ea-mask-btns {
      text-align: right;
      margin-top:15px
    }
  }
}

.add-ea {
  width:100%;
  text-align: right;
  margin-bottom: 16px;
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
.no-data {
  text-align: center;
  margin-top:50px;
  color: #b4b4b4;
}
.ea-list {
  width: 100%;
  height: calc(100vh - 70px);
  padding: 30px;
  .ea-list-main {
    width: 100%;
    height: calc(100% - 40px);
    background-color: #001b1f;
    color:#eeeeee;
    font-size: 12px;
    position: relative;
    .fixed-table{
      position: absolute;
      top:0;
      left:0;
      width:80px;
      background-color: #001b1f;
      text-align: center;
    }
    .ea-list-title {
      width:100%;
      height: 44px;
      line-height: 44px;
      border-bottom: 1px solid #042d35;
      div {
        flex: 1;
        text-align: center;
      }
    }
    .ea-list-items {
      width:100%;
      height: 44px;
      line-height: 14px;
      border-bottom: 1px solid #042d35;
      div {
        flex: 1;
        text-align: center;
        overflow: hidden;
        word-break: break-all;
        
      }
      .ea-list-btn {
        color:#fff;
        span {
          cursor: pointer;
        }
        .btn-edit{
          background-color: #1dadd5;
          height: 24px;
          line-height: 24px;
          padding:0 10px;
          border-radius: 4px;
        }
        .btn-delete {
          background-color: #7476e5;
          height: 24px;
          line-height: 24px;
          padding:0 10px;
          margin-left:10px;
          border-radius: 4px;
        }
        i {
              font-size: 18px;
        }
      }
    }
    .even-num {
      background-color: #001013
    }
  }
}
.el-pagination button:disabled,.el-pagination .btn-next, .el-pagination .btn-prev,.el-pager li {
  background-color:unset
}
.el-pagination {
  text-align: right;
  margin-top:30px;
}

</style>

