import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import Cookies from 'js-cookie'
import {getSysConfig} from '../src/api/login'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  //测试期间
  //next({ path: '/' })
  let time=Cookies.get("time");
  if(!time){
    getSysConfig().then((response)=>{
      console.log(response);
      time=response.data.timestamp||new Date().getTime();
          var inFifteenMinutes = new Date(new Date().getTime() + 10000);
          Cookies.set("time",time,{ expires: inFifteenMinutes});
          NProgress.start()
          if (getToken()) {
            //console.log(getToken())
            if (to.path === '/login') {
              next({ path: '/' })
              NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
            } else {
            if (store.getters.ea_pr.length === 0) {
              store.dispatch('GetInfoHad').then((res)=>{

                next()
              })
            }else{
              next()
            }



            }
          } else {
            console.log("2",getToken())
            if (whiteList.indexOf(to.path) !== -1) {
              next()
            } else {
              next('/login')
              NProgress.done()
            }
          }
    })
  }else{
          NProgress.start()
          if (getToken()) {
            //console.log(getToken())
            if (to.path === '/login') {
              next({ path: '/' })
              NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
            } else {
            if (store.getters.ea_pr.length === 0) {
              store.dispatch('GetInfoHad').then((res)=>{

                next()
              })
            }else{
              next()
            }



            }
          } else {
            console.log("2",getToken())
            if (whiteList.indexOf(to.path) !== -1) {
              next()
            } else {
              next('/login')
              NProgress.done()
            }
          }
  }


})

router.afterEach(() => {
  NProgress.done() // 结束Progress
  Cookies.set('beforeUrl', "")
})
