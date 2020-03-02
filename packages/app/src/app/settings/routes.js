export default [
  {
    path: '/settings',
    component: () => import('./screens/Settings' /* webpackChunkName: "settings" */),
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import('./screens/SettingsMenu' /* webpackChunkName: "settings" */)
      },
      {
        path: 'data',
        name: 'SettingsData',
        component: () => import('./screens/SettingsData' /* webpackChunkName: "settings" */)
      },
      {
        path: 'storage',
        name: 'SettingsStorage',
        component: () => import('./screens/SettingsStorage' /* webpackChunkName: "settings" */)
      },
      {
        path: 'tags',
        name: 'SettingsTags',
        component: () => import('./screens/SettingsTags' /* webpackChunkName: "settings" */)
      },
      {
        path: 'about',
        name: 'SettingsAbout',
        component: () => import('./screens/SettingsAbout' /* webpackChunkName: "settings" */)
      },
      {
        path: 'release',
        name: 'SettingsReleaseNotes',
        component: () => import('./screens/SettingsReleaseNotes' /* webpackChunkName: "settings" */)
      }
    ]
  }
]
