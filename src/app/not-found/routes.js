export default [
  {
    path: '*',
    name: 'NotFound',
    component: () => import('./NotFound' /* webpackChunkName: "404" */)
  }
]
