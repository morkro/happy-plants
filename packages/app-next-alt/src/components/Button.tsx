import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { WithCssProps, WithMarginProps, WithMarginStyles } from 'utilities/withProps'

interface BaseProps {
  variant?: 'normal' | 'info' | 'warning' | 'alarm'
  size?: 's'
  border?: boolean
  round?: boolean
  type?: 'button' | 'submit'
}

type WithBaseProps = WithCssProps<WithMarginProps<BaseProps>>
type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & WithBaseProps
type ButtonLinkProps = LinkProps & WithBaseProps

const defaultProps: BaseProps = {
  border: false,
  round: false,
}

const BaseStyles = css<BaseProps>`
  ${WithMarginStyles}

  --base-color: ${({ theme, border }) => (border ? theme.colors.white : theme.colors.green)};
  --text-color: ${(props) => props.theme.colors.white};
  --shadow: var(--base-color);

  position: relative;
  background-color: ${(props) => (props.border ? 'transparent' : 'var(--base-color)')};
  border-radius: ${(props) => (props.round ? '100%' : props.theme.baseRadius)};
  border: 2px solid var(--base-color);
  box-shadow: ${(props) => (props.border ? 'none' : '0 2px 9px var(--shadow)')};
  color: var(--text-color);
  text-decoration: none;
  font-family: var(--font-normal);
  text-align: center;
  font-weight: 500;
  font-size: ${(props) => props.theme.fonts.base};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: ${(props) => {
    if (props.round) {
      if (props.size === 's') {
        return `calc(0.5 * ${props.theme.spacings.m})`
      }
      return props.theme.spacings.m
    }
    return props.size === 's'
      ? `calc(0.5 * ${props.theme.spacings.m}) ${props.theme.spacings.m}`
      : `calc(2 * ${props.theme.spacings.m})`
  }};

  ${(props) =>
    props.variant === 'normal' &&
    css`
      --base-color: ${(props) => props.theme.colors.green};
    `}

  ${(props) =>
    props.variant === 'info' &&
    css`
      --base-color: ${(props) => props.theme.colors.blue};
    `}

  ${(props) =>
    props.variant === 'warning' &&
    css`
      --base-color: ${(props) => props.theme.colors.yellow};
      --text-color: ${(props) => props.theme.colors.greenDark};
    `}

  ${(props) =>
    props.variant === 'alarm' &&
    css`
      --base-color: ${(props) => props.theme.colors.red};
    `}

  &:hover {
    text-decoration: underline;
  }

  &[disabled],
  &[aria-disabled='true'] {
    cursor: not-allowed;
  }

  &:focus:not([disabled]),
  &:active:not([aria-disabled]) {
    border-color: ${(props) => props.theme.colors.white};
    outline: none;
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

const LinkContainer = styled(({ variant, border, ...props }) => <Link {...props} />)<BaseProps>`
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
