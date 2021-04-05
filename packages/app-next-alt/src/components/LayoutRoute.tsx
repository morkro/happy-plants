import React from 'react'
import { Route } from 'react-router-dom'
import { CustomRouteProps } from 'routes'
import DocumentTitle from './DocumentTitle'
import Layout from './Layout'

interface LayoutRouteProps extends CustomRouteProps {
  isPrivateRoute?: boolean
}

export default function LayoutRoute({ isPrivateRoute = false, ...route }: LayoutRouteProps) {
  return (
    <React.Fragment>
      <DocumentTitle title={route.meta?.pageTitle} />
      <Layout
        isPrivateRoute={isPrivateRoute}
        withAppMenu={route.meta?.showAppMenu}
        pageTitle={route.meta?.pageTitle}
        appHeaderColor={route.meta?.appHeaderColor}
      >
        <Route exact path={route.path} component={route.component} />
      </Layout>
    </React.Fragment>
  )
}
