import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
// import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
// import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang

//引入Element的语言包 解决日期选择组件与本地语言包冲突问题
import en from 'element-ui/lib/locale/lang/en'
import zh from 'element-ui/lib/locale/lang/zh-CN'
import es from 'element-ui/lib/locale/lang/es'

import enLocale from './en'
import zhLocale from './zh'
import zhTLocale from './zhT'

Vue.use(VueI18n)

const messages = {
  // en: {
  //   ...enLocale,
  //   ...elementEnLocale
  // },
  // zh: {
  //   ...zhLocale,
  //   ...elementZhLocale
  // }
  'en': Object.assign(enLocale,en),//enLocale,
  'zh': Object.assign(zhLocale,zh),//zhLocale,
  'zhT': Object.assign(zhTLocale,es),//zhTLocale
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh', // set locale
  messages // set locale messages
})

export default i18n
