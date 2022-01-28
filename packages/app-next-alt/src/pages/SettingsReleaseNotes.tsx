import React from 'react'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'

export default function SettingsReleaseNotes() {
  const routeConfig = useRouteConfig('settingsReleaseNotes')
  return (
    <Layout {...routeConfig}>
      <h1>Release Notes</h1>
    </Layout>
  )
}
