import React from 'react'
import { routePaths } from 'routes'
import styled from 'styled-components'
import OnboardingFinishedIllustration from 'components/OnboardingFinishedIllustration'
import { Heading } from 'components/Typography'
import Layout from 'components/Layout'
import { ButtonLink } from 'components/Button'
import useRouteConfig from 'utilities/useRouteConfig'

const Container = styled.div`
  position: relative;

  h1 {
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
  }

  a {
    margin-top: -100px;
  }
`

export default function OnboardingFinished() {
  const routeConfig = useRouteConfig('onboardingFinished')
  return (
    <Layout {...routeConfig}>
      <Container>
        <Heading color="greenDark" as="h1" size="l" semiBold>
          You&lsquo;re ready to go!
        </Heading>
        <OnboardingFinishedIllustration />
      </Container>
      <ButtonLink to={routePaths.plant.new}>Add your first plant</ButtonLink>
    </Layout>
  )
}
