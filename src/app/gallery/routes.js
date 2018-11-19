export default [
  {
    path: '/gallery/:id',
    name: 'Gallery',
    component: () => import('./Gallery' /* webpackChunkName: "gallery" */)
  }
]
