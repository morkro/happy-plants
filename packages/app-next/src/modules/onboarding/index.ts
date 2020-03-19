import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    name: 'Onboarding',
    path: '/onboarding',
    component: () => import('./views/Onboarding.vue' /* webpackChunkName: "Onboarding" */),
    meta: {
      requiresAuth: false,
    },
  },
]

export { routes }
