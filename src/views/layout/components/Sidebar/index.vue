<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <router-link to="/">
      <div class="logo"></div>
    </router-link>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      class="siderbar-main"
    >
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style>
.siderbar-main {
  height:  calc(100% - 50px) !important;
  background-color: #000 !important;
}
  .logo {
    width:90px;
    height: 70px;
    background-color: #000;
    background:#000 url("../../../../assets/images/logo2.png") no-repeat  center;
    border-bottom: 1px solid #27354d;
  }
</style>

