import React from 'react'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'

export default function PlantGallery() {
  const routeConfig = useRouteConfig('plantGallery')
  return (
    <Layout {...routeConfig}>
      <h1>Gallery</h1>
    </Layout>
  )
}
