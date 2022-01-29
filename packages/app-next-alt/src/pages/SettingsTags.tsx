import React from 'react'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'
import TagList from 'components/TagList'
import { useUserDocument } from 'services/firebase'

export default function SettingsTags() {
  const routeConfig = useRouteConfig('settingsTags')
  const [userDoc] = useUserDocument()
  return (
    <Layout {...routeConfig}>
      <TagList tags={userDoc?.tags} />
    </Layout>
  )
}
