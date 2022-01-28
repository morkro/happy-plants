import React from 'react'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'

export default function SettingsModules() {
  const routeConfig = useRouteConfig('settingsModules')
  return (
    <Layout {...routeConfig}>
      <h1>Modules</h1>
    </Layout>
  )
}
