import { login, signup } from '@/api/sites'
import { getData, getMenu, logout } from '@/api/servers'
import { /* getToken, */setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
const getDefaultState = () => {
  return {
    name: '',
    data: null,
    wxOpenid: '',
    menu: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },

  SET_DATA: (state, data) => {
    state.data = data
  },

  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_WXOPENID: (state, wxOpenid) => {
    state.wxOpenid = wxOpenid
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const data = response.data

          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  signup({ commit }, info) {
    return new Promise((resolve, reject) => {
      signup(info)
        .then(response => {
          console.log(response)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  getMenu({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMenu()
        .then(response => {
          console.log(response)
          const data = response.data
          if (!data) {
            return reject('No Menu.')
          }
          const { menu } = data
          commit('SET_MENU', menu)
          resolve(data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  // get user info
  getData({ commit, state }) {
    return new Promise((resolve, reject) => {
      getData(state.token)
        .then(response => {
          const data = response.data
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          commit('SET_NAME', data.username)
          console.log('==================')
          console.log(data)
          commit('SET_DATA', data.data)
          resolve(data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
