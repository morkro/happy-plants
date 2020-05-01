import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    name: 'Debug',
    path: '/__debug__',
    component: () => import('./views/Debug.vue' /* webpackChunkName: "debug" */),
  },
]

export { routes }
