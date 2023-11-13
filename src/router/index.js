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
    path: '/content/role',
    component: Layout,
    children: [{
      path: '/',
      name: 'role',
      component: () => import('@/views/content/role'),
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
  {
    path: '/game/revenue',
    component: Layout,
    children: [{
      path: '/',
      name: 'revenue',
      component: () => import('@/views/game/revenue'),
      hidden: true
    }]
  }

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
