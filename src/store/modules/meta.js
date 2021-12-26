import { putMetaRete, postMetaRete } from '@/api/v1/metaRete'
import { putMeta } from '@/api/v1/meta'

const state = {
  data: {
    name: null,
    verse: null,
    id: -1,
    reteId: -1,
    reteData: null
  }
}

const mutations = {
  setMetaName(state, name) {
    state.data.name = name
  },
  setMetaReteId(state, reteId) {
    state.data.reteId = reteId
  },
  setMetaId(state, id) {
    state.data.id = id
  },
  setMetaReteData(state, reteData) {
    state.data.reteData = reteData
  },
  setMetaData(state, meta) {
    state.data.name = meta.name
    state.data.verse = meta.verse.name
    state.data.id = meta.id

    if (meta.metaRetes.length > 0) {
      state.data.reteId = meta.metaRetes[0].id
      state.data.reteData = meta.metaRetes[0].data
    }
  }
}
const actions = {
  saveMetaRete({ state }, data) {
    return new Promise((resolve, reject) => {
      putMetaRete(state.data.reteId, {
        meta_id: state.data.id,
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
  saveMeta({ state }, data) {
    return new Promise((resolve, reject) => {
      putMeta(state.data.id, {
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
  createMetaRete({ state }, data) {
    return new Promise((resolve, reject) => {
      postMetaRete({
        meta_id: state.data.id,
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
