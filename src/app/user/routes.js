export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('./screens/Login' /* webpackChunkName: "auth" */)
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('./screens/Logout' /* webpackChunkName: "auth" */)
  }
]
