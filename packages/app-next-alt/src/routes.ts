import { lazy } from 'react'
import { RouteProps } from 'react-router-dom'
import { AppHeaderColor } from 'components/AppHeader'

export interface CustomRouteProps extends RouteProps {
  title?: string
  meta?: {
    showAppMenu?: boolean
    pageTitle?: string
    appHeaderColor?: AppHeaderColor
  }
}

export const routePaths = {
  catchAll: '**',
  root: '/',
  login: '/login',
  onboarding: '/onboarding',
  home: '/home',
  watering: '/watering',
  new: '/new',
  settings: {
    base: '/settings',
    account: 'account',
    profile: 'profile',
    tags: 'tags',
    modules: 'modules',
    releaseNotes: 'release-notes',
    featureRequest: 'feature-request',
    bugReport: 'bug-report',
  },
}

export const publicRoutes: CustomRouteProps[] = [
  {
    path: routePaths.login,
    component: lazy(() => import('pages/Login' /* webpackChunkName: "unauthorized" */)),
    meta: {
      showAppMenu: false,
      pageTitle: 'Login',
    },
  },
]

export const privateRoutes: CustomRouteProps[] = [
  {
    path: routePaths.home,
    component: lazy(() => import('pages/Home' /* webpackChunkName: "home" */)),
    meta: {
      showAppMenu: true,
    },
  },
  {
    path: routePaths.watering,
    component: lazy(() => import('pages/Watering' /* webpackChunkName: "watering" */)),
    meta: {
      showAppMenu: true,
      pageTitle: 'Watering',
      appHeaderColor: 'blue',
    },
  },
  {
    path: routePaths.settings.base,
    component: lazy(() => import('pages/Settings' /* webpackChunkName: "settings" */)),
    meta: {
      showAppMenu: true,
      pageTitle: 'Settings',
      appHeaderColor: 'green',
    },
  },
]
