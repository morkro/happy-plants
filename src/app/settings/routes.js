import Settings from './components/Settings'
import SettingsMenu from './components/SettingsMenu'
import SettingsAbout from './components/SettingsAbout'
import SettingsAccount from './components/SettingsAccount'
import SettingsData from './components/SettingsData'

export default [
  {
    path: '/settings',
    component: Settings,
    children: [
      { path: '', name: 'Settings', component: SettingsMenu },
      { path: 'about', name: 'SettingsAbout', component: SettingsAbout },
      { path: 'account', name: 'SettingsAccount', component: SettingsAccount },
      { path: 'data', name: 'SettingsData', component: SettingsData }
    ]
  }
]
