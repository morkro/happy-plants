import { RouteConfig } from 'vue-router'

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

export { routes }
