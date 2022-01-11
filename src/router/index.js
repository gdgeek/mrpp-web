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
    path: '/',
    redirect: '/document/index',
    component: Layout
  },
  {
    path: '/document',
    component: Layout,
    redirect: '/document/workdata',
    meta: { title: '工作中心' },
    children: [
      {
        path: 'workdata',
        name: 'Workdata',
        component: () => import('@/views/document/workdata/workdata')
      },
      {
        path: 'doing',
        name: 'Doing',
        component: () => import('@/views/document/workdata/doing/doing')
      },
      {
        path: 'doing2',
        name: 'Doing2',
        component: () => import('@/views/document/workdata/doing/doing2')
      }
      // {
      //   path: 'doing',
      //   name: 'Doing',
      //   component: () => import('@/views/document/workdata/doing/doing')
      // }
    ]
  },
  // {
  //   path: '/workdata',
  //   component: Layout,
  //   meta: { title: '工作中心' },
  //   redirect: '/workdata/workdata',

  // },
  {
    path: '/settings',
    component: Layout,
    meta: { title: '个人中心' },
    redirect: '/settings/user',
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/settings/user')
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    meta: { title: '账号设置' },
    redirect: '/settings/account',
    children: [
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/settings/account')
      }
    ]
  },
  {
    path: '/polygen',
    redirect: '/polygen/index',
    component: Layout,
    meta: { title: '模型管理' },
    children: [
      {
        path: 'upload',
        name: 'Upload',
        meta: { title: '模型上传' },
        component: () => import('@/views/polygen/upload')
      },
      {
        path: 'index',
        name: 'Index',
        meta: { title: '模型列表' },
        component: () => import('@/views/polygen/index')
      },
      {
        path: 'view',
        name: 'View',
        meta: { title: '模型处理' },
        component: () => import('@/views/polygen/view')
      }
    ]
  },
  {
    path: '/picture',
    redirect: '/picture/index',
    component: Layout,
    meta: { title: '图片管理' },
    children: [
      {
        path: 'upload',
        name: 'Upload',
        meta: { title: '上传图片' },
        component: () => import('@/views/picture/upload')
      },
      {
        path: 'index',
        name: 'Index',
        meta: { title: '图片列表' },
        component: () => import('@/views/picture/index')
      },
      {
        path: 'view',
        name: 'View',
        meta: { title: '图片处理' },
        component: () => import('@/views/picture/view')
      }
    ]
  },
  {
    path: '/video',
    redirect: '/video/index',
    component: Layout,
    meta: { title: '视频管理' },
    children: [
      {
        path: 'upload',
        name: 'Upload',
        meta: { title: '视频上传' },
        component: () => import('@/views/video/upload')
      },
      {
        path: 'index',
        name: 'Index',
        meta: { title: '视频列表' },
        component: () => import('@/views/video/index')
      },
      {
        path: 'view',
        name: 'View',
        meta: { title: '视频处理' },
        component: () => import('@/views/video/view')
      }
    ]
  },
  {
    path: '/rete',
    component: () => import('@/views/test/rete'),
    hidden: true
  },
  {
    path: '/blockly',
    component: () => import('@/views/test/blockly'),
    hidden: true
  },
  {
    path: 'home',
    component: Layout,
    children: [
      {
        path: 'invitation',
        name: 'Invitation',
        component: () => import('@/views/jump')
      }
    ]
  },

  {
    path: '/verse',
    redirect: '/verse/index',
    component: Layout,
    meta: { title: '宇宙管理' },
    children: [
      {
        path: 'index',
        name: 'Index',
        meta: { title: '列表' },
        component: () => import('@/views/verse/index')
      },

      {
        path: 'editor',
        name: 'Editor',
        meta: { title: '宇宙编辑' },
        component: () => import('@/views/verse/editor')
      },
      {
        path: 'code',
        name: 'Code',
        meta: { title: '宇宙逻辑' },
        component: () => import('@/views/verse/code')
      },
      {
        path: 'meta/editor',
        name: 'MetaEditor',
        meta: { title: '单元编辑' },
        component: () => import('@/views/verse/meta/editor')
      }
    ]
  },
  {
    path: '/project/index',
    redirect: '/verse/index',
    component: Layout,
    meta: { title: '宇宙列表' }
  },
  {
    path: '/document',
    component: Layout,
    meta: { title: '欢迎页面' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/document/index'),
        children: [
          {
            path: '/main1',
            name: 'Main1',
            component: () => import('@/views/document/mains/main1')
          },
          {
            path: '/main2',
            name: 'Main2',
            component: () => import('@/views/document/mains/main2')
          },
          {
            path: '/main3',
            name: 'Main3',
            component: () => import('@/views/document/mains/main3')
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
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
const theRouter = () =>
  new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: []
  })

export function importRouter() {
  const newRouter = theRouter()
  router.matcher = newRouter.matcher // reset router
}

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export default router
