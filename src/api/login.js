import request from '@/utils/request'
import {getConfig} from '@/utils/validate'
//v1/config
export function getSysConfig(){
  return request({
    url: 'v1/config',
    method: 'get',
    params: {}
  })
}

export function login(username, password) {
  return getConfig({
    url: 'v1/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return getConfig({
    url: 'v2/ea_user_group/list_to_page',
    method: 'get',
    params: { 
      page:1,
      size:15
     }
  })
}
//v2/ea_user_group/has_user_group
export function getInfoHad() {
  
  return getConfig({
    url: 'v2/ea_user_group/has_user_group',
    method: 'get',
    params: { 
      
     }
  })
}


export function logout() {
  return getConfig({
    url: 'v1/user/logout',
    method: 'post'
  })
}
