<template>
  <div class="ea-list">
    <div class="add-ea">
      <div class="ea-title-right btn-active" @click="showEdit('pr')">{{$t('ea.p606')}}</div>
      <!-- <div class="ea-title-right btn-active" @click="showEdit('ea')">{{$t('ea.p605')}}</div> -->
    </div>
    
    <div class="ea-list-main">
      
      <div style="width:100%;overflow-x:auto" v-if="prList.length>0">
          <div class="ea-list-title hor" >
            <div>{{$t('ea.p600')}}</div>
            <div>{{$t('ea.p604')}}</div>

            <div>{{$t('ea.p603')}}</div>
          </div>
        
          <div class="ea-list-items center-center" v-for="(item, index) in prList" :key="index" :class="(index+1)%2==0?'even-num':''">
              <div class="flex-1">{{item.group_name}}</div>
              <div class="flex-1">{{item.create_time}}</div>
              
              <div class="ea-list-btn center-center">
                <span class="btn-edit" @click="handleEdit(item)"><i class="iconfont">&#xe729;</i></span>
                <!-- <span class="btn-delete" @click="handleDelete(item.id)"><i class="iconfont">&#xe613;</i></span> -->
              </div>
          </div>
      </div>
      
      
      <div class="no-data" v-else>{{$t('ea.nodata')}}</div>
      
      <el-pagination
        v-if="pr_total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="size"
        layout="prev, pager, next"
        :total="pr_total">
      </el-pagination>
    </div>

    <div class="ea-mask" v-if="showedit"></div>
    <div class="ea-add-user center-center-column" v-if="showedit">
      <div class="ea-edit">
        <el-input  v-model="pr" placeholder="请输入新添加分析项目名称"></el-input>
        <!-- <div>选择EA</div> -->
        <el-checkbox-group v-model="checkList" @change="checkBoxChange">
          <el-checkbox :label="item.id" v-for="(item,index) in EaList" :key="index">{{item.nick_name}}</el-checkbox>
          
         
        </el-checkbox-group>
        <div class="ea-mask-btns">
          <el-button @click="hideEdit">取消</el-button>
          <!-- <el-button type="primary" v-if="!showPr" @click="handleEditEa">确定</el-button> -->
          <el-button type="primary"  @click="handleEditPr">确定</el-button>
        </div>
        
      </div>
    </div>
    
    
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import {delEaUser,addEaUser,editEaUser,addEaPr,editEaPr,getPrList,getEaUserList } from '@/api/eauserinfo'
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
         group_id:"",
         
         
         
       },
       id:"",
       showedit:false,
       edit:false,
       showPr:false,
       pr:"",
       value:"",
       prList:[],
       pr_total:0,
       type:"add",
       checkList:[],
       EaList:[]
    };
  },
  created () {
    //
    this.getPrList(this.page)
  },
  mounted() {},
  computed: {
    ...mapGetters([
    'device',
    'ea_pr'
    ])
  },
  methods: {
    checkBoxChange(val){
      console.log(val)
    },
    changeSelect(val){
      
      this.eaInfo.group_id=val
      console.log(this.eaInfo)
    },
      hideEdit(){
        this.showedit=false;
        this.checkList=[];
      },
      showEdit(){
        this.showedit=true;
        this.edit=false;
        this.pr="";
        this.type='add'
        
      },
      handleEditPr(id){
        let that=this;
        if(this.pr==""){
          this.$message({
            message: '请输入项目名称',
            type: 'warning'
          });
          return
        }
        if(this.checkList.length==0){
          this.$message({
            message: '请选择账号！',
            type: 'warning'
          });
          return
        }
        if(this.type=='add'){
          let obj={
          group_name:this.pr,
          user:this.checkList
          }
          addEaPr(obj).then((res)=>{
              //console.log("addEaUser",res);
              that.showedit=false;
              that.getPrList(that.page);
              this.checkList=[];
              that.$message({
                message: '添加成功',
                type: 'success'
              });
            })
        }else{
          let obj={
            id:this.id,
            group_name:this.pr,
            user:this.checkList
          }
          editEaPr(obj).then((res)=>{
              //console.log("addEaUser",res);
              that.showedit=false;
              that.getPrList(that.page);
              this.checkList=[];
              that.$message({
                message: '修改成功',
                type: 'success'
              });
            })
        }
        
      },
      handleEditEa(){
        let that=this;
        if(this.eaInfo.login==""||this.eaInfo.nick_name==""||this.eaInfo.group_id==""){
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
            that.getPrList(that.page)
            that.$message({
              message: '修改成功',
              type: 'success'
            });
          })
        }else{//添加
          console.log(this.eaInfo.group_id)
          //debugger
          let obj={
              login:this.eaInfo.login,
              nick_name:this.eaInfo.nick_name,
              brokers:this.eaInfo.brokers,
              group_id:this.eaInfo.group_id,
          }
          addEaUser(obj).then((res)=>{
            //console.log("addEaUser",res);
            that.showedit=false;
            that.getPrList(that.page)
            that.$message({
              message: '添加成功',
              type: 'success'
            });
          })
        }
      },
      handleEdit(item) {
        console.log(item)
        this.pr=item.group_name;
        this.id=item.id;
        this.showedit=true;
        this.type='edit';
        this.checkList=item.user
        // this.edit=true;
        // this.showPr=true;
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
          that.getPrList(page)
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page=val;
        this.getPrList(val)
      },
      getPrList(page){
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
          that.prList=res.data.data;
          that.pr_total=res.data.total;
          console.log("that.prList",that.prList);
          that.handeleGetEaUserList()
        })
    },
    handeleGetEaUserList(){
      let obj={
        page:1,
        size:15
      }
      getEaUserList(obj).then((res)=>{
        console.log(res.data.data);
        this.EaList=res.data.data||[];
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
    .el-checkbox{
      margin-bottom: 10px;
    }
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
  padding-top:50px;
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

