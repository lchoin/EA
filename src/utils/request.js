import axios from 'axios'  
import { Message, MessageBox,Loading } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import { getEncrypted } from '@/utils/validate'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 50000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  console.log("getEncrypted",config)
  if(config.method=="post"){
    //config.data.group_id=store.getters.active_pr;
  }else{
    config.params.group_id=store.getters.active_pr;
  }
  
  config.url=config.url+"?t="+new Date().getTime();
  // Do something before request is sent
  config.headers['sign'] =config.sign||"";
  config.headers['did']="12345dg"
  config.headers['apptype']="web"
  //config.headers['apptype']="web"
  config.headers['Content-Type']="application/json"
  if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['token'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非0是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.errorCode !== 0) {
      let dome=document.getElementsByClassName("el-loading-mask")[0];
      //console.log(dome)
      if(dome){dome.parentNode.removeChild(dome)}
      

      // Token 过期了;
      if (res.errorCode === 10001 ) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }else{
        Message({
          message: res.msg,
          type: 'error',
          duration: 5 * 1000
        }) 
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
