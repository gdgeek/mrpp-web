
const state = {
  data: {
    actions: [],
    polygens: [],
    pictures: [],
    videos: [],
    entities: []
  }
}

const mutations = {
  clear(state) {
    state.actions = []
    state.polygens = []
    state.pictures = []
    state.videos = []
  },
  addMetaData(state, name, data) {
    if (typeof data.parameters.action !== 'undefined') {
      if (typeof data.parameters.action_parameter !== 'undefined') {
        state.data.actions.push({
          uuid: data.parameters.uuid,
          name: name + ':' + data.parameters.action,
          parameter: data.parameters.action_parameter
        })
      } else {
        state.data.actions.push({
          uuid: data.parameters.uuid,
          name: name + ':' + data.parameters.action
        })
      }
    }

    switch (data.type) {
      case 'Polygen':
        state.data.polygens.push({
          uuid: data.parameters.uuid,
          name: data.parameters.action
        })
        break
      case 'Entity':
        state.data.entities.push({
          uuid: data.parameters.uuid,
          name: data.parameters.action
        })
        break
      case 'Video':
        state.data.videos.push({
          uuid: data.parameters.uuid,
          name: data.parameters.action
        })
        break
      case 'Picture':
        state.data.pictures.push({
          uuid: data.parameters.uuid,
          name: data.parameters.action
        })
        break
    }
    if (typeof data.chieldren !== 'undefined') {
      const keys = Object.keys(data.chieldren)
      keys.forEach(key => {
        data.chieldren[key].forEach(item => {
          mutations.addMetaData(state, name, item)
        })
      })
    }
  },
  addMeta(state, meta) {
    mutations.addMetaData(state, meta.name, JSON.parse(meta.data))
  }

}
export default {
  namespaced: true,
  state,
  mutations
}
