import { RouteConfig } from 'vue-router'
import store from './store'

const routes: RouteConfig[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('./views/Login.vue' /* webpackChunkName: "Login" */),
    meta: {
      requiresAuth: false,
    },
  },
]

export { routes, store }
