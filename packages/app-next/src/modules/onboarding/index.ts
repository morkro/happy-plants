import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/onboarding',
    component: () => import('@/components/RouterShell.vue' /* webpackChunkName: "shared" */),
    meta: {
      requiresAuth: false,
      showAppMenu: false,
    },
    children: [
      // {
      //   path: '',
      //   name: 'Onboarding',
      //   component: () => import('./views/Features.vue' /* webpackChunkName: "onboarding" */),
      // },
      {
        name: 'OnboardingAccount',
        path: '',
        component: () =>
          import('./views/AccountSelection.vue' /* webpackChunkName: "onboarding" */),
      },
      {
        name: 'OnboardingEmail',
        path: 'email',
        component: () => import('./views/EmailAccount.vue' /* webpackChunkName: "onboarding" */),
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
