import request from '@/utils/request'
import {getConfig} from '@/utils/validate'
export function getEaUserInfo(params) {
  //getConfig();v1/config
  
return getConfig({
    url: 'v2/ea_user/brief_info_by_group_id',
    method: 'get',
    params
  })
}

//getEaUserList
export function getEaUserList(params) {
  //getConfig();
  //console.log(sign)
  return getConfig({
    url: 'v1/ea_user/list_to_page',
    method: 'get',
    params
  })
}

//删除
export function delEaUser(params) {
  //console.log("paramsparamsparams",params)
  return getConfig({
    url: 'v1/ea_user/del',
    method: 'get',
    params
  })
}

//添加
export function addEaUser(params) {
  //console.log("paramsparamsparams",params)
  return getConfig({
    url: 'v1/ea_user/add',
    method: 'post',
    data:params
  })
}

//编辑
export function editEaUser(params) {
  //console.log("paramsparamsparams",params)
  return getConfig({
    url: 'v1/ea_user/edit',
    method: 'post',
    data:params
  })
}

//添加
export function addEaPr(params) {
  //console.log("paramsparamsparams",params)
  return getConfig({
    url: 'v2/ea_user_group/add',
    method: 'post',
    data:params
  })
}

//编辑
export function editEaPr(params) {
  //console.log("paramsparamsparams",params)
  return getConfig({
    url: 'v2/ea_user_group/edit',
    method: 'post',
    data:params
  })
}

//
export function getPrList(params) {
  return getConfig({
    url: 'v2/ea_user_group/list_to_page',
    method: 'get',
    params
  })
}

//盈利
export function getProfitOrder(params) {
  return getConfig({
    url: 'v2/statistical/profit_order',
    method: 'get',
    params
  })
}

//亏损
export function getLoseOrder(params) {
  return getConfig({
    url: 'v2/statistical/loss_order',
    method: 'get',
    params
  })
}

