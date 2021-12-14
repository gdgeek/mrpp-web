import { login, signup } from '@/api/sites'
import { getInfo, getMenu, logout } from '@/api/servers'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    nickname: '',
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
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
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

          console.log(data.token)
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
          //   commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          resolve(data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const data = response.data
          if (!data) {
            return reject('Verification failed, please Login again.')
          }
          commit('SET_NAME', data.username)
          commit('SET_NICKNAME', data.nickname)
          commit('SET_AVATAR', data.avatar)
          // commit('SET_AVATAR', '@/assert/qrcode.jpg')
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
