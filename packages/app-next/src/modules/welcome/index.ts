import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    name: 'Welcome',
    path: '/welcome',
    component: () => import('./components/WelcomeView.vue' /* webpackChunkName: "Welcome" */),
    meta: {
      requiresAuth: false,
      showAppMenu: false,
    },
  },
]

export { routes }
