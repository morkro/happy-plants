import { hasUser } from '@/app/user/utils/user'

export default [
  {
    path: '/intro',
    component: () => import('./screens/Intro' /* webpackChunkName: "intro" */),
    meta: {
      requiresAuth: false
    },
    async beforeEnter (to, from, next) {
      if (await hasUser()) {
        next('/')
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        name: 'Welcome',
        component: () => import('./screens/Welcome' /* webpackChunkName: "intro" */)
      },
      {
        path: 'storage',
        name: 'IntroStorage',
        component: () => import('./screens/Storage' /* webpackChunkName: "intro" */)
      },
      {
        path: 'register',
        name: 'IntroRegister',
        component: () => import('./screens/Register' /* webpackChunkName: "intro" */)
      },
      {
        path: 'howto',
        name: 'IntroHowTo',
        component: () => import('./screens/HowTo' /* webpackChunkName: "intro" */)
      }
    ]
  }
]
