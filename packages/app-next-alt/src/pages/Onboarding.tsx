import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { routePaths } from 'routes'
import styled from 'styled-components'
import Layout from 'components/Layout'
import { getRouteConfig } from 'utilities/useRouteConfig'
import { ButtonLink } from 'components/Button'

const onboardingFlow = [
  routePaths.root,
  routePaths.onboarding.howTo,
  routePaths.onboarding.account,
  routePaths.onboarding.finished,
]

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.m};
  padding-bottom: ${({ theme }) => `calc(1.25 * ${theme.spacings.m})`};
  width: 100%;

  a:first-of-type {
    --base-color: ${({ theme }) => theme.colors.green};
    --text-color: ${({ theme }) => theme.colors.green};
  }
`

export default function Onboarding() {
  const [routeConfig, setRouteConfig] = useState(getRouteConfig('onboarding'))
  const [navIndex, setNavIndex] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const index = onboardingFlow.findIndex((r) => r === location?.pathname)
    let configName = 'onboarding'
    if (index === 1) configName = 'onboardingHowTo'
    if (index === 2) configName = 'onboardingAccount'
    if (index === 3) configName = 'onboardingFinished'

    setNavIndex(index)
    setRouteConfig(getRouteConfig(configName))
  }, [location?.pathname])

  return (
    <Layout {...routeConfig}>
      <Outlet />
      <Actions>
        <ButtonLink to={onboardingFlow[navIndex === 0 ? navIndex : navIndex - 1]} border fullWidth>
          Back
        </ButtonLink>
        <ButtonLink to={onboardingFlow[navIndex + 1]} fullWidth>
          Next
        </ButtonLink>
      </Actions>
    </Layout>
  )
}
