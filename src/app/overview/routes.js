import { beforeEnter } from '@/router/guards'

export default [
  {
    path: '/',
    name: 'Overview',
    component: () => import('./screens/Overview' /* webpackChunkName: "overview" */),
    meta: {
      requiresAuth: true
    },
    beforeEnter
  }
]
