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
  catchAll: '*',
  root: '/',
  login: '/login',
  onboarding: '/onboarding',
  home: '/home',
  watering: '/watering',
  plant: {
    new: '/new',
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
      isPrivateRoute: true,
      withAppMenu: true,
      pageTitle: 'Home',
      appContentOrientation: 'start',
      appHeaderColor: 'beige',
    },
  ],
  [
    'watering',
    {
      isPrivateRoute: true,
      withAppMenu: true,
      pageTitle: 'Watering',
      appHeaderColor: 'blue',
    },
  ],
  [
    'plantNew',
    {
      isPrivateRoute: true,
      withAppMenu: true,
      pageTitle: 'Add a new friend',
      appHeaderColor: 'green',
    },
  ],
  [
    'plantBase',
    {
      isPrivateRoute: true,
      withAppMenu: true,
      pageTitle: false,
      appContentOrientation: 'start',
    },
  ],
  ['plantGallery', { isPrivateRoute: true }],
  [
    'settingsBase',
    {
      isPrivateRoute: true,
      withAppMenu: true,
      pageTitle: 'Settings',
      appHeaderColor: 'green',
      appContentOrientation: 'start',
    },
  ],
  ['settingsEmail', { isPrivateRoute: true, pageTitle: 'Email' }],
  ['settingsPassword', { isPrivateRoute: true, pageTitle: 'Password' }],
  ['settingsTags', { isPrivateRoute: true, pageTitle: 'Tags', appContentOrientation: 'start' }],
  ['settingsModules', { isPrivateRoute: true, pageTitle: 'Modules' }],
  [
    'settingsA11y',
    {
      isPrivateRoute: true,
      withAppMenu: true,
      pageTitle: 'Accessibility',
      appContentOrientation: 'start',
    },
  ],
  [
    'settingsAbout',
    {
      isPrivateRoute: true,
      withAppMenu: true,
      pageTitle: 'About',
      appContentOrientation: 'start',
    },
  ],
  ['settingsReleaseNotes', { isPrivateRoute: true }],
  [
    'settingsBugReport',
    {
      isPrivateRoute: true,
      withAppMenu: true,
      pageTitle: 'Bug reports',
      appHeaderColor: 'green',
      appContentOrientation: 'start',
    },
  ],
])
