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
        meta: { title: '设置/个人中心' },
        path: 'settings/user',
        name: 'SettingUser',
        component: () => import('@/views/settings/user')
      },
      {
        meta: { title: '设置/账号设置' },
        path: 'settings/account',
        name: 'SettingAccount',
        component: () => import('@/views/settings/account')
      },
      {
        path: 'polygen/upload',
        name: 'PolygenUpload',
        meta: { title: '模型资源/模型上传' },
        component: () => import('@/views/polygen/upload')
      },
      {
        path: 'polygen/index',
        name: 'PolygenIndex',
        meta: { title: '模型资源/模型列表' },
        component: () => import('@/views/polygen/index')
      },
      {
        path: 'polygen/view',
        name: 'PolygenView',
        meta: { title: '模型资源/模型处理' },
        component: () => import('@/views/polygen/view')
      },
      {
        path: 'picture/upload',
        name: 'PictureUpload',
        meta: { title: '图片资源/上传图片' },
        component: () => import('@/views/picture/upload')
      },
      {
        path: 'picture/index',
        name: 'PictureIndex',
        meta: { title: '图片资源/图片列表' },
        component: () => import('@/views/picture/index')
      },
      {
        path: 'picture/view',
        name: 'PictureView',
        meta: { title: '图片资源/图片处理' },
        component: () => import('@/views/picture/view')
      },
      {
        path: 'video/upload',
        name: 'VideoUpload',
        meta: { title: '视频资源/视频上传' },
        component: () => import('@/views/video/upload')
      },
      {
        path: 'video/index',
        name: 'VideoIndex',
        meta: { title: '视频资源/视频列表' },
        component: () => import('@/views/video/index')
      },
      {
        path: 'video/view',
        name: 'VideoView',
        meta: { title: '视频资源/视频处理' },
        component: () => import('@/views/video/view')
      },
      {
        path: 'verse/index',
        name: 'VerseIndex',
        meta: { title: '宇宙/列表' },
        component: () => import('@/views/verse/index')
      },

      {
        path: 'verse/editor',
        name: 'VerseEditor',
        meta: { title: '宇宙/编辑' },
        component: () => import('@/views/verse/editor')
      },
      {
        path: 'verse/code',
        name: 'VerseCode',
        meta: { title: '宇宙/逻辑' },
        component: () => import('@/views/verse/code')
      },
      {
        path: 'verse/meta/editor',
        name: 'VerseMetaEditor',
        meta: { title: '宇宙/元/编辑' },
        component: () => import('@/views/verse/meta/editor')
      },
      {
        path: '/discovery/news',
        name: 'DiscoveryNews',
        meta: { title: '探索/站内新闻' },
        component: () => import('@/views/discovery/news')
      },
      {
        path: '/discovery/download',
        name: 'DiscoveryDownload',
        meta: { title: '探索/下载页面' },
        component: () => import('@/views/discovery/download')
      },
      {
        path: '/discovery/document',
        name: 'DiscoveryDocument',
        meta: { title: '探索/相关文档' },
        component: () => import('@/views/discovery/document')
      },
      {
        path: '/discovery/example',
        name: 'DiscoveryExample',
        meta: { title: '探索/案例展示' },
        component: () => import('@/views/discovery/example')
      },
      {
        path: '/community/index',
        name: 'CommunityIndex',
        meta: { title: '交流' },
        component: () => import('@/views/community/index')
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
