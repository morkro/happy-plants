import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import { routes as intro } from '@/app/intro'
import { routes as overview } from '@/app/overview'
import { routes as register } from '@/app/register'
import { routes as plant } from '@/app/plant'
import { routes as gallery } from '@/app/gallery'
import { routes as settings } from '@/app/settings'
import { routes as notfound } from '@/app/not-found'

Vue.use(Router)
Vue.use(Meta, { keyName: 'meta' })

const router = new Router({
  mode: 'history',

  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },

  routes: [
    ...intro,
    ...overview,
    ...register,
    ...plant,
    ...gallery,
    ...settings,
    ...notfound
  ]
})

export default router
