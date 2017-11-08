export default [
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('./components/CategoriesContainer' /* webpackChunkName: "categories" */)
  }
]
