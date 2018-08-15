<template>
  <div class="clearfix">
    <router-link to="/">
      <div class="logo"></div>
    </router-link>
    
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo "
      mode="horizontal"
      @select="handleSelect"
      background-color="#000"
      text-color="#fff"
      width="360px"
      active-text-color="#ffd04b">
      <div class="nav-item" v-if="!route.hidden&&route.children" v-for="route in routes" :key="route.name" :item="route" :base-path="route.path">
        <router-link @click.native="flushCom(resolvePath(route.path,route.children[0].path))" v-if="hasOneShowingChildren(route.children) && !route.children[0].children&&!route.alwaysShow" :to="resolvePath(route.path,route.children[0].path)" >
  
            
            <el-menu-item :index="resolvePath(route.path,route.children[0].path)" class="center-center-column left-border clearfix">
              <!-- <svg-icon v-if="route.children[0].meta&&route.children[0].meta.icon" :icon-class="route.children[0].meta.icon"></svg-icon> -->
              <i class="iconfont" v-html="route.children[0].meta.unicode"></i>
              <span>{{generateTitle(route.children[0].meta.title)}}</span>
            
            </el-menu-item>
       
          
        </router-link>
        
        
       

      </div>
      <!-- <el-menu-item :index="$route.path">处理中心</el-menu-item>
      <el-menu-item index="2">处理中心</el-menu-item>
      <el-menu-item index="3">处理中心</el-menu-item>
      <el-menu-item index="4">处理中心</el-menu-item> -->
    </el-menu>
  </div>

</template>
<script>
import { mapGetters } from "vuex";
import path from 'path'
import { generateTitle } from '@/utils/i18n'
export default {
  components: {},
  created() {
    //console.log("333",this.$router.options.routes,this.$route.path)
  },
  data() {
    return {
      activeIndex: "1",
      activeIndex2: this.$route.path
    };
  },
  methods: {
    flushCom(url){
          console.log(this.$route)
　　　　　　//router是路由实例,例如:var router = new Router({})
          if(url==this.$route.path){
            this.$router.go(0);  
          }
　　　　　　//router.go(n)是路由的一个方法，意思是在history记录中前进或者后退多少步，0就表示还是当前，类似window.history.go(n)
　　　　　　//

　　},
    handleSelect(key, keyPath) {
      //console.log(key, keyPath);
    },
    hasOneShowingChildren(children) {
      //console.log("children",children)
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
     resolvePath(a,b) {
       //console.log(a,b) +"?t="+new Date().getTime()
      return path.resolve(a, b)
    },
    generateTitle
  },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      return this.$router.options.routes;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.nav-item {
  float: left;
}
.el-menu--horizontal {
  float: left;
  .el-menu-item {
    width:90px;
    height: 70px;
    float: left;
    border-bottom: unset;
  }
}
.siderbar-main {
  height: calc(100% - 70px) !important;
  background-color: #000 !important;
}
.logo {
  width: 90px;
  height: 70px;
  float: left;
  background-color: #000;
  background: #000 url("../../../../assets/images/logo2.png") no-repeat center;
  border-bottom: 1px solid #27354d;
}
.left-border {
  border-left:1px solid #283a58
}
</style>

