export default [
  {
    path: '/plant/:id',
    name: 'PlantView',
    component: () => import('./screens/Plant' /* webpackChunkName: "plant" */)
  }
]
