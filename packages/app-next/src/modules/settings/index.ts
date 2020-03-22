import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    name: 'Settings',
    path: '/settings',
    component: () => import('./views/Settings.vue' /* webpackChunkName: "settings" */),
    meta: {
      requiresAuth: true,
    },
  },
]

export { routes }
