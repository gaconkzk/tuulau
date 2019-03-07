import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Cookies from 'js-cookie'

import '../styles/index.styl' // global stylus
import i18n from '../lang'

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium',
  i18n: (key, val) => i18n.t(key, val)
})
