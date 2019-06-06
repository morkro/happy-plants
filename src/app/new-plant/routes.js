export default [
  {
    path: '/new',
    name: 'NewPlant',
    component: () => import('./screens/NewPlant' /* webpackChunkName: "new-plant" */)
  }
]
