import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('./components/LoginView.vue' /* webpackChunkName: "Login" */),
    meta: {
      requiresAuth: false,
      showAppMenu: false,
      transitionName: 'slide-up',
    },
  },
]

export { routes }
