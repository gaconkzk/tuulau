import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faPhone, faComment, faUser, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([
  faCoffee,
  faPhone,
  faComment,
  faUser,
  faEye
])

Vue.component('fai', FontAwesomeIcon)
