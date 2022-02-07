import React from 'react'
import styled from 'styled-components'
import { createTeleporter } from 'react-teleporter'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, WifiOff } from 'react-feather'
import { theme, ThemeColors } from 'theme'
import { routePaths } from 'routes'
import useOfflineEvent from 'utilities/useOfflineEvent'
import { Heading } from './Typography'
import VisuallyHidden from './VisuallyHidden'
import AppLogo from './AppLogo'

export const AppHeaderPortal = createTeleporter()

const AppHeaderContainer = styled.header<{ backgroundColor?: AppHeaderColor; isOffline: boolean }>`
  width: 100%;
  height: ${(props) => props.theme.frameWidgetHeight};
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: ${(props) =>
    props.backgroundColor === undefined
      ? 'transparent'
      : props.theme.colors[props.backgroundColor]};

  & > div:last-of-type {
    display: grid;
    align-items: center;
    height: 100%;
    grid-template-columns: auto auto;
    margin-left: auto;
  }

  &::after {
    content: '';
    display: ${({ isOffline }) => (isOffline ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 3px;
    background: ${({ theme }) => theme.colors.red};
  }
`

const OfflineIndicator = styled.div`
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.red};
  border-radius: 50%;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: ${({ theme }) => theme.spacings.s};
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 65%;
  }
`

const AppHeaderIcon = styled.div<{ isTransparentBg: boolean }>`
  height: 100%;
  min-width: ${(props) => props.theme.frameWidgetHeight};
  display: flex;
  justify-content: center;
  align-items: center;

  & > a,
  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: none;
    position: relative;
    background: transparent;

    &::before {
      content: '';
      display: ${({ isTransparentBg }) => {
        return isTransparentBg ? 'block' : 'none'
      }};
      width: 55%;
      aspect-ratio: 1 / 1;
      background: ${(props) => props.theme.colors.white};
      border-radius: 50%;
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:focus {
      outline: none;
      background: ${(props) => props.theme.colors.white};
      border-bottom-right-radius: ${(props) => props.theme.baseRadius};
    }
  }
`

export const AppHeaderButton = styled.button`
  background: ${({ theme }) => theme.colors.beige};
  border: none;
  cursor: pointer;
  min-width: ${(props) => props.theme.frameWidgetHeight};
  height: 100%;
  position: relative;

  &:focus {
    outline: none;
    background: ${(props) => props.theme.colors.green};

    svg {
      stroke: ${(props) => props.theme.colors.white};
    }
  }
`

export type AppHeaderColor = 'green' | 'blue' | 'beige'

export type AppHeaderProps = React.PropsWithChildren<{
  color?: AppHeaderColor
}>

const textColorMap: Record<AppHeaderColor, Partial<ThemeColors>> = {
  beige: 'greenDark',
  blue: 'white',
  green: 'white',
}

export default function AppHeader(props: AppHeaderProps) {
  const { color, children } = props
  const navigate = useNavigate()
  const location = useLocation()
  const isOffline = useOfflineEvent()
  const textColor = (color && textColorMap[color]) || 'greenDark'
  const hasRouteTitle = React.Children.count(children) > 0
  const showBackButton = location.pathname.split('/').filter(Boolean).length > 1

  return (
    <AppHeaderContainer isOffline={isOffline} backgroundColor={color} role="banner">
      {isOffline ? (
        <OfflineIndicator>
          <WifiOff color={theme.colors.white} />
        </OfflineIndicator>
      ) : null}

      <AppHeaderIcon isTransparentBg={color === undefined}>
        {showBackButton ? (
          <button
            onClick={() =>
              location.pathname === routePaths.login ? navigate(routePaths.root) : navigate(-1)
            }
          >
            <ArrowLeft color={theme.colors[textColor]} aria-hidden="true" focusable="false" />
            <VisuallyHidden>Back</VisuallyHidden>
          </button>
        ) : (
          <Link to={routePaths.root}>
            <AppLogo color={textColor} inverse={textColor !== 'greenDark'} />
            <VisuallyHidden>HappyPlants</VisuallyHidden>
          </Link>
        )}
      </AppHeaderIcon>

      <Heading color={textColor} as="h1" bold>
        {hasRouteTitle ? children : 'HappyPlants'}
      </Heading>

      <AppHeaderPortal.Target />
    </AppHeaderContainer>
  )
}
