import { putVerseRete, postVerseRete } from '@/api/v1/verseRete'
import { putVerse } from '@/api/v1/verse'
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
  },
  setVerseId(state, id) {
    state.data.id = id
  },
  setVerseReteData(state, reteData) {
    state.data.reteData = reteData
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
  saveVerseRete({ state }, data) {
    return new Promise((resolve, reject) => {
      putVerseRete(state.data.reteId, {
        verse_id: state.data.id,
        data
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
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
  },
  createVerseRete({ state }, data) {
    return new Promise((resolve, reject) => {
      postVerseRete({
        verse_id: state.data.id,
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
