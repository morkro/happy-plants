import React from 'react'
import { routeConfigMap } from 'routes'
import Layout from 'components/Layout'

export default function SettingsAbout() {
  const routeConfig = routeConfigMap.get('settingsAbout')
  return (
    <Layout {...routeConfig}>
      <h1>about</h1>
    </Layout>
  )
}
