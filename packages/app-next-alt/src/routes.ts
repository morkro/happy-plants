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
    email: '/settings/email',
    password: '/settings/password',
    tags: '/settings/tags',
    modules: '/settings/modules',
    about: '/settings/about',
    releaseNotes: '/settings/release-notes',
    bugReport: '/settings/bug-report',
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
  {
    path: routePaths.settings.about,
    component: lazy(() => import('pages/SettingsAbout' /* webpackChunkName: "settings" */)),
    meta: {
      showAppMenu: true,
      pageTitle: 'About',
    },
  },
  {
    path: routePaths.settings.bugReport,
    component: lazy(() => import('pages/SettingsBugReport' /* webpackChunkName: "settings" */)),
    meta: {
      showAppMenu: true,
      pageTitle: 'Bug reports',
      appHeaderColor: 'green',
    },
  },
]
