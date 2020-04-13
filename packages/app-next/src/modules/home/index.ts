import { RouteConfig } from 'vue-router'
import store from './store'

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/home',
    component: () => import('./views/Home.vue' /* webpackChunkName: "home" */),
    meta: {
      requiresAuth: true,
    },
  },
]

export { routes, store }
