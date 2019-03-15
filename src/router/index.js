import Vue from 'vue'
import Router from 'vue-router'
import About from '../views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ '@/views/register/index.vue'),
    },
    {
      path: '/',
      name: 'about',
      component: About,
      meta: {
        allowRead: ['admin', 'editor'],
        allowWrite: ['admin']
      }
    },
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "error_404" */ '@/views/404/index.vue'),
      hidden: true
    },
    {
      path: '*',
      redirect: '/404', hidden: true
    }
  ]
})
