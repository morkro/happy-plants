import React from 'react'
import { routeConfigMap } from 'routes'
import Layout from 'components/Layout'

export default function Watering() {
  const routeConfig = routeConfigMap.get('watering')
  return (
    <Layout {...routeConfig}>
      <h2>watering</h2>
    </Layout>
  )
}
