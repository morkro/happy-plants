import { RouteConfig } from 'vue-router'

export type HomeViewmode = 'grid' | 'list'
export type HomeOrderBy = 'latest' | 'alphabetically'

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/home',
    component: () => import('./components/HomeView.vue' /* webpackChunkName: "home" */),
    meta: {
      requiresAuth: true,
      showAppMenu: true,
    },
  },
]

export { routes }
