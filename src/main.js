import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueCookies from 'vue-cookies'

Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.$cookies.config('7d')
Vue.use(VueAxios, axios)

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
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
