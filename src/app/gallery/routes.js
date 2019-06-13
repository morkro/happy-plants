import { beforeEnter } from '@/router/guards'

export default [
  {
    path: '/gallery/:id',
    name: 'Gallery',
    component: () => import('./screens/Gallery' /* webpackChunkName: "gallery" */),
    meta: {
      requiresAuth: true
    },
    beforeEnter
  }
]
