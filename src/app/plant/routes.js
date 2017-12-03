export default [
  {
    path: '/plant/:id',
    name: 'PlantView',
    component: () => import('./Plant' /* webpackChunkName: "plant" */)
  }
]
