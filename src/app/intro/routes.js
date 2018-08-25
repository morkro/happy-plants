export default [
  {
    path: '/intro',
    component: () => import('./Intro' /* webpackChunkName: "intro" */),
    children: [
      {
        path: '',
        name: 'Intro',
        component: () => import('./components/Start' /* webpackChunkName: "intro" */)
      },
      {
        path: 'storage',
        name: 'IntroStorage',
        component: () => import('./components/Storage' /* webpackChunkName: "intro" */)
      },
      {
        path: 'howto',
        name: 'IntroHowTo',
        component: () => import('./components/HowTo' /* webpackChunkName: "intro" */)
      }
    ]
  }
]
