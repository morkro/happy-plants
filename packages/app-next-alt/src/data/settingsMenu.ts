import { routePaths } from 'routes'

export interface SetttingsMenuItem {
  label: string
  link: string
  locked?: boolean
  external?: boolean
}

const menu: Record<string, SetttingsMenuItem[]> = {
  happyplants: [
    {
      label: 'Tags',
      link: routePaths.settings.tags,
    },
    {
      label: 'Modules',
      link: routePaths.settings.modules,
    },
    {
      label: 'Accessibility',
      link: routePaths.settings.a11y,
    },
  ],
  account: [
    {
      label: 'Change password',
      link: routePaths.settings.password,
      locked: true,
    },
  ],
  application: [
    {
      label: 'About',
      link: routePaths.settings.about,
    },
    {
      label: 'Bug reports',
      link: routePaths.settings.bugReport,
    },
    {
      label: 'Release notes',
      link: routePaths.settings.releaseNotes,
      external: true,
    },
  ],
}

export default menu
