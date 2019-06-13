import { beforeEnter } from '@/router/guards'

export default [
  {
    path: '/settings',
    component: () => import('./screens/Settings' /* webpackChunkName: "settings" */),
    meta: {
      requiresAuth: true
    },
    beforeEnter,
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import('./screens/Menu' /* webpackChunkName: "settings" */)
      },
      {
        path: 'data',
        name: 'SettingsData',
        component: () => import('./screens/Data' /* webpackChunkName: "settings" */)
      },
      {
        path: 'storage',
        name: 'SettingsStorage',
        component: () => import('./screens/Storage' /* webpackChunkName: "settings" */)
      },
      {
        path: 'tags',
        name: 'SettingsTags',
        component: () => import('./screens/Tags' /* webpackChunkName: "settings" */)
      },
      {
        path: 'about',
        name: 'SettingsAbout',
        component: () => import('./screens/About' /* webpackChunkName: "settings" */)
      },
      {
        path: 'release',
        name: 'SettingsReleaseNotes',
        component: () => import('./screens/ReleaseNotes' /* webpackChunkName: "settings" */)
      }
    ]
  }
]
