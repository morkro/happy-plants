export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('./screens/Login' /* webpackChunkName: "auth" */)
  }
]
