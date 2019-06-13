import { beforeEnter } from '@/router/guards'

export default [
  {
    path: '/plant/:id',
    name: 'PlantView',
    component: () => import('./screens/Plant' /* webpackChunkName: "plant" */),
    meta: {
      requiresAuth: true
    },
    beforeEnter
  }
]
