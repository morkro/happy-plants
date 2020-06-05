import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    name: 'Plant',
    path: '/plant/:id',
    component: () => import('./views/Plant.vue' /* webpackChunkName: "plant" */),
    meta: {
      requiresAuth: true,
      showAppMenu: true,
    },
  },
]

export { routes }
