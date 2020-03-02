export default [
  {
    path: '/',
    name: 'Overview',
    component: () => import('./screens/Overview' /* webpackChunkName: "overview" */)
  }
]
