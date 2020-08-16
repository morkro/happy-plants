import { RouteConfig } from 'vue-router'

const meta = {
  requiresAuth: true,
  showAppMenu: true,
}

const routes: RouteConfig[] = [
  {
    path: '/settings',
    component: () => import('@/components/RouterShell.vue' /* webpackChunkName: "settings" */),
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import('./views/Menu.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'account',
        name: 'SettingsAccount',
        component: () => import('./views/Account.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'profile',
        name: 'SettingsProfile',
        component: () => import('./views/Profile.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'tags',
        name: 'SettingsTags',
        component: () => import('./views/Tags.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'modules',
        name: 'SettingsModules',
        component: () => import('./views/Modules.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'about',
        name: 'SettingsAbout',
        component: () => import('./views/About.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'release-notes',
        name: 'SettingsReleaseNotes',
        component: () => import('./views/ReleaseNotes.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'bug-report',
        name: 'SettingsBugReport',
        component: () => import('./views/BugReport.vue' /* webpackChunkName: "settings" */),
        meta,
      },
    ],
  },
]

export { routes }
