import { login, logout, getInfo,getInfoHad } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Cookies from 'js-cookie'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    ea_pr:[],
    active_pr:"",
    group_name:"",
    sign:""
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PR: (state, data) => {
      state.ea_pr = data;
      let key=0;
      //debugger
      let id=Cookies.get("active_pr"); 
      let result=data.map((item,index)=>{
          if(item.id==id){
            key=index;
          }
        })
        state.active_pr=data[key].id;
        state.group_name=data[key].group_name;
        Cookies.set("active_pr",data[key].id);
        Cookies.set("group_name",data[key].group_name) 
    },
    SET_PR_HAD: (state, data) => {
      state.ea_pr = data;
      let key=0;
      //debugger
      let id=Cookies.get("active_pr"); 
      let result=data.map((item,index)=>{
          if(item.id==id){
            key=index;
          }
        })
        state.active_pr=data[key].id;
        state.group_name=data[key].group_name;
        Cookies.set("active_pr",data[key].id);
        Cookies.set("group_name",data[key].group_name) 
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          Cookies.set("username",userInfo.username)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取项目信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.total > 0) { 
            commit('SET_PR', data.data)
          } else {
            reject()
          }
          
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取已有项目信息
    GetInfoHad({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfoHad(state.token).then(response => {
          const data = response.data
          if (data.length > 0) { 
            commit('SET_PR_HAD', data)
          } else {
            reject()
          }
          
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
