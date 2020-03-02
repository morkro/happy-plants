export default [
  {
    path: '/intro',
    component: () => import('./screens/Intro' /* webpackChunkName: "intro" */),
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
        path: 'howto',
        name: 'IntroHowTo',
        component: () => import('./screens/HowTo' /* webpackChunkName: "intro" */)
      }
    ]
  }
]
