export default [
  {
    path: '*',
    name: 'NotFound',
    component: () => import('./screens/NotFound' /* webpackChunkName: "404" */)
  }
]
