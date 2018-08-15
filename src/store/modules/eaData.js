import { getYearsEaList } from '@/api/years_earnings'
import { getEaUserInfo,getEaUserList } from '@/api/eauserinfo'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
const eaData = {
  state: {
    years_earnings:[],
    ea_user_info:[],
    ea_user_list:[],
    ea_user_total:0
  },

  mutations: {
    SET_YE: (state, data) => {
      state.years_earnings = data
    },
    EA_USER_INFO: (state, data) => {
      state.ea_user_info = data
    },
    EA_USER_LIST: (state, data) => {
      state.ea_user_list = data
    },
    EA_USER_TOTAL: (state, data) => {
      state.ea_user_total = data
    },
    
  },

  actions: {
    //ea用户简明信息
    GetUserInfo({ commit }, params) {
      
      return new Promise((resolve, reject) => {
        getEaUserInfo(params).then(response => {
          
          commit('EA_USER_INFO', response.data)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    //ea用户列表
    GetUserList({ commit }, params) {
      
      return new Promise((resolve, reject) => {
        getEaUserList(params).then(response => {
          
          commit('EA_USER_LIST', response.data.data)
          commit('EA_USER_TOTAL',response.data.total)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    //年度收益率
    GetYearsEaList({ commit }, params) {
      
      return new Promise((resolve, reject) => {
        getYearsEaList(params).then(response => {
          
          commit('SET_YE', response.data)
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

   

    

    
  }
}

export default eaData
