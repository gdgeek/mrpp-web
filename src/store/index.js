import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    nickname: ''
  },
  mutations: {
    setNickname(state, val) {
      state.nickname = val
    }
  },
  modules,
  getters
})

export default store
