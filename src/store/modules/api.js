import Vue from 'vue'
const state = {
  url: 'http://api.tmrpp.com',
  temp: 'http://tmrpp.com',
  document: 'https://hololens2.cn/wp-json/wp/v2/',
  access_token: null
}
const mutations = {
  setupAccessToken(state, token) {
    state.access_token = token
  }
}
const actions = {
  async signup({ state }, { data, succeed, failed }) {
    Vue.axios.post(state.url + '/sites/signup', {
      SignupForm: data
    }).then((response) => {
      console.log(response)
      succeed(response.data)
    }).catch(function(error) {
      console.log(error)
      if (typeof (failed) !== 'undefined') {
        failed(error)
      }
    })
  },
  async loadMenu({ state }, { succeed, failed }) {
    Vue.axios.get(state.url + '/menus').then((response) => {
      if (response.data) {
        if (typeof (succeed) !== 'undefined') {
          succeed(response.data)
        }
      } else {
        if (typeof (failed) !== 'undefined') {
          failed()
        }
      }
    }).catch(function(error) {
      console.log(error)
      if (typeof (failed) !== 'undefined') {
        failed(error)
      }
    })
  },
  async loadUser({ state }, { succeed, failed }) {
    Vue.axios.get(state.url + '/servers/user').then((response) => {
      if (response.data) {
        if (typeof (succeed) !== 'undefined') {
          succeed(response.data)
        }
      } else {
        if (typeof (failed) !== 'undefined') {
          failed()
        }
      }
    }).catch(function(error) {
      console.log(error)
      if (typeof (failed) !== 'undefined') {
        failed(error)
      }
    })
  }
}
export default {
  state,
  mutations,
  actions
}
