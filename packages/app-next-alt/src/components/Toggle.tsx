import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Check, X } from 'react-feather'
import { theme } from 'theme'
import { Text } from 'components/Typography'
import { WithMarginProps, WithMarginStyles } from 'utilities/withProps'
import noop from 'utilities/noop'

const ToggleDisplayContainer = styled.span`
  --offset: 10%;
  --diameter: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  width: 64px;
  height: 24px;
  position: relative;
  border-radius: 100vw;
  background-color: ${({ theme }) => theme.colors.beige};
  transition: transform var(--base-transition) ease-in-out;

  &::before {
    content: '';
    z-index: 2;
    position: absolute;
    top: 50%;
    left: var(--offset);
    box-sizing: border-box;
    width: var(--diameter);
    height: var(--diameter);
    border: 2px solid ${({ theme }) => theme.colors.beigeDark};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
    transform: translate(0, -50%);
    will-change: transform;
    transition: inherit;
  }

  svg {
    transform: translateY(1px);
  }
`

const ButtonContainer = styled.button<{ fullWidth?: boolean }>`
  ${WithMarginStyles}

  border: 0;
  padding: 0;
  background: transparent;
  font: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  &:focus {
    outline: 0;

    & ${ToggleDisplayContainer} {
      outline: 2px dotted ${({ theme }) => theme.colors.beigeDark};
      outline-offset: 2px;
    }

    &:focus:not(:focus-visible) ${ToggleDisplayContainer} {
      outline: 0;
    }
  }

  &[aria-pressed='true'] ${ToggleDisplayContainer} {
    background-color: ${({ theme }) => theme.colors.green};

    &::before {
      transform: translate(100%, -50%);
      border-color: ${({ theme }) => theme.colors.green};
    }
  }

  &[disabled] ${ToggleDisplayContainer} {
    opacity: 0.6;
    filter: grayscale(40%);
    cursor: not-allowed;
  }
`

const ToggleGlobalStyle = createGlobalStyle`
  [dir='rtl'] ${ToggleDisplayContainer}::before {
    left: auto;
    right: var(--offset);
  }

  [dir='rtl'] ${ButtonContainer}[aria-pressed='true'] + ${ToggleDisplayContainer}::before {
    transform: translate(-100%, -50%);
  }
`

export type ButtonToggleProps = React.PropsWithChildren<
  WithMarginProps<{
    fullWidth?: boolean
    pressed: boolean
    onClick?(): void
    toggleDirection?: 'left' | 'right'
  }>
>

function ToggleDisplay() {
  return (
    <ToggleDisplayContainer hidden>
      <Check aria-hidden="true" focusable="false" color={theme.colors.white} />
      <X aria-hidden="true" focusable="false" color={theme.colors.beigeDark} />
    </ToggleDisplayContainer>
  )
}

export function ButtonToggle(props: ButtonToggleProps) {
  const { pressed, onClick = noop, toggleDirection = 'left', fullWidth = false, ...rest } = props
  return (
    <React.Fragment>
      <ToggleGlobalStyle />
      <ButtonContainer aria-pressed={pressed} onClick={onClick} fullWidth={fullWidth} {...rest}>
        {toggleDirection === 'left' && <ToggleDisplay />}
        <Text
          bold
          color="greenDark"
          ml={toggleDirection === 'left' ? 'm' : undefined}
          mr={toggleDirection === 'right' ? 'm' : undefined}
        >
          {props.children}
        </Text>
        {toggleDirection === 'right' && <ToggleDisplay />}
      </ButtonContainer>
    </React.Fragment>
  )
}
