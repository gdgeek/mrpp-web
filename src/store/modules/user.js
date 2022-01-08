import { login, signup } from '@/api/sites'
import { getData, /* getMenu,*/ logout } from '@/api/servers'
import { setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
const getDefaultState = () => {
  return {
    name: '',
    data: null,
    menu: []
  }
}

const state = getDefaultState()

const mutations = {
  resetState: state => {
    Object.assign(state, getDefaultState())
  },
  setData: (state, data) => {
    state.data = data
    state.name = data.username
  },
  setMenu: (state, menu) => {
    state.menu = menu
  }
}

const actions = {

  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const data = response.data
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
  }, /*
  getMenu({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMenu()
        .then(response => {
          console.log(response)

          const data = response.data

          alert(JSON.stringify(data))
          if (!data) {
            return reject('No Menu.')
          }
          const { menu } = data
          commit('setMenu', menu)
          resolve(data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },*/
  // get user info
  getData({ commit, state }) {
    return new Promise((resolve, reject) => {
      getData(state.token)
        .then(response => {
          const data = response.data
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          commit('setData', data.data)
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
          commit('resetState')
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
      commit('resetState')
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
