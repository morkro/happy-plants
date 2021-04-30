import React from 'react'
import { Helmet } from 'react-helmet-async'
import config from 'config'

export default function DocumentTitle({ title }: { title?: string }) {
  return (
    <Helmet titleTemplate={`%s | ${config.meta.title}`}>
      <title>{title}</title>
    </Helmet>
  )
}
