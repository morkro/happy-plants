export default [
  {
    path: '/plant/:id',
    name: 'PlantView',
    component: () => import('./components/PlantView' /* webpackChunkName: "plant" */)
  }
]
