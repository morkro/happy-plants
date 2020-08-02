import { RouteConfig } from 'vue-router'
import store from './store'

const routes: RouteConfig[] = [
  {
    path: '/account',
    name: 'Account',
    component: () => import('./views/Account.vue' /* webpackChunkName: "account" */),
    meta: {
      requiresAuth: false,
      showAppMenu: false,
    },
  },
]

export { store, routes }
