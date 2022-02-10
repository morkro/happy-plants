import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Smile } from 'react-feather'
import { theme } from 'theme'
import Layout, { BaseLayout } from 'components/Layout'
import { Heading } from 'components/Typography'
import useRouteConfig from 'utilities/useRouteConfig'

const NewGlobalStyle = createGlobalStyle`
  #root ${BaseLayout} {
    background-color: ${({ theme }) => theme.colors.blue};
  }
`

const Content = styled.div`
  margin-top: auto;
  margin-bottom: auto;

  h1 {
    text-align: center;
  }
`

export default function Watering() {
  const routeConfig = useRouteConfig('watering')
  return (
    <React.Fragment>
      <NewGlobalStyle />
      <Layout {...routeConfig}>
        <Content>
          <Heading as="h1" mb="l" color="white">
            This feature will be
            <br />
            launched soon
          </Heading>
          <Smile color={theme.colors.yellow} />
        </Content>
      </Layout>
    </React.Fragment>
  )
}
