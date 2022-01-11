import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
    path: '/',
    name: 'Root',
    redirect: '/home/index',
    component: Layout,
    children: [
      {
        meta: { title: '首页' },
        path: 'home/index',
        name: 'HomeIndex',
        component: () => import('@/views/home/index')
      },
      {
        meta: { title: '个人中心' },
        path: 'settings/user',
        name: 'SettingUser',
        component: () => import('@/views/settings/user')
      },
      {
        meta: { title: '账号设置' },
        path: 'settings/account',
        name: 'SettingAccount',
        component: () => import('@/views/settings/account')
      },
      {
        path: 'polygen/upload',
        name: 'PolygenUpload',
        meta: { title: '模型上传' },
        component: () => import('@/views/polygen/upload')
      },
      {
        path: 'polygen/index',
        name: 'PolygenIndex',
        meta: { title: '模型列表' },
        component: () => import('@/views/polygen/index')
      },
      {
        path: 'polygen/view',
        name: 'PolygenView',
        meta: { title: '模型处理' },
        component: () => import('@/views/polygen/view')
      },
      {
        path: 'picture/upload',
        name: 'PictureUpload',
        meta: { title: '上传图片' },
        component: () => import('@/views/picture/upload')
      },
      {
        path: 'picture/index',
        name: 'PictureIndex',
        meta: { title: '图片列表' },
        component: () => import('@/views/picture/index')
      },
      {
        path: 'picture/view',
        name: 'PictureView',
        meta: { title: '图片处理' },
        component: () => import('@/views/picture/view')
      },
      {
        path: 'video/upload',
        name: 'VideoUpload',
        meta: { title: '视频上传' },
        component: () => import('@/views/video/upload')
      },
      {
        path: 'video/index',
        name: 'VideoIndex',
        meta: { title: '视频列表' },
        component: () => import('@/views/video/index')
      },
      {
        path: 'video/view',
        name: 'VideoView',
        meta: { title: '视频处理' },
        component: () => import('@/views/video/view')
      },
      {
        path: 'verse/index',
        name: 'VerseIndex',
        meta: { title: '列表' },
        component: () => import('@/views/verse/index')
      },

      {
        path: 'verse/editor',
        name: 'VerseEditor',
        meta: { title: '宇宙编辑' },
        component: () => import('@/views/verse/editor')
      },
      {
        path: 'verse/code',
        name: 'VerseCode',
        meta: { title: '宇宙逻辑' },
        component: () => import('@/views/verse/code')
      },
      {
        path: 'verse/meta/editor',
        name: 'VerseMetaEditor',
        meta: { title: '单元编辑' },
        component: () => import('@/views/verse/meta/editor')
      }
    ]
  },

  {
    path: '/document',
    name: 'Document',
    component: Layout,
    meta: { title: '欢迎页面' },
    children: [
      {
        path: 'index',
        name: 'DocumentIndex',
        component: () => import('@/views/document/index'),
        children: [
          {
            path: '/main1',
            name: 'DocumentIndexMain1',
            component: () => import('@/views/document/mains/Main1')
          },
          {
            path: '/main2',
            name: 'DocumentIndexMain2',
            component: () => import('@/views/document/mains/Main2')
          }
        ]
      }
    ]
  },

  {
    path: '/site',
    component: () => import('@/views/site/index'),
    hidden: true
  },
  {
    path: '/site/index',
    component: () => import('@/views/site/index'),
    hidden: true
  },
  {
    path: '/site/wechat-signup',
    component: () => import('@/views/site/wechat-signup'),
    hidden: true
  },
  {
    path: '/site/logout',
    component: () => import('@/views/site/logout'),
    hidden: true
  },
  {
    path: '/site/binded-email',
    component: () => import('@/views/site/binded-email'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
