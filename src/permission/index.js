import NProgress from 'nprogress'

import router from '@/router'

import firebase from '@/plugins/firebase'

import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false})

const excludeList = ['/login', '/register', '/404']

router.beforeEach((to, from, next) => {
  NProgress.start()
  const currentUser = firebase.auth().currentUser
  if (currentUser) {
    if (to.path === '/login') {
      router.replace('/')
    } else {
      // TODO get roles
      next()
    }
  } else {
    if (excludeList.indexOf(to.path)>=0) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => NProgress.done())
