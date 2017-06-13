import Vue from 'vue'
import Router from 'vue-router'

import { routes as overview } from '@/app/overview'
import { routes as register } from '@/app/register'
import { routes as plant } from '@/app/plant'
import { routes as settings } from '@/app/settings'
import { routes as notfound } from '@/app/not-found'

Vue.use(Router)

const isDevelopment = process.env.NODE_ENV === 'development'

export default new Router({
  // FIXME: Work-around for Netlify.
  mode: isDevelopment ? 'history' : 'hash',
  routes: [
    ...overview,
    ...register,
    ...plant,
    ...settings,
    ...notfound
  ]
})
