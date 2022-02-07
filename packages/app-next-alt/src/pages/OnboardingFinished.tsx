import React from 'react'
import styled from 'styled-components'
import { routePaths } from 'routes'
import { Heading } from 'components/Typography'
import Layout from 'components/Layout'
import { ButtonLink } from 'components/Button'
import useRouteConfig from 'utilities/useRouteConfig'

export default function OnboardingFinished() {
  const routeConfig = useRouteConfig('onboardingFinished')
  return (
    <Layout {...routeConfig}>
      <Heading color="greenDark" as="h2" mt="l" semiBold>
        You&lsquo;re ready to go!
      </Heading>
      <ButtonLink to={routePaths.plant.new}>Add your first plant</ButtonLink>
    </Layout>
  )
}
