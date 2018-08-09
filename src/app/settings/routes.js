export default [
  {
    path: '/settings',
    component: () => import('./Settings' /* webpackChunkName: "settings" */),
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import('./components/SettingsMenu' /* webpackChunkName: "settings" */)
      },
      {
        path: 'data',
        name: 'SettingsData',
        component: () => import('./components/SettingsData' /* webpackChunkName: "settings" */)
      },
      {
        path: 'storage',
        name: 'SettingsStorage',
        component: () => import('./components/SettingsStorage' /* webpackChunkName: "settings" */)
      },
      {
        path: 'tags',
        name: 'SettingsTags',
        component: () => import('./components/SettingsTags' /* webpackChunkName: "settings" */)
      },
      {
        path: 'about',
        name: 'SettingsAbout',
        component: () => import('./components/SettingsAbout' /* webpackChunkName: "settings" */)
      },
      {
        path: 'release',
        name: 'SettingsReleaseNotes',
        component: () => import('./components/SettingsReleaseNotes' /* webpackChunkName: "settings" */)
      }
    ]
  }
]
