import { RouteLayoutOptions } from 'components/Layout'

export const routePaths = {
  catchAll: '*',
  root: '/',
  login: '/login',
  onboarding: {
    base: '/onboarding',
    account: '/onboarding/account',
    finished: '/onboarding/finished',
  },
  home: '/home',
  watering: '/watering',
  plant: {
    new: '/new',
    base: '/plant/:id',
    gallery: '/plant/:id/gallery',
  },
  settings: {
    base: '/settings',
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
  ['catchAll', { appContentOrientation: 'center' }],
  ['root', {}],
  [
    'welcome',
    {
      withAppMenu: false,
      withPublicFooter: true,
      appContentOrientation: 'space-between',
    },
  ],
  ['onboarding', { withAppMenu: false }],
  ['onboardingAccount', { pageTitle: 'Create account' }],
  ['onboardingHowTo', { pageTitle: 'How to' }],
  [
    'onboardingFinished',
    { withAppHeader: false, withAppMenu: false, appContentOrientation: 'center' },
  ],
  [
    'login',
    {
      withAppMenu: false,
      withPublicFooter: true,
      pageTitle: 'Login',
      appContentOrientation: 'center',
    },
  ],
  [
    'home',
    {
      withAppMenu: true,
      pageTitle: 'Home',
      appContentOrientation: 'start',
      appHeaderColor: 'beige',
    },
  ],
  [
    'watering',
    {
      withAppMenu: true,
      pageTitle: 'Watering',
      appHeaderColor: 'blue',
    },
  ],
  [
    'plantNew',
    {
      withAppMenu: true,
      pageTitle: 'Add a new friend',
      appHeaderColor: 'green',
    },
  ],
  [
    'plantBase',
    {
      withAppMenu: true,
      pageTitle: false,
      appContentOrientation: 'start',
    },
  ],
  ['plantGallery', {}],
  [
    'settingsBase',
    {
      withAppMenu: true,
      pageTitle: 'Settings',
      appHeaderColor: 'green',
      appContentOrientation: 'start',
    },
  ],
  ['settingsPassword', { pageTitle: 'Password', appHeaderColor: 'beige' }],
  [
    'settingsTags',
    {
      pageTitle: 'Tags',
      appHeaderColor: 'beige',
      appContentOrientation: 'start',
    },
  ],
  ['settingsModules', { pageTitle: 'Modules', appHeaderColor: 'beige' }],
  [
    'settingsA11y',
    {
      withAppMenu: true,
      pageTitle: 'Accessibility',
      appHeaderColor: 'beige',
      appContentOrientation: 'start',
    },
  ],
  [
    'settingsAbout',
    {
      withAppMenu: true,
      pageTitle: 'About',
      appHeaderColor: 'beige',
      appContentOrientation: 'start',
    },
  ],
  ['settingsReleaseNotes', {}],
  [
    'settingsBugReport',
    {
      withAppMenu: true,
      pageTitle: 'Bug reports',
      appHeaderColor: 'green',
      appContentOrientation: 'start',
    },
  ],
])
