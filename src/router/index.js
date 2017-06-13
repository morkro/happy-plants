import Vue from 'vue'
import Router from 'vue-router'

import { routes as overview } from '@/app/overview'
import { routes as register } from '@/app/register'
import { routes as plant } from '@/app/plant'
import { routes as settings } from '@/app/settings'
import { routes as notfound } from '@/app/not-found'

Vue.use(Router)

export default new Router({
  // FIXME: Work-around for Netlify. Revert when history mode can be resolved on server side.
  mode: process.env.NODE_ENV === 'development' ? 'history' : 'hash',
  routes: [
    ...overview,
    ...register,
    ...plant,
    ...settings,
    ...notfound
  ]
})
