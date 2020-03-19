import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    name: 'NotFound',
    path: '*',
    component: () => import('./views/NotFound.vue' /* webpackChunkName: "notfound" */),
    meta: {
      requiresAuth: false,
    },
  },
]

export { routes }
