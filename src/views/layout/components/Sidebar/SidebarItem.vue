<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

      <router-link  @click.native="flushCom(resolvePath(item.path,item.children[0].path))" v-if="hasOneShowingChildren(item.children) && !item.children[0].children&&!item.alwaysShow" :to="resolvePath(item.children[0].path)" >
        <el-menu-item :index="resolvePath(item.children[0].path)" :class="{'submenu-title-noDropdown':!isNest}" class="center-center-column">
          <!-- <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon> -->
          <i class="iconfont" v-html="item.children[0].meta.unicode"></i>
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{generateTitle(item.children[0].meta.title)}}</span>
        </el-menu-item>
        <!-- <div class="center-center-column menu-li_icon"  v-if="item.children[0].meta&&item.children[0].meta.title">
          <svg-icon class="router_icon" v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <div class="router_name">{{generateTitle(item.children[0].meta.title)}}</div>
        </div> -->
      </router-link>

      <!-- <el-submenu v-else :index="item.name||item.path">
        

        <template v-for="child in item.children" v-if="!child.hidden">
         

          <router-link :to="resolvePath(child.path)" :key="child.name">
            <el-menu-item :index="resolvePath(child.path)">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu> -->

  </div>
</template>

<script>
import path from 'path'
import { generateTitle } from '@/utils/i18n'
export default {
  name: 'SidebarItem',
  data () {
    return {
      //path:this.$route.path
      isActive:this.$route.path
    }
  },
  created() {
    console.log(this.$route.path)
  },
  props: {
    // route配置json
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    //isActive:this.$route.path==item.children[0].path

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
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths)
    },
    generateTitle
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  .menu-li_icon{
    height: 70px;
    width: 100%;
    color: #95969d;
    font-size: 12px;
    border-bottom: 1px solid #27354d;
  }
  .router_name {
        font-size: 12px;
        margin-top: 10px
      }
      .router_icon {
        margin-right:0 !important;
        width: 2em;
        height: 2em;
  }
  .active {
    color:#fff
  }
  .el-menu-item{
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: 70px;
    width: 100%;
    color: #95969d !important;
    font-size: 12px;
    border-bottom: 1px solid #27354d;
    background-color: #000 !important;
    span {
      font-size: 12px;
      // margin-top: 10px;
      height: 14px;
      line-height: 14px;
    }
    .svg-icon{
      margin-right: 0 !important;
    }
    svg {
      margin-right:0 !important;
      width: 2em !important;
      height: 2em !important;
    }
  }
  .is-active {
    color: #00b9e4 !important;
  }
  .el-submenu__title {
    display: none
  }
  .el-submenu .el-menu-item {
    height: auto;
    background-color:#000;
    padding:10px
  }
</style>

