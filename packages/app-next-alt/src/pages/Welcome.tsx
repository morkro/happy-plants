import React from 'react'
import styled, { createGlobalStyle, css } from 'styled-components'
import { routePaths } from 'routes'
import { ButtonLink } from 'components/Button'
import { Text } from 'components/Typography'
import Layout, { BaseLayout } from 'components/Layout'
import WelcomeIllustration from 'components/WelcomeIllustration'

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
  ${({ theme }) => css`
    width: 100%;
    display: grid;
    grid-template-columns:
      calc(50% - (${theme.spacings.m} / 2))
      calc(50% - (${theme.spacings.m} / 2));
    grid-column-gap: ${theme.spacings.m};

    a[href='${routePaths.onboarding}'] {
      box-shadow: 0 1px 2px ${theme.colors.greenDark};
    }
  `}
`

export default function Welcome() {
  return (
    <React.Fragment>
      <WelcomeGlobalStyle />

      <Layout isPrivateRoute={false} withAppMenu={false} appContentOrientation="space-between">
        <IllustrationContainer>
          <WelcomeIllustration data-cy="illustration" />
          <div>
            <Text color="beigeDark" data-cy="welcome-text">
              Keep track of your
              <br />
              houseplants&apos; well-being.
            </Text>
          </div>
        </IllustrationContainer>

        <WelcomeActions>
          <ButtonLink border to={routePaths.login} data-cy="action-login">
            Login
          </ButtonLink>
          <ButtonLink variant="warning" to={routePaths.onboarding} data-cy="action-onboarding">
            Getting started
          </ButtonLink>
        </WelcomeActions>
      </Layout>
    </React.Fragment>
  )
}
