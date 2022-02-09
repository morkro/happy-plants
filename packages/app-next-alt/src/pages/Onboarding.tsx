import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
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

const OnboardingProgress = styled.progress`
  appearance: none;
  width: ${({ theme }) => `calc(100% + (2.5 * ${theme.spacings.m}))`};
  height: 4px;
  top: 0;

  &::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.colors.white};
  }

  &::-webkit-progress-value {
    background-color: ${({ theme }) => theme.colors.green};
    transition: width var(--base-transition) ease-in-out;
  }
`

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
  const location = useLocation()
  const [routeConfig, setRouteConfig] = useState(getRouteConfig('onboarding'))
  const [navIndex, setNavIndex] = useState(0)
  const [canContinue, setCanContinue] = useState(false)

  useEffect(() => {
    const index = onboardingFlow.findIndex((r) => r === location?.pathname)
    let configName = 'onboarding'
    if (index === 1) configName = 'onboardingHowTo'
    if (index === 2) configName = 'onboardingAccount'
    if (index === 3) configName = 'onboardingFinished'

    setNavIndex(index)
    setRouteConfig(getRouteConfig(configName))
    setCanContinue(false)
  }, [location?.pathname])

  return (
    <Layout {...routeConfig}>
      <OnboardingProgress max={onboardingFlow.length - 1} value={navIndex}>
        {`${navIndex}/${onboardingFlow.length - 1}`}
      </OnboardingProgress>

      <Outlet context={[canContinue, setCanContinue]} />

      <Actions>
        <ButtonLink to={onboardingFlow[navIndex === 0 ? navIndex : navIndex - 1]} border fullWidth>
          Back
        </ButtonLink>
        <ButtonLink
          to={canContinue ? onboardingFlow[navIndex + 1] : '#'}
          aria-disabled={!canContinue}
          fullWidth
        >
          Next
        </ButtonLink>
      </Actions>
    </Layout>
  )
}
