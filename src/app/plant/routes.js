export default [
  {
    path: '/plant/:id',
    name: 'PlantView',
    component: () => import('./components/PlantContainer' /* webpackChunkName: "plant" */)
  }
]
