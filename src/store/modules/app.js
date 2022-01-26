
const state = {
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  blind: false,
  device: 'desktop'
}

const mutations = {
  setSidebar: (state, { opened, withoutAnimation }) => {
    if (!state.blind) {
      state.blind = true
      state.sidebar.opened = opened
      state.sidebar.withoutAnimation = withoutAnimation

      setTimeout(() => {
        var myEvent = new Event('resize')
        window.dispatchEvent(myEvent)
      }, 100)
      setTimeout(() => {
        state.blind = false
      }, 110)
    }
  },

  toggleDevice: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit, state }) {
    commit('setSidebar', {
      opened: !state.sidebar.opened,
      withoutAnimation: false
    })
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('setSidebar', {
      opened: false,
      withoutAnimation: withoutAnimation
    })
  },
  toggleDevice({ commit }, device) {
    commit('toggleDevice', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
