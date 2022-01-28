import React from 'react'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'

export default function SettingsPassword() {
  const routeConfig = useRouteConfig('settingsPassword')
  return (
    <Layout {...routeConfig}>
      <h1>Password</h1>
    </Layout>
  )
}
