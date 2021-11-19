import Vue from 'vue'
import './plugins/fontawesome'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import VueCookies from 'vue-cookies'
import '@/icons' // icon
import '@/permission' // permission control

Vue.use(VueCookies)
Vue.$cookies.config('7d')
/*
axios.interceptors.request.use(
  function (config) {
    if (store.state.api.access_token !== null) {
      config.headers.Authorization = 'Bearer ' + store.state.api.access_token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
response => {
  return response
},
error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        // 返回 401 清除token信息并跳转到登录页面
        confirm('过期')
        router.replace({
          path: '/'
        })
        location.reload()
    }
  }
  return Promise.reject(error.response.data)   // 返回接口返回的错误信息
})
*/

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
/*
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
*/

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
