import { RouteConfig } from 'vue-router'
import store from './store'

export type HomeViewmode = 'grid' | 'list'
export type HomeOrderBy = 'latest' | 'alphabetically'

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/home',
    component: () => import('./views/Home.vue' /* webpackChunkName: "home" */),
    meta: {
      requiresAuth: true,
      showAppMenu: true,
    },
  },
]

export { routes, store }
