import Vue from 'vue'
import vbclass from 'vue-body-class'
import firebase from 'firebase/app'
import 'firebase/auth'

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

Vue.use(vbclass, router)

Vue.config.productionTip = false

let app = null
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      i18n,
      render: h => h(App)
    }).$mount('#app')    
  }
})
