import Vue from 'vue'
import Router from 'vue-router'
import { routes as overview } from '@/container/overview'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...overview
  ]
})
