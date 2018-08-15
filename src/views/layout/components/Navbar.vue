<template>
  <el-menu class="navbar clearfix" mode="horizontal">
    <div style="float:left">
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
      <!-- <breadcrumb></breadcrumb> -->
      <!-- 横向导航 -->
      <navbarrow class="nav-h"></navbarrow>
    </div>
    

    <div class="dropdowns space-right" style="line-height:1;
    height:70px">
      
      <div class="select-des" >{{$t('ea.p607')}}</div>
          <el-dropdown trigger="click" @command="selectPr" style="margin:0 10px">
                  <el-button type="primary">
                    {{group_name}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="(item, index) in ea_pr" :key="index" :command="item.id">{{item.group_name}}</el-dropdown-item>
                   
                  </el-dropdown-menu>
      </el-dropdown>

      <lang-select class="set-language"></lang-select>

        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <!-- <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'"> -->
            <span style="color:#00b9e4">superAdmin</span>
            <i class="iconfont" style="font-size:14px;color:#fff;">&#xe60c;</i>
            <!-- <i class="el-icon-caret-bottom"></i> -->
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">LogOut</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
    </div>
    
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Navbarrow from './Navbarrow'
import LangSelect from '@/components/LangSelect'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Navbarrow,
    LangSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'ea_pr',
      'active_pr',
      'group_name'
    ])
  },
  created() {
    //console.log(this.ea_pr)
  },
  methods: {
    selectPr(id){
      console.log(this.ea_pr)
      let that=this;
      this.ea_pr.map((item,key)=>{
        if(item.id==id){
          console.log(item.group_name)
          that.$store.state.user.group_name=item.group_name;
          that.$store.state.user.active_pr=id;
          this.Cookies.set("active_pr",id);
          this.Cookies.set("group_name",item.group_name)
        }
      });
      this.$router.go(0)
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.Cookies.remove("token");
      this.$router.push({ path: '/login' })
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload() // 为了重新实例化vue-router对象 避免bug
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dropdowns {
  .el-dropdown-menu{
    top:50px !important;
  }
      
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
.navbar {
  height: 70px;
  line-height: 70px;
  border-radius: 0px !important;
  background-color: #000;
  overflow: hidden;
  border-bottom: 1px solid #283a58;
  .hamburger-container {
    line-height: 70px;
    height: 70px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    //height: 50px;
    display: inline-block;
    // position: absolute;
    // right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 0px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 30px;
        font-size: 12px;
      }
    }
  }
}
.pc {
  .navbar {
    .hamburger-container {
      display: none
    }
  }
}
.mobile {
  .navbar{
    .nav-h {
      display: none
    }
    .hamburger-container {
      color:#fff;
    }
  }
}
.set-language {
  line-height: 14px;
  margin-right:10px;
  color:#fff;
  cursor: pointer;
}
</style>

