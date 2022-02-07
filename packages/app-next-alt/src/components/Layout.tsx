import React from 'react'
import { useAppStore } from 'store'
import styled from 'styled-components'
import AppHeader, { AppHeaderColor } from './AppHeader'
import AppMenu from './AppMenu'
import AuthLoader from './AuthLoader'
import DocumentTitle from './DocumentTitle'
import FooterNoAuth from './FooterNoAuth'

export const BaseLayout = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const AppContent = styled.main<{ justifyContent: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifyContent }) =>
    ['start', 'end'].includes(justifyContent) ? `flex-${justifyContent}` : justifyContent};
  align-items: center;
  padding: ${({ theme }) => `0 calc(1.25 * ${theme.spacings.m})`};
  position: relative;
  z-index: 0;
  text-align: center;

  &:focus {
    outline: none;
  }
`

export interface RouteLayoutOptions {
  pageTitle?: string | false
  withAppMenu?: boolean
  withAppHeader?: boolean
  withPublicFooter?: boolean
  appHeaderColor?: AppHeaderColor
  appContentOrientation?: 'start' | 'center' | 'end' | 'space-between'
}

export type LayoutProps = React.PropsWithChildren<RouteLayoutOptions>

export default function Layout(props: LayoutProps) {
  const {
    pageTitle,
    appHeaderColor,
    appContentOrientation = 'space-between',
    withAppMenu = true,
    withAppHeader = true,
    withPublicFooter = false,
  } = props
  const { store } = useAppStore()
  return (
    <React.Fragment>
      {pageTitle && <DocumentTitle title={pageTitle} />}
      {store.authLoader.show && <AuthLoader message={store.authLoader.message} />}
      <BaseLayout>
        {withAppHeader && <AppHeader color={appHeaderColor}>{pageTitle}</AppHeader>}
        <AppContent id="main" role="main" justifyContent={appContentOrientation}>
          {props.children}
        </AppContent>
        {withAppMenu ? <AppMenu /> : null}
        {withPublicFooter ? <FooterNoAuth /> : null}
      </BaseLayout>
    </React.Fragment>
  )
}
