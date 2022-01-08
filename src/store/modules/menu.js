const state = {
  data: [
    {
      label: '退出登录',
      url: ['/site/logout'],
      visible: true,
      icon: 'reply',
      options: {
        icon: 'reply',
        visible: true
      }
    }
  ]
}

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
}

export default {
  state,
  mutations
}
