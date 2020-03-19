import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import { routes as welcome } from './modules/welcome'
import { routes as login } from './modules/login'
import { routes as onboarding } from './modules/onboarding'
import { routes as home } from './modules/home'
import { routes as notfound } from './modules/404'

Vue.use(VueRouter)

const router: VueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/home' },
    ...welcome,
    ...login,
    ...onboarding,
    ...home,
    ...notfound,
  ],
  scrollBehavior(to: Route, from: Route, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
})

router.beforeEach((to: Route, from: Route, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    next('welcome')
  } else {
    next()
  }
})

export default router
