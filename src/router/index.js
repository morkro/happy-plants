import Vue from 'vue'
import Router from 'vue-router'

import { routes as overview } from '@/container/overview'
import { routes as add } from '@/container/add'
import { routes as plants } from '@/container/plants'
import { routes as settings } from '@/container/settings'
import { routes as notfound } from '@/container/not-found'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...overview,
    ...add,
    ...plants,
    ...settings,
    ...notfound
  ]
})
