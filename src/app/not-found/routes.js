export default [
  {
    path: '*',
    name: 'NotFound',
    component: () => import('./components/NotFoundContainer' /* webpackChunkName: "404" */)
  }
]
