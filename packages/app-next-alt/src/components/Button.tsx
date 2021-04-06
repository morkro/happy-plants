import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { WithCssProps, WithMarginProps, WithMarginStyles } from 'utilities/withProps'

interface BaseProps {
  variant?: 'normal' | 'info' | 'warning' | 'alarm'
  size?: 's'
  border?: boolean
}

type WithBaseProps = WithCssProps<WithMarginProps<BaseProps>>
type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & WithBaseProps
type ButtonLinkProps = LinkProps & WithBaseProps

const BaseStyles = css<BaseProps>`
  ${WithMarginStyles}

  --base-color: ${({ theme, border }) => (border ? theme.colors.white : theme.colors.green)};
  --shadow: var(--base-color);

  position: relative;
  background-color: ${(props) => (props.border ? 'transparent' : 'var(--base-color)')};
  border-radius: ${(props) => props.theme.baseRadius};
  border: 2px solid var(--base-color);
  box-shadow: ${(props) => (props.border ? 'none' : '0 2px 9px var(--shadow)')};
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
  font-family: var(--font-normal);
  text-align: center;
  font-weight: 500;
  font-size: ${(props) => props.theme.fonts.base};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) =>
    props.size === 's'
      ? `calc(0.5 * ${props.theme.spacings.m}) ${props.theme.spacings.m}`
      : `${props.theme.spacings.m} calc(2 * ${props.theme.spacings.m})`};

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
      color: ${(props) => props.theme.colors.greenDark};
    `}

  ${(props) =>
    props.variant === 'alarm' &&
    css`
      --base-color: ${(props) => props.theme.colors.red};
    `}

  &[disabled],
  &[aria-disabled="true"] {
    border-color: rgb(0 0 0 / 25%);
    cursor: not-allowed;

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 0;
      background: rgb(0 0 0 / 25%);
    }
  }

  &:focus:not([disabled]),
  &:active:not([aria-disabled]) {
    border-color: ${(props) => props.theme.colors.white};
    outline: none;
  }

  & > svg {
    width: 20px;
    height: 20px;
    margin-right: ${({ theme }) => theme.spacings.m};
  }
`

const ButtonContainer = styled.button<BaseProps>`
  ${BaseStyles}
`

export const StyledLink = styled(({ variant, border, ...props }) => <Link {...props} />)<BaseProps>`
  ${BaseStyles}
`

export function ButtonLink(props: ButtonLinkProps) {
  return <StyledLink {...props} />
}

ButtonLink.defaultProps = { border: false }

export function Button(props: ButtonProps) {
  return <ButtonContainer {...props} />
}

Button.defaultProps = { border: false }
