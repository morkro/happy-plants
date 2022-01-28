import { AppHeaderColor } from 'components/AppHeader'

export interface RouteLayoutOptions {
  isPrivateRoute?: boolean
  pageTitle?: string | false
  withAppMenu?: boolean
  withAppHeader?: boolean
  appHeaderColor?: AppHeaderColor
  appContentOrientation?: 'start' | 'center' | 'end' | 'space-between'
}

export const routePaths = {
  catchAll: '*/*',
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

export const routeConfigMap = new Map<string, RouteLayoutOptions>([
  ['catchAll', { isPrivateRoute: true, appContentOrientation: 'center' }],
  ['root', {}],
  ['onboarding', {}],
  [
    'login',
    {
      withAppMenu: false,
      pageTitle: 'Login',
      appContentOrientation: 'center',
    },
  ],
  [
    'home',
    {
      isPrivateRoute: false,
      withAppMenu: true,
      pageTitle: 'Home',
      appContentOrientation: 'center',
      appHeaderColor: 'beige',
    },
  ],
  [
    'watering',
    {
      isPrivateRoute: false,
      withAppMenu: true,
      pageTitle: 'Watering',
      appHeaderColor: 'blue',
    },
  ],
  [
    'new',
    {
      isPrivateRoute: false,
      withAppMenu: true,
      pageTitle: 'Add a new friend',
      appHeaderColor: 'green',
    },
  ],
  [
    'plantBase',
    {
      isPrivateRoute: false,
      withAppMenu: true,
      pageTitle: false,
      appContentOrientation: 'start',
    },
  ],
  ['plantGallery', { isPrivateRoute: false }],
  [
    'settingsBase',
    {
      isPrivateRoute: false,
      withAppMenu: true,
      pageTitle: 'Settings',
      appHeaderColor: 'green',
      appContentOrientation: 'start',
    },
  ],
  ['settingsEmail', { isPrivateRoute: false }],
  ['settingsPassword', { isPrivateRoute: false }],
  ['settingsTags', { isPrivateRoute: false }],
  ['settingsModules', { isPrivateRoute: false }],
  [
    'settingsA11y',
    {
      isPrivateRoute: false,
      withAppMenu: true,
      pageTitle: 'Accessibility',
      appContentOrientation: 'start',
    },
  ],
  [
    'settingsAbout',
    {
      isPrivateRoute: false,
      withAppMenu: true,
      pageTitle: 'About',
      appContentOrientation: 'start',
    },
  ],
  ['settingsReleaseNotes', { isPrivateRoute: false }],
  [
    'settingsBugReport',
    {
      isPrivateRoute: false,
      withAppMenu: true,
      pageTitle: 'Bug reports',
      appHeaderColor: 'green',
      appContentOrientation: 'start',
    },
  ],
])
