import React from 'react'
import { useAppStore } from 'store'
import styled from 'styled-components'
import AppHeader, { AppHeaderColor } from './AppHeader'
import AppMenu from './AppMenu'
import AuthLoader from './AuthLoader'
import FooterNoAuth from './FooterNoAuth'

export const BaseLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const AppContent = styled.main<{ justifyContent?: string }>`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) => props.justifyContent || 'center'};
  padding: ${({ theme }) => `0 ${theme.spacings.m}`};
  position: relative;
  z-index: 0;
  text-align: center;

  &:focus {
    outline: none;
  }
`

export type LayoutProps = React.PropsWithChildren<{
  pageTitle?: string
  withAppMenu?: boolean
  withAppHeader?: boolean
  appHeaderColor?: AppHeaderColor
  isPrivateRoute?: boolean
}>

export default function Layout(props: LayoutProps) {
  const {
    withAppMenu = true,
    withAppHeader = true,
    pageTitle,
    appHeaderColor,
    isPrivateRoute,
  } = props
  const { store } = useAppStore()
  return (
    <React.Fragment>
      {store.authLoader.show && <AuthLoader message={store.authLoader.message} />}
      <BaseLayout>
        {withAppHeader && <AppHeader color={appHeaderColor}>{pageTitle}</AppHeader>}
        <AppContent id="main" tabIndex={-1}>
          {props.children}
        </AppContent>
        {isPrivateRoute ? withAppMenu ? <AppMenu /> : null : <FooterNoAuth />}
      </BaseLayout>
    </React.Fragment>
  )
}
