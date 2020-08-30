import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    name: 'New',
    path: '/new',
    component: () => import('./components/NewView.vue' /* webpackChunkName: "new" */),
    meta: {
      requiresAuth: true,
      showAppMenu: true,
    },
  },
]

export { routes }
