import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    keep_alive: false,//  # true 表示需要使用缓存
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/graphAnalysis',
    
    children: [
      {
        path: 'graphAnalysis',
        name: 'graphAnalysis',
        keep_alive: false,
        component: () => import('@/views/graphAnalysis/index'),
        meta: { title: 'graphAnalysis', icon: 'graphAnalysis',unicode:"&#xe66e;" }
      },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/annual',
    component: Layout,
    redirect: '/annual/index',
    
    children: [
     
      {
        path: 'index',
        name: 'annual',
        keepAlive: false,
        component: () => import('@/views/annual/index'),
        meta: { title: 'annualYield', icon: 'annual',unicode:"&#xe670;" }
      }
    ]
  },
  {
    path: '/varieties',
    component: Layout,
    redirect: '/varieties/index',
    
    children: [
     
      {
        path: 'index',
        name: 'varieties',
        keepAlive: false,
        component: () => import('@/views/varieties/index'),
        meta: { title: 'varieties', icon: 'varieties',unicode:"&#xe66f;" }
      }
    ]
  },
  {
    path: '/exchange',
    component: Layout,
    redirect: '/exchange/index',
    
    children: [
     
      {
        path: 'index',
        name: 'exchange',
        keepAlive: false,
        component: () => import('@/views/exchange/index'),
        meta: { title: 'exchange', icon: 'exchange',unicode:"&#xe671;" }
      }
    ]
  },
  //comment
  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/index',
    
    children: [
     
      {
        path: 'index',
        name: 'comment',
        keepAlive: false,
        component: () => import('@/views/comment/index'),
        meta: { title: 'comment', icon: 'comment',unicode:"&#xe675;" }
      }
    ]
  },

  {
    path: '/ealist',
    component: Layout,
    redirect: '/ealist/index',
    
    children: [
     
      {
        path: 'index',
        name: 'ealist',
        keepAlive: false,
        component: () => import('@/views/ealist/index'),
        meta: { title: 'eaList', icon: 'ealist',unicode:"&#xe672;" }
      }
    ]
  },//
  {
    path: '/prlist',
    component: Layout,
    redirect: '/prlist/index',
    hidden: true,
    children: [
     
      {
        path: 'index',
        name: 'ealist',
        keepAlive: false,
        component: () => import('@/views/prlist/index'),
        meta: { title: 'prlist', icon: 'prlist',unicode:"&#xe672;" }
      }
    ]
  },
  {
    path: '/business',
    component: Layout,
    redirect: '/business/index',
    
    children: [
     
      {
        path: 'index',
        name: 'ealist',
        keepAlive: false,
        component: () => import('@/views/business/index'),
        meta: { title: 'tvolume', icon: 'prlist',unicode:"&#xe637;" }
      }
    ]
  },
  {
    path: '/author',
    component: Layout,
    redirect: '/author/index',
    hidden: true,
    children: [
     
      {
        path: 'index',
        name: 'ealist',
        keepAlive: false,
        component: () => import('@/views/author/index'),
        meta: { title: 'author', icon: 'author',unicode:"&#xe672;" }
      }
    ]
  },

  

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

