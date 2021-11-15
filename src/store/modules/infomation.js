const state = {
  title: '混合现实编程平台',
  subTitle: '混合现实编程平台(v0.1.0)',
  breadcrumbs: []
}

const mutations = {
  setTitle(state, title) {
    state.title = title
  },
  setSubTitle(state, subTitle) {
    state.subTitle = subTitle
  },
  setBreadcrumbs(state, breadcrumbs) {
    state.breadcrumbs = breadcrumbs
  }
}

export default {
  state,
  mutations
}
