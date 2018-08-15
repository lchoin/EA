<template>
  <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
    <div>
      <!-- <svg-icon class-name='international-icon' icon-class="language" /> -->
      <img :src="languageName.icon" />
      {{languageName.name}}
      <!-- <i class="el-icon-arrow-down lang-icon"></i> -->
      <i class="iconfont lang-icon" style="font-size:14px;color:#fff;">&#xe60c;</i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="language==='zh'">中文(简体)</el-dropdown-item>
      <el-dropdown-item command="zhT" :disabled="language==='zhT'">中文(繁体)</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="language==='en'">English</el-dropdown-item>
      
    </el-dropdown-menu>
    
  </el-dropdown>
</template>

<script>
const icon1=require("../../assets/images/zh.png");
const icon2=require("../../assets/images/en.png");
export default {
  created() {
    console.log(this.$store.getters.language)
  },
  computed: {
    language() {
      return this.$store.getters.language
    },
    languageName() {
      switch (this.$store.getters.language) {
        case "zh":
          return {
            icon:icon1,
            name:"中文(简体)"
          }
          break;
        case "zhT":
          return {
            icon:icon1,
            name:"中文(繁体)"
          }
          break;
        case "en":
          return {
            icon:icon2,
            name:"English"
          }
          break;
        default:
          break;
      }
      
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang);
      this.$router.go(0);
      this.$message({
        message: 'switch language success',
        type: 'success'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.international-icon {
  font-size: 20px;
  cursor: pointer;
  vertical-align: -5px!important;
  
  
}
.lang-icon {

}
.el-dropdown-selfdefine {
  padding-right: 20px;
  img {
    vertical-align: top;
  }
  
}
.lang-icon {
    position: absolute;
    right: 0px;
    top:0px;
  }
</style>


