export default [
  {
    path: '/gallery/:id',
    name: 'Gallery',
    component: () => import('./screens/Gallery' /* webpackChunkName: "gallery" */)
  }
]
