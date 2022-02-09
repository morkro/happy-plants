import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { routePaths } from 'routes'
import Layout from 'components/Layout'
import { Heading } from 'components/Typography'
import { ButtonLink } from 'components/Button'

const ErrorGlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.colors.red};
  }
`

export default function Error() {
  return (
    <React.Fragment>
      <ErrorGlobalStyle />
      <Layout withAppHeader withAppMenu={false} appContentOrientation="center">
        <Heading color="white" as="h1">
          Oops, something went wrong
        </Heading>
        <ButtonLink to={routePaths.home}>Go back to home</ButtonLink>
      </Layout>
    </React.Fragment>
  )
}
