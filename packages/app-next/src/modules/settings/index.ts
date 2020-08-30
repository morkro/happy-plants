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
        component: () => import('./components/MenuView.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'account',
        name: 'SettingsAccount',
        component: () => import('./components/AccountView.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'profile',
        name: 'SettingsProfile',
        component: () => import('./components/ProfileView.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'tags',
        name: 'SettingsTags',
        component: () => import('./components/TagsView.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'modules',
        name: 'SettingsModules',
        component: () => import('./components/ModulesView.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'about',
        name: 'SettingsAbout',
        component: () => import('./components/AboutView.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'release-notes',
        name: 'SettingsReleaseNotes',
        component: () =>
          import('./components/ReleaseNotesView.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'feature-request',
        name: 'SettingsFeatureRequest',
        component: () =>
          import('./components/FeatureRequestView.vue' /* webpackChunkName: "settings" */),
        meta,
      },
      {
        path: 'bug-report',
        name: 'SettingsBugReport',
        component: () =>
          import('./components/BugReportView.vue' /* webpackChunkName: "settings" */),
        meta,
      },
    ],
  },
]

export { routes }
