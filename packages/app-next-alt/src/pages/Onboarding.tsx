import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { routePaths } from 'routes'
import styled from 'styled-components'
import Layout from 'components/Layout'
import useRouteConfig from 'utilities/useRouteConfig'
import { ButtonLink } from 'components/Button'

const onboardingFlow = [
  routePaths.root,
  routePaths.onboarding.base,
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
  const routeConfig = useRouteConfig('onboarding')
  const [navIndex, setNavIndex] = useState(0)
  const location = useLocation()

  useEffect(() => {
    setNavIndex(onboardingFlow.findIndex((r) => r === location.pathname))
  }, [location])

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
