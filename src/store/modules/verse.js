const state = {
  data: {
    name: null,
    mates: null,
    id: -1,
    reteId: -1,
    reteData: null
  }
}

const mutations = {
  setVerseName(state, name) {
    state.data.name = name
  },
  setVerseReteId(state, reteId) {
    state.data.reteId = reteId
    alert(reteId)
  },
  setVerseId(state, id) {
    state.data.id = id
  },
  setVerseReteData(state, reteData) {
    state.data.reteData = reteData
  },
  setVerseData(state, verse) {
    state.data.name = verse.name
    // state.data.mates = meta.verse.name!!!
    state.data.id = verse.id

    if (verse.verseRetes.length > 0) {
      state.data.reteId = verse.verseRetes[0].id
      state.data.reteData = verse.verseRetes[0].data
    }
  }
}

export default {
  state,
  mutations
}
