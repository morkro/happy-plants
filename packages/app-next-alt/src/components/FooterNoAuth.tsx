import React from 'react'
import styled from 'styled-components'
import footerLinks from 'data/publicFooterMenu'
import { Text } from './Typography'

const FooterContainer = styled.footer`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;

    &:hover > * {
      text-decoration: underline;
    }
  }

  a:not(:last-of-type) {
    margin-right: ${(props) => `calc(${props.theme.spacings.m} * 2)`};
  }
`

export default function FooterNoAuth() {
  return (
    <FooterContainer role="contentinfo">
      {footerLinks.map((link, index) => (
        <a key={link.label + index} href={link.href} target="_blank" rel="noopener noreferrer">
          <Text as="span" color="white">
            {link.label}
          </Text>
        </a>
      ))}
    </FooterContainer>
  )
}
