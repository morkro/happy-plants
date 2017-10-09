export default [
  {
    path: '/settings',
    component: () => import(/* webpackChunkName: "settings" */ './components/Settings'),
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "settings" */ './components/SettingsMenu')
      },
      {
        path: 'about',
        name: 'SettingsAccount',
        component: () => import(/* webpackChunkName: "settings" */ './components/SettingsAccount')
      },
      {
        path: 'about',
        name: 'SettingsAbout',
        component: () => import(/* webpackChunkName: "settings" */ './components/SettingsAbout')
      },
      {
        path: 'data',
        name: 'SettingsData',
        component: () => import(/* webpackChunkName: "settings" */ './components/SettingsData')
      }
    ]
  }
]
