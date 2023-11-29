import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  //   {
  //   path: '/',
  //   redirect: '/home'
  // },
  // {
  //   path: '/404',
  //   name: 'NotFound',
  //   meta: {
  //     title: 'Page not found',
  //     isLogin: false
  //   },
  //   component: () => import('@/views/error/index')
  // },
  // // 所有未定义路由，全部重定向到404页
  // {
  //   path: '*',
  //   redirect: '/404'
  // },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  //首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  //用户管理
  {
    path: '/system/user',
    component: Layout,
    children: [{
      path: '/',
      name: 'User',
      component: () => import('@/views/system/user'),
      hidden: true
    }]
  },
  //角色管理
  {
    path: '/system/role',
    component: Layout,
    children: [{
      path: '/',
      name: 'role',
      component: () => import('@/views/system/role'),
      hidden: true
    }]
  },
  //菜单管理
  {
    path: '/system/menu',
    component: Layout,
    children: [{
      path: '/',
      name: 'menu',
      component: () => import('@/views/system/menu'),
      hidden: true
    }]
  },
  //商户管理
  {
    path: '/content/item',
    component: Layout,
    children: [{
      path: '/',
      name: 'item',
      component: () => import('@/views/content/item'),
      hidden: true
    }]
  },
  //血池控制
  {
    path: '/game/blood',
    component: Layout,
    children: [{
      path: '/',
      name: 'blood',
      component: () => import('@/views/game/blood'),
      hidden: true
    }]
  },
  //商户充值
  {
    path: '/content/charge',
    component: Layout,
    children: [{
      path: '/',
      name: 'charge',
      component: () => import('@/views/content/charge'),
      hidden: true
    }]
  },
  //点控
  {
    path: '/game/ptwop',
    component: Layout,
    children: [{
      path: '/',
      name: 'ptwop',
      component: () => import('@/views/game/ptwop'),
      hidden: true
    }]
  },
  //提现管理
  {
    path: '/content/order',
    component: Layout,
    children: [{
      path: '/',
      name: 'order',
      component: () => import('@/views/content/order'),
      hidden: true
    }]
  },
  //机器人控制
  {
    path: '/game/robot',
    component: Layout,
    children: [{
      path: '/',
      name: 'robot',
      component: () => import('@/views/game/robot'),
      hidden: true
    }]
  },
  //机器人列表
  {
    path: '/game/robot/robotlist',
    component: Layout,
    children: [{
      path: '/',
      name: 'robotlist',
      component: () => import('@/views/game/robot/robotlist'),
      hidden: true
    }]
  },
  //税收
  {
    path: '/game/revenue',
    component: Layout,
    children: [{
      path: '/',
      name: 'revenue',
      component: () => import('@/views/game/revenue'),
      hidden: true
    }]
  },
    //游戏系统管理
    {
    path: '/system/game',
    component: Layout,
    children: [{
      path: '/',
      name: 'game',
      component: () => import('@/views/system/game'),
      hidden: true
    }]
  },
  //搜索玩家
  {
    path: '/player/list',
    component: Layout,
    children: [{
      path: '/',
      name: 'list',
      component: () => import('@/views/player/list'),
      hidden: true
    }]
  },
  {
    path: '/game/ptwop',
    component: Layout,
    children: [{
      path: '/',
      name: 'ptwop',
      component: () => import('@/views/game/ptwop'),
      hidden: true
    }]
  },
  //玩家牌局流水
  {
    path: '/player/flow',
    component: Layout,
    children: [{
      path: '/',
      name: 'flow',
      component: () => import('@/views/player/flow'),
      hidden: true
    }]
  },
  //操作日志
  {
    path: '/system/log/operlog',
    component: Layout,
    children: [{
      path: '/',
      name: 'operlog',
      component: () => import('@/views/system/log/operlog'),
      hidden: true
    }]
  },
  //登录日志
  {
    path: '/system/log/logininfor',
    component: Layout,
    children: [{
      path: '/',
      name: 'logininfor',
      component: () => import('@/views/system/log/logininfor'),
      hidden: true
    }]
  },
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
