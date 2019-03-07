import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faCoffee, faPhone, faUser, faEye, faEyeSlash
} from '@fortawesome/free-solid-svg-icons'

import {
  faGoogle,
  faGithub,
  faFacebook
} from '@fortawesome/free-brands-svg-icons'

import {
  faComment
} from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add([
  faCoffee,
  faPhone,
  faComment,
  faUser,
  faEye,
  faEyeSlash,
  faGoogle,
  faFacebook,
  faGithub
])

Vue.component('fai', FontAwesomeIcon)
