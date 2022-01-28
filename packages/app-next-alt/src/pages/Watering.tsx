import React from 'react'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'

export default function Watering() {
  const routeConfig = useRouteConfig('watering')
  return (
    <Layout {...routeConfig}>
      <h2>watering</h2>
    </Layout>
  )
}
