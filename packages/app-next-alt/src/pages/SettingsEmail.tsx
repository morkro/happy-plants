import React from 'react'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'

export default function SettingsEmail() {
  const routeConfig = useRouteConfig('settingsEmail')
  return (
    <Layout {...routeConfig}>
      <h1>Email</h1>
    </Layout>
  )
}
