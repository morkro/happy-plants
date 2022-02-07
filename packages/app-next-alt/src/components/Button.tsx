import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { WithCssProps, WithMarginProps, WithMarginStyles } from 'utilities/withProps'

interface BaseProps {
  color: 'white' | 'red' | 'yellow' | 'green' | 'blue'
  size?: 's'
  border?: boolean
  round?: boolean
  type?: 'button' | 'submit'
  fullWidth?: boolean
}

type WithBaseProps = WithCssProps<WithMarginProps<BaseProps>>
type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & WithBaseProps
type ButtonLinkProps = LinkProps & WithBaseProps

const defaultProps: BaseProps = {
  color: 'green',
  border: false,
  round: false,
}

const BaseStyles = css<BaseProps>`
  ${WithMarginStyles}

  --base-color: ${({ theme, color }) => theme.colors[color]};
  --text-color: ${({ theme, color, border }) => {
    const shouldHaveGreen = color === 'white' || color === 'yellow'
    if (shouldHaveGreen && !border) return theme.colors.greenDark
    if (border) return 'var(--base-color)'
    return theme.colors.white
  }};
  --shadow: var(--base-color);

  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 2px solid var(--base-color);
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  background-color: ${(props) => (props.border ? 'transparent' : 'var(--base-color)')};
  border-radius: ${(props) => (props.round ? '100%' : props.theme.baseRadius)};
  box-shadow: ${(props) => (props.border ? 'none' : '0 2px 9px var(--shadow)')};
  color: var(--text-color);
  font-family: var(--font-normal);
  text-align: center;
  font-weight: 500;
  font-size: ${(props) => props.theme.fonts.base};
  text-decoration: none;
  cursor: pointer;
  padding: ${({ round, size, theme }) => {
    const spacing = theme.spacings.m
    if (round) {
      if (size === 's') {
        return `calc(0.5 * ${spacing})`
      }
      return spacing
    }
    return size === 's' ? `calc(0.5 * ${spacing}) ${spacing}` : `calc(2 * ${spacing})`
  }};

  &:hover {
    text-decoration: underline;
    border-color: ${(props) => props.theme.colors.white};
  }

  &[disabled],
  &[aria-disabled='true'] {
    cursor: not-allowed;
  }

  &:focus:not([disabled]),
  &:active:not([aria-disabled]) {
    border-color: ${({ theme, color, border }) => {
      if (color === 'white' && !border) return theme.colors.greenDark
      if (border) return 'var(--base-color)'
      return theme.colors.white
    }};
    border-style: ${({ border }) => (border ? 'dashed' : 'solid')};
    outline: ${({ theme, border }) => (border ? `2px solid ${theme.colors.white}` : 'none')};
  }

  & > svg {
    width: 20px;
    height: 20px;
    margin-right: ${({ theme, round }) => !round && theme.spacings.m};
  }
`

const ButtonContainer = styled.button<BaseProps>`
  ${BaseStyles}
`

const LinkContainer = styled(({ variant, border, fullWidth, ...props }) => (
  <Link {...props} />
))<BaseProps>`
  ${BaseStyles}
`

export function ButtonLink(props: ButtonLinkProps) {
  return <LinkContainer {...props} />
}

ButtonLink.defaultProps = defaultProps

export function Button(props: ButtonProps) {
  return <ButtonContainer {...props} />
}

Button.defaultProps = defaultProps
