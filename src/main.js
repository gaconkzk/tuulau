import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import './plugins/element-ui'
import './plugins/fontawesome'
import './plugins/firebase'

import './permission'

import i18n from './lang'

import * as filters from './filters'

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
