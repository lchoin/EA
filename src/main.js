import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//import locale from 'element-ui/lib/locale/lang/en' // lang i18n



import '@/styles/index.scss' // global css
import Cookies from 'js-cookie'
import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import i18n from './lang' 

Vue.prototype.Cookies = Cookies

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 

Vue.use(ElementUI, { 
  //locale 
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
