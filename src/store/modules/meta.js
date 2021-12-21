const state = {
  name: null
}

const mutations = {
  putMetaName(state, name) {
    state.name = name
  }
}

export default {
  state,
  mutations
}
