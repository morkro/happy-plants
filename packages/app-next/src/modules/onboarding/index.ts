import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/onboarding',
    component: () => import('@/shared/components/RouterShell.vue' /* webpackChunkName: "shared" */),
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: '',
        name: 'Onboarding',
        component: () => import('./views/Storybook.vue' /* webpackChunkName: "onboarding" */),
      },
      {
        name: 'OnboardingAccount',
        path: 'account',
        component: () => import('./views/Account.vue' /* webpackChunkName: "onboarding" */),
      },
      {
        name: 'OnboardingSuccess',
        path: 'success',
        component: () => import('./views/Success.vue' /* webpackChunkName: "onboarding" */),
      },
    ],
  },
]

export { routes }
