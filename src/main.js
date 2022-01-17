import Vue from 'vue'

import VueCookies from 'vue-cookies'

import { abilitiesPlugin } from '@casl/vue'
import ability from './ability'

import vueHljs from 'vue-hljs'
import hljs from 'highlight.js'
// if you want to use default color, import this css file
import 'vue-hljs/dist/style.css'

import './plugins/fontawesome'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import VueCropper from 'vue-cropper' // head icon upload

// Import Froala Editor
import 'froala-editor/js/plugins.pkgd.min.js'
// Import third party plugins
import 'froala-editor/js/third_party/embedly.min'
import 'froala-editor/js/third_party/spell_checker.min'
import 'froala-editor/js/third_party/image_tui.min'
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css'

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'

Vue.use(VueFroala)

// cookies

Vue.use(VueCookies)
Vue.$cookies.config('7d')

// ability
Vue.use(abilitiesPlugin, ability, {
  useGlobalProperties: true
})
// highlight

Vue.use(vueHljs, { hljs })

// set head icon upload
Vue.use(VueCropper)

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
