import request from '@/utils/request'
import {getConfig} from '@/utils/validate'
export function getYearsEaList(params) {
  return getConfig({
    url: 'v1/statistical/years_earnings_by_login',
    method: 'get',
    params
  })
}

export function getYMDEaList(params,url) {
  //console.log(`statistical/${url}`)
  return getConfig({
    url: `v2/statistical/${url}`,
    method: 'get',
    params
  })
}