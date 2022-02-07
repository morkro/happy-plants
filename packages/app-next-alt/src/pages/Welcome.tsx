import React from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import { routePaths } from 'routes'
import { ButtonLink } from 'components/Button'
import { Text } from 'components/Typography'
import Layout, { BaseLayout } from 'components/Layout'
import WelcomeIllustration from 'components/WelcomeIllustration'
import useRouteConfig from 'utilities/useRouteConfig'

const WelcomeGlobalStyle = createGlobalStyle`
  #root ${BaseLayout} {
    background-image: url('assets/img/welcome-background.svg');
    background-repeat: no-repeat;
    background-size: calc(100% + 2px);
    background-position: bottom;
  }
`

const IllustrationContainer = styled.div`
  ${({ theme }) => css`
    margin-top: calc(3.25 * ${theme.spacings.l});
    text-align: center;

    & p {
      transform: translateY(calc(${theme.spacings.m} * -1));
      background: ${theme.colors.beige};
      display: inline;
      box-shadow: 3px 0 0 ${theme.colors.beige}, -3px 0 0 ${theme.colors.beige};
      border-radius: ${theme.baseRadius};
    }
  `}
`

const WelcomeActions = styled.div`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.spacings.m};
`

export default function Welcome() {
  const routeConfig = useRouteConfig('welcome')

  return (
    <React.Fragment>
      <WelcomeGlobalStyle />

      <Layout {...routeConfig}>
        <IllustrationContainer>
          <WelcomeIllustration />
          <div>
            <Text color="beigeDark">
              Keep track of your
              <br />
              houseplants&apos; well-being.
            </Text>
          </div>
        </IllustrationContainer>

        <WelcomeActions>
          <ButtonLink fullWidth color="white" border to={routePaths.login}>
            Login
          </ButtonLink>
          <ButtonLink fullWidth color="yellow" to={routePaths.onboarding.howTo}>
            Getting started
          </ButtonLink>
        </WelcomeActions>
      </Layout>
    </React.Fragment>
  )
}
