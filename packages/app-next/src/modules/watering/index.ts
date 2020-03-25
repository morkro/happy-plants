import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    name: 'Watering',
    path: '/watering',
    component: () => import('./views/Watering.vue' /* webpackChunkName: "watering" */),
    meta: {
      requiresAuth: true,
    },
  },
]

export { routes }
