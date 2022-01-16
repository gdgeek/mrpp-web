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
      url: '/discovery',
      icon: 'compass',
      items: [
        {
          label: '新闻',
          url: '/discovery/news',
          icon: 'newspaper'
        },
        {
          label: '下载',
          url: '/discovery/download',
          icon: 'download'
        },
        {
          label: '文档',
          url: '/discovery/document',
          icon: 'book'
        },
        {
          label: '案例',
          url: '/discovery/example',
          icon: 'star-half-alt'
        }
      ]
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

export default {
  state
}
