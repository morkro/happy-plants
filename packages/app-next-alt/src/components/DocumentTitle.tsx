import React from 'react'
import { Helmet } from 'react-helmet'
import config from 'config'

export default function DocumentTitle({ title }: { title?: string }) {
  const documentTitle = title ? `${title} | ${config.meta.title}` : config.meta.title
  return (
    <Helmet>
      <title>{documentTitle}</title>
    </Helmet>
  )
}
