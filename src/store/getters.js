const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  language: state => state.app.language,
  sign:state => state.user.sign,
  //年收益率
  years_earnings: state => state.eaData.years_earnings,
  //ea用户信息
  ea_user_info: state => state.eaData.ea_user_info,
  //ea用户
  ea_user_list: state => state.eaData.ea_user_list,
  ea_user_total: state => state.eaData.ea_user_total,
  ea_pr: state => state.user.ea_pr,
  active_pr: state => state.user.active_pr,
  group_name:state => state.user.group_name,
  //ea_user_total
  
}
export default getters
