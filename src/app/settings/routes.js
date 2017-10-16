export default [
  {
    path: '/settings',
    component: () => import('./components/Settings' /* webpackChunkName: "settings" */),
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import('./components/SettingsMenu' /* webpackChunkName: "settings" */)
      },
      {
        path: 'about',
        name: 'SettingsAccount',
        component: () => import('./components/SettingsAccount' /* webpackChunkName: "settings" */)
      },
      {
        path: 'about',
        name: 'SettingsAbout',
        component: () => import('./components/SettingsAbout' /* webpackChunkName: "settings" */)
      },
      {
        path: 'data',
        name: 'SettingsData',
        component: () => import('./components/SettingsData' /* webpackChunkName: "settings" */)
      }
    ]
  }
]
