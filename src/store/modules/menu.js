const state = {
  data: [
    {
      label: '首页',
      url: '/home/index',
      icon: 'home'
    },
    {
      label: '【元&宇宙】编辑',
      url: '/verse/index',
      icon: 'adjust'
    },
    {
      label: '资源管理',
      url: '/resource',
      icon: 'cubes',
      items: [
        {
          label: '模型管理',
          url: '/polygen',
          icon: 'cube',
          items: [
            {
              label: '模型列表',
              url: '/polygen/index',
              icon: 'list'
            },
            {
              label: '模型上传',
              url: '/polygen/upload',
              icon: 'upload'
            }
          ]
        },
        {
          label: '图片管理',
          url: '/picture',
          icon: 'file-image',
          items: [
            {
              label: '图片列表',
              url: '/picture/index',
              icon: 'list'
            },
            {
              label: '图片上传',
              url: '/picture/upload',
              icon: 'upload'
            }
          ]
        },
        {
          label: '视频管理',
          url: '/video',
          icon: 'file-video',
          items: [
            {
              label: '视频列表',
              url: '/video/index',
              icon: 'list'
            },
            {
              label: '视频上传',
              url: '/video/upload',
              icon: 'upload'
            }
          ]
        }
      ]
    },
    {
      label: '探索',
      url: '/document/index',
      icon: 'book'
    },
    {
      label: '交流',
      url: '/community/index',
      icon: 'address-card'
    },
    {
      label: '退出登录',
      url: '/site/logout',
      icon: 'reply'
    }
  ]
}
/*
const mutations = {
  flashSetup(state, { title, type = 'success', description = null }) {
    state.main.title = title
    state.main.type = type
    state.main.description = description
    state.main.show = true
  },
  flashClean(state) {
    state.main.show = false
  }
}*/

export default {
  state
}
