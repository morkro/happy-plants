import React, { InputHTMLAttributes, useState } from 'react'
import styled from 'styled-components'
import { AlertCircle, Eye, EyeOff } from 'react-feather'
import { theme } from 'theme'
import { Text } from 'components/Typography'
import { WithMarginProps, WithMarginStyles } from 'utilities/withProps'
import VisuallyHidden from './VisuallyHidden'
import { Button } from './Button'

interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  fullWidth?: boolean
}

type InputProps = WithMarginProps<BaseInputProps>

const InputContainer = styled.div<InputProps>`
  ${WithMarginStyles}
  position: relative;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
`

const BaseInput = styled.input<InputProps>`
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  background: ${({ theme }) => theme.colors.white};
  font-family: var(--font-special);
  font-size: ${({ theme }) => theme.fonts.base};
  padding: calc(${({ theme }) => theme.spacings.m} * 2);
  border: 2px solid ${({ theme, error }) => (error ? theme.colors.red : theme.colors.white)};
  border-radius: ${({ theme }) => theme.baseRadius};
  color: var(--brand-green-dark);
  transition: box-shadow var(--base-transition) ease-in-out;

  &[type='radio'],
  &[type='checkbox'] {
    width: 22px;
    height: 22px;
    border: 2px solid ${({ theme }) => theme.colors.beigeDark};
    border-radius: 100%;
    appearance: none;
    padding: 0;

    &:checked {
      border-color: ${({ theme }) => theme.colors.green};
      background: ${({ theme }) => theme.colors.green};
      display: flex;
      justify-content: center;
      align-items: center;

      &::before {
        content: '';
        display: block;
        width: 60%;
        height: 30%;
        border-radius: ${({ theme }) => theme.baseRadius};
        border-bottom: 2px solid ${({ theme }) => theme.colors.white};
        border-left: 2px solid ${({ theme }) => theme.colors.white};
        transform: rotate(-45deg) translateX(1px);
      }
    }

    &:focus,
    &:active {
      box-shadow: 0 2px 9px ${({ theme }) => theme.colors.green};
    }
  }

  &:focus,
  &:active {
    border-color: ${({ theme }) => theme.colors.beigeDark};
    outline: none;
    box-shadow: 0 2px 9px ${({ theme }) => theme.colors.beigeDark};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.beigeDark};
  }

  &:invalid:not(:empty) {
    border-color: ${({ theme }) => theme.colors.red};
  }
`

const ErrorContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.red};
  padding: ${({ theme }) => theme.spacings.s};
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.baseRadius};

  svg {
    margin-right: ${({ theme }) => theme.spacings.s};
    height: 20px;
    width: 20px;
  }
`

const TogglePasswordButton = styled(Button)`
  position: absolute;
  z-index: 1;
  top: calc(1.5 * ${(props) => props.theme.spacings.m});
  right: calc(1.5 * ${(props) => props.theme.spacings.m});
  background: transparent;
  border: none;
  box-shadow: none;
  color: ${(props) => props.theme.colors.beigeDark};
  display: flex;

  &:focus,
  &:active {
    color: ${(props) => props.theme.colors.greenDark};
    outline: none;
  }
`

export default function Input(props: InputProps) {
  const { error, m, mt, mr, mb, ml, type, ...remainingProps } = props
  const [showPlainPassword, setPlainPassword] = useState(false)

  return (
    <InputContainer {...{ m, mt, mr, mb, ml }}>
      <BaseInput
        error={error}
        type={type === 'password' && showPlainPassword ? 'text' : type}
        {...remainingProps}
      />
      {type === 'password' && (
        <TogglePasswordButton
          onClick={(event) => {
            event.preventDefault()
            setPlainPassword(!showPlainPassword)
          }}
          aria-label={showPlainPassword ? 'Hide your password' : 'Show your password'}
          size="s"
        >
          {showPlainPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          <VisuallyHidden>{showPlainPassword ? 'Hide password' : 'Show password'}</VisuallyHidden>
        </TogglePasswordButton>
      )}
      {error && (
        <ErrorContainer>
          <AlertCircle color={theme.colors.white} />
          <Text color="white" size="s">
            {error}
          </Text>
        </ErrorContainer>
      )}
    </InputContainer>
  )
}
