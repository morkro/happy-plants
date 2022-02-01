import React from 'react'
import { Smile } from 'react-feather'
import styled from 'styled-components'
import AppLogo from './AppLogo'
import { Heading, Text } from './Typography'

const Wrapper = styled.aside`
  display: flex;
  flex-direction: column;

  h1,
  span {
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacings.m};
  }
`

export default function DesktopExplainer() {
  return (
    <Wrapper>
      <Heading as="h1" bold color="white" size="l" mb="l">
        <AppLogo color="yellow" />
        HappyPlants
      </Heading>
      <Text color="white" size="m">
        HappyPlants is currently only optimised for <strong>mobile screen sizes</strong>.
        <br />A desktop-friendly version is planned and in development.
        <br />
        <br />
        <span>
          Stay tuned! <Smile color="green" />
        </span>
      </Text>
    </Wrapper>
  )
}
