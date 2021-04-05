import React from 'react'
import styled from 'styled-components'
import { Text } from './Typography'

const footerLinks = [
  {
    href: 'https://happyplants.app/#about',
    dataCy: 'footer-about',
    label: 'About',
  },
  {
    href: 'https://happyplants.app/#contact',
    dataCy: 'footer-contact',
    label: 'Contact',
  },
  {
    href: 'https://github.com/morkro/happy-plants',
    dataCy: 'footer-os',
    label: 'Open source',
  },
]

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
    <FooterContainer>
      {footerLinks.map((link, index) => (
        <a
          key={link.label + index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cy={link.dataCy}
        >
          <Text as="span" color="white">
            {link.label}
          </Text>
        </a>
      ))}
    </FooterContainer>
  )
}
