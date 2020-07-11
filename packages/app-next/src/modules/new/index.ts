import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    name: 'New',
    path: '/new',
    component: () => import('./views/New.vue' /* webpackChunkName: "new" */),
    meta: {
      requiresAuth: true,
      showAppMenu: true,
    },
  },
]

export { routes }
