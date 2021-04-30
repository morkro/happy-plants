import React from 'react'
import styled from 'styled-components'
import { Text } from './Typography'
import { VisuallyHiddenStyles } from './VisuallyHidden'

const StyledLink = styled.a`
  position: fixed;
  z-index: 100;
  background: ${(props) => props.theme.colors.red};
  padding: ${(props) => props.theme.spacings.m};

  :not(:focus) {
    ${VisuallyHiddenStyles}
  }
`

export default function SkipLink() {
  return (
    <StyledLink href="#main">
      <Text color="white" as="span" bold>
        Skip to main content
      </Text>
    </StyledLink>
  )
}
