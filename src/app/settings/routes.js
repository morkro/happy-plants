import Settings from './components/Settings'
import SettingsMenu from './components/SettingsMenu'
import SettingsAbout from './components/SettingsAbout'
import SettingsData from './components/SettingsData'

export default [
  {
    path: '/settings',
    component: Settings,
    children: [
      { path: '', name: 'Settings', component: SettingsMenu },
      { path: 'about', name: 'SettingsAbout', component: SettingsAbout },
      { path: 'data', name: 'SettingsData', component: SettingsData }
    ]
  }
]
