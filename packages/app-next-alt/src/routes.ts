import { lazy } from 'react'
import { RouteProps } from 'react-router-dom'
import { AppHeaderColor } from 'components/AppHeader'

export interface RouteLayoutOptions {
  pageTitle?: string | false
  withAppMenu?: boolean
  withAppHeader?: boolean
  appHeaderColor?: AppHeaderColor
  appContentOrientation?: 'start' | 'center' | 'end' | 'space-between'
}

export interface CustomRouteProps extends RouteProps {
  title?: string
  meta?: RouteLayoutOptions
}

export const routePaths = {
  catchAll: '**',
  root: '/',
  login: '/login',
  onboarding: '/onboarding',
  home: '/home',
  watering: '/watering',
  new: '/new',
  plant: {
    base: '/plant/:id',
    gallery: '/plant/:id/gallery',
  },
  settings: {
    base: '/settings',
    email: '/settings/email',
    password: '/settings/password',
    tags: '/settings/tags',
    modules: '/settings/modules',
    a11y: '/settings/a11y',
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
      withAppMenu: false,
      pageTitle: 'Login',
      appContentOrientation: 'center',
    },
  },
]

export const privateRoutes: CustomRouteProps[] = [
  {
    path: routePaths.home,
    component: lazy(() => import('pages/Home' /* webpackChunkName: "home" */)),
    meta: {
      withAppMenu: true,
      pageTitle: 'Home',
      appContentOrientation: 'center',
      appHeaderColor: 'beige',
    },
  },
  {
    path: routePaths.watering,
    component: lazy(() => import('pages/Watering' /* webpackChunkName: "watering" */)),
    meta: {
      withAppMenu: true,
      pageTitle: 'Watering',
      appHeaderColor: 'blue',
    },
  },
  {
    path: routePaths.plant.base,
    component: lazy(() => import('pages/Plant' /* webpackChunkName: "plant" */)),
    meta: {
      withAppMenu: true,
      pageTitle: false,
      appContentOrientation: 'start',
    },
  },
  {
    path: routePaths.new,
    component: lazy(() => import('pages/New' /* webpackChunkName: "new" */)),
    meta: {
      withAppMenu: true,
      pageTitle: 'Add a new friend',
      appHeaderColor: 'green',
    },
  },
  {
    path: routePaths.settings.base,
    component: lazy(() => import('pages/Settings' /* webpackChunkName: "settings" */)),
    meta: {
      withAppMenu: true,
      pageTitle: 'Settings',
      appHeaderColor: 'green',
      appContentOrientation: 'start',
    },
  },
  {
    path: routePaths.settings.a11y,
    component: lazy(() => import('pages/SettingsA11y' /* webpackChunkName: "settings" */)),
    meta: {
      withAppMenu: true,
      pageTitle: 'Accessibility',
      appContentOrientation: 'start',
    },
  },
  {
    path: routePaths.settings.about,
    component: lazy(() => import('pages/SettingsAbout' /* webpackChunkName: "settings" */)),
    meta: {
      withAppMenu: true,
      pageTitle: 'About',
      appContentOrientation: 'start',
    },
  },
  {
    path: routePaths.settings.bugReport,
    component: lazy(() => import('pages/SettingsBugReport' /* webpackChunkName: "settings" */)),
    meta: {
      withAppMenu: true,
      pageTitle: 'Bug reports',
      appHeaderColor: 'green',
      appContentOrientation: 'start',
    },
  },
]
