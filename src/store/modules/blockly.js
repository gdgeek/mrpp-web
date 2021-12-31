

const state = {
  data: {
    actions: [],
    polygens: [],
    pictures: [],
    videos:[]
  }
}

const mutations = {
  clear(state){
    state.actions = []
    state.polygens = []
    state.pictures = []
    state.videos = []
  },
  addMetaData(state, data){
    alert(data.type)
    if (
      typeof data.chieldren !== 'undefined'
    ) {

          const keys = Object.keys(data.chieldren)
          keys.forEach(key => {
            alert(key)
            data.chieldren[key].forEach(item => {
               mutations.addMetaData(state, item)
            })
          })
    }
  },
  addMeta(state, meta) {
    alert(meta.data)
    mutations.addMetaData(state, JSON.parse(meta.data))
  }
  
}
export default {
  namespaced: true,
  state,
  mutations
}
