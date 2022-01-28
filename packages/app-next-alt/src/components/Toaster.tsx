import React from 'react'
import styled, { css } from 'styled-components'
import { toast as toastInstance, ToastType, useToaster } from 'react-hot-toast'
import { AlertCircle, CheckCircle } from 'react-feather'
import { Text } from './Typography'

const ToastWrapper = styled.div`
  width: calc(100vw - 2 * ${({ theme }) => theme.spacings.m});
  position: fixed;
  z-index: 100;
  top: ${({ theme }) => theme.frameWidgetHeight};
  left: ${({ theme }) => theme.spacings.m};
  right: ${({ theme }) => theme.spacings.m};
`

const Container = styled.div<{ type: ToastType }>`
  --base-color: ${(props) => {
    switch (props.type) {
      case 'success':
        return props.theme.colors.green
      case 'error':
        return props.theme.colors.red
      case 'loading':
      case 'blank':
      default:
        return props.theme.colors.blue
    }
  }};

  width: 100%;
  border-radius: ${({ theme }) => theme.baseRadius};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `calc(1.5 * ${theme.spacings.m})`};
  box-shadow: 0 2px 9px var(--base-color);
  display: flex;
  align-items: center;
  background-color: var(--base-color);

  & svg {
    margin-right: ${({ theme }) => theme.spacings.m};

    ${({ type }) =>
      (type === 'blank' || type === 'loading') &&
      css`
        transform: rotate(180deg);
      `}
  }
`

export const toast = toastInstance

export default function Toaster() {
  const { toasts, handlers } = useToaster()
  return (
    <ToastWrapper onMouseEnter={handlers.startPause} onMouseLeave={handlers.endPause}>
      {toasts
        .filter((toast) => toast.visible)
        .map((toast) => (
          <Container key={toast.id} type={toast.type} {...toast.ariaProps}>
            {toast.type === 'success' ? <CheckCircle /> : <AlertCircle />}
            <Text color="white" size="m" as="span">
              {toast.message}
            </Text>
          </Container>
        ))}
    </ToastWrapper>
  )
}
