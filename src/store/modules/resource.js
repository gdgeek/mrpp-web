const state = {
  polygenList: null,
  videoList: null,
  pictureList: null
}

const mutations = {
  setPolygenList(state, list) {
    state.polygenList = []
    list.forEach(item => {
      state.polygenList.push({ name: item.name, id: item.id })
    })
  },
  setVideoList(state, list) {
    state.videoList = []
    list.forEach(item => {
      state.videoList.push({ name: item.name, id: item.id })
    })
  },
  setPictureList(state, list) {
    state.pictureList = []
    list.forEach(item => {
      state.pictureList.push({ name: item.name, id: item.id })
    })
  }
}

export default {
  state,
  mutations
}
