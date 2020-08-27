import { RouteConfig } from 'vue-router'
import store from './store'

const meta = {
  requiresAuth: true,
  showAppMenu: true,
}

const routes: RouteConfig[] = [
  {
    path: '/plant/:id',
    component: () => import('./views/Container.vue' /* webpackChunkName: "plant" */),
    children: [
      {
        path: '',
        name: 'Plant',
        component: () => import('./views/Plant.vue' /* webpackChunkName: "plant" */),
        meta,
      },
      {
        path: 'gallery',
        name: 'Gallery',
        component: () => import('./views/Gallery.vue' /* webpackChunkName: "plant" */),
        meta,
      },
    ],
  },
]

export { routes, store }
