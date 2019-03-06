import Vue from 'vue'

import Cookies from 'js-cookie'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.styl' // global stylus

import i18n from './lang'

import * as filters from './filters'

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium',
  i18n: (key, val) => i18n.t(key, val)
})

Object.keys(filters).forEach(k => {
  Vue.filter(k, filters[k])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
