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

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '展示界面', icon: 'dashboard' }
    }]
  },

  {
    path: '/node',
    component: Layout,
    redirect: '/node/list',
    name: 'Node',
    meta: { title: '节点管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/nodelist/index'),
        meta: { title: '节点清单', icon: 'node' }
      },
      {
        path: 'operation',
        name: 'Operation',
        component: () => import('@/views/operation/index'),
        meta: { title: '节点修改', icon: 'node' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'userManagement',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'users' }
      }
    ]
  },

  {
    path: '/warning',
    component: Layout,
    children: [
      {
        path: 'warningManagement',
        name: 'Warning',
        component: () => import('@/views/warning/index'),
        meta: { title: '紧急预警', icon: 'warning' }
      }
    ]
  },

  {
    path: '/log',
    component: Layout,
    children: [
      {
        path: 'logManagement',
        name: 'Log',
        component: () => import('@/views/log/index'),
        meta: { title: '日志管理', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
