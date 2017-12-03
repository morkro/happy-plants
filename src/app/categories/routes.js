export default [
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('./Categories' /* webpackChunkName: "categories" */)
  }
]
