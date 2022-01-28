import React from 'react'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'

export default function SettingsTags() {
  const routeConfig = useRouteConfig('settingsTags')
  return (
    <Layout {...routeConfig}>
      <h1>Tags</h1>
    </Layout>
  )
}
