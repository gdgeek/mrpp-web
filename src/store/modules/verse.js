import { putVerse } from '@/api/v1/verse'
const state = {
  data: {
    name: null,
    mates: null,
    id: -1
  }
}

const mutations = {
  setVerseName(state, name) {
    state.data.name = name
  },
  setVerseId(state, id) {
    state.data.id = id
  },

  setVerseData(state, verse) {
    state.data.name = verse.name
    state.data.id = verse.id

    if (verse.verseRetes.length > 0) {
      state.data.reteId = verse.verseRetes[0].id
      state.data.reteData = verse.verseRetes[0].data
    }
  }
}
const actions = {
  saveVerse({ state }, data) {
    return new Promise((resolve, reject) => {
      putVerse(state.data.id, {
        data
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
