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
          import('./components/AccountSelectionView.vue' /* webpackChunkName: "onboarding" */),
      },
      {
        name: 'OnboardingEmail',
        path: 'email',
        component: () =>
          import('./components/EmailAccountView.vue' /* webpackChunkName: "onboarding" */),
      },
      {
        name: 'OnboardingSuccess',
        path: 'success',
        component: () =>
          import('./components/SuccessView.vue' /* webpackChunkName: "onboarding" */),
      },
    ],
  },
]

export { routes }
