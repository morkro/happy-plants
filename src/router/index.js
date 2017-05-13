import Vue from 'vue'
import Router from 'vue-router'

import { routes as add } from '@/container/add'
import { routes as plants } from '@/container/plants'
import { routes as settings } from '@/container/settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...add,
    ...plants,
    ...settings
  ]
})
