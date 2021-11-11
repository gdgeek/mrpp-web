const state = {
  main: {
    title: null,
    type: null,
    description: null
  }
}

const mutations = {
  flashSetup (state, {title, type, description}) {
    state.main.title = title
    state.main.type = type
    state.main.description = description
  },
  flashClean (state) {
    state.main.title = null
    state.main.type = null
    state.main.description = null
  }

}

export default {
  state,
  mutations
}
