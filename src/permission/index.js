import NProgress from 'nprogress'

import router from '@/router'

import 'nprogress/nprogress.css'

NProgress.configure({showSpinner: false})

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms))
}

async function wait(ms) {
  console.log(`wait ${ms}`)
  await sleep(ms)
  console.log('wake up')
}

// permission judge function
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true

//   if (!permissionRoles) return true

//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

router.beforeEach((to, from, next) => {
  NProgress.start()

  wait(2000)
    .then(() => next())
})

router.afterEach(() => NProgress.done())
