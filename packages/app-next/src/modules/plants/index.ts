import { RouteConfig } from 'vue-router'
import store from './store'

const meta = {
  requiresAuth: true,
  showAppMenu: true,
}

const routes: RouteConfig[] = [
  {
    path: '/plant/:id',
    component: () => import('./components/Container.vue' /* webpackChunkName: "plant" */),
    children: [
      {
        path: '',
        name: 'Plant',
        component: () => import('./components/PlantView.vue' /* webpackChunkName: "plant" */),
        meta,
      },
      {
        path: 'gallery',
        name: 'Gallery',
        component: () => import('./components/GalleryView.vue' /* webpackChunkName: "plant" */),
        meta,
      },
    ],
  },
]

export { routes, store }
