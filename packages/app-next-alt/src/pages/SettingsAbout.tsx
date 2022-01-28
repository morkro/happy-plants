import React from 'react'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'

export default function SettingsAbout() {
  const routeConfig = useRouteConfig('settingsAbout')
  return (
    <Layout {...routeConfig}>
      <h1>about</h1>
    </Layout>
  )
}
