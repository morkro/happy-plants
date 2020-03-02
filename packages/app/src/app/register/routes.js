export default [
  {
    path: '/add',
    name: 'RegisterPlant',
    component: () => import('./screens/Register' /* webpackChunkName: "register" */)
  }
]
