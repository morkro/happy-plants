export default function getMenuData () {
  return [
    {
      label: 'Data',
      children: [
        {
          label: 'Import/ Export',
          name: 'SettingsData',
          icon: 'save',
          type: 'link'
        },
        {
          label: 'Storage',
          name: 'SettingsStorage',
          icon: 'database',
          type: 'link'
        },
        {
          label: 'Tags',
          name: 'SettingsTags',
          icon: 'tag',
          type: 'link'
        }
      ]
    },
    {
      label: 'Application',
      children: [
        {
          label: 'Theme',
          type: 'button',
          buttons: [
            { label: 'Light', option: 'light' },
            { label: 'Dark', option: 'dark' }
          ]
        },
        {
          label: 'About',
          name: 'SettingsAbout',
          icon: 'users',
          type: 'link'
        },
        {
          label: 'Release Notes',
          description: 'A new version has been released!',
          name: 'SettingsReleaseNotes',
          icon: 'file-text',
          type: 'link'
        }
      ]
    }
  ]
}
