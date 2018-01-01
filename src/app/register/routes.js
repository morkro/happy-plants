export default [
  {
    path: '/add',
    name: 'RegisterPlant',
    component: () => import('./Register' /* webpackChunkName: "register" */)
  }
]
