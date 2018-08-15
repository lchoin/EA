<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <!-- <h3 class="title"></h3> -->
      <div class="title-container">
        <img src="../../assets/images/logo.png" class="title-logo" />
        <lang-select class="set-language"></lang-select>
      </div>
      <div class="form-title">{{$t('login.username')}}</div>
      <el-form-item prop="username">
        <!-- <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>
      <div class="form-title">{{$t('login.password')}}</div>
      <el-form-item prop="password">
        <!-- <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span> -->
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="password"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
     
      <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          {{$t('login.logIn')}}
      </el-button>
   
      <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'

export default {
  components: { LangSelect },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value=="") {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'msgforex.com135225'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      
      // this.Cookies.set("token","1111")
      // this.$router.push({ path: '/' })
      // return false;
      let that=this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            
            that.$store.dispatch('GetInfoHad').then((res)=>{
              that.loading = false;
              that.$router.push({ path: '/' })
            })
            
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 44px;
    width: 100%;
    
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 44px;
      color:#333;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid #9da3a6;
    background: #fff;
    border-radius: 4px;
    color: #333;
  }
  .el-button--primary {
    height: 44px;
    background-color:#0039a4;
    border-color:#0039a4;
    font-size:16px;
    margin-top:20px;
    margin-bottom: 10px;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  background: url("../../assets/images/loginbg.jpg") center no-repeat;
  background-size: cover;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    width:90%;
    max-width: 460px;
    padding: 30px 30px;
    margin: 0 auto;
    // margin-left:-230px;
    margin-top:-216px;
    background-color: #fff;
    border-radius: 8px;
    .form-title {
      font-size: 16px;
      color:#333;
      margin-bottom: 10px
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
   .title-container {
    position: relative;
    
    .title-logo {
      width:50%;
      margin-bottom: 40px;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      
    }
    
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 2px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.set-language {
  position: absolute;
  right: 20px;
  top: 0px;
  cursor: pointer;
}
</style>
