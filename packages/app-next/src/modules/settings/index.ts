import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/settings',
    component: () => import('@/shared/components/RouterShell.vue' /* webpackChunkName: "shared" */),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'Settings',
        component: () => import('./views/Menu.vue' /* webpackChunkName: "settings" */),
      },
      {
        path: 'release-notes',
        name: 'SettingsReleaseNotes',
        component: () => import('./views/ReleaseNotes.vue' /* webpackChunkName: "settings" */),
      },
    ],
  },
]

export { routes }
